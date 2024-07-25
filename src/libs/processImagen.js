import { writeFile } from "fs/promises";
import path from "path";


export async function processImagen(imagen) {
  const bytes = await imagen.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", imagen.name);
  await writeFile(filePath, buffer);
  return filePath;
}
