import { methodProxy, proxy1, proxy2, proxy3 } from "../proxy";

describe('proxies', () => {

    test("proxy handler 1", () => {
        expect(proxy1.message1).toEqual('hello')
        expect(proxy1.message2).toEqual('everyone')
    })
    test("proxy handler 2", () => {
        expect(proxy2.message1).toEqual('world')
        expect(proxy2.message2).toEqual('world')
    })
    test("proxy handler 3", () => {
        expect(proxy3.message1).toEqual('hello')
        expect(proxy3.message2).toEqual('world')
    })

    test("method test", () => {
        methodProxy.sendMessage("hello")
    })
})