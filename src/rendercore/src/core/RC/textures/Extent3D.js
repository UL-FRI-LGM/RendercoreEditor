import { ErrorT2 } from "../../../ErrorT2.js";
import { MapT2 } from "../../MapT2.js";


export class Extent3D {


	static DEFAULT = {
		DIRTY_CACHE: new MapT2({ label: `${Extent3D.name}` }),
	};


	#dirtyCache = new MapT2({ label: `${Extent3D.name}` });

	#width;
	#height;
	#depthOrArrayLayers;


	constructor(args = {}) {
		this.dirtyCache = (args.dirtyCache !== undefined) ? args.dirtyCache : Extent3D.DEFAULT.DIRTY_CACHE.clone(true);

		this.width = args.width !== undefined ? args.width : undefined;
		this.height = args.height !== undefined ? args.height : undefined;
		this.depthOrArrayLayers = args.depthOrArrayLayers !== undefined ? args.depthOrArrayLayers : undefined;
	}


	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = (dirtyCache instanceof MapT2) ? dirtyCache : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type }); }

	get width() { return this.#width; }
	set width(width) {
		this.#width = width;
		this.dirtyCache.set("width", width);
	}
	get height() { return this.#height; }
	set height(height) {
		this.#height = height;
		this.dirtyCache.set("height", height);
	}
	get depthOrArrayLayers() { return this.#depthOrArrayLayers; }
	set depthOrArrayLayers(depthOrArrayLayers) {
		this.#depthOrArrayLayers = depthOrArrayLayers;
		this.dirtyCache.set("depthOrArrayLayers", depthOrArrayLayers);
	}


	copy(extent3D) {
		if (!(extent3D instanceof Extent3D)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		this.width = extent3D.width;
		this.height = extent3D.height;
		this.depthOrArrayLayers = extent3D.depthOrArrayLayers;


		return this;
	}
	clone() {
		return new Extent3D(
			{
				width: (this.width === Object(this.width)) ? this.width.clone() : this.width,
				height: (this.height === Object(this.height)) ? this.height.clone() : this.height,
				depthOrArrayLayers: (this.depthOrArrayLayers === Object(this.depthOrArrayLayers)) ? this.depthOrArrayLayers.clone() : this.depthOrArrayLayers,
			}
		);
	}

	isDirty() {
		return this.dirtyCache.size > 0;
	}
};
