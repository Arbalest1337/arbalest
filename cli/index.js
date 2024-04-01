#!/usr/bin/env node

import data from '../package.json' assert { type: 'json' }
import { Command } from 'commander'
const program = new Command()
import { createNewProject } from '../scripts/new.js'

program.name('Arbalest').description("Arbalest's cli").version(data.version)

program
    .command('new')
    .description('create a new project')
    .action(() => {
        createNewProject()
    })

program.parse()
