#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const packageFolder = __dirname;

const files = [
  'package.json',
  'README.md',
  'src/Application.scss',
  'src/Application.njs',
  'index.js',
  '_gitignore'
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

const contentReplacer = (content, name, value) => {
  return content.replace(new RegExp(`{{PROJECT_${name}}}`, 'g'), value);
};

const testName = (name) => {
  const isValid = !!name.match(new RegExp("^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$", 'g'));

  if (!isValid) {
    console.log("Wait, looks like that's not a valid name, try again!");
    console.log(name);
    process.exit(0);
  }
};

const run = () => {
  const projectPath = path.join(process.cwd(), argName);

  fs.mkdirSync(projectPath);
  fs.mkdirSync(`${projectPath}/src`);
  fs.mkdirSync(`${projectPath}/public`);

  for (const file of files) {
    let content = fs.readFileSync(
      path.join(packageFolder, "template", file),
      'utf8'
    );
    content = contentReplacer(content, 'NAME', projectName);
    content = contentReplacer(content, 'SLUG', projectSlug);
    const target = path.join(projectPath, file.replace('_', '.'));
    fs.writeFileSync(target, content);
  }

  for (const image of images) {
    fs.copyFileSync(
      path.join(packageFolder, "template", image),
      path.join(projectPath, image)
    );
  }

  console.log(`Yay! Your Nullstack application '${projectName}' is ready... What should you do now?\n`);
  console.log('\x1b[36m%s\x1b[0m', `cd ${argName}`);
  console.log('\x1b[36m%s\x1b[0m', `npm install`);
  console.log(`Open your code editor before starting the server.`);
  console.log('\x1b[36m%s\x1b[0m', `npm start`);
}

const tryRun = (name) => {
  try {
    storeNames(name);
    rl.close();
    run();
  } catch (e) {
    if (e.code === 'EEXIST') {
      console.log('Wait, looks like that project already exists there!');
    } else {
      console.log('error:', e);
    }
  }
}

const storeNames = (name) => {
  argName = name
    .split(' ')
    .filter(c => c.trim())
    .join(' ');

  projectSlug = argName
    .replace(/[\s]/g, '-')
    .toLowerCase();
  testName(projectSlug);

  projectName = projectSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

let projectSlug = '';
let projectName = '';
let argName = process.argv.slice(2).join(' ');

if (!argName) {
  rl.question("Project Name: ", tryRun);
} else {
  tryRun(argName);
}
