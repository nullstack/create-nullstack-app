#! /usr/bin/env node

const $m = require('./src/modules');

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tryNameRun = (name) => $m.tryRun(rl, name);

let argName = process.argv.slice(2).join(' ');

if (!argName) {
  rl.question("Project Name: ", tryNameRun);
} else {
  tryNameRun(argName);
}
