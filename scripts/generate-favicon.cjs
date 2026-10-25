const fs = require("node:fs/promises");
const sharp = require("sharp");
async function main() {
  const png = await sharp("app/icon.svg").resize(256, 256).png().toBuffer();
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); // ICO
  header.writeUInt16LE(1, 4); // One PNG-backed entry
  header.writeUInt16LE(1, 10);
  header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14);
  header.writeUInt32LE(22, 18);
  await fs.writeFile("app/favicon.ico", Buffer.concat([header, png]));
  await sharp("app/icon.svg")
    .resize(180, 180)
    .png()
    .toFile("app/apple-icon.png");
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
