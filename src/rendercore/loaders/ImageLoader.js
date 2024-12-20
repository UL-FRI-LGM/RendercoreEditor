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
	static EVENT_TO_DATA = async (event) => { return await ImageLoader.parse(event.target.response); };


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

	static async parse(blob) {
		const image = new Image();
		image.src = window.URL.createObjectURL(blob);
		await image.decode();

		const imageBitmap = await window.createImageBitmap(image);
		const imageData = ImageLoader.imageBitmapToImageData(imageBitmap, false, true);


		return imageData;
	}

	static imageBitmapToImageData(imageBitmap, flipH, flipV) {
		const width = imageBitmap.width;
		const height = imageBitmap.height;
	
		const oc = new OffscreenCanvas(width, height);
		const ctx = oc.getContext("2d");
	
		const scaleH = flipH ? -1 : 1;
		const scaleV = flipV ? -1 : 1;
		const posX = flipH ? width * -1 : 0;
		const posY = flipV ? height * -1 : 0;
		
		ctx.scale(scaleH, scaleV);
		ctx.drawImage(imageBitmap, posX, posY, width, height);

		const imageData = ctx.getImageData(0, 0, width, height);


		return imageData;
	};
};