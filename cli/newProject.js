const prompts = require('prompts')
const degit = require('degit')
const { resolve } = require('path')

const cloneRepo = (repoPath, savePath = '.') => {
    const emitter = degit(repoPath, {
        cache: false,
        force: true,
        verbose: true
    })

    emitter.clone(resolve(savePath)).then(() => {
        console.log('clone done')
    })
}

const repositories = {
    pc: `Arbalest-Dcmk/vue3-arbalest`,
    h5: 'Arbalest-Dcmk/vue3-arbalest-mobile',
    uniapp: 'Arbalest-Dcmk/vue3-arbalest-uniapp'
}

;(async () => {
    const questions = [
        {
            type: 'text',
            name: 'name',
            message: `What's your project name?`,
            validate: value => value.trim().length > 0
        },
        {
            type: 'select',
            name: 'type',
            message: 'What kind of new project',
            choices: [
                { title: 'PC', description: ' For PC (e.g. CMS)', value: 'pc' },
                { title: 'H5', description: 'For Mobile', value: 'h5' },
                { title: 'UniApp', description: 'For MicroApp', value: 'uniapp' }
            ]
        },

        // pc
        {
            type: (a, b) => {
                const { type } = b
                return type === 'pc' ? 'select' : null
            },
            name: 'lib',
            message: 'Choose components lib',
            choices: [
                { title: 'ant-design-vue', value: 'antdv' },
                { title: 'element-plus', value: 'element-plus', disabled: true }
            ]
        },

        // h5
        {
            type: (a, b) => {
                const { type } = b
                return type === 'h5' ? 'select' : null
            },
            name: 'lib',
            message: 'Choose components lib',
            choices: [{ title: 'vant', value: 'vant' }]
        },

        // uniapp
        {
            type: (a, b) => {
                const { type } = b
                return type === 'uniapp' ? 'select' : null
            },
            name: 'lib',
            message: 'Choose components lib',
            choices: [{ title: 'u-view', value: 'uview' }]
        }
    ]

    const answers = await prompts(questions)
    const { name, type, lib } = answers
    console.log(`${repositories[type]}#${lib}`, resolve(`./${name}`))
})()
