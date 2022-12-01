import {ProxyWorker, RemoteMethodInvocation} from "../proxy_worker";
import {IDoWork} from "../custom_worker";


describe("Proxy Against Thread", () => {
    test("Invoke ProxyWorker directly", async () => {
        let proxyWorker = new ProxyWorker();
        proxyWorker.initialiseWorker()

        let newVar = await proxyWorker.invoke(new RemoteMethodInvocation("doWork", ['this is from the mother ship', 45]));
        console.log(`${process.pid}`, newVar)


    }, 10000)


//    let newVar = await proxyWorker.invoke(new RemoteMethodInvocation("doWork", ['this is from the mother ship', 45]));

    const remoteMethodHandler: ProxyHandler<ProxyWorker> = {
        get(target: ProxyWorker, p: string | symbol, receiver: any) {
            // methodName = p
            return async (...params: any[]) =>
                await target.invoke(new RemoteMethodInvocation(<string>p, params))
        }
    }
    test("Method call on thread via Proxy", async () => {

        const proxyWorker = new ProxyWorker();
        proxyWorker.initialiseWorker()
        let proxy = <IDoWork><unknown>new Proxy(proxyWorker, remoteMethodHandler);

        //let newVar = await proxyWorker.invoke(new RemoteMethodInvocation("doWork", ['this is from the mother ship', 45]));
        let message = "mesasge from above";
        let value = 434;
        let newVar1 = await proxy.doWork(message, value);
        expect(newVar1).toEqual(`result mesage: ${message}, value ${value}`)

        let name = await proxy.calculateName('Michael', 'Wiles');
        expect(name).toEqual("Michael Wiles")
    }, 10000)

    test("Method call on thread via Proxy No local Await", async () => {
        /** remote method still runs but local does not wait for it */
        const proxyWorker = new ProxyWorker();
        proxyWorker.initialiseWorker()
        let proxy = <IDoWork><unknown>new Proxy(proxyWorker, remoteMethodHandler);

        //let newVar = await proxyWorker.invoke(new RemoteMethodInvocation("doWork", ['this is from the mother ship', 45]));
        let message = "mesasge from above";
        let value = 434;
        proxy.doWork(message, value);
        console.log("finished doWork call")
        return new Promise((resolve) => setTimeout(resolve, 5000));
    }, 10000)
})