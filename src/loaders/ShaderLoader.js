import { LoadingManager } from "./LoadingManager.js";
import { XHRLoader } from "./XHRLoader.js";


export class ShaderLoader extends XHRLoader {
	static DEFAULT = {
		NAME: "",
		TYPE: "ShaderLoader",

		LOADING_MANAGER: new LoadingManager({ name: "shader loader default loading manager" }),
		RESPONSE_TYPE: "",
		CALLBACK: () => {},
	};
	static EVENT_TO_DATA = (event) => { return event.target.response; };


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : ShaderLoader.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ShaderLoader.DEFAULT.TYPE,

				loadingManager: (args.loadingManager !== undefined) ? args.loadingManager : ShaderLoader.DEFAULT.LOADING_MANAGER,
				responseType: (args.responseType !== undefined) ? args.responseType : ShaderLoader.DEFAULT.RESPONSE_TYPE,

				onLoadStart: (args.onLoadStart !== undefined) ? args.onLoadStart : ShaderLoader.DEFAULT.CALLBACK,
				onProgress: (args.onProgress !== undefined) ? args.onProgress : ShaderLoader.DEFAULT.CALLBACK,
				onLoadEnd: (args.onLoadEnd !== undefined) ? args.onLoadEnd : ShaderLoader.DEFAULT.CALLBACK,
				onError: (args.onError !== undefined) ? args.onError : ShaderLoader.DEFAULT.CALLBACK,
				onAbort: (args.onAbort !== undefined) ? args.onAbort : ShaderLoader.DEFAULT.CALLBACK,
			
				eventToData: (args.eventToData !== undefined) ? args.eventToData : ShaderLoader.EVENT_TO_DATA,
			}
		);
	}


	async load(url, args = {}) {
		const onLoadStart = (args.onLoadStart !== undefined) ? args.onLoadStart : this.onLoadStart;
		const onProgress = (args.onProgress !== undefined) ? args.onProgress : this.onProgress;
		const onLoadEnd = (args.onLoadEnd !== undefined) ? args.onLoadEnd : this.onLoadEnd;
		const onError = (args.onError !== undefined) ? args.onError : this.onError;
		const onAbort = (args.onAbort !== undefined) ? args.onAbort : this.onAbort;

		const eventToData = (args.eventToData !== undefined) ? args.eventToData : this.eventToData;

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