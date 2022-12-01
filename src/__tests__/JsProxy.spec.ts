import {methodProxy, proxy1, proxy2, proxy3} from "../proxy";

describe('Js Proxies', () => {

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

    class Hello {
        getMessage(message: string, value: number): string {
            console.log(message, value)
            return `greetings with message ${message} and number ${value}`
        }
    }

    test("Reflective Method Call", () => {
        let hello = new Hello();
        let newVar = Reflect.get(hello, 'getMessage');
        console.log(newVar)
        console.log(newVar("xyz", 45))
        //methodProxy.sendMessage("hello")
    })
})