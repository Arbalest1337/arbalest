#!/usr/bin/env node

import { Command } from 'commander'
const program = new Command()
import { createNewProject } from '../scripts/new.js'

program.name('Arbalest').description("Arbalest's cli").version('0.1.0')

program
    .command('new')
    .description('create a new project')
    .action(() => {
        createNewProject()
    })

program.parse()
