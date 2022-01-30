import { h, Helmet } from "nano-jsx";
import { Seperator } from "./separator.js";
import { Exports } from "./exports.js";

function Aside(
  {
    license,
    name,
    version,
    exports,
    downloads,
    updated,
    type,
    types,
    features,
    created,
    links,
  },
) {
  return (
    <jspm-package-aside>
      <aside>
        <jspm-package-created>
          <h3>Created</h3>
          {created}
        </jspm-package-created>
        <jspm-package-weekly-updated>
          <h3>Updated</h3>
          {updated}
        </jspm-package-weekly-updated>
        <jspm-package-weekly-downloads>
          <h3>Downloads (weekly)</h3>
          {downloads}
        </jspm-package-weekly-downloads>
        <jspm-package-features>
          <h3>Features</h3>
          {Object.entries(features).map(([feature, supported]) => (
            <ul>
              <li data-feature-supported={supported}>{feature}</li>
            </ul>
          ))}
        </jspm-package-features>
        <div>
          <h3>License</h3>
          <jspm-package-license>{license}</jspm-package-license>
          <Seperator />
        </div>
        <jspm-package-aside-exports
          data-exports={JSON.stringify(exports)}
          data-name={name}
          data-version={version}
        >
          <Exports exports={exports} name={name} version={version} />
        </jspm-package-aside-exports>
        <jspm-package-links>
          <h3>Links</h3>
          {Object.entries(links).map(([text, link]) => link && (
            <jspm-package-link>
              <h5>{text}</h5>
              <a href={link}>{link}</a>
            </jspm-package-link>
          ))}
        </jspm-package-links>
      </aside>

      <Helmet>
        <style data-page-name="jspm-package-aside">
          {`
          jspm-package-features li{
            padding-inline-start: 1ch;
          }
          jspm-package-features li[data-feature-supported="true"]{
            list-style-type: '✔';
          }
          jspm-package-features li[data-feature-supported="false"]{
            list-style-type: '✖';
          }
          `}
        </style>
      </Helmet>
    </jspm-package-aside>
  );
}

export { Aside };
