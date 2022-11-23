export class LoadingManager {


	#onLoadStart;
	#onLoadEnd;
	#onProgress;
	#onError;
	#onAbort;

	#requestsTotal;
	#requestsFinished;

	#progress = 0.0;


	constructor(onLoadStart, onProgress, onLoadEnd, onError, onAbort) {
		this.onLoadStart = onLoadStart;
		this.onProgress = onProgress;
		this.onLoadEnd = onLoadEnd;
		this.onError = onError;
		this.onAbort = onAbort;

		this.requestsTotal = new Map();
		this.requestsFinished = new Map();
	}


	get onLoadStart() { return this.#onLoadStart; }
	set onLoadStart(onLoadStart) { this.#onLoadStart = onLoadStart; }
	get onProgress() {return this.#onProgress; }
	set onProgress(onProgress) { this.#onProgress = onProgress; }
	get onLoadEnd() { return this.#onLoadEnd; }
	set onLoadEnd(onLoadEnd) { this.#onLoadEnd = onLoadEnd; }
	get onError() { return this.#onError; }
	set onError(onError) { this.#onError = onError; }
	get onAbort() { return this.#onAbort; }
	set onAbort(onAbort) { this.#onAbort = onAbort; }

	get requestsTotal() { return this.#requestsTotal; }
	set requestsTotal(requestsTotal) { this.#requestsTotal = requestsTotal; }
	get requestsFinished() { return this.#requestsFinished; }
	set requestsFinished(requestsFinished) { this.#requestsFinished = requestsFinished; }

	get progress() { return this.#progress; }
	set progress(progress) { this.#progress = progress; }


	load(request) {
		this.requestsTotal.set(request, request);
		this.progress = this.requestsFinished.size/this.requestsTotal.size;

		request.addEventListener("loadstart", this.#onLoadStartInternal(request));
		request.addEventListener("progress", this.#onProgressInternal(request));
		request.addEventListener("loadend", this.#onLoadEndInternal(request));
		request.addEventListener("error", this.#onErrorInternal(request));
		request.addEventListener("abort", this.#onAbortInternal(request));


		// Send the request
		request.send();
	}
	#onLoadStartInternal(request) {
		return (event) => {
			this.onLoadStart(request, event);
		}
	}
	#onProgressInternal(request) {
		return (event) => {
			this.onProgress(request, event);
		}
	}
	#onLoadEndInternal(request) {
		return (event) => {
			// if(request.readyState === 4){
			// 	if(request.status === 200){
			// 		this.itemsLoaded++;
			// 	}else{
			// 		this.itemsLoaded++;
			// 	}
			// }

			this.requestsFinished.set(request, request);
			this.progress = this.requestsFinished.size/this.requestsTotal.size;

			this.onProgress(request, event);
			this.onLoadEnd(request, event);
		}
	}
	#onErrorInternal(request) {
		return (event) => {
			this.onError(request, event);
		}
	}
	#onAbortInternal(request) {
		return (event) => {
			this.onAbort(request, event);
		}
	}
};