import { ObjectBase } from './ObjectBase.js';


export class Canvas extends ObjectBase {
	static DEFAULT = {
		NAME: "",
		TYPE: "Canvas",

		PARENT_DOM: null,
		CANVAS_DOM: Canvas.#generateCanvasDOM(),

		CONTEXT: null,

		PIXEL_RATIO: window.devicePixelRatio || 1,
	};


	#parentDOM;
	#canvasDOM;

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

		this.parentDOM = (args.parentDOM !== undefined) ? args.parentDOM : Canvas.DEFAULT.PARENT_DOM;
		this.canvasDOM = (args.canvasDOM !== undefined) ? args.canvasDOM : Canvas.DEFAULT.CANVAS_DOM;

		this.pixelRatio = (args.pixelRatio !== undefined) ? args.pixelRatio : Canvas.DEFAULT.PIXEL_RATIO;

		this.context = (args.contextType !== undefined) ? this.canvasDOM.getContext(args.contextType) : Canvas.DEFAULT.CONTEXT;
	}


	get parentDOM() { return this.#parentDOM; }
	set parentDOM(parentDOM) {
		this.#parentDOM = parentDOM;

		if (this.canvasDOM) {
			this.parentDOM.appendChild(this.canvasDOM);
			this.updateSize();
		}
	}
	get canvasDOM() { return this.#canvasDOM; }
	set canvasDOM(canvasDOM) {
		this.#canvasDOM = canvasDOM;

		if (this.parentDOM) {
			this.parentDOM.appendChild(this.canvasDOM);
			this.updateSize();
		}
	}

	get context() { return this.#context; }
	set context(context) { this.#context = context; }

	get width() { return this.canvasDOM.width; }
	set width(width) { 
		this.canvasDOM.width = width; 
	}
	get height() { return this.canvasDOM.height; }
	set height(height) { 
		this.canvasDOM.height = height; 
	}
	get aspect() { return this.width / this.height; }
	get pixelRatio() { return this.#pixelRatio; }
	set pixelRatio(pixelRatio) { 
		this.#pixelRatio = pixelRatio; 

		this.updateSize();
	}

	
	static #generateCanvasDOM() {
		const canvasDOM = document.createElement("canvas");

		//make it visually fill the positioned parent
		//set the display size of the canvas
		canvasDOM.style.width = "100%";
		canvasDOM.style.height = "100%";
		canvasDOM.style.padding = '0';
		canvasDOM.style.margin = '0';
		//canvasDOM.style.border = "1px solid";


		return canvasDOM;
	}

	updateSize() {
		//set the internal size to match
		//set the size of the drawing buffer
		this.canvasDOM.width = Math.floor(this.canvasDOM.clientWidth * this.pixelRatio);
		this.canvasDOM.height = Math.floor(this.canvasDOM.clientHeight * this.pixelRatio);
	}
}