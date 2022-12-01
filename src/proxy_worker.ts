import {Worker} from "worker_threads";
import path from "path";
import {randomUUID} from "crypto";
import EventEmitter from "events";


type Executor = (resolve: (value: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => void

export class ProxyWorker {
    private worker!: Worker

    private receiveEventEmitter = new EventEmitter()

    public initialiseWorker(): void {
        console.log(__dirname)
        let filename = path.join(__dirname, 'custom_worker.js').replace("src", "build")
        console.log(filename)
        this.worker = new Worker(filename, {workerData: "hello"});
        this.worker.on('message', (payload: { invocationId: string, result: any }) => {
            this.receiveEventEmitter.emit(`method-returned-${payload.invocationId}`, payload.result)
        })
    }

    public async invoke(methodInvocation: RemoteMethodInvocation): Promise<any> {

        let promise = new Promise<any>((resolve, reject) => {
            this.receiveEventEmitter.addListener(`method-returned-${methodInvocation.methodInvocationId}`, result => {
                resolve(result)
            })
            //setTimeout(reject, 10000)
        });
        this.worker.postMessage(methodInvocation)
        return promise;
    }
}

export class RemoteMethodInvocation {
    methodInvocationId = randomUUID();

    constructor(readonly methodName: string, readonly parameters: any[]) {
    }
}


