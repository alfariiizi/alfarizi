/**
 * @param {string | undefined} assetDirectory
 * @param {string} filename
 */
export function generateMdxAssetPath(assetDirectory, filename) {
  if (!assetDirectory) {
    return filename;
  }

  const normalizedDirectory = assetDirectory.replace(/\/+$/, "");
  const normalizedFilename = filename.replace(/^\/+/, "");

  return `${normalizedDirectory}/${normalizedFilename}`;
}
