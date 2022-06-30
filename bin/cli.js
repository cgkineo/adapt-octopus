#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import Octopus from "../lib/Octopus.js";


async function startRecursiveOctopus({ cwd }) {
  Promise.all(['components', 'extensions', 'menu', 'theme'].map(async f => {
    const rootDir = `${cwd}/src/${f}`;
    const contents = await fs.readdir(rootDir);

    return Promise.all(contents.map(async c => {
      const pluginDir = `${rootDir}/${c}`;
      const bowerJson = JSON.parse(await fs.readFile(`${pluginDir}/bower.json`));
      const inputId = bowerJson.component || bowerJson.extension || bowerJson.menu || bowerJson.theme;
      return startOctopus({ cwd: pluginDir, inputId });
    }));
  }));
}

async function startOctopus(opts) {
  try {
    const octopus = new Octopus({ inputPath: 'properties.schema', ...opts });
    await octopus.start();
  } catch(e) {
    console.error('error', e);
  }
}

async function run() {
  const opts = process.argv.length === 4 ?
    { inputPath: path.resolve(process.argv[2]), id: process.argv[3] } :
    { cwd: path.resolve(process.argv[2]) };

  opts.id ? 
    startOctopus(opts) :
    startRecursiveOctopus(opts);
}

run();

