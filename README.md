# GitHub Power Links

Generate every useful GitHub URL for a user or repository — instantly.

---

## Overview

**GitHub Power Links** is a simple web tool that takes a GitHub username (required) and an optional repository name, and generates a comprehensive set of useful GitHub URLs.

It’s designed for:

* Exploring profiles quickly
* Debugging repositories
* Finding hidden or hard-to-navigate GitHub pages
* Power users who want faster access to GitHub insights

---

## Features

* Generate profile links (repos, stars, followers, activity, etc.)
* Generate repository links (issues, PRs, graphs, traffic, releases, etc.)
* Copy individual links
* Copy all links at once
* Clean input parsing (handles full GitHub URLs)
* Lightweight and fast (no external dependencies)

---

## Demo

Once deployed on GitHub Pages:

```
https://YOUR-USERNAME.github.io/github-power-links/
```

---

## Getting Started (Local Development)

### 1. Create project

```bash
npm create vite@latest github-power-links -- --template react
cd github-power-links
```

### 2. Install dependencies

```bash
npm install
npm install tailwindcss @tailwindcss/vite
```

### 3. Configure Vite

Update `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 4. Add Tailwind

Replace `src/index.css` with:

```css
@import "tailwindcss";
```

### 5. Add the app

Replace `src/App.jsx` with the provided GitHub Power Links component.

### 6. Run the app

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
* Export as Markdown
* Categories / collapsible sections
* Search/filter links
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
