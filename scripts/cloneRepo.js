import degit from 'degit'
import { resolve } from 'path'
import chalk from 'chalk'
import ora from 'ora'

const cloneRepo = async (repoPath, savePath = '.') => {
    const emitter = degit(repoPath, {
        cache: false,
        force: true,
        verbose: true
    })
    const spinner = ora('Downloading...')
    spinner.start()

    try {
        await emitter.clone(resolve(savePath))
        spinner.stop()
        console.log(chalk.yellow('✔ All success, your project has been created.'))
    } catch (err) {
        spinner.stop()
        console.log(err)
        console.log(chalk.redBright('❌ Something wrong, your project was not created.'))
    }
}

export { cloneRepo }
