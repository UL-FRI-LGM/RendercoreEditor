import { ObjectBase } from "../core/ObjectBase.js";


export class LoadingManager extends ObjectBase {
	static DEFAULT = {
		NAME: "",
		TYPE: "LoadingManager",

		CALLBACK: () => {}
	};


	#onLoadStart;
	#onLoadEnd;
	#onProgress;
	#onError;
	#onAbort;

	#requestsTotal;
	#requestsFinished;

	#progress = 0.0;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : LoadingManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : LoadingManager.DEFAULT.TYPE,
			}
		);


		this.onLoadStart = (args.onLoadStart !== undefined) ? args.onLoadStart : LoadingManager.DEFAULT.CALLBACK;
		this.onProgress = (args.onProgress !== undefined) ? args.onProgress : LoadingManager.DEFAULT.CALLBACK;
		this.onLoadEnd = (args.onLoadEnd !== undefined) ? args.onLoadEnd : LoadingManager.DEFAULT.CALLBACK;
		this.onError = (args.onError !== undefined) ? args.onError : LoadingManager.DEFAULT.CALLBACK;
		this.onAbort = (args.onAbort !== undefined) ? args.onAbort : LoadingManager.DEFAULT.CALLBACK;

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
		request.addEventListener("loadstart", this.onLoadStartInternal(request));
		request.addEventListener("progress", this.onProgressInternal(request));
		request.addEventListener("loadend", this.onLoadEndInternal(request));
		request.addEventListener("error", this.onErrorInternal(request));
		request.addEventListener("abort", this.onAbortInternal(request));


		// Send the request
		request.send();
	}
	onLoadStartInternal(request) {
		return (event) => {
			this.requestsTotal.set(request, request);
			// this.progress = this.requestsFinished.size / this.requestsTotal.size;

			this.onLoadStart(request, event);
			this.#onProgressInternal(request)(event);;
		}
	}
	onProgressInternal(request) {
		return (event) => {
			// this.progress = this.requestsFinished.size / this.requestsTotal.size;
			// this.onProgress(request, event);
		}
	}
	#onProgressInternal(request) {
		return (event) => {
			this.progress = this.requestsFinished.size / this.requestsTotal.size;
			this.onProgress(request, event);
		}
	}
	onLoadEndInternal(request) {
		return (event) => {
			this.requestsFinished.set(request, request);
			// this.progress = this.requestsFinished.size / this.requestsTotal.size;

			this.#onProgressInternal(request)(event);
			this.onLoadEnd(request, event);
		}
	}
	onErrorInternal(request) {
		return (event) => {
			this.onError(request, event);
		}
	}
	onAbortInternal(request) {
		return (event) => {
			this.onAbort(request, event);
		}
	}
};