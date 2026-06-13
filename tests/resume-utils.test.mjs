import test from "node:test";
import assert from "node:assert/strict";

import {
  buildResumePdfFilename,
  buildResumePdfHref,
  formatResumeBuildTimestamp,
} from "../src/app/resume/utils.js";
import { RESUME_BUILD_TIMESTAMP } from "../src/lib/resume/build-info.js";

test("resume filename helpers produce filesystem-safe names", () => {
  const stamp = formatResumeBuildTimestamp(
    new Date("2026-06-13T14:05:00+07:00"),
  );

  assert.equal(stamp, "2026-06-13 14-05");
  assert.equal(
    buildResumePdfFilename(stamp, "ats"),
    "2026-06-13 14-05 - Moh Rizal Alfarizi.pdf",
  );
  assert.equal(
    buildResumePdfHref(stamp, "ori"),
    "/resume/ori/2026-06-13 14-05 - Moh Rizal Alfarizi.pdf",
  );
});

test("generated build stamp matches resume filename format", () => {
  assert.match(RESUME_BUILD_TIMESTAMP, /^\d{4}-\d{2}-\d{2} \d{2}-\d{2}$/);
  assert.equal(
    buildResumePdfFilename(RESUME_BUILD_TIMESTAMP, "ats"),
    `${RESUME_BUILD_TIMESTAMP} - Moh Rizal Alfarizi.pdf`,
  );
});
