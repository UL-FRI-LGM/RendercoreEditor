import {LoadingManager} from './LoadingManager.js';


export class XHRLoader {


	#manager;
	#responseType;

	#onLoadStart;
	#onLoadEnd;
	#onProgress;
	#onError;
	#onAbort;

	#progress = 0.0;


	constructor (manager, args = {}) {
		this.manager = (manager !== undefined) ? manager : new LoadingManager();
		this.responseType = (args.responseType !== undefined) ? args.responseType : "";

		this.onLoadStart = (args.onLoadStart !== undefined) ? args.onLoadStart : () => {};
		this.onProgress = (args.onProgress !== undefined) ? args.onProgress : () => {};
		this.onLoadEnd = (args.onLoadEnd !== undefined) ? args.onLoadEnd : () => {};
		this.onError = (args.onError !== undefined) ? args.onError : () => {};
		this.onAbort = (args.onAbort !== undefined) ? args.onAbort : () => {};
	}


	get manager() { return this.#manager; }
	set manager(manager) { this.#manager = manager; }
	get responseType() { return this.#responseType; }
	set responseType(responseType) { this.#responseType = responseType; }

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

	get progress() { return this.#progress; }
	set progress(progress) { this.#progress = progress; }


	load(url, args = {}) {
		const request = new XMLHttpRequest();

		request.overrideMimeType("text/plain");
		request.responseType = this.responseType;
		request.open("GET", url, true);


		const onLoadStart = (args.onLoadStart !== undefined) ? args.onLoadStart : this.onLoadStart;
		const onProgress = (args.onProgress !== undefined) ? args.onProgress : this.onProgress;
		const onLoadEnd = (args.onLoadEnd !== undefined) ? args.onLoadEnd : this.onLoadEnd;
		const onError = (args.onError !== undefined) ? args.onError : this.onError;
		const onAbort = (args.onAbort !== undefined) ? args.onAbort : this.onAbort;

		request.addEventListener("loadstart", this.onLoadStartInternal(request, onLoadStart));
		request.addEventListener("progress", this.onProgressInternal(request, onProgress));
		request.addEventListener("load", this.onLoadEndInternal(request, onLoadEnd, onError));
		request.addEventListener("error", this.onErrorInternal(request, onError));
		request.addEventListener("abort", this.onAbortInternal(request, onAbort));

		
		// Send the request
		// request.send();
		// Send the request
		this.manager.load(request);
	}

	onLoadStartInternal(request, onLoadStart){
		return (event) => {
			onLoadStart(request, event);
		}
	}
	onProgressInternal(request, onProgress) {
		return (event) => {
			this.progress = event.loaded / event.total;

			onProgress(request, event);
		}
	}
	onLoadEndInternal(request, onLoadEnd, onError) {
		return (event) => {
			if(request.readyState === 4){
				if(request.status === 200){
					onLoadEnd(request, event);
				}else{
					onError(request, event);
				}
			}
		}
	}
	onErrorInternal(request, onError){
		return (event) => {
			onError(request, event);
		}
	}
	onAbortInternal(request, onAbort){
		return (event) => {
			onAbort(request, event);
		}
	}
};