#!/usr/bin/env node

import { version } from '../package.json'
import { Command } from 'commander'
const program = new Command()
import { createNewProject } from '../scripts/new.js'

program.name('Arbalest').description("Arbalest's cli").version(version)

program
    .command('new')
    .description('create a new project')
    .action(() => {
        createNewProject()
    })

program.parse()
