/**
 * @jest-environment wdio
 */

test('should allow to run tests with WebdriverIO', () => {
    console.log('I am the test2')
})

wdiotest('foo', () => {
    console.log('wdio TEST')
})

wdiotest('foo', () => {
    console.log('wdio TEST')
})
