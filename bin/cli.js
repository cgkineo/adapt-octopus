#!/usr/bin/env node
import path from 'path';
import Octopus from "../lib/Octopus.js";

async function run() {
  process.argv.length === 4 ?
    Octopus.run({ inputPath: path.resolve(process.argv[2]), id: process.argv[3], isCli: true }) : 
    Octopus.runRecursive({ cwd: path.resolve(process.argv[2]), isCli: true });
}

run();

