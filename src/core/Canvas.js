// A GPUCanvasContext object is created via the getContext() method of an HTMLCanvasElement instance by passing the string literal 'webgpu' as its contextType argument.


import { ObjectBase } from './ObjectBase.js';


export class Canvas extends ObjectBase { //GPUCanvasContext


	// readonly attribute (HTMLCanvasElement or OffscreenCanvas) canvas;

    // undefined configure(GPUCanvasConfiguration configuration);
    // undefined unconfigure();

    // GPUTexture getCurrentTexture();


	static DEFAULT = {
		NAME: "",
		TYPE: "Canvas",

		PARENT: null,
		CANVAS: Canvas.#generateCanvas(),

		CONTEXT: null,

		PIXEL_RATIO: window.devicePixelRatio || 1,
	};


	#parent;
	// readonly attribute (HTMLCanvasElement or OffscreenCanvas) canvas;
	#canvas;

	#context;

	#pixelRatio;


	constructor(args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : Canvas.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Canvas.DEFAULT.TYPE,
			}
		);

		this.parent = (args.parent !== undefined) ? args.parent : Canvas.DEFAULT.PARENT;
		this.canvas = (args.canvas !== undefined) ? args.canvas : Canvas.DEFAULT.CANVAS;

		this.context = (args.contextType !== undefined) ? this.getContext(args.contextType, args.contextAttributes) : Canvas.DEFAULT.CONTEXT;
	
		this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : Canvas.DEFAULT.PIXEL_RATIO;
	}


	get parent() { return this.#parent; }
	set parent(parent) {
		this.#parent = parent;

		if (this.canvas) {
			this.parent.appendChild(this.canvas);
			this.updateSize();
		}
	}
	get canvas() { return this.#canvas; }
	set canvas(canvas) {
		this.#canvas = canvas;

		if (this.parent) {
			this.parent.appendChild(this.canvas);
			this.updateSize();
		}
	}

	get context() { return this.#context; }
	set context(context) { this.#context = context; }

	get width() { return this.canvas.width; }
	set width(width) { 
		this.canvas.width = width; 
	}
	get height() { return this.canvas.height; }
	set height(height) { 
		this.canvas.height = height; 
	}
	get aspect() { return this.width / this.height; }
	get pixelRatio() { return this.#pixelRatio; }
	set pixelRatio(pixelRatio) { 
		this.#pixelRatio = pixelRatio; 

		this.updateSize();
	}

	
	static #generateCanvas() {
		const canvas = document.createElement("canvas");

		//make it visually fill the positioned parent
		//set the display size of the canvas
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.style.padding = '0';
		canvas.style.margin = '0';
		//canvas.style.border = "1px solid";


		return canvas;
	}

	updateSize() {
		//set the internal size to match
		//set the size of the drawing buffer
		this.canvas.width = Math.floor(this.canvas.clientWidth * this.pixelRatio);
		this.canvas.height = Math.floor(this.canvas.clientHeight * this.pixelRatio);
	}

	getContext(contextType, contextAttributes) {
		return this.canvas.getContext(contextType, contextAttributes);
	}

	// undefined configure(GPUCanvasConfiguration configuration);
	configure(configuration) {
		this.canvas.configure(configuration);
	}
	 // undefined unconfigure();
    unconfigure() {
		this.canvas.unconfigure();
	}

	// GPUTexture getCurrentTexture();
	getCurrentTexture() {
		return this.canvas.getCurrentTexture();
	}
}