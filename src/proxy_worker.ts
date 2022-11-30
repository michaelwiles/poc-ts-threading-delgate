import { Worker } from "worker_threads";
import path from "path";
import { randomUUID } from "crypto";
import EventEmitter from "events";


type Executor = (resolve: (value: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => void

export class ProxyWorker {
    private worker!: Worker

    private receiveEventEmitter = new EventEmitter()

    private promises = new Map<string, Executor>();

    public initialiseWorker(): void {
        console.log(__dirname)
        let filename = path.join(__dirname, 'custom_worker.js').replace("src", "build")
        console.log(filename)
        this.worker = new Worker(filename, {workerData: "hello"});
        this.worker.on('message', (payload: { invocationId: string, result: any }) => {
            this.receiveEventEmitter.emit(`method-returned-${payload.invocationId}`, payload.result)
        })
    }

    public async invoke(parmaters: any): Promise<any> {
        let invocationId = randomUUID();

        let promise = new Promise<any>((resolve, reject) => {
            this.receiveEventEmitter.addListener(`method-returned-${invocationId}`, result => {
                resolve(result)
            })
            //setTimeout(reject, 10000)
        });
        this.worker.postMessage({invocationId: invocationId, parameters: {x: 'hello', y: 'goodbye'}})
        return promise;
    }
}

