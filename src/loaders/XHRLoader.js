import {LoadingManager} from './LoadingManager.js';


export class XHRLoader {


	#manager;
	#responseType;

	#progress = 0.0;


	constructor (manager, responseType) {
		this.manager = (manager !== undefined) ? manager : new LoadingManager();
		this.responseType = (responseType !== undefined) ? responseType : "";
	}


	get manager() { return this.#manager; }
	set manager(manager) { this.#manager = manager; }
	get responseType() { return this.#responseType; }
	set responseType(responseType) { this.#responseType = responseType; }

	get progress() { return this.#progress; }
	set progress(progress) { this.#progress = progress; }


	load(url, args = {}) {
		const request = new XMLHttpRequest();

		request.overrideMimeType("text/plain");
		request.responseType = this.responseType;
		request.open("GET", url, true);

		request.addEventListener("loadstart", this.onLoadStart(request, args));
		request.addEventListener("progress", this.onProgress(request, args));
		request.addEventListener("load", this.onLoadEnd(request, args));
		request.addEventListener("error", this.onError(request, args));
		request.addEventListener("abort", this.onAbort(request, args));

		
		// Send the request
		// request.send();
		// Send the request
		this.manager.load(request);
	}

	onLoadStart(request, args){
		return (event) => {
			args.onLoadStart(request, event);
		}
	}
	onProgress(request, args) {
		return (event) => {
			this.progress = event.loaded / event.total;

			args.onProgress(request, event);
		}
	}
	onLoadEnd(request, args) {
		return (event) => {
			if(request.readyState === 4){
				if(request.status === 200){
					args.onLoadEnd(request, event);
				}else{
					args.onError(request, event);
				}
			}
		}
	}
	onError(request, args){
		return (event) => {
			args.onError(request, event);
		}
	}
	onAbort(request, args){
		return (event) => {
			args.onAbort(request, event);
		}
	}
};