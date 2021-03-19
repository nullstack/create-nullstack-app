#! /usr/bin/env node

const { Nulla, i18n } = require('./src/modules');

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tryNameRun = (name) => Nulla.tryRun(rl, name);

let argName = process.argv.slice(2).join(' ');

if (!argName) {
  rl.question(i18n.questionName, tryNameRun);
} else {
  tryNameRun(argName);
}
