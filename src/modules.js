#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const packageFolder = __dirname;

let lang = Intl.DateTimeFormat().resolvedOptions().locale;
lang = (lang === 'pt-BR' || lang === 'en-US')
  ? lang
  : 'en-US';

// locales object
const i18n = require(path.join(packageFolder, `locales/${lang}.json`));

// Modules object
const Nulla = {};

Nulla.getFiles = function(directory, Files) {

  fs.readdirSync(directory).forEach(file => {
    const absolute = path.join(directory, file);

    if (fs.statSync(absolute).isDirectory()) {
      return Nulla.getFiles(absolute, Files);
    } else {
      const isImage = absolute.includes('public') ? 'images' : 'files';
      const pathToTemplates = path.relative(
        path.join(packageFolder, "template"),
        absolute
      );

      return Files[isImage].push(pathToTemplates);
    }
  });

};

const Files  = { images: [], files: [] };
Nulla.getFiles(path.join(packageFolder, "template"), Files);

Nulla.contentReplacer = (content, name, value) => {
  return content.replace(new RegExp(`{{PROJECT_${name}}}`, 'g'), value);
};

const replaceLangs = (content) => {
  const langs = {
    'pt-BR': [ '', 'en-US', `pt-BR', 'en-US` ],
    'en-US': [ 'pt-BR', '', `en-US', 'pt-BR` ]
  };
  content = Nulla.contentReplacer(content, 'BRLINK', langs[lang][0]);
  content = Nulla.contentReplacer(content, 'USLINK', langs[lang][1]);
  content = Nulla.contentReplacer(content, 'LANGS', langs[lang][2]);
  return content;
};

Nulla.run = (names) => {
  const { projectSlug, projectName } = names;
  const projectPath = path.join(process.cwd(), projectSlug);

  fs.mkdirSync(projectPath);
  fs.mkdirSync(`${projectPath}/src`);
  fs.mkdirSync(`${projectPath}/src/locales`);
  fs.mkdirSync(`${projectPath}/public`);

  const srcFolder = 'vscode://file/' + (
    path.join(process.cwd(), `${projectSlug}/src`)
      .replace(/[\\]/g, '/')
  );

  for (const file of Files.files) {
    let content = fs.readFileSync(
      path.join(packageFolder, "template", file),
      'utf8'
    );
    content = Nulla.contentReplacer(content, 'NAME', projectName);
    content = Nulla.contentReplacer(content, 'SLUG', projectSlug);
    content = Nulla.contentReplacer(content, 'SRC', srcFolder);
    const target = path.join(projectPath, file.replace('_', '.'));
    if (file.indexOf('Home') > -1) {
      content = replaceLangs(content);
    }
    fs.writeFileSync(target, content);
  }

  for (const image of Files.images) {
    fs.copyFileSync(
      path.join(packageFolder, "template", image),
      path.join(projectPath, image)
    );
  }

  console.log(i18n.success.isReady.replace('{projectName}', projectName));
  console.log('\x1b[36m%s\x1b[0m', `cd ${projectSlug}`);
  console.log('\x1b[36m%s\x1b[0m', `npm install`);
  console.log(i18n.success.openEditor);
  console.log('\x1b[36m%s\x1b[0m', `npm start`);
};

Nulla.testName = (name) => {
  const isValid = !!name.match(new RegExp("^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$", 'g'));

  if (!isValid) {
    console.log(i18n.error.unvalidName);
    process.exit(0);
  }
  return isValid;
};

Nulla.storeNames = (name) => {
  const argName = name
    .split(' ')
    .filter(c => c.trim())
    .join(' ');

  const projectSlug = argName
    .replace(/[\s]/g, '-')
    .toLowerCase();
  Nulla.testName(projectSlug);

  const projectName = projectSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return { argName, projectSlug, projectName };
};

Nulla.errorHandler = (e) => {
  if (e.code === 'EEXIST') {
    console.log(i18n.error.alreadyExists);
  } else {
    console.log(i18n.error.default, e);
  }
};

Nulla.tryRun = (rl, name) => {
  try {
    rl.close();
    const names = Nulla.storeNames(name);
    Nulla.run(names);
  } catch (e) {
    Nulla.errorHandler(e);
  }
};

module.exports = { Nulla, i18n };
