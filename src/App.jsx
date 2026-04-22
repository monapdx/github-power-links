import React, { useMemo, useState } from "react";

const profilePatterns = [
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

const repoPatterns = [
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

function cleanInput(value) {
  return String(value || "")
    .trim()
    .replace(/^https?:\/\/github\.com\//i, "")
    .replace(/^github\.com\//i, "")
    .replace(/^\/+|\/+$/g, "");
}

function parseUsername(value) {
  return cleanInput(value).split("/")[0] || "";
}

function parseRepo(value) {
  return cleanInput(value).split("/")[0] || "";
}

function dedupeByUrl(items) {
  const seen = new Set();
  return items.filter((item) => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function generateProfileLinks(username) {
  if (!username) return [];
  return dedupeByUrl(
    profilePatterns.map((item) => ({
      label: item.label,
      url: item.build(username),
    }))
  );
}

function generateRepoLinks(username, repo) {
  if (!username || !repo) return [];
  return dedupeByUrl(
    repoPatterns.map((item) => ({
      label: item.label,
      url: item.build(username, repo),
    }))
  );
}

function IconBase({ children, size = 16, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </IconBase>
  );
}

function CopyIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </IconBase>
  );
}

function ExternalLinkIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </IconBase>
  );
}

function GitHubMarkIcon({ size = 28 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.398 7.861 10.92.575.106.786-.25.786-.556 0-.274-.01-1-.015-1.962-3.197.694-3.872-1.541-3.872-1.541-.523-1.328-1.277-1.681-1.277-1.681-1.044-.714.079-.699.079-.699 1.154.081 1.761 1.185 1.761 1.185 1.026 1.759 2.693 1.251 3.35.957.104-.743.402-1.251.731-1.539-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.448-2.281 1.183-3.086-.119-.29-.513-1.458.112-3.041 0 0 .965-.309 3.162 1.179A10.98 10.98 0 0 1 12 6.052c.974.004 1.955.132 2.871.387 2.195-1.488 3.159-1.179 3.159-1.179.627 1.583.233 2.751.115 3.041.736.805 1.181 1.831 1.181 3.086 0 4.417-2.689 5.389-5.249 5.673.414.356.783 1.058.783 2.134 0 1.541-.014 2.783-.014 3.162 0 .309.207.668.792.554C20.211 21.395 23.5 17.082 23.5 12 23.5 5.649 18.351.5 12 .5Z" />
    </svg>
  );
}

function LinkCard({ label, url }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-zinc-100">{label}</div>
          <div className="mt-1 break-all text-xs text-zinc-400">{url}</div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-900"
        >
          <CopyIcon size={16} />
          {copied ? "Copied" : "Copy"}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 px-3 py-2 text-sm text-zinc-100 hover:bg-zinc-900"
        >
          <ExternalLinkIcon size={16} />
          Open
        </a>
      </div>
    </div>
  );
}

function TestCasesPanel() {
  const cases = [
    {
      input: "octocat",
      expectedUsername: "octocat",
      expectedRepo: "",
    },
    {
      input: "https://github.com/octocat",
      expectedUsername: "octocat",
      expectedRepo: "",
    },
    {
      input: "github.com/octocat/Hello-World/",
      expectedUsername: "octocat",
      expectedRepo: "Hello-World",
    },
    {
      input: "/octocat/Hello-World/",
      expectedUsername: "octocat",
      expectedRepo: "Hello-World",
    },
  ];

  return (
    <div className="mt-8 rounded-3xl border-4 border-zinc-900 bg-white p-6 shadow-[8px_8px_0_0_#18181b]">
      <h3 className="text-lg font-black">Built-in parsing checks</h3>
      <p className="mt-1 text-sm text-zinc-600">
        These are lightweight sanity checks so the helper logic stays obvious and easy to test.
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border-2 border-zinc-900 px-3 py-2 text-left">Input</th>
              <th className="border-2 border-zinc-900 px-3 py-2 text-left">Username</th>
              <th className="border-2 border-zinc-900 px-3 py-2 text-left">Repo</th>
              <th className="border-2 border-zinc-900 px-3 py-2 text-left">Result</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((testCase) => {
              const cleaned = cleanInput(testCase.input);
              const segments = cleaned.split("/").filter(Boolean);
              const actualUsername = segments[0] || "";
              const actualRepo = segments[1] || "";
              const pass =
                actualUsername === testCase.expectedUsername && actualRepo === testCase.expectedRepo;

              return (
                <tr key={testCase.input}>
                  <td className="border-2 border-zinc-900 px-3 py-2 font-mono text-xs">{testCase.input}</td>
                  <td className="border-2 border-zinc-900 px-3 py-2">{actualUsername || "—"}</td>
                  <td className="border-2 border-zinc-900 px-3 py-2">{actualRepo || "—"}</td>
                  <td className="border-2 border-zinc-900 px-3 py-2 font-semibold">
                    {pass ? "PASS" : "FAIL"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function GitHubPowerLinksGenerator() {
  const [username, setUsername] = useState("octocat");
  const [repo, setRepo] = useState("Hello-World");

  const cleanUsername = parseUsername(username);
  const cleanRepo = parseRepo(repo);

  const profileLinks = useMemo(() => generateProfileLinks(cleanUsername), [cleanUsername]);
  const repoLinks = useMemo(() => generateRepoLinks(cleanUsername, cleanRepo), [cleanUsername, cleanRepo]);

  const exportText = useMemo(() => {
    const groups = [];
    if (profileLinks.length) {
      groups.push(
        ["# Profile links", ...profileLinks.map((link) => `${link.label}: ${link.url}`)].join("\n")
      );
    }
    if (repoLinks.length) {
      groups.push(
        ["# Repository links", ...repoLinks.map((link) => `${link.label}: ${link.url}`)].join("\n")
      );
    }
    return groups.join("\n\n");
  }, [profileLinks, repoLinks]);

  async function copyAll() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(exportText);
      }
    } catch (err) {
      console.error("Copy all failed", err);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border-4 border-zinc-900 bg-white p-6 shadow-[8px_8px_0_0_#18181b]">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border-4 border-zinc-900 bg-pink-500 p-3 text-white">
              <GitHubMarkIcon size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight">GitHub Power Links</h1>
              <p className="mt-1 text-sm text-zinc-600">
                Drop in a GitHub username and optional repo name, then get a big bundle of useful GitHub URLs.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold">GitHub username *</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="octocat"
                className="w-full rounded-2xl border-4 border-zinc-900 bg-lime-200 px-4 py-3 text-base outline-none placeholder:text-zinc-600"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold">Repository name (optional)</span>
              <input
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="Hello-World"
                className="w-full rounded-2xl border-4 border-zinc-900 bg-cyan-200 px-4 py-3 text-base outline-none placeholder:text-zinc-600"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={copyAll}
              disabled={!cleanUsername}
              className="inline-flex items-center gap-2 rounded-2xl border-4 border-zinc-900 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CopyIcon size={16} />
              Copy all links
            </button>
            <div className="inline-flex items-center gap-2 rounded-2xl border-4 border-zinc-900 bg-white px-4 py-3 text-sm font-medium">
              <SearchIcon size={16} />
              {profileLinks.length + repoLinks.length} links generated
            </div>
          </div>
        </div>

        {!cleanUsername ? (
          <div className="rounded-3xl border-4 border-dashed border-zinc-400 bg-white p-10 text-center text-zinc-600">
            Enter a GitHub username to generate links.
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black">Profile links</h2>
                <span className="rounded-full border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-bold">
                  {profileLinks.length}
                </span>
              </div>
              <div className="grid gap-4">
                {profileLinks.map((link) => (
                  <LinkCard key={link.url} label={link.label} url={link.url} />
                ))}
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-black">Repository links</h2>
                <span className="rounded-full border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-bold">
                  {repoLinks.length}
                </span>
              </div>
              {cleanRepo ? (
                <div className="grid gap-4">
                  {repoLinks.map((link) => (
                    <LinkCard key={link.url} label={link.label} url={link.url} />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border-4 border-dashed border-zinc-400 bg-white p-8 text-zinc-600">
                  Add a repository name to generate repo-specific links like Pulse, Issues, Releases, Branches, and more.
                </div>
              )}
            </section>
          </div>
        )}

        <TestCasesPanel />
      </div>
    </div>
  );
}
