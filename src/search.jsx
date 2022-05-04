/** @jsx h */
import nano, { h } from "nano-jsx";

const { Helmet } = nano;

function Search(params) {
  return (
    <jspm-search>
      <form>
        <input
          type="search"
          list="featured-packages"
          autofocus="true"
          placeholder="Package"
          autocomplete="on"
          class="header-textinput search_input"
          name="q"
        />
        <datalist id="featured-packages">
            <option value="@jspm/import-map" />
            <option value="@jspm/generator" />
            <option value="angular" />
            <option value="react" />
            <option value="svelte" />
            <option value="vue" />
            <option value="preact" />
            <option value="nano-jsx" />
            <option value="marko" />
            <option value="@hotwired/stimulus" />
            <option value="lit" />
            <option value="rollup" />
            <option value="webpack" />
            <option value="lodash" />
            <option value="strapi" />
            <option value="three" />
            <option value="axios" />
            <option value="moment" />
            <option value="dayjs" />
            <option value="marked" />
            <option value="sver" />
        </datalist>
        <button class="search_button">
          <span>Import</span>
        </button>
      </form>
      <Helmet>
        <style data-component-name="jspm-nav">
          {`
          jspm-search, jspm-search form{
            display: flex;
          }
          .search_button {
            color: var(--dl-color-gray-black);
            display: inline-block;
            padding: 0.5rem 1rem;
            border-color: var(--dl-color-gray-black);
            border-width: 1px;
            height: 40px;
            display: flex;
            align-items: center;
            border-width: 0px;
            padding-left: var(--dl-space-space-oneandhalfunits);
            padding-right: var(--dl-space-space-oneandhalfunits);
            background-color: var(--dl-color-primary-js-primary);
            border-top-left-radius: none;
            border-top-right-radius: var(--dl-radius-radius-radius8);
            border-bottom-left-radius: none;
            border-bottom-right-radius: var(--dl-radius-radius-radius8);
        }
          
          .search_input {
            color: var(--dl-color-gray-black);
            cursor: auto;
            padding: 0.5rem 1rem;
            border-color: var(--dl-color-gray-black);
            border-width: 1px;
            background-color: var(--dl-color-gray-white);
            height: 40px;
            padding: var(--dl-space-space-halfunit);
            max-width: 500px;
            border-color: var(--dl-color-jspm-placeholder);
            background-color: var(--dl-color-jspm-placeholder);
            border-top-left-radius: var(--dl-radius-radius-radius8);
            border-bottom-left-radius: var(--dl-radius-radius-radius8);
            background: url('/npm-n-block-16.png') no-repeat 8px center;
            font-size: var(--step--2);
            padding-left: 32px;
            width: 70vw;
          }
          jspm-nav nav ul {
              display: flex;
            list-style: none;
          }
          jspm-nav nav ul li{
              margin: 20px;
          }
          `}
        </style>
      </Helmet>
    </jspm-search>
  );
}

export { Search };
