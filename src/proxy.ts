const target = {
    message1: "hello",
    message2: "everyone",

    /*sendMessage(message: string) {
        console.log(message)
    }*/
};

let handler1: ProxyHandler<any> = {}
let handler2: ProxyHandler<any> = {
    get(target, prop, receiver) {
        return "world";
    },
};
const handler3: ProxyHandler<any> = {
    get(target, prop, receiver) {
        if (prop === "message2") {
            return "world";
        } else {
            return Reflect.get(target, prop, receiver);
        }
    },
};

const methodHandler: ProxyHandler<any> = {
    apply(target: any, thisArg: any, argArray: any[]): any {
        console.log('in apply')
        console.log(target, thisArg, argArray)
    },

    get(target: any, p: string | symbol, receiver: any) {
        console.log('in get')
        console.log('target', target, 'p', p, 'r', receiver)
        return (s: string) => console.log(`sending message ${s}`)
    }

}


export const proxy1 = new Proxy(target, handler1);
export const proxy2 = new Proxy(target, handler2);
export const proxy3 = new Proxy(target, handler3);
export const methodProxy = <Delegate>new Proxy(target, methodHandler)

interface Delegate {
    sendMessage(message: string): void
}
