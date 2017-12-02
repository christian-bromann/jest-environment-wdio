import NodeEnvironment from 'jest-environment-node'

export default class CustomEnvironment extends NodeEnvironment {
    async setup () {
        console.log('setup')
        await super.setup()
    }

    async teardown () {
        console.log('teardown')
        await super.teardown()
    }

    runScript (script) {
        console.log('run me')
        return super.runScript(script)
    }
}
