#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const packageFolder = __dirname;

// locales object
let $t = {};
let lang = 'en-US';
// Modules object
const $m  = {};

$m.getFiles = function(directory, Files) {

  fs.readdirSync(directory).forEach(file => {
    const absolute = path.join(directory, file);

    if (fs.statSync(absolute).isDirectory()) {
      return $m.getFiles(absolute, Files);
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
$m.getFiles(path.join(packageFolder, "template"), Files);

$m.contentReplacer = (content, name, value) => {
  return content.replace(new RegExp(`{{PROJECT_${name}}}`, 'g'), value);
};

const replaceLangs = (content) => {
  const langs = {
    'pt-BR': [ '', 'en-US', `pt-BR', 'en-US` ],
    'en-US': [ 'pt-BR', '', `en-US', 'pt-BR` ]
  };
  content = $m.contentReplacer(content, 'BRLINK', langs[lang][0]);
  content = $m.contentReplacer(content, 'USLINK', langs[lang][1]);
  content = $m.contentReplacer(content, 'LANGS', langs[lang][2]);
  return content;
};

$m.run = (names) => {
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
    content = $m.contentReplacer(content, 'NAME', projectName);
    content = $m.contentReplacer(content, 'SLUG', projectSlug);
    content = $m.contentReplacer(content, 'SRC', srcFolder);
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

  console.log($t.success.isReady.replace('{projectName}', projectName));
  console.log('\x1b[36m%s\x1b[0m', `cd ${projectSlug}`);
  console.log('\x1b[36m%s\x1b[0m', `npm install`);
  console.log($t.success.openEditor);
  console.log('\x1b[36m%s\x1b[0m', `npm start`);
};

$m.testName = (name) => {
  const isValid = !!name.match(new RegExp("^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$", 'g'));

  if (!isValid) {
    console.log($t.error.unvalidName);
    process.exit(0);
  }
  return isValid;
};

$m.storeNames = (name) => {
  const argName = name
    .split(' ')
    .filter(c => c.trim())
    .join(' ');

  const projectSlug = argName
    .replace(/[\s]/g, '-')
    .toLowerCase();
  $m.testName(projectSlug);

  const projectName = projectSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return { argName, projectSlug, projectName };
};

$m.errorHandler = (e) => {
  if (e.code === 'EEXIST') {
    console.log($t.error.alreadyExists);
  } else {
    console.log($t.error.default, e);
  }
};

$m.tryRun = (rl, name) => {
  try {
    rl.close();
    const names = $m.storeNames(name);
    $m.run(names);
  } catch (e) {
    $m.errorHandler(e);
  }
};

$m.getLanguage = async () => {
  lang = Intl.DateTimeFormat().resolvedOptions().locale;
  lang = lang === 'pt-BR' || lang === 'en-US'
    ? lang
    : 'en-US';

  $t = await require(path.join(packageFolder, `locales/${lang}.json`));
  return $t;
};

module.exports = $m;
