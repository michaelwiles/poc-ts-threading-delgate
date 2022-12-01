# poc-ts-threading-delgate
Local to Threaded Method Call

Showing how a local method call can be translated into a threaded call.

See [here](https://github.com/michaelwiles/poc-ts-threading-delgate/blob/ac2f0823bbf870ccdf7b9902319cd4b54e0e6aed/src/__tests__/WorkerProxy.spec.ts#L26)

Notice how the local call is against a Proxy which has been cast to an interface. Then the actual [implementation](https://github.com/michaelwiles/poc-ts-threading-delgate/blob/ac2f0823bbf870ccdf7b9902319cd4b54e0e6aed/src/custom_worker.ts#L11) implements that interface.

The local call is "normal" - don't see anything unusual about it - i.e. it is a normal async call. But it gets translated into a call running on a separate thread.
