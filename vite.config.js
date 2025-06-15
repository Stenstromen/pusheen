import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs";
import { minify } from "html-minifier-terser";
import Family from "./src/Family.js";

// Helper function to create family member HTML
const createFamilyMemberHtml = (member, cssPath, jsPath) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/pusheen-cat.png" />
    <meta property="og:image" content="/pusheen-cat.png" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffefc4" />
    <meta name="description" content="Pusheen Family - ${member.name}" />
    <link rel="apple-touch-icon" href="/pusheen-cat.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>${member.name} | Pusheen Family</title>
    <script type="module" crossorigin src="${jsPath}"></script>
    <link rel="stylesheet" crossorigin href="${cssPath}">
    <meta property="og:title" content="${member.name} | Pusheen Family" />
    <meta property="og:description" content="${member.role}" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
        <div>
          <div>
            <h1>${member.name} &lt;3 &lt;3 &lt;3</h1>
          </div>
          <div>
            <img width="800px" alt="fam/${member.image}" src="fam/${member.image}">
          </div>
          <p style="font-size: 19px; font-weight: bold;">${member.role}</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

// Helper function to create the all family members HTML
const createAllFamilyHtml = (cssPath, jsPath) => {
  const familyHtml = Family.map(
    (member) => `
    <div>
      <div>
        <h1>${member.name} &lt;3 &lt;3 &lt;3</h1>
      </div>
      <div>
        <img width="800px" alt="fam/${member.image}" src="fam/${member.image}">
      </div>
      <p style="font-size: 19px; font-weight: bold;">${member.role}</p>
    </div>
  `
  ).join("");

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/pusheen-cat.png" />
    <meta property="og:image" content="/pusheen-cat.png" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffefc4" />
    <meta name="description" content="Meet the Pusheen Family!" />
    <link rel="apple-touch-icon" href="/pusheen-cat.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>All Family Members | Pusheen Family</title>
    <script type="module" crossorigin src="${jsPath}"></script>
    <link rel="stylesheet" crossorigin href="${cssPath}">
    <meta property="og:title" content="All Family Members | Pusheen Family" />
    <meta property="og:description" content="Meet all the members of the Pusheen Family" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
        ${familyHtml}
      </div>
    </div>
  </body>
</html>`;
};

// Helper function to create the xmas page HTML
const createXmasHtml = (cssPath, jsPath) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/pusheen-cat.png" />
    <meta property="og:image" content="/pusheen-cat.png" />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffefc4" />
    <meta name="description" content="Pusheen Christmas Special!" />
    <link rel="apple-touch-icon" href="/pusheen-cat.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>Christmas Special | Pusheen Family</title>
    <script type="module" crossorigin src="${jsPath}"></script>
    <link rel="stylesheet" crossorigin href="${cssPath}">
    <meta property="og:title" content="Christmas Special | Pusheen Family" />
    <meta property="og:description" content="Pusheen Christmas Special!" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
        <div>
          <div>
            <h1>Xmas Kitty &lt;3 &lt;3 &lt;3</h1>
          </div>
          <div>
            <img width="800px" alt="fam/xmaskitty.webp" src="fam/xmaskitty.webp">
          </div>
          <p style="font-size: 19px; font-weight: bold;">Christmas Special</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
};

// Helper function to minify HTML
const minifyHtml = (html) => {
  return minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: true,
  });
};

// Function to find asset paths in the build directory
const findAssetPaths = (buildDir) => {
  try {
    const assetsDir = resolve(buildDir, "assets");
    const files = fs.readdirSync(assetsDir);

    const cssFile = files.find((file) => file.endsWith(".css"));
    const jsFile = files.find((file) => file.endsWith(".js"));

    return {
      cssPath: cssFile ? `/assets/${cssFile}` : "",
      jsPath: jsFile ? `/assets/${jsFile}` : "",
    };
  } catch (err) {
    console.error("Error finding asset paths:", err);
    return { cssPath: "", jsPath: "" };
  }
};

export default defineConfig(({ command, mode }) => {
  // Check if we're running in test mode
  const isTest = mode === "test";

  // Only include the pre-rendering plugin if not in test mode
  const plugins = [react()];

  if (!isTest) {
    plugins.push({
      name: "generate-prerendered-files",
      closeBundle: {
        sequential: true,
        order: "post",
        handler: async () => {
          try {
            const buildDir = resolve(__dirname, "build");
            const { cssPath, jsPath } = findAssetPaths(buildDir);

            console.log(`Found asset paths - CSS: ${cssPath}, JS: ${jsPath}`);

            // Create individual family member pages
            for (const member of Family) {
              const content = createFamilyMemberHtml(member, cssPath, jsPath);
              const minified = await minifyHtml(content);
              fs.writeFileSync(
                resolve(buildDir, `${member.id}.html`),
                minified
              );
              console.log(
                `Created pre-rendered ${member.id}.html for ${member.name}`
              );
            }

            // Create all family members page
            const allContent = createAllFamilyHtml(cssPath, jsPath);
            const minifiedAll = await minifyHtml(allContent);
            fs.writeFileSync(resolve(buildDir, "all.html"), minifiedAll);
            console.log(`Created pre-rendered all.html`);

            // Create xmas page
            const xmasContent = createXmasHtml(cssPath, jsPath);
            const minifiedXmas = await minifyHtml(xmasContent);
            fs.writeFileSync(resolve(buildDir, "xmas.html"), minifiedXmas);
            console.log(`Created pre-rendered xmas.html`);
          } catch (err) {
            console.error("Error in prerendering plugin:", err);
          }
        },
      },
    });
  }

  return {
    build: {
      outDir: "build",
      emptyOutDir: true,
    },
    plugins,
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/setupTests.js"],
      environmentOptions: {
        jsdom: {
          logLevel: "silent",
        },
      },
    },
  };
});
