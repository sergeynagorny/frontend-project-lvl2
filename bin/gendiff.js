#!/usr/bin/env node
import { program } from "commander";

program
    .description('Compares two configuration files and shows a difference')
    .version('0.0.1', '-v, --version', 'output the current version')
    .parse(process.argv);
