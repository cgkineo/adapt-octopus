#!/usr/bin/env node
import path from 'path';
import Octopus from "../lib/Octopus.js";

async function run() {
  const opts = { cwd: path.resolve(process.argv[2]), inputId: process.argv[3] };
  process.argv.length === 4 ?
    await Octopus.run(opts) :
    await Octopus.runRecursive(opts);
}

run();