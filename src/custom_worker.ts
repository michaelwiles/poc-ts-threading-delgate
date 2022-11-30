import { isMainThread, parentPort, workerData } from "worker_threads";


class WorkerManager {
    constructor(private readonly workerData: any) {

    }


    async doWork(parameters: any): Promise<any> {
        console.log("doing work X", parameters)
        console.log("pausing")
        console.log("is main thread", isMainThread)
        console.log(` in process: ${process.pid}`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("pausing done")
        console.log("hello")

        console.log(` in process: ${process.pid}`)
        return "result"
    }
}

let workerManager: WorkerManager

class WorkerMessage {

    constructor(readonly invocationId: string, readonly parameters: any) {
    }
}

if (parentPort) {
    if (workerData) {
        workerManager = new WorkerManager(workerData)
    }
    parentPort!.on('message', async ({invocationId, parameters}: WorkerMessage) => {
        console.log('parameters', parameters)
        let result = await workerManager.doWork(parameters)
        parentPort!.postMessage({invocationId: invocationId, result: result})

    })
}