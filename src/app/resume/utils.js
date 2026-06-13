const RESUME_FILENAME_BASE = "Moh Rizal Alfarizi";
const RESUME_TIME_ZONE = "Asia/Jakarta";

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
 * @param {string} timestamp
 * @param {"ats" | "ori"} variant
 */
export function buildResumePdfFilename(timestamp, variant) {
  void variant;
  return `${timestamp} - ${RESUME_FILENAME_BASE}.pdf`;
}

/**
 * @param {string} timestamp
 * @param {"ats" | "ori"} variant
 */
export function buildResumePdfHref(timestamp, variant) {
  return `/resume/${variant}/${buildResumePdfFilename(timestamp, variant)}`;
}
