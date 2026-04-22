import { cleanPath } from "./utils";

export const bulkProfilePatterns = [
  { label: "Profile", build: (u) => `https://github.com/${u}` },
  { label: "Overview", build: (u) => `https://github.com/${u}?tab=overview` },
  { label: "Repositories", build: (u) => `https://github.com/${u}?tab=repositories` },
  { label: "Projects", build: (u) => `https://github.com/${u}?tab=projects` },
  { label: "Packages", build: (u) => `https://github.com/${u}?tab=packages` },
  { label: "Stars", build: (u) => `https://github.com/${u}?tab=stars` },
  { label: "Followers", build: (u) => `https://github.com/${u}?tab=followers` },
  { label: "Following", build: (u) => `https://github.com/${u}?tab=following` },
  { label: "Achievements", build: (u) => `https://github.com/${u}?achievement=1` },
  { label: "Pinned repositories", build: (u) => `https://github.com/${u}?tab=repositories&type=source` },
  { label: "Public activity", build: (u) => `https://github.com/${u}?tab=activity` },
];

export const bulkRepoPatterns = [
  { label: "Repository", build: (u, r) => `https://github.com/${u}/${r}` },
  { label: "Code", build: (u, r) => `https://github.com/${u}/${r}` },
  { label: "Issues", build: (u, r) => `https://github.com/${u}/${r}/issues` },
  { label: "Pull requests", build: (u, r) => `https://github.com/${u}/${r}/pulls` },
  { label: "Actions", build: (u, r) => `https://github.com/${u}/${r}/actions` },
  { label: "Projects", build: (u, r) => `https://github.com/${u}/${r}/projects` },
  { label: "Wiki", build: (u, r) => `https://github.com/${u}/${r}/wiki` },
  { label: "Security", build: (u, r) => `https://github.com/${u}/${r}/security` },
  { label: "Insights", build: (u, r) => `https://github.com/${u}/${r}/pulse` },
  { label: "Pulse", build: (u, r) => `https://github.com/${u}/${r}/pulse` },
  { label: "Graphs / contributors", build: (u, r) => `https://github.com/${u}/${r}/graphs/contributors` },
  { label: "Graphs / commit activity", build: (u, r) => `https://github.com/${u}/${r}/graphs/commit-activity` },
  { label: "Graphs / code frequency", build: (u, r) => `https://github.com/${u}/${r}/graphs/code-frequency` },
  { label: "Graphs / network", build: (u, r) => `https://github.com/${u}/${r}/network` },
  { label: "Network / members", build: (u, r) => `https://github.com/${u}/${r}/network/members` },
  { label: "Forks", build: (u, r) => `https://github.com/${u}/${r}/forks` },
  { label: "Stargazers", build: (u, r) => `https://github.com/${u}/${r}/stargazers` },
  { label: "Watchers", build: (u, r) => `https://github.com/${u}/${r}/watchers` },
  { label: "Releases", build: (u, r) => `https://github.com/${u}/${r}/releases` },
  { label: "Tags", build: (u, r) => `https://github.com/${u}/${r}/tags` },
  { label: "Branches", build: (u, r) => `https://github.com/${u}/${r}/branches` },
  { label: "Contributors", build: (u, r) => `https://github.com/${u}/${r}/graphs/contributors` },
  { label: "Commits", build: (u, r) => `https://github.com/${u}/${r}/commits` },
  { label: "Activity", build: (u, r) => `https://github.com/${u}/${r}/activity` },
  { label: "Traffic", build: (u, r) => `https://github.com/${u}/${r}/graphs/traffic` },
  { label: "Dependabot alerts", build: (u, r) => `https://github.com/${u}/${r}/security/dependabot` },
  { label: "Secret scanning", build: (u, r) => `https://github.com/${u}/${r}/security/secret-scanning` },
  { label: "Code scanning", build: (u, r) => `https://github.com/${u}/${r}/security/code-scanning` },
  { label: "Deployments", build: (u, r) => `https://github.com/${u}/${r}/deployments` },
  { label: "Environments", build: (u, r) => `https://github.com/${u}/${r}/environments` },
  { label: "Packages", build: (u, r) => `https://github.com/${u}/${r}/packages` },
  { label: "Labels", build: (u, r) => `https://github.com/${u}/${r}/labels` },
  { label: "Milestones", build: (u, r) => `https://github.com/${u}/${r}/milestones` },
  { label: "Discussions", build: (u, r) => `https://github.com/${u}/${r}/discussions` },
  { label: "Pulse (weekly summary)", build: (u, r) => `https://github.com/${u}/${r}/pulse` },
];

export const builderPatterns = {
  repo: {
    label: "Repository",
    fields: ["owner", "repo"],
    note: "Main repository URL.",
    build: ({ owner, repo }) => `https://github.com/${owner}/${repo}`,
  },
  issues: {
    label: "Issues",
    fields: ["owner", "repo"],
    note: "Repository issues list.",
    build: ({ owner, repo }) => `https://github.com/${owner}/${repo}/issues`,
  },
  newIssue: {
    label: "New Issue",
    fields: ["owner", "repo", "title", "body", "labels"],
    note: "Prefill a new issue with optional title, body, and labels.",
    build: ({ owner, repo, title, body, labels }) => {
      const params = new URLSearchParams();
      if (title) params.set("title", title);
      if (body) params.set("body", body);
      if (labels) params.set("labels", labels);
      const query = params.toString();
      return `https://github.com/${owner}/${repo}/issues/new${query ? `?${query}` : ""}`;
    },
  },
  issueTemplate: {
    label: "Issue Template",
    fields: ["owner", "repo", "template", "title", "body", "labels"],
    note: "Open a specific issue template, with optional prefilled values.",
    build: ({ owner, repo, template, title, body, labels }) => {
      const params = new URLSearchParams();
      if (template) params.set("template", template);
      if (title) params.set("title", title);
      if (body) params.set("body", body);
      if (labels) params.set("labels", labels);
      return `https://github.com/${owner}/${repo}/issues/new?${params.toString()}`;
    },
  },
  pulls: {
    label: "Pull Requests",
    fields: ["owner", "repo"],
    note: "Repository pull requests tab.",
    build: ({ owner, repo }) => `https://github.com/${owner}/${repo}/pulls`,
  },
  actions: {
    label: "Actions",
    fields: ["owner", "repo"],
    note: "Repository Actions tab.",
    build: ({ owner, repo }) => `https://github.com/${owner}/${repo}/actions`,
  },
  discussions: {
    label: "Discussions",
    fields: ["owner", "repo"],
    note: "Repository discussions home.",
    build: ({ owner, repo }) => `https://github.com/${owner}/${repo}/discussions`,
  },
  discussionCategory: {
    label: "Discussion Category",
    fields: ["owner", "repo", "discussionCategory"],
    note: "Discussion category link.",
    build: ({ owner, repo, discussionCategory }) =>
      `https://github.com/${owner}/${repo}/discussions/categories/${encodeURIComponent(discussionCategory)}`,
  },
  releases: {
    label: "Releases",
    fields: ["owner", "repo"],
    note: "Repository releases page.",
    build: ({ owner, repo }) => `https://github.com/${owner}/${repo}/releases`,
  },
  latestRelease: {
    label: "Latest Release",
    fields: ["owner", "repo"],
    note: "Redirects to the latest release.",
    build: ({ owner, repo }) => `https://github.com/${owner}/${repo}/releases/latest`,
  },
  releaseTag: {
    label: "Specific Release Tag",
    fields: ["owner", "repo", "releaseTag"],
    note: "Direct link to a particular release tag.",
    build: ({ owner, repo, releaseTag }) =>
      `https://github.com/${owner}/${repo}/releases/tag/${encodeURIComponent(releaseTag)}`,
  },
  wiki: {
    label: "Wiki",
    fields: ["owner", "repo"],
    note: "Repository wiki home.",
    build: ({ owner, repo }) => `https://github.com/${owner}/${repo}/wiki`,
  },
  wikiPage: {
    label: "Wiki Page",
    fields: ["owner", "repo", "wikiPage"],
    note: "Direct link to a wiki page.",
    build: ({ owner, repo, wikiPage }) =>
      `https://github.com/${owner}/${repo}/wiki/${encodeURIComponent(wikiPage)}`,
  },
  pages: {
    label: "GitHub Pages Site",
    fields: ["owner", "repo"],
    note: "Standard Pages URL pattern for a project site.",
    build: ({ owner, repo }) => `https://${owner}.github.io/${repo}/`,
  },
  file: {
    label: "File View",
    fields: ["owner", "repo", "branch", "path"],
    note: "GitHub file view using /blob/.",
    build: ({ owner, repo, branch, path }) =>
      `https://github.com/${owner}/${repo}/blob/${branch}/${cleanPath(path)}`,
  },
  rawFile: {
    label: "Raw File",
    fields: ["owner", "repo", "branch", "path"],
    note: "Raw file URL from raw.githubusercontent.com.",
    build: ({ owner, repo, branch, path }) =>
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${cleanPath(path)}`,
  },
  folder: {
    label: "Folder View",
    fields: ["owner", "repo", "branch", "path"],
    note: "GitHub folder view using /tree/.",
    build: ({ owner, repo, branch, path }) =>
      `https://github.com/${owner}/${repo}/tree/${branch}/${cleanPath(path)}`,
  },
  editFile: {
    label: "Edit File",
    fields: ["owner", "repo", "branch", "path"],
    note: "Direct edit link for a file in the browser.",
    build: ({ owner, repo, branch, path }) =>
      `https://github.com/${owner}/${repo}/edit/${branch}/${cleanPath(path)}`,
  },
  deleteFile: {
    label: "Delete File",
    fields: ["owner", "repo", "branch", "path"],
    note: "Direct delete link for a file in the browser.",
    build: ({ owner, repo, branch, path }) =>
      `https://github.com/${owner}/${repo}/delete/${branch}/${cleanPath(path)}`,
  },
  compare: {
    label: "Compare Branches",
    fields: ["owner", "repo", "base", "head"],
    note: "Compare base and head refs.",
    build: ({ owner, repo, base, head }) =>
      `https://github.com/${owner}/${repo}/compare/${encodeURIComponent(base)}...${encodeURIComponent(head)}`,
  },
  commit: {
    label: "Commit",
    fields: ["owner", "repo", "commit"],
    note: "Direct commit URL.",
    build: ({ owner, repo, commit }) => `https://github.com/${owner}/${repo}/commit/${encodeURIComponent(commit)}`,
  },
};
