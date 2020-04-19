#! /usr/bin/env node

const fs = require('fs');

const packageFolder = process.argv[1].replace('index.js', '');
const projectName = process.argv[2];

const projectFolder = projectName.split(/(?=[A-Z])/).join('_').toLowerCase();

const files = [
  'package.json',
  'README.md',
  'src/index.js',
  'src/index.css',
  'public/manifest.json',
  'public/worker.js',
  'public/icon-72x72.png',
  'public/icon-96x96.png',
  'public/icon-128x128.png',
  'public/icon-144x144.png',
  'public/icon-152x152.png',
  'public/icon-192x192.png',
  'public/icon-384x384.png',
  'public/icon-512x512.png'
]

fs.mkdirSync(projectFolder);
fs.mkdirSync(`${projectFolder}/src`);
fs.mkdirSync(`${projectFolder}/public`);

for(const file of files) {
  let content = fs.readFileSync(`${packageFolder}template/${file}`, "utf8");
  content = content.replace(new RegExp("{{PROJECT_NAME}}", "g"), projectName);
  content = content.replace(new RegExp("{{PROJECT_SLUG}}", "g"), projectFolder);
  fs.writeFileSync(`${projectFolder}/${file}`, content);
}

console.log(`Your Nullstack application is ready at "${projectFolder}"`);