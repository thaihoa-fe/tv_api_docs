# Trust Vision API Documentation

Website Portal of Trusting Social's Trust Vision API Documentation

## Development 

Install dependency packages

```
yarn install
```

Start website

```
yarn start
```

Start [storybook](https://storybook.js.org/)

```
yarn storybook
```

Build website

```
yarn build
```

## Add/Edit Content

- You can add more documentation pages by creating markdown files (*.md) in `contents` folder.
- Each file will be transpiled to a static HTML page. Example: `introduction.md` will become `introduction/index.html`.
- Remember to provide informations in markdown's frontmatter.

    | Field Name | Type              | Description                                     |
    |------------|-------------------|-------------------------------------------------|
    | index      | bool              | This document will become the home page.       |
    | title      | string (required) | Title of document.                               |
    | priority   | number (required) | Priority of the link of document on TOC sidebar. |



    Example:
    ```
        ---
        index: true
        title: "Introduction"
        priority: 3
        ---
    ```

## References

- [Gatsby Framework](https://www.gatsbyjs.org/)
- [Atlaskit Library](https://atlaskit.atlassian.com/)
