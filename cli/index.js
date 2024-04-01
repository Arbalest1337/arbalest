#!/usr/bin/env node
import fs from 'fs'
import { Command } from 'commander'
import { createNewProject } from '../scripts/new.js'

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'))
const program = new Command()

program.name('Arbalest').description("Arbalest's cli").version(version)

program
    .command('new')
    .description('create a new project')
    .action(() => {
        createNewProject()
    })

program.parse()
