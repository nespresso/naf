[![Build Status](https://travis-ci.org/nespresso/ntaf.svg?branch=master)](https://travis-ci.org/nespresso/ntaf)
[![Quality Gate status](https://sonarqube.com/api/badges/gate?key=ntaf)](https://sonarqube.com/dashboard/index/natf)
[![npm version](https://badge.fury.io/js/ntaf.svg)](https://badge.fury.io/js/ntaf)

# Nestle Test Automation Framework (NTAF)

## Integrating NTAF to Your Project

### Prerequisites
1. Install Node.js v4.4.7 or greater (make sure npm comes with it).


### Adding NTAF Package and Configuration to Your Project
1. Create a new folder <AUTOMATED_TESTS> in your project to host your automated tests.
2. Add a `package.json` file into <AUTOMATED_TESTS> based on the below model:
```
{
    "name": "my-automated-tests",
    "version": "1.0.0",
    "dependencies": {
      "ntaf": "X.X.X",
    },
    "scripts": {
      "clean": "grunt clean",
      "generate-local-conf": "grunt copy:generateLocalConf",
      "prepare": "grunt prepare",
      "test": "grunt test-functional",
      "test-local": "grunt test-functional-local",
      "test-debug": "grunt test-functional-debug",
      "test-unit": "node --harmony_rest_parameters ./node_modules/.bin/grunt test-unit",
      "test-unit-with-coverage": "node --harmony_rest_parameters ./node_modules/.bin/grunt test-unit-with-coverage"
    },
    ...
}    
```
3. Install the project dependencies by running the following command from <AUTOMATED_TESTS>: `npm install`. It creates a `node_modules` directory containing all the dependencies needed to run the project.
4. From <AUTOMATED_TESTS>, run `./node_modules/.bin/ntaf install` to generate the skeleton of your test project.

### Behind a Proxy
Set the configuration of your proxy by editing the `.npmrc` file in your home directory:
```
proxy=http://localhost:3128
https-proxy=http://localhost:3128
```


## Running Tests
Run `npm run test` to launch the tests as they would be played remotely.
By default it runs all the tests tagged as `@nrt`.

Run command line `npm run test-local` to run the tests with your local configuration.

### Configuration
The global configuration is set in the `wdio.conf.js` file in the root folder of your project.

The local configuration is set in the `wdio.local.conf.js`. This local configuration can be reset by running `npm run generate-local-conf`.

### Parameters
To pass parameters to the command, add `--`: `npm run test -- --parameter1=value1`

If you are running Node.js 6 or greater, you might need to remove occurrences of `--harmony_rest_parameters` from 
`wdio.conf.js` and `package.json`.

#### URL of the Website to Test
Add command line parameter `--baseUrl="https://base.url"` or update the wdio configuration file accordingly.

#### Running a Subset of Tests Using Tags
Add command line parameter `--tags='@tag'`.
You can add several tags separated by commas such as `--tags='@tag1,@tag2'`. It will run tests with tags `@tag1` and `@tag2`.
You can also add negation with `~` such as`--tags='@tag1,~@tag2'`. It will tests with tag `@tag1` but not `@tag2`.

For example, to run NRT tests from the catalog domain on mywebsite.com:
`npm run test -- --baseUrl="https://mywebsite.com" --tags='@nrt,@catalog'`


## Running Tests in Debug Mode

### Initial Configuration

#### Installing node-inspector
1. Install `node-inspector`: `npm install -g node-inspector`

#### Setting Configuration in IntelliJ
1. Go to Run > Edit Configurations...
1. Add New Configuration > Node.js Remote Debug and fill in details as follows:
![alt text](https://raw.githubusercontent.com/nespresso/ntaf/master/template/doc/resources/intellij-debug-configuration.png "Name: My Node.js Remote Debug / Host: 127.0.0.1 / Port: 5859")

### Running Tests
1. In a terminal, run `node-inspector`. The following should be printed:
`Node Inspector v0.12.8
 Visit http://127.0.0.1:8080/?port=5858 to start debugging.
`
1. In IntelliJ, Run > Debug 'My Node.js Remote Debug'
1. In IntelliJ, add breakpoints to your code
1. In a terminal, run `npm run test-debug` (usually targeting a single test: `npm run test-debug -- --tags='@mytest'`)
1. Once the first breakpoint is reached, use standard IntelliJ Debug window to move forward and debug.


## Writing Automated Tests
Read detailed explanations in [Framework.md](https://github.com/nespresso/ntaf/blob/master/template/doc/Framework.md).
