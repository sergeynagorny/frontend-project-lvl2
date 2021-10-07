#!/usr/bin/env node
import { program } from "commander";
import genDiff from "../src/gendiff.js";

program
    .argument('<first-file>', 'first file')
    .argument('<second-file>', 'second file')
    .action((ff, sf) => {
        console.log(genDiff(ff, sf))
    })

program
    .description('Compares two configuration files and shows a difference')
    .version('0.0.1', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format')
    .helpOption('-h, --help', 'output usage information')
    .parse(process.argv);
