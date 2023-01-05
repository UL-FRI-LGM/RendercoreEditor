import { XHRLoader } from './XHRLoader.js';
import { LoadingManager } from "./LoadingManager.js";


export class ImageLoader extends XHRLoader {
	static DEFAULT = {
		NAME: "",
		TYPE: "ImageLoader",

		LOADING_MANAGER: new LoadingManager({ name: "image loader default loading manager" }),
		RESPONSE_TYPE: "blob",
		CALLBACK: () => {},
	};
	static EVENT_TO_DATA = (event) => { return ImageLoader.parse(event.target.response); };


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : ImageLoader.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : ImageLoader.DEFAULT.TYPE,

				loadingManager: (args.loadingManager !== undefined) ? args.loadingManager : ImageLoader.DEFAULT.LOADING_MANAGER,
				responseType: (args.responseType !== undefined) ? args.responseType : ImageLoader.DEFAULT.RESPONSE_TYPE,

				onLoadStart: (args.onLoadStart !== undefined) ? args.onLoadStart : ImageLoader.DEFAULT.CALLBACK,
				onProgress: (args.onProgress !== undefined) ? args.onProgress : ImageLoader.DEFAULT.CALLBACK,
				onLoadEnd: (args.onLoadEnd !== undefined) ? args.onLoadEnd : ImageLoader.DEFAULT.CALLBACK,
				onError: (args.onError !== undefined) ? args.onError : ImageLoader.DEFAULT.CALLBACK,
				onAbort: (args.onAbort !== undefined) ? args.onAbort : ImageLoader.DEFAULT.CALLBACK,
			
				eventToData: (args.eventToData !== undefined) ? args.eventToData : ImageLoader.EVENT_TO_DATA,
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

	static parse(blob) {
		const image = new Image();
		image.src = window.URL.createObjectURL(blob);


		return image;
	}
};