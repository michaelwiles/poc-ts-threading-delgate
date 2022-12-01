import {isMainThread, parentPort, workerData} from "worker_threads";
import {RemoteMethodInvocation} from "./proxy_worker";


export interface IDoWork {
    doWork(message: string, value: number): Promise<any>

    calculateName(firstName: string, surname: string): Promise<string>
}

class DoWork implements IDoWork {
    constructor(private readonly workerData: any) {

    }

    async calculateName(firstName: string, surname: string): Promise<string> {
        return firstName + " " + surname
    }

    async doWork(message: string, value: number): Promise<string> {
        console.log("pausing")
        console.log("is main thread", isMainThread)
        console.log(` in process: ${process.pid}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("pausing done")
        console.log("message", message, "value", value)
        console.log("hello")
        console.log(` in process: ${process.pid}`)
        return `result mesage: ${message}, value ${value}`
    }
}

let worker: DoWork

if (parentPort) {
    if (workerData) {
        worker = new DoWork(workerData)
    }
    parentPort!.on('message', async (methodInvocation: RemoteMethodInvocation) => {
        console.log('parameters', methodInvocation)
        let newVar = Reflect.get(worker, methodInvocation.methodName);
        let result = await newVar(...methodInvocation.parameters)
        parentPort!.postMessage({invocationId: methodInvocation.methodInvocationId, result: result})

    })
}