import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

function read(relativePath) {
  return fs.readFileSync(new URL(`../${relativePath}`, import.meta.url), "utf8");
}

test("homepage copy matches the premium positioning", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /Building/);
  assert.match(page, /thoughtful software/);
  assert.match(page, /real-world use/);
  assert.match(page, /I work across product, frontend, backend, and delivery to build/);
  assert.match(page, /clear, reliable, and useful under real constraints/);
  assert.match(page, /Recent/);
  assert.match(page, /Writing/);
  assert.match(page, /Selected/);
  assert.match(page, /Work/);
  assert.match(page, /Browse writing/);
  assert.match(page, /Browse projects/);
  assert.doesNotMatch(page, /Hey there/);
  assert.doesNotMatch(page, /Cat lover/);
  assert.doesNotMatch(page, /24 years old/);
});

test("supporting pages avoid casual emoji-led framing", () => {
  const blogPage = read("src/app/blog/page.tsx");
  const projectPage = read("src/app/project/page.tsx");
  const contactPage = read("src/app/contact/page.tsx");
  const tagPage = read("src/app/tag/page.tsx");
  const tagDetailPage = read("src/app/tag/[tag]/page.tsx");
  const techPage = read("src/app/tech/page.tsx");
  const layout = read("src/app/layout.tsx");
  const projectShared = read("src/app/project/shared.ts");
  const projectList = read("src/app/project/_components/Projects.tsx");
  const blogList = read("src/app/blog/_components/Blog.tsx");
  const projectDetail = read("src/app/project/[...slug]/page.tsx");
  const blogDetail = read("src/app/blog/[...slug]/page.tsx");
  const personalWebsiteProject = read(
    "public/content/project/personal-website/index.mdx",
  );

  assert.match(blogPage, /Writing/);
  assert.match(
    blogPage,
    /Essays, notes, and occasional experiments on software, tools, and the tradeoffs behind both\./,
  );
  assert.doesNotMatch(blogPage, /✍️|🚀|✨/);

  assert.doesNotMatch(projectPage, /🏗️/);
  assert.doesNotMatch(contactPage, /🫱🏼‍🫲🏽/);
  assert.match(tagPage, /Topics/);
  assert.match(tagDetailPage, /Tag: /);
  assert.doesNotMatch(tagPage, /🎯/);
  assert.match(techPage, /Tools/);
  assert.doesNotMatch(techPage, /🧰/);
  assert.doesNotMatch(layout, /Personal Website/);
  assert.doesNotMatch(layout, /CTO Ozone/);
  assert.doesNotMatch(layout, /\bOzone\b/);
  assert.doesNotMatch(projectShared, /Personal Website/);
  assert.doesNotMatch(personalWebsiteProject, /Personal Website/);
  assert.match(projectList, /Open project/);
  assert.match(projectList, /View details/);
  assert.match(blogList, /Open article/);
  assert.match(projectDetail, /Back to projects/);
  assert.match(projectDetail, /Live site:/);
  assert.match(projectDetail, /Repository:/);
  assert.match(blogDetail, /Back to writing/);
  assert.match(blogDetail, /More writing/);
  assert.match(tagDetailPage, /Source:/);
  assert.match(tagDetailPage, /the full topic index/);
});

test("metadata reflects the new positioning", () => {
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /thoughtful software/i);
  assert.match(layout, /real-world use/i);
  assert.match(layout, /engineering work/i);
});

test("experience copy reflects the updated Oriskin role", () => {
  const experienceData = read("src/app/experience/data.ts");
  assert.match(experienceData, /Freelance Fullstack Developer/);
  assert.match(experienceData, /Freelance Technical Lead/);
  assert.match(experienceData, /Freelance Frontend Developer/);
  assert.match(experienceData, /Feb 2025 to Mar 2026/);
  assert.doesNotMatch(
    experienceData,
    /Senior Fullstack Engineer, Development Team Lead/,
  );
  assert.doesNotMatch(experienceData, /Leading engineers across four production servers/);
  assert.match(experienceData, /companyHref/);
  assert.match(experienceData, /companyLogo/);
  assert.match(experienceData, /https:\/\/oriskin\.co\.id/);
  assert.match(experienceData, /https:\/\/jogiia\.id/);
  assert.match(experienceData, /https:\/\/datains\.id/);
  assert.match(experienceData, /https:\/\/ecc\.co\.id\/company\/site\/view\/168369/);
  assert.match(experienceData, /\/images\/company-logos\/oriskin\.png/);
  assert.match(experienceData, /\/images\/company-logos\/jogiia\.png/);
  assert.match(experienceData, /\/images\/company-logos\/datains\.png/);
  assert.match(experienceData, /\/images\/company-logos\/nanosense\.png/);
});

test("public role labels consistently reference freelance work", () => {
  const experienceData = read("src/app/experience/data.ts");
  const resumeData = read("src/app/resume/data.ts");
  const projectContent = fs
    .readdirSync(new URL("../public/content/project", import.meta.url), {
      withFileTypes: true,
    })
    .filter((entry) => entry.isDirectory())
    .map((entry) => read(`public/content/project/${entry.name}/index.mdx`))
    .join("\n");

  for (const role of experienceData.matchAll(/role: "([^"]+)"/g)) {
    assert.match(role[1], /Freelance/);
  }

  for (const position of projectContent.matchAll(/^position: (.+)$/gm)) {
    assert.match(position[1], /Freelance/);
  }

  assert.match(resumeData, /title: "Freelance Fullstack Engineer"/);
  assert.match(resumeData, /Freelance fullstack engineer/);
});

test("experience entries render company identity rows", () => {
  const experiencePage = read("src/app/experience/page.tsx");
  assert.match(experiencePage, /next\/image/);
  assert.match(experiencePage, /target="_blank"/);
  assert.match(experiencePage, /rel="noreferrer noopener"/);
  assert.match(experiencePage, /aria-label={`Visit \$\{experience\.company\}`}/);
  assert.match(experiencePage, /experience\.companyLogo/);
  assert.match(experiencePage, /alt={`\$\{experience\.company\} logo`}/);
  assert.match(experiencePage, /rounded-md border border-primary\/10/);
  assert.match(experiencePage, /{experience\.company}/);
});

test("organization copy is publicly exposed", () => {
  const navbar = read("src/app/_components/Navbar/shared.tsx");
  const sitemap = read("src/app/sitemap.ts");
  const homePage = read("src/app/page.tsx");
  const organizationPage = read("src/app/organization/page.tsx");
  const organizationData = read("src/app/organization/data.ts");

  assert.match(navbar, /label: "Organization"/);
  assert.match(sitemap, /generateUrl\("\/organization"\)/);
  assert.match(homePage, /Organization/);
  assert.match(homePage, /Vandor/);
  assert.match(organizationPage, /Vandor/);
  assert.match(organizationData, /vx/);
  assert.match(organizationData, /vxt/);
  assert.match(organizationData, /vpkg/);
});
