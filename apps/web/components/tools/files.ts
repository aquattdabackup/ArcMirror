export async function readLocalFile(
  file: File,
  maxBytes: number,
): Promise<string> {
  if (file.size > maxBytes)
    throw Error(`File is too large (limit ${Math.floor(maxBytes / 1000)} KB).`);
  return file.text();
}
