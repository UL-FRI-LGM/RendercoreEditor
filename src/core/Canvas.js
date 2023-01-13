// A GPUCanvasContext object is created via the getContext() method of an HTMLCanvasElement instance by passing the string literal 'webgpu' as its contextType argument.


import { ObjectBase } from './ObjectBase.js';


export class Canvas extends ObjectBase { //GPUCanvasContext //RC canvas object (wrapper)


	// readonly attribute (HTMLCanvasElement or OffscreenCanvas) canvas;

    // undefined configure(GPUCanvasConfiguration configuration);
    // undefined unconfigure();

    // GPUTexture getCurrentTexture();


	static DEFAULT = {
		NAME: "",
		TYPE: "Canvas",

		PARENT: null,
		VIEWPORT: { width: 1280, height: 720 },
		WIDTH: 1280,
		HEIGHT: 720,
		PIXEL_RATIO: window.devicePixelRatio || 1,

		CANVAS: Canvas.#generateCanvas(),

		CONTEXT: null,
	};


	// readonly attribute (HTMLCanvasElement or OffscreenCanvas) canvas;
	#canvas = Canvas.DEFAULT.CANVAS.cloneNode(true);

	#parent;
	#viewport = Canvas.DEFAULT.VIEWPORT;
	#width = Canvas.DEFAULT.WIDTH;
	#height = Canvas.DEFAULT.HEIGHT;
	#pixelRatio;

	#context;


	constructor(contextType, args = {}) {
		super(
			{
				...args,
				name: (args.name !== undefined) ? args.name : Canvas.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Canvas.DEFAULT.TYPE,
			}
		);

		this.canvas = (args.canvas !== undefined) ? args.canvas : this.canvas;

		this.parent = (args.parent !== undefined) ? args.parent : Canvas.DEFAULT.PARENT;
		this.viewport = (args.viewport !== undefined) ? args.viewport : { width: this.canvas.clientWidth , height: this.canvas.clientHeight };
		this.width = (args.width !== undefined) ? args.width : this.width;
        this.height = (args.height !== undefined) ? args.height : this.height;
		this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : Canvas.DEFAULT.PIXEL_RATIO;

		this.context = (contextType !== undefined) ? this.getContext(contextType, args.contextAttributes) : Canvas.DEFAULT.CONTEXT;
	}


	get canvas() { return this.#canvas; }
	set canvas(canvas) {
		this.#canvas = canvas;

		if (this.parent) {
			this.parent.appendChild(this.canvas);
			this.updateSize();
		}
	}

	get parent() { return this.#parent; }
	set parent(parent) {
		this.#parent = parent;

		if (this.canvas) {
			this.parent.appendChild(this.canvas);
			this.updateSize();
		}
	}
	get viewport() { return this.#viewport; }
	set viewport(viewport) {
		this.#viewport = viewport;

		this.#width = viewport.width;
		this.#height = viewport.height;

		this.#canvas.width = Math.floor(viewport.width * this.pixelRatio);
		this.#canvas.height = Math.floor(viewport.height * this.pixelRatio);
	}
	get width() { return this.#width; }
	set width(width) {
		this.#viewport.width = width;

		this.#width = width;

		this.#canvas.width = Math.floor(width * this.pixelRatio);
	}
	get height() { return this.#height; }
	set height(height) {
		this.#viewport.height = height;

		this.#height = height;

		this.#canvas.height = Math.floor(height * this.pixelRatio);
	}
	get aspect() { return this.width / this.height; }
	get pixelRatio() { return this.#pixelRatio; }
	set pixelRatio(pixelRatio) { 
		this.#pixelRatio = pixelRatio; 

		this.#canvas.width = Math.floor(this.width * pixelRatio);
		this.#canvas.height = Math.floor(this.height * pixelRatio);
	}

	get clientWidth() { return this.canvas.clientWidth; }
	get clientHeight() { return this.canvas.clientHeight; }
	get bufferWidth() { return this.canvas.width; }
	get bufferHeight() { return this.canvas.height; }

	get context() { return this.#context; }
	set context(context) { this.#context = context; }

	
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
		
		const width = this.canvas.clientWidth;
		const height = this.canvas.clientHeight;

		this.#viewport = { width: width, height: height };

		this.#width = width;
		this.#height = height;

		this.#canvas.width = Math.floor(width * this.pixelRatio);
		this.#canvas.height = Math.floor(height * this.pixelRatio);
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
};