export async function readLocalFile(
  file: File,
  maxBytes: number,
): Promise<string> {
  if (file.size > maxBytes)
    throw Error(`File is too large (limit ${Math.floor(maxBytes / 1000)} KB).`);
  return file.text();
}
export function downloadJson(value: unknown, filename: string) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2) + "\n"], {
      type: "application/json",
    }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
