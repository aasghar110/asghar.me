// Pinned sources make logo refreshes reviewable; no runtime requests to vendors.
const { writeFile } = require("node:fs/promises");
const { optimize } = require("svgo");
const sharp = require("sharp");
const devicon =
  "https://raw.githubusercontent.com/devicons/devicon/32fe1d3b3f36ad11f90ab94f7db59738139c2bf6";
const simpleIcons =
  "https://raw.githubusercontent.com/simple-icons/simple-icons/17cd4ee07612198a1d8777a060d4100423762a8b";

async function get(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok)
    throw new Error(`Logo source returned ${response.status}: ${url}`);
  return response;
}

async function saveSvg(name, source) {
  if (
    !source.includes("<svg") ||
    /<script|<foreignObject|\bon\w+\s*=|(?:href|src)=["'](?:https?:|\/\/|data:)/i.test(
      source,
    )
  ) {
    throw new Error(`Unexpected SVG content: ${name}`);
  }
  const result = optimize(source, {
    multipass: true,
    plugins: ["preset-default", "removeDimensions"],
  });
  const bytes = Buffer.byteLength(result.data);
  if (bytes > 8000) throw new Error(`Logo exceeds 8 KB budget: ${name}`);
  await writeFile(`public/icons/${name}.svg`, result.data + "\n");
  console.log(`${name}.svg: ${bytes} bytes`);
}

async function refresh() {
  const originals = [
    ["nodedotjs", "nodejs/nodejs-original.svg"],
    ["react", "react/react-original.svg"],
    ["nextdotjs", "nextjs/nextjs-original.svg"],
    ["angular", "angular/angular-original.svg"],
    ["supabase", "supabase/supabase-original.svg"],
    ["aws", "amazonwebservices/amazonwebservices-original.svg"],
    ["azure", "azure/azure-original.svg"],
  ];
  for (const [name, file] of originals) {
    await saveSvg(name, await (await get(`${devicon}/icons/${file}`)).text());
  }
  for (const [name, color] of [
    ["dotnet", "512BD4"],
    ["springboot", "6DB33F"],
    ["umbraco", "3544B1"],
  ]) {
    let source = await (await get(`${simpleIcons}/icons/${name}.svg`)).text();
    source = source.replace("<svg ", `<svg fill="#${color}" `);
    await saveSvg(name, source);
  }
  const progress = await (
    await get("https://www.progress.com/sitefinity-cms")
  ).text();
  const glyph = progress.match(/<path class="PRGS-branding-shape" d="([^"]+)"/);
  if (!glyph) throw new Error("Official Progress Sitefinity glyph not found");
  await saveSvg(
    "sitefinity",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 103"><path fill="#5ce500" d="${glyph[1]}"/></svg>`,
  );
  const oracle = Buffer.from(
    await (
      await get("https://www.oracle.com/asset/web/favicons/favicon-32.png")
    ).arrayBuffer(),
  );
  const oraclePng = await sharp(oracle)
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
  await writeFile("public/icons/oci.png", oraclePng);
  console.log(`oci.png: ${oraclePng.length} bytes`);
  await writeFile(
    "public/icons/DEVICON-LICENSE",
    await (await get(`${devicon}/LICENSE`)).text(),
  );
}

module.exports = refresh;
if (require.main === module)
  refresh().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
