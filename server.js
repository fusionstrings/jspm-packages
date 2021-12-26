import { serve } from "https://deno.land/std@0.118.0/http/server.ts";
import { Helmet, jsx, renderSSR } from "nano-jsx";
import { FeaturedPackages } from "./components/featured-packages.js";
import {
  getRecentPackages,
  pageServingHeaders,
  renderMarkdownContent,
} from "./utils.js";

async function requestHandler(request) {
  try {
    const { pathname } = new URL(request.url);
    if (pathname === "/") {
      const response = await getRecentPackages();
      const packages = response?.objects || [];
      FeaturedPackages.fetchPackages = () => packages;
      const indexPage = renderSSR(jsx`<${FeaturedPackages}  />`);
      const { body, head, footer } = Helmet.SSR(indexPage);

      const html = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <title>JSPM Packages</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" href="https://ga.jspm.io/npm:normalize.css@8.0.1/normalize.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bebas+Neue&family=Major+Mono+Display&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700&family=Source+Code+Pro&family=Vollkorn&display=swap" />
            <link rel="stylesheet" href="./style.css" />
            ${head.join("\n")}
          </head>
          <body>
          <main>
            <jspm-packages-featured>
              <h1>Featured Packages</h1>
              ${body}
            </jspm-packages-featured>
          </main>
            ${footer.join("\n")}
          </body>
        </html>`;

      return new Response(html, {
        headers: pageServingHeaders,
      });
    }

    if (pathname === "/package/style.css" || pathname === "/style.css") {
      const response = await Deno.readFile("./style.css");

      return new Response(response, {
        headers: { "content-type": "text/css; charset=utf-8" },
      });
    }

    const BASE_PATH = "/package/";
    const NPM_PROVIDER_URL = "https://ga.jspm.io/npm:";
    const maybeReadmeFiles = ["README.md", "readme.md"];

    if (pathname.startsWith(BASE_PATH)) {
      const [, packageName] = pathname.split(BASE_PATH);

      if (packageName) {
        const baseURL = `${NPM_PROVIDER_URL}${packageName}`;
        const filesToFetch = ["package.json", ...maybeReadmeFiles];

        const [jspmPackage, README, readme] = await Promise.all(
          filesToFetch.map((file) => fetch(`${baseURL}/${file}`))
        );

        const {
          name,
          description,
          keywords,
          version,
          homepage,
          license,
          files,
          exports,
        } = await jspmPackage.json();

        const readmeFileContent = await [README, readme]
          .find(
            (readmeFile) =>
              readmeFile.status === 200 || readmeFile.status === 304
          )
          .text();

        const readmeHTML = renderMarkdownContent(readmeFileContent);

        const app = renderSSR(
          jsx`<${Package} name=${name} description=${description} version=${version} homepage=${homepage} license=${license} files=${files} exports=${exports} readme=${readmeHTML} keywords=${keywords} />`
        );

        const { body, head, footer } = Helmet.SSR(app);

        // const css = await Deno.readTextFile('./style.css');

        const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>${name}@${version} - JSPM</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content=${description}>
        <link rel="stylesheet" href="https://ga.jspm.io/npm:normalize.css@8.0.1/normalize.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bebas+Neue&family=Major+Mono+Display&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,700&family=Source+Code+Pro&family=Vollkorn&display=swap" />
        <link rel="stylesheet" href="https://ga.jspm.io/npm:prismjs@1.25.0/themes/prism.css" />
        <link rel="stylesheet" href="./style.css" />
        
        ${head.join("\n")}
        <srcipt src="https://ga.jspm.io/npm:prismjs@1.25.0/prism.js"></script>
      </head>
      <body>
        ${body}
        ${footer.join("\n")}
      </body>
    </html>`;

        return new Response(html, {
          headers: pageServingHeaders,
        });
      }
    }

    return new Response("404", { status: 404 });
  } catch (error) {
    return new Response(error.message || error.toString(), { status: 500 });
  }
}

if (import.meta?.main) {
  const timestamp = Date.now();
  const humanReadableDateTime = new Intl.DateTimeFormat("default", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(timestamp);

  console.log("Current Date: ", humanReadableDateTime);
  console.info(`Server Listening on http://localhost:8000`);

  await serve(requestHandler);
}
