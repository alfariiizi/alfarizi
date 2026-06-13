const RESUME_FILENAME_BASE = "Moh Rizal Alfarizi";
const RESUME_TIME_ZONE = "Asia/Jakarta";
const RESUME_VARIANT_SEGMENT = {
  full: "",
  compact: "-1page",
};
const RESUME_FILENAME_SEGMENT = {
  ats: "ats-friendly",
  ori: "original",
};

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatResumeBuildTimestamp(date) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: RESUME_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date).reduce(
    (acc, part) => {
      if (part.type !== "literal") {
        acc[part.type] = part.value;
      }
      return acc;
    },
    /** @type {Record<string, string>} */ ({}),
  );

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}-${parts.minute}`;
}

/**
 * @param {"ats" | "ori"} type
 * @returns {string}
 */
export function buildResumePdfFilename(type) {
  return `resume-${RESUME_FILENAME_SEGMENT[type]}-${RESUME_FILENAME_BASE.toLowerCase().replaceAll(" ", "-")}.pdf`;
}

/**
 * @param {"ats" | "ori"} variant
 * @param {"full" | "compact"} [length]
 */
export function buildResumePdfHref(variant, length = "full") {
  return `/resume/${variant}${RESUME_VARIANT_SEGMENT[length]}/${buildResumePdfFilename(variant)}`;
}

/**
 * @param {"ats" | "ori"} variant
 * @param {"full" | "compact"} [length]
 */
export function buildResumePdfRouteSegment(variant, length = "full") {
  return `${variant}${RESUME_VARIANT_SEGMENT[length]}`;
}
