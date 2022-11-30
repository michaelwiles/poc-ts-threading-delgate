import { ProxyWorker } from "../proxy_worker";

describe("worker proxy", () => {
    test("basic", async () => {
        let proxyWorker = new ProxyWorker();
        proxyWorker.initialiseWorker()

        let newVar = await proxyWorker.invoke({x: 1, y: 2});
        console.log(`${process.pid}`, newVar)


    })
})