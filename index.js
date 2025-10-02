#! /usr/bin/env node

const { Nulla, i18n } = require('./src/modules');
const inquirer = require('inquirer');
const { program } = require('commander');
const { version } = require('./package.json');

program
  .name('create-nullstack-app')
  .version(version, '-v, --version', version)

program.parse();

let projectName = program.args.map(n => n.trim()).filter(n => n).join('_');

inquirer.prompt([
  {
    type: 'input',
    name: 'projectName',
    message: i18n.questionName,
    when: () => !projectName
  },
  {
    type: 'list',
    name: 'template',
    message: i18n.template.questionName,
    choices: [
      i18n.template.blank,
      i18n.template.blankTs,
      i18n.template.tawild,
      i18n.template.tawildv4,
      i18n.template.tawildTs,
      i18n.template.tawildv4Ts,
    ],
  },
])
  .then((answers) => {
    let isTS = false;
    let isTailwind = false;
    let tailwindVersion = 'v3'


    switch (answers.template) {
      case i18n.template.blankTs:
        isTS = true;
        break;

      case i18n.template.tawild:
        isTailwind = true;
        break;

      case i18n.template.tawildv4:
          isTailwind = true;
          tailwindVersion = "v4";
          break;

      case i18n.template.tawildTs:
        isTS = true;
        isTailwind = true;
        tailwindVersion = 'v3'
        break;

      case i18n.template.tawildv4Ts:
        isTS = true;
        isTailwind = true;
        tailwindVersion = 'v4';
        break;
    }

    projectName = (projectName || answers.projectName).replace(/ /g, '_').trim();

    Nulla.tryRun(projectName, isTS, isTailwind, tailwindVersion);
  });
