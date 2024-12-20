export class Extent3D {


	#width;
	#height;
	#depthOrArrayLayers;


	constructor(args = {}) {
		this.width = args.width !== undefined ? args.width : undefined;
		this.height = args.height !== undefined ? args.height : undefined;
		this.depthOrArrayLayers = args.depthOrArrayLayers !== undefined ? args.depthOrArrayLayers : undefined;
	}


	get width() { return this.#width; }
	set width(width) { this.#width = width; }
	get height() { return this.#height; }
	set height(height) { this.#height = height; }
	get depthOrArrayLayers() { return this.#depthOrArrayLayers; }
	set depthOrArrayLayers(depthOrArrayLayers) { this.#depthOrArrayLayers = depthOrArrayLayers; }


	copy(extent3D) {
		this.width = extent3D.width;
		this.height = extent3D.height;
		this.depthOrArrayLayers = extent3D.depthOrArrayLayers;
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
};
