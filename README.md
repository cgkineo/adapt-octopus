# adapt-octopus

Utility for converting old Adapt schema from the non-conformant `properties.schema` style into the new conformant JSON schema format.

## Command-line

The utility can be used directly from a command line. See below for details.

### Installation

Note: requires [Node.js](http://nodejs.org) to be installed.

From the command line, run:

```console
npm install -g adapt-security/adapt-octopus
```

## Usage

To convert a single schema, simply run the following:
```console
adapt-octopus <inputPath> <id>
```
* ID should match the value of the _component/extension/menu/theme_ attribute in a plugin’s bower.json.

To convert all schemas in a framework source repository, run:
```console
adapt-octopus <inputPath>
```

## Programmatic

The utility also exports a Node.js API for use programatically. 

```js
import octopus from 'adapt-security/adapt-octopus'
// to run for a single schema, use the following (returns a promise)
octopus.run(options);
// to run for multiple schemas, use the following (returns a promise)
octopus.runRecursive(options);
```

### Options
The following options can be passed to the run functions:
- **cwd**: the current working directory (used when searching and writing files)
- **inputPath**: _required when calling `run`_ should be the path to the input schema
- **inputId**: _required when calling `run`_ the type of the schema being converted (accepted values: `component`, `extension`, `menu`, `theme)
- **logger**: an instance to a logger to be used when logging status messages (must export a `log` function)
