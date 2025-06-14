import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Family from './src/Family.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, "build");

const allPath = path.join(buildDir, "all");
const allIndexPath = path.join(allPath, "index.html");
const newAllPath = path.join(buildDir, "all.html");

fs.renameSync(allIndexPath, newAllPath);
fs.rmdirSync(allPath, { recursive: true });

const xmasPath = path.join(buildDir, "xmas");
const xmasIndexPath = path.join(xmasPath, "index.html");
const newXmasPath = path.join(buildDir, "xmas.html");

fs.renameSync(xmasIndexPath, newXmasPath);
fs.rmdirSync(xmasPath, { recursive: true });

Family.forEach((member) => {
  const id = member.id.toString();
  const memberPath = path.join(buildDir, id);
  const indexPath = path.join(memberPath, "index.html");
  const newFilePath = path.join(buildDir, `${id}.html`);

  fs.renameSync(indexPath, newFilePath);
  fs.rmdirSync(memberPath, { recursive: true });
});

console.log("Post-build processing completed.");
