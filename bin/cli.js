#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import Octopus from "../lib/Octopus.js";


async function startRecursiveOctopus(arg) {
  const cwd = path.resolve(arg);

  Promise.all(['components', 'extensions', 'menu', 'theme'].map(async f => {
    const rootDir = `${cwd}/src/${f}`;
    const contents = await fs.readdir(rootDir);

    return Promise.all(contents.map(async c => {
      const pluginDir = `${rootDir}/${c}`;
      const bowerJson = JSON.parse(await fs.readFile(`${pluginDir}/bower.json`));
      const id = bowerJson.component || bowerJson.extension || bowerJson.menu || bowerJson.theme;
      return startOctopus(id, pluginDir);
    }));
  }));
}

async function startOctopus(inputId, cwd, inputPath = 'properties.schema') {
  try {
    const octopus = new Octopus({ cwd, inputPath, inputId });
    await octopus.start();
  } catch(e) {
    console.error('error', e);
  }
}

async function run() {
  process.argv.length === 4 ? 
    startOctopus(process.argv[3], process.argv[2]) :
    startRecursiveOctopus(process.argv[2]);
}

run();

