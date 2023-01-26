import { ObjectBase } from "../core/ObjectBase.js";
import { LoadingManager } from "./LoadingManager.js";


export class XHRLoader extends ObjectBase {
	static DEFAULT = {
		NAME: "",
		TYPE: "XHRLoader",

		LOADING_MANAGER: new LoadingManager({ name: "xhr loader default loading manager" }),
		RESPONSE_TYPE: "",
		CALLBACK: () => {},
	};
	static EVENT_TO_DATA = (event) => { return event.target.response; };


	#loadingManager;
	#responseType;

	#onLoadStart;
	#onLoadEnd;
	#onProgress;
	#onError;
	#onAbort;

	#eventToData;

	#dataCache = new Map();

	#progress = 0.0;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : XHRLoader.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : XHRLoader.DEFAULT.TYPE,
			}
		);

		this.loadingManager = (args.loadingManager !== undefined) ? args.loadingManager : XHRLoader.DEFAULT.LOADING_MANAGER;
		this.responseType = (args.responseType !== undefined) ? args.responseType : XHRLoader.DEFAULT.RESPONSE_TYPE;

		this.onLoadStart = (args.onLoadStart !== undefined) ? args.onLoadStart : XHRLoader.DEFAULT.CALLBACK;
		this.onProgress = (args.onProgress !== undefined) ? args.onProgress : XHRLoader.DEFAULT.CALLBACK;
		this.onLoadEnd = (args.onLoadEnd !== undefined) ? args.onLoadEnd : XHRLoader.DEFAULT.CALLBACK;
		this.onError = (args.onError !== undefined) ? args.onError : XHRLoader.DEFAULT.CALLBACK;
		this.onAbort = (args.onAbort !== undefined) ? args.onAbort : XHRLoader.DEFAULT.CALLBACK;

		this.eventToData = (args.eventToData !== undefined) ? args.eventToData : XHRLoader.EVENT_TO_DATA;
	}


	get loadingManager() { return this.#loadingManager; }
	set loadingManager(loadingManager) { this.#loadingManager = loadingManager; }
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

	get eventToData() { return this.#eventToData; }
	set eventToData(eventToData) { this.#eventToData = eventToData; }

	get dataCache() { return this.#dataCache; }
	set dataCache(dataCache) { this.#dataCache = dataCache; }

	get progress() { return this.#progress; }
	set progress(progress) { this.#progress = progress; }


	async load(url, args = {}) {
		if (this.dataCache.has(url)) {
			if (this.dataCache.get(url).loadEnd) {
				return new Promise((resolve, reject) => {
					resolve(this.dataCache.get(url).data);
				});
			} else if (this.dataCache.get(url).loadStart) {
				return new Promise((resolve, reject) => {
					this.dataCache.get(url).resolves.add(resolve);
					this.dataCache.get(url).rejects.add(reject);
				});
			} 
		} else {
			return new Promise((resolve, reject) => { 
				this.dataCache.set(url, 
					{ 
						loadStart: true, 
						loadEnd: false, 
						resolves: new Set([resolve]), 
						rejects: new Set([reject]), 
						data: null 
					}
				);
	
	
				const request = new XMLHttpRequest();
	
				request.overrideMimeType("text/plain");
				request.responseType = this.responseType;
				request.open("GET", url, true);
	
	
				const onLoadStart = (args.onLoadStart !== undefined) ? args.onLoadStart : this.onLoadStart;
				const onProgress = (args.onProgress !== undefined) ? args.onProgress : this.onProgress;
				const onLoadEnd = (args.onLoadEnd !== undefined) ? args.onLoadEnd : this.onLoadEnd;
				const onError = (args.onError !== undefined) ? args.onError : this.onError;
				const onAbort = (args.onAbort !== undefined) ? args.onAbort : this.onAbort;
	
				const eventToData = (args.eventToData !== undefined) ? args.eventToData : this.eventToData;
	
				request.addEventListener("loadstart", this.#onLoadStartInternal(request, onLoadStart));
				request.addEventListener("progress", this.#onProgressInternal(request, onProgress));
				request.addEventListener("loadend", this.#onLoadEndInternal(request, onLoadEnd, onError, onAbort, url, eventToData));
				request.addEventListener("error", this.#onErrorInternal(request, onError, url));
				request.addEventListener("abort", this.#onAbortInternal(request, onAbort, url));
	
				
				// Send the request
				request.send();
				// Send the request
				// this.loadingManager.load(request);
			});
		}
	}

	#onLoadStartInternal(request, onLoadStart) {
		return (event) => {
			this.loadingManager.onLoadStartInternal(request)(event);
			onLoadStart(request, event);
		}
	}
	#onProgressInternal(request, onProgress) {
		return (event) => {
			this.progress = event.loaded / event.total;

			onProgress(request, event);
			this.loadingManager.onProgressInternal(request)(event);
		}
	}
	#onLoadEndInternal(request, onLoadEnd, onError, onAbort, url, eventToData) {
		return async (event) => {
			if (request.readyState === 4) {
				if (request.status === 200) {
					const data = await eventToData(event);

					this.dataCache.get(url).loadStart = false;
					this.dataCache.get(url).loadEnd = true;
					this.dataCache.get(url).data = data;
					const resolveSet = this.dataCache.get(url).resolves;
					for (const resolve of resolveSet) {
						resolve(data); //resolve all
					}
					resolveSet.clear();

					onLoadEnd(request, event);
					this.loadingManager.onLoadEndInternal(request)(event);
				} else {
					// const rejectSet = this.dataCache.get(url).rejects;
					// for (const reject of rejectSet) {
					// 	reject(null); //reject all
					// }
					// rejectSet.clear()

					// onError(request, event);
					// this.loadingManager.onErrorInternal(request)(event);
				}
			} else {
				// const rejectSet = this.dataCache.get(url).rejects;
				// for (const reject of rejectSet) {
				// 	reject(null); //reject all
				// }
				// rejectSet.clear()

				// onAbort(request, event);
				// this.loadingManager.onAbortInternal(request)(event);
			}
		}
	}
	#onErrorInternal(request, onError, url) {
		return (event) => {
			const rejectSet = this.dataCache.get(url).rejects;
			for (const reject of rejectSet) {
				reject(null); //reject all
			}
			rejectSet.clear()

			onError(request, event);
			this.loadingManager.onErrorInternal(request)(event);
		}
	}
	#onAbortInternal(request, onAbort, url) {
		return (event) => {
			const rejectSet = this.dataCache.get(url).rejects;
			for (const reject of rejectSet) {
				reject(null); //reject all
			}
			rejectSet.clear()

			onAbort(request, event);
			this.loadingManager.onAbortInternal(request)(event);
		}
	}
};