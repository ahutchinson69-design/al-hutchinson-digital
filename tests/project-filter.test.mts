import assert from "node:assert/strict";
import test from "node:test";

import { projectMatchesCategory, projects } from "../data/projects.ts";

test("the AI filter includes every explicitly AI-focused project", () => {
  const aiProjectSlugs = projects
    .filter((project) => projectMatchesCategory(project, "AI"))
    .map((project) => project.slug);

  assert.deepEqual(aiProjectSlugs, [
    "hutchinson-careos-one",
    "ai-human-work-benchmark-map",
    "snf-ai-documentation-system",
    "hutchinson-healthcare-ai-model",
    "ai-career-resume-education",
  ]);
  assert.ok(!aiProjectSlugs.includes("moon-tape-radio"));
});
