# GitHub Power Links

## Overview

**GitHub Power Links** is a simple web tool that takes a GitHub username (required) and an optional repository name, and generates a comprehensive set of useful GitHub URLs.

<img src="https://raw.githubusercontent.com/monapdx/github-power-links/refs/heads/main/github-power-links-05-04-2026_11_53_AM.png">

It’s designed for:

* Exploring profiles quickly
* Debugging repositories
* Finding hidden or hard-to-navigate GitHub pages
* Power users who want faster access to GitHub insights

---

## Features

* **Explorer mode** for bulk profile and repository links
* **Builder mode** for creating one precise GitHub URL with:
  * Plain URL
  * Markdown link
  * Badge markdown
  * HTML link/button
* **Search Explorer mode** with curated GitHub search query templates
* Copy individual outputs and **copy all explorer links as a markdown list**
* Input parsing that accepts usernames/repos or full GitHub URLs
* Visual help GIFs in Builder mode (when available)

---

## Demo

[![Demo](https://img.shields.io/badge/%F0%9F%9A%80Demo-111111?style=for-the-badge)](https://monapdx.github.io/github-power-links/)

Once deployed on GitHub Pages:

```
https://YOUR-USERNAME.github.io/github-power-links/
```

---

[![Report broken links](https://img.shields.io/badge/%F0%9F%91%89Report%20broken%20links-111111?style=for-the-badge)](https://github.com/monapdx/github-power-links/issues/new?template=url-pattern-change.yml) [![Suggest a link](https://img.shields.io/badge/%F0%9F%91%89Suggest%20a%20link-111111?style=for-the-badge)](https://github.com/monapdx/github-power-links/issues/new?template=suggest-link-pattern.yml)

## Getting Started (Local Development)

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

```bash
npm run dev
```

---

## Build

```bash
npm run build
```

Output will be in:

```
/dist
```

---

## Deploy to GitHub Pages

### 1. Set base path

In `vite.config.js`:

```js
base: '/github-power-links/'
```

### 2. Add GitHub Actions workflow

Create:

```
.github/workflows/deploy.yml
```

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4
```

### 3. Enable Pages

* Go to **Settings → Pages**
* Set Source to **GitHub Actions**

---

## Example Output

For:

```
Username: octocat
Repo: Hello-World
```

You’ll get links like:

* [https://github.com/octocat](https://github.com/octocat)
* [https://github.com/octocat?tab=repositories](https://github.com/octocat?tab=repositories)
* [https://github.com/octocat/Hello-World/issues](https://github.com/octocat/Hello-World/issues)
* [https://github.com/octocat/Hello-World/pulse](https://github.com/octocat/Hello-World/pulse)
* [https://github.com/octocat/Hello-World/graphs/contributors](https://github.com/octocat/Hello-World/graphs/contributors)

When using **Copy all links** in Explorer mode, the clipboard output is markdown-formatted:

```md
## Profile Links

- **Profile:** [Profile](https://github.com/octocat)
- **Repositories:** [Repositories](https://github.com/octocat?tab=repositories)

## Repository Links

- **Repository:** [Repository](https://github.com/octocat/Hello-World)
- **Issues:** [Issues](https://github.com/octocat/Hello-World/issues)
```

---

## Use Cases

* Quickly inspect repos
* Share deep GitHub links
* Research contributors and activity
* Debug repo structure
* Build tooling on top of GitHub URLs

---

## Future Ideas

* Shareable links (`?u=username&r=repo`)
* Search/filter patterns in Builder mode
* Saved presets for commonly used link patterns
* One-click import/export of custom search templates
* GitHub API integration

---

## Tech Stack

* React
* Vite
* Tailwind CSS

---

## License

MIT

---

## Contributing

Pull requests are welcome.

Ideas for contributions:

* Add new GitHub URL patterns
* Improve UI/UX
* Add export formats
* Improve mobile responsiveness

---

## Author

Built by you 🚀
