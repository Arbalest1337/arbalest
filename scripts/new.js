import { input, select, confirm } from '@inquirer/prompts'
import { resolve } from 'path'
import { cloneRepo } from './cloneRepo.js'
import chalk from 'chalk'

const createNewProject = async () => {
    // Project name
    const name = await input({
        message: 'Enter your project name',
        validate: val => (!!val.trim() ? true : 'Please enter project name')
    })

    // Platform
    const platform = await select({
        message: 'Select a platform for your project',
        choices: [
            {
                name: 'pc',
                value: 'pc',
                description: 'web'
            },
            {
                name: 'mobile',
                value: 'mobile',
                description: 'h5'
            },
            {
                name: 'uni-app',
                value: 'uniApp',
                description: 'micro app'
            }
        ]
    })

    // Basic component library
    const libraryBranch = await select({
        message: 'Choose a basic component library for your project',
        choices: branches[platform]
    })

    // Path
    let path = resolve(process.cwd(), name)
    let confirmPath

    while (confirmPath !== true) {
        confirmPath = await confirm({
            message: `Is this your project path  →  ${chalk.yellow(path)}`
        })
        if (!confirmPath) {
            const changePath = await input({
                message: 'Enter your new path',
                validate: val => (!!val.trim() ? true : 'Please enter new path !')
            })
            path = resolve(process.cwd(), changePath)
        }
    }

    cloneRepo(`${repositories[platform]}#${libraryBranch}`, path)
}

const branches = {
    pc: [
        {
            name: 'ant-design-vue',
            value: 'antdv'
        }
    ],
    mobile: [
        {
            name: 'vant',
            value: 'vant'
        }
    ],
    uniApp: [
        {
            name: 'uview',
            value: 'uview'
        }
    ]
}

const repositories = {
    pc: `Arbalest1337/vue3-arbalest`,
    mobile: 'Arbalest1337/vue3-arbalest-mobile',
    uniApp: 'Arbalest1337/uni-app-vue3'
}

export { createNewProject }
