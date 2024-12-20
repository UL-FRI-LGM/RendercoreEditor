import { ObjectBase } from '../core/ObjectBase.js';


export class Canvas extends ObjectBase { //RC canvas wrapper


	static DEFAULT = {
		NAME: "",
		TYPE: "Canvas",

		PARENT: null,

		WIDTH: 1280,
		HEIGHT: 720,

		CANVAS: Canvas.#generateCanvas(),
	};


	#canvas = Canvas.DEFAULT.CANVAS.cloneNode(true);

	#parent = Canvas.DEFAULT.PARENT;

	#width = Canvas.DEFAULT.WIDTH;
	#height = Canvas.DEFAULT.HEIGHT;


	constructor(args = {}) {
		super(
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : Canvas.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Canvas.DEFAULT.TYPE,
			}
		);

		this.canvas = (args.canvas !== undefined) ? args.canvas : Canvas.DEFAULT.CANVAS.cloneNode(true);

		this.parent = (args.parent !== undefined) ? args.parent : Canvas.DEFAULT.PARENT;
		
		this.width = (args.width !== undefined) ? args.width : Canvas.DEFAULT.WIDTH;
		this.height = (args.height !== undefined) ? args.height : Canvas.DEFAULT.HEIGHT;
	}


	get canvas() { return this.#canvas; }
	set canvas(canvas) {
		this.#canvas = canvas;

		if (this.parent && this.canvas) this.parent.appendChild(this.canvas);
	}

	get parent() { return this.#parent; }
	set parent(parent) {
		this.#parent = parent;

		if (this.parent && this.canvas) this.parent.appendChild(this.canvas);
	}

	get width() { return this.#width; }
	set width(width) {
		this.#width = width;

		this.#canvas.width = width;
	}
	get height() { return this.#height; }
	set height(height) {
		this.#height = height;

		this.#canvas.height = height;
	}
	get clientWidth() { return this.canvas.clientWidth; }
	get clientHeight() { return this.canvas.clientHeight; }
	get bufferWidth() { return this.canvas.width; }
	get bufferHeight() { return this.canvas.height; }

	
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
		console.warn("CANVAS UPDATE");
		// //set the internal size to match
		// //set the size of the drawing buffer
		
		// const width = this.canvas.clientWidth;
		// const height = this.canvas.clientHeight;

		// this.#viewport = { width: width, height: height };

		// this.#width = width;
		// this.#height = height;

		// this.#canvas.width = Math.floor(width * this.pixelRatio);
		// this.#canvas.height = Math.floor(height * this.pixelRatio);
	}

	getContext(contextType, contextAttributes) {
		// const WebGL2 = canvas.getContext("webgl2", contextAttributes);
		// const WebGPU = canvas.getContext("webgpu", contextAttributes);
		const context = this.canvas.getContext(contextType, contextAttributes);
		if (context === null) throw new Error(`Error creating [${contextType}] context`);


		return context;
	}
};
