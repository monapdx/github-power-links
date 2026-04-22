import React, { useMemo, useState } from "react";
import { bulkProfilePatterns, bulkRepoPatterns, builderPatterns } from "./patterns";
import {
  buildBadgeImageUrl,
  cleanInput,
  copyToClipboard,
  dedupeByUrl,
  escapeHtml,
  parseRepo,
  parseUsername,
} from "./utils";

const builderFieldMeta = {
  owner: { label: "Owner / Username", placeholder: "monapdx" },
  repo: { label: "Repository", placeholder: "Frontend-Widgets" },
  branch: { label: "Branch", placeholder: "main" },
  path: { label: "Path", placeholder: "src/index.js" },
  template: { label: "Issue template filename", placeholder: "add-template.yml" },
  labels: { label: "Labels", placeholder: "bug,help wanted" },
  title: { label: "Issue title", placeholder: "Suggestion: add new widget" },
  body: { label: "Issue body", placeholder: "Write some default issue body text here...", type: "textarea" },
  discussionCategory: { label: "Discussion category", placeholder: "ideas" },
  wikiPage: { label: "Wiki page", placeholder: "Home" },
  base: { label: "Compare base", placeholder: "main" },
  head: { label: "Compare head", placeholder: "feature-branch" },
  commit: { label: "Commit SHA", placeholder: "abc123def456" },
  releaseTag: { label: "Release tag", placeholder: "v1.0.0" },
  linkText: { label: "Link text / button text", placeholder: "Open on GitHub" },
  badgeLabel: { label: "Badge label", placeholder: "Open on GitHub" },
  badgeColor: { label: "Badge color", placeholder: "pink" },
};

const builderFieldOrder = [
  "owner",
  "repo",
  "branch",
  "path",
  "template",
  "labels",
  "title",
  "body",
  "discussionCategory",
  "wikiPage",
  "base",
  "head",
  "commit",
  "releaseTag",
];

function generateProfileLinks(username) {
  if (!username) return [];
  return dedupeByUrl(
    bulkProfilePatterns.map((item) => ({
      label: item.label,
      url: item.build(username),
    }))
  );
}

function generateRepoLinks(username, repo) {
  if (!username || !repo) return [];
  return dedupeByUrl(
    bulkRepoPatterns.map((item) => ({
      label: item.label,
      url: item.build(username, repo),
    }))
  );
}

function getDefaultBuilderInputs(owner = "", repo = "") {
  return {
    owner,
    repo,
    branch: "main",
    path: "",
    template: "",
    labels: "",
    title: "",
    body: "",
    discussionCategory: "",
    wikiPage: "",
    base: "main",
    head: "",
    commit: "",
    releaseTag: "",
    linkText: "Open on GitHub",
    badgeLabel: "Open on GitHub",
    badgeColor: "pink",
  };
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
    const ok = await copyToClipboard(url);
    if (!ok) return;

    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
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
  const [mode, setMode] = useState("explorer");
  const [username, setUsername] = useState("octocat");
  const [repo, setRepo] = useState("Hello-World");
  const [profileExpanded, setProfileExpanded] = useState(true);
  const [repoExpanded, setRepoExpanded] = useState(true);
  const [builderPattern, setBuilderPattern] = useState("repo");
  const [builderInputs, setBuilderInputs] = useState(getDefaultBuilderInputs("octocat", "Hello-World"));
  const [builderOutputs, setBuilderOutputs] = useState({
    plainUrl: "",
    markdownLink: "",
    badgeMarkdown: "",
    htmlLink: "",
    previewUrl: "",
    previewText: "Open on GitHub",
    badgeUrl: "",
    badgeAlt: "Badge preview",
  });
  const [builderError, setBuilderError] = useState("");
  const [builderCopiedKey, setBuilderCopiedKey] = useState("");

  const cleanUsername = parseUsername(username);
  const cleanRepo = parseRepo(repo);
  const selectedBuilderPattern = builderPatterns[builderPattern];
  const neededBuilderFields = useMemo(
    () => new Set(selectedBuilderPattern?.fields || []),
    [selectedBuilderPattern]
  );

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
    await copyToClipboard(exportText);
  }

  function handleModeChange(nextMode) {
    setMode(nextMode);
    if (nextMode === "builder") {
      setBuilderInputs((current) => ({
        ...current,
        owner: current.owner || cleanUsername,
        repo: current.repo || cleanRepo,
      }));
    }
  }

  function updateBuilderInput(field, value) {
    setBuilderInputs((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function normalizeBuilderIdentityInputs(field) {
    setBuilderInputs((current) => {
      const next = { ...current };

      if (field === "owner") {
        const ownerFromOwner = parseUsername(current.owner);
        const segments = cleanInput(current.owner).split("/").filter(Boolean);
        const repoFromOwner = segments[1] || "";

        next.owner = ownerFromOwner;
        if (!current.repo && repoFromOwner) {
          next.repo = repoFromOwner;
        }
      }

      if (field === "repo") {
        next.repo = parseRepo(current.repo);
      }

      return next;
    });
  }

  function generateBuilderOutputs() {
    const selected = builderPatterns[builderPattern];
    if (!selected) return;

    const values = Object.fromEntries(
      Object.entries(builderInputs).map(([key, value]) => [key, String(value || "").trim()])
    );

    const missing = selected.fields.filter((key) => !values[key]);
    if (missing.length) {
      setBuilderError(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    const url = selected.build(values);
    const linkText = values.linkText || "Open on GitHub";
    const badgeLabel = values.badgeLabel || "Open on GitHub";
    const badgeUrl = buildBadgeImageUrl(badgeLabel, values.badgeColor);
    const markdownLink = `[${linkText}](${url})`;
    const badgeMarkdown = `[![${badgeLabel}](${badgeUrl})](${url})`;
    const htmlLink = `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(linkText)}</a>`;

    setBuilderOutputs({
      plainUrl: url,
      markdownLink,
      badgeMarkdown,
      htmlLink,
      previewUrl: url,
      previewText: linkText,
      badgeUrl,
      badgeAlt: badgeLabel,
    });
    setBuilderError("");
    setBuilderCopiedKey("");
  }

  function resetBuilder() {
    setBuilderPattern("repo");
    setBuilderInputs(getDefaultBuilderInputs(cleanUsername, cleanRepo));
    setBuilderOutputs({
      plainUrl: "",
      markdownLink: "",
      badgeMarkdown: "",
      htmlLink: "",
      previewUrl: "",
      previewText: "Open on GitHub",
      badgeUrl: "",
      badgeAlt: "Badge preview",
    });
    setBuilderError("");
    setBuilderCopiedKey("");
  }

  async function copyBuilderOutput(key, value) {
    const ok = await copyToClipboard(value);
    if (!ok) return;

    setBuilderCopiedKey(key);
    setTimeout(() => setBuilderCopiedKey(""), 1200);
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
                Explore bulk GitHub links or build one precise link with markdown and badge outputs.
              </p>
            </div>
          </div>

          <div className="mt-6 inline-flex rounded-2xl border-4 border-zinc-900 bg-white p-1">
            <button
              onClick={() => handleModeChange("explorer")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                mode === "explorer" ? "bg-zinc-900 text-white" : "text-zinc-700"
              }`}
            >
              Explorer
            </button>
            <button
              onClick={() => handleModeChange("builder")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                mode === "builder" ? "bg-zinc-900 text-white" : "text-zinc-700"
              }`}
            >
              Builder
            </button>
          </div>
        </div>

        {mode === "explorer" ? (
          <>
            <div className="mb-8 rounded-3xl border-4 border-zinc-900 bg-white p-6 shadow-[8px_8px_0_0_#18181b]">
              <div className="grid gap-4 md:grid-cols-2">
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
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-bold">
                        {profileLinks.length}
                      </span>
                      <button
                        onClick={() => setProfileExpanded((current) => !current)}
                        className="rounded-xl border-2 border-zinc-900 px-3 py-1 text-xs font-semibold"
                      >
                        {profileExpanded ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  {profileExpanded ? (
                    <div className="grid gap-4">
                      {profileLinks.map((link) => (
                        <LinkCard key={link.url} label={link.label} url={link.url} />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-3xl border-4 border-dashed border-zinc-400 bg-white p-8 text-zinc-600">
                      Profile links are collapsed.
                    </div>
                  )}
                </section>

                <section>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-black">Repository links</h2>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border-2 border-zinc-900 bg-white px-3 py-1 text-xs font-bold">
                        {repoLinks.length}
                      </span>
                      <button
                        onClick={() => setRepoExpanded((current) => !current)}
                        className="rounded-xl border-2 border-zinc-900 px-3 py-1 text-xs font-semibold"
                      >
                        {repoExpanded ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                  {cleanRepo ? (
                    repoExpanded ? (
                      <div className="grid gap-4">
                        {repoLinks.map((link) => (
                          <LinkCard key={link.url} label={link.label} url={link.url} />
                        ))}
                      </div>
                    ) : (
                      <div className="rounded-3xl border-4 border-dashed border-zinc-400 bg-white p-8 text-zinc-600">
                        Repository links are collapsed.
                      </div>
                    )
                  ) : (
                    <div className="rounded-3xl border-4 border-dashed border-zinc-400 bg-white p-8 text-zinc-600">
                      Add a repository name to generate repo-specific links like Pulse, Issues, Releases, Branches, and
                      more.
                    </div>
                  )}
                </section>
              </div>
            )}
            <TestCasesPanel />
          </>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <section className="rounded-3xl border-4 border-zinc-900 bg-white p-6 shadow-[8px_8px_0_0_#18181b]">
              <h2 className="text-2xl font-black">Build link</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Choose a pattern and fill in its required fields. Input parsing supports usernames or full GitHub URLs.
              </p>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold">Link type</span>
                  <select
                    value={builderPattern}
                    onChange={(e) => {
                      setBuilderPattern(e.target.value);
                      setBuilderError("");
                    }}
                    className="w-full rounded-2xl border-4 border-zinc-900 bg-zinc-100 px-4 py-3 text-base outline-none"
                  >
                    {Object.entries(builderPatterns).map(([key, config]) => (
                      <option key={key} value={key}>
                        {config.label}
                      </option>
                    ))}
                  </select>
                </label>

                <p className="rounded-xl border-2 border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-700">
                  {selectedBuilderPattern?.note || ""}
                </p>

                {builderFieldOrder
                  .filter((field) => neededBuilderFields.has(field))
                  .map((field) => {
                    const meta = builderFieldMeta[field];
                    const isRequired = neededBuilderFields.has(field);
                    if (meta.type === "textarea") {
                      return (
                        <label key={field} className="block">
                          <span className="mb-2 block text-sm font-semibold">
                            {meta.label}
                            {isRequired ? " *" : ""}
                          </span>
                          <textarea
                            value={builderInputs[field]}
                            onChange={(e) => updateBuilderInput(field, e.target.value)}
                            placeholder={meta.placeholder}
                            className="min-h-28 w-full rounded-2xl border-4 border-zinc-900 bg-zinc-100 px-4 py-3 text-base outline-none placeholder:text-zinc-600"
                          />
                        </label>
                      );
                    }

                    return (
                      <label key={field} className="block">
                        <span className="mb-2 block text-sm font-semibold">
                          {meta.label}
                          {isRequired ? " *" : ""}
                        </span>
                        <input
                          value={builderInputs[field]}
                          onChange={(e) => updateBuilderInput(field, e.target.value)}
                          onBlur={() => {
                            if (field === "owner" || field === "repo") {
                              normalizeBuilderIdentityInputs(field);
                            }
                          }}
                          placeholder={meta.placeholder}
                          className="w-full rounded-2xl border-4 border-zinc-900 bg-zinc-100 px-4 py-3 text-base outline-none placeholder:text-zinc-600"
                        />
                      </label>
                    );
                  })}

                <div className="grid gap-4 md:grid-cols-3">
                  {["linkText", "badgeLabel", "badgeColor"].map((field) => {
                    const meta = builderFieldMeta[field];
                    return (
                      <label key={field} className="block">
                        <span className="mb-2 block text-sm font-semibold">{meta.label}</span>
                        <input
                          value={builderInputs[field]}
                          onChange={(e) => updateBuilderInput(field, e.target.value)}
                          placeholder={meta.placeholder}
                          className="w-full rounded-2xl border-4 border-zinc-900 bg-zinc-100 px-4 py-3 text-base outline-none placeholder:text-zinc-600"
                        />
                      </label>
                    );
                  })}
                </div>

                {builderError ? (
                  <p className="rounded-xl border-2 border-red-300 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                    {builderError}
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={generateBuilderOutputs}
                    className="inline-flex items-center gap-2 rounded-2xl border-4 border-zinc-900 bg-zinc-900 px-4 py-3 text-sm font-semibold text-white"
                  >
                    <SearchIcon size={16} />
                    Generate
                  </button>
                  <button
                    onClick={resetBuilder}
                    className="inline-flex items-center gap-2 rounded-2xl border-4 border-zinc-900 bg-white px-4 py-3 text-sm font-semibold"
                  >
                    Reset
                  </button>
                </div>

                <p className="text-xs text-zinc-500">
                  Builder fields are trimmed automatically with {`cleanInput()`} from shared utilities.
                </p>
              </div>
            </section>

            <section className="rounded-3xl border-4 border-zinc-900 bg-white p-6 shadow-[8px_8px_0_0_#18181b]">
              <h2 className="text-2xl font-black">Output</h2>
              <p className="mt-1 text-sm text-zinc-600">
                Copy the generated URL in the format you need for docs, READMEs, and GitHub comments.
              </p>

              <div className="mt-5 space-y-4">
                {[
                  { key: "plainUrl", label: "Plain URL", value: builderOutputs.plainUrl, textarea: false },
                  { key: "markdownLink", label: "Markdown Link", value: builderOutputs.markdownLink, textarea: true },
                  { key: "badgeMarkdown", label: "Badge Markdown", value: builderOutputs.badgeMarkdown, textarea: true },
                  { key: "htmlLink", label: "HTML Link/Button", value: builderOutputs.htmlLink, textarea: true },
                ].map((item) => (
                  <div key={item.key} className="rounded-2xl border-2 border-zinc-300 p-3">
                    <div className="mb-2 text-sm font-semibold">{item.label}</div>
                    {item.textarea ? (
                      <textarea
                        readOnly
                        value={item.value}
                        className="w-full rounded-xl border-2 border-zinc-300 bg-zinc-50 p-3 text-xs text-zinc-700"
                      />
                    ) : (
                      <input
                        readOnly
                        value={item.value}
                        className="w-full rounded-xl border-2 border-zinc-300 bg-zinc-50 p-3 text-xs text-zinc-700"
                      />
                    )}
                    <button
                      onClick={() => copyBuilderOutput(item.key, item.value)}
                      className="mt-2 inline-flex items-center gap-2 rounded-xl border-2 border-zinc-900 px-3 py-2 text-sm font-semibold"
                    >
                      <CopyIcon size={16} />
                      {builderCopiedKey === item.key ? "Copied" : "Copy"}
                    </button>
                  </div>
                ))}

                <div className="rounded-2xl border-2 border-zinc-300 p-4">
                  <div className="text-sm font-semibold">Preview</div>
                  <div className="mt-2 text-xs text-zinc-600">
                    Markdown badges do not render exactly like GitHub here, but the generated code is ready to paste.
                  </div>
                  <div className="mt-3">
                    <a
                      href={builderOutputs.previewUrl || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-xl border-2 border-zinc-900 px-3 py-2 text-sm font-semibold hover:bg-zinc-100"
                    >
                      {builderOutputs.previewText}
                    </a>
                  </div>
                  <div className="mt-3">
                    {builderOutputs.badgeUrl ? (
                      <a href={builderOutputs.previewUrl || "#"} target="_blank" rel="noreferrer">
                        <img src={builderOutputs.badgeUrl} alt={builderOutputs.badgeAlt} />
                      </a>
                    ) : (
                      <span className="text-xs text-zinc-500">Generate to preview badge output.</span>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
