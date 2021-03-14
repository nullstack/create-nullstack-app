#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const packageFolder = __dirname;

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

}

const Files  = { images: [], files: [] };
$m.getFiles(path.join(packageFolder, "template"), Files);

$m.contentReplacer = (content, name, value) => {
  return content.replace(new RegExp(`{{PROJECT_${name}}}`, 'g'), value);
};

$m.run = (names) => {
  const { argName, projectSlug, projectName } = names;
  const projectPath = path.join(process.cwd(), argName);

  fs.mkdirSync(projectPath);
  fs.mkdirSync(`${projectPath}/src`);
  fs.mkdirSync(`${projectPath}/public`);

  for (const file of Files.files) {
    let content = fs.readFileSync(
      path.join(packageFolder, "template", file),
      'utf8'
    );
    content = $m.contentReplacer(content, 'NAME', projectName);
    content = $m.contentReplacer(content, 'SLUG', projectSlug);
    const target = path.join(projectPath, file.replace('_', '.'));
    fs.writeFileSync(target, content);
  }

  for (const image of Files.images) {
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

$m.testName = (name) => {
  const isValid = !!name.match(new RegExp("^(?:@[a-z0-9-*~][a-z0-9-*._~]*/)?[a-z0-9-~][a-z0-9-._~]*$", 'g'));

  if (!isValid) {
    console.log("Wait, looks like that's not a valid name, try again!");
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
}

$m.errorHandler = (e) => {
  if (e.code === 'EEXIST') {
    console.log('Wait, looks like that project already exists there!');
  } else {
    console.log('error:', e);
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

module.exports = $m;
