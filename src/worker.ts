import { isMainThread, parentPort, Worker, workerData } from "worker_threads";

if (isMainThread) {
    const worker = new Worker(__filename, {workerData: "hello"});
    worker.on("message", msg => console.log(`Worker message received: ${msg}`));
    worker.on("error", error => console.error(error));
    worker.on("exit", code => console.log(`Worker exited with code ${code}.`));
} else {
    parentPort!.postMessage(`You said \"${workerData}\".`);
}

