#! /usr/bin/env node

const { Nulla, i18n } = require('./src/modules');
const inquirer = require('inquirer');
const { program } = require('commander');
const { version } = require('./package.json');

program
  .name('create-nullstack-app')
  .version(version, '-v, --version', version)
  .option('-t, --template', "Select a template to use", false);

program.parse();

const { template } = program.opts();
const projectName = program.args.map(n => n.trim()).filter(n => n).join('_');

if (!projectName) {
  console.log(`${i18n.error.unvalidName}\n`);
  program.help();
}

inquirer.prompt([
  {
    type: 'list',
    name: 'template',
    message: i18n.template.questionName,
    choices: [
      i18n.template.blank,
      i18n.template.blankTs,
      i18n.template.tawild,
      i18n.template.tawildTs,
    ],
    when: () => template
  },
])
  .then((answers) => {
    let isTS = false;
    let isTailwind = false;

    switch (answers.template) {
      case i18n.template.blankTs:
        isTS = true;
        break;

      case i18n.template.tawild:
        isTailwind = true;
        break;

      case i18n.template.tawildTs:
        isTS = true;
        isTailwind = true;
        break;
    }

    Nulla.tryRun(projectName, isTS, isTailwind);
  });
