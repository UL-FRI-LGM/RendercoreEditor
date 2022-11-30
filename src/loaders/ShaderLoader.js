import { LoadingManager } from "./LoadingManager.js";
import { XHRLoader } from "./XHRLoader.js";


export class ShaderLoader extends XHRLoader {
	static DEFAULT = {
		NAME: "",
		TYPE: "ShaderLoader",

		LOADING_MANAGER: new LoadingManager({ name: "shader loader default loading manager" }),
	};
	static EVENT_TO_DATA = (event) => { return event.target.response; };


	constructor(loadingManager, args = {}) {
		super(
			loadingManager ? loadingManager : ShaderLoader.DEFAULT.LOADING_MANAGER, 
			{
				...args, 
				name: (args.name !== undefined) ? args.name : ShaderLoader.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ShaderLoader.DEFAULT.TYPE,
			}
		);
	}


	async load (url, args = {}) {
		const onLoadStart = (args.onLoadStart !== undefined) ? args.onLoadStart : this.onLoadStart;
		const onProgress = (args.onProgress !== undefined) ? args.onProgress : this.onProgress;
		const onLoadEnd = (args.onLoadEnd !== undefined) ? args.onLoadEnd : this.onLoadEnd;
		const onError = (args.onError !== undefined) ? args.onError : this.onError;
		const onAbort = (args.onAbort !== undefined) ? args.onAbort : this.onAbort;

		const eventToData = (args.eventToData !== undefined) ? args.eventToData : ShaderLoader.EVENT_TO_DATA;

		const promise = super.load(
			url, 
			{
				onLoadStart: onLoadStart,
				onProgress: onProgress,
				onLoadEnd: onLoadEnd, 
				onError: onError,
				onAbort: onAbort,
				eventToData: eventToData,
			}
		);


		return promise;
	}
};