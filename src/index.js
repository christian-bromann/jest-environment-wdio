import vm from 'vm'
import { FakeTimers, installCommonGlobals } from 'jest-util'
import mock from 'jest-mock'

export default class WDIOEnvironment {
    constructor (config) {
        this.context = vm.createContext()
        const global = (this.global = vm.runInContext('this', this.context))
        global.global = global
        global.clearInterval = clearInterval
        global.clearTimeout = clearTimeout
        global.Promise = Promise
        global.setInterval = setInterval
        global.setTimeout = setTimeout
        global.wdiotest = () => {
            console.log('YO')
        }
        installCommonGlobals(global, config.globals)
        this.moduleMocker = new mock.ModuleMocker(global)

        const timerIdToRef = (id) => ({
            id,
            ref () {
                return this
            },
            unref () {
                return this
            }
        })

        const timerRefToId = (timer) => {
            return (timer && timer.id) || null
        }

        const timerConfig = {
            idToRef: timerIdToRef,
            refToId: timerRefToId
        }

        console.log(typeof test)

        this.fakeTimers = new FakeTimers({
            config,
            global,
            moduleMocker: this.moduleMocker,
            timerConfig
        })
    }

    setup () {
        console.log('SET ME UP')
        return Promise.resolve()
    }

    teardown () {
        console.log('TEAR ME DOWN')
        if (this.fakeTimers) {
            this.fakeTimers.dispose()
        }
        this.context = null
        this.fakeTimers = null
        return Promise.resolve()
    }

    runScript (script) {
        if (this.context) {
            return script.runInContext(this.context)
        }
        return null
    }
}
