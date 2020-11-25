#! /usr/bin/env node

const fs = require('fs');

const packageFolder = process.argv[1].replace('index.js', '');
const projectFolder = process.argv[2];

if(!projectFolder) {
  console.log('You must pick a project name by running the following command:');
  console.log('\x1b[31m%s\x1b[0m', `npx create-nullstack-app project-name`);
  process.exit();
}

const projectName = projectFolder.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const files = [
  'package.json',
  'README.md',
  'src/Application.css',
  'src/Application.njs',
  'index.js'
]

const images = [
  'public/image-1200x630.png',
  'public/favicon-96x96.png',
  'public/icon-72x72.png',
  'public/icon-96x96.png',
  'public/icon-128x128.png',
  'public/icon-144x144.png',
  'public/icon-152x152.png',
  'public/icon-180x180.png',
  'public/icon-192x192.png',
  'public/icon-384x384.png',
  'public/icon-512x512.png'
]

fs.mkdirSync(projectFolder);
fs.mkdirSync(`${projectFolder}/src`);
fs.mkdirSync(`${projectFolder}/public`);

for(const file of files) {
  let content = fs.readFileSync(`${packageFolder}template/${file}`, 'utf8');
  content = content.replace(new RegExp('{{PROJECT_NAME}}', 'g'), projectName);
  content = content.replace(new RegExp('{{PROJECT_SLUG}}', 'g'), projectFolder);
  fs.writeFileSync(`${projectFolder}/${file}`, content);
}

for(const image of images) {
  fs.copyFileSync(`${packageFolder}template/${image}`, `${projectFolder}/${image}`);
}

console.log(`Yay! Your Nullstack application is ready... What should you do now?`);
console.log('\x1b[36m%s\x1b[0m', `cd ${projectFolder}`);
console.log('\x1b[36m%s\x1b[0m', `npm install`);
console.log(`Open your code editor before starting the server.`);
console.log('\x1b[36m%s\x1b[0m', `npm start`);