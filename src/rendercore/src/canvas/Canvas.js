import { ObjectBase } from '../core/ObjectBase.js';
import { Extent3D } from '../core/RC/textures/Extent3D.js';
import { TextureFormat } from '../core/RC/textures/TextureFormat.js';
import { TextureUsage } from '../core/RC/textures/TextureUsage.js';
import { Division } from '../Division.js';
import { CanvasAlphaMode } from './CanvasAlphaMode.js';
import { CanvasDescriptor } from './CanvasDescriptor.js';
import { PredefinedColorSpace } from './PredefinedColorSpace.js';


export class Canvas extends ObjectBase { //RC canvas wrapper


	static FORMAT = TextureFormat;
	static USAGE = TextureUsage;

	static COLOR_SPACE = PredefinedColorSpace;
	static ALPHA_MODE = CanvasAlphaMode;


	static DEFAULT = {
		TYPE: "Canvas",
		NAME: "",
		LABEL: "",
		DIVISION: Division.RENDER_CORE,

		CANVAS_DESCRIPTOR: new CanvasDescriptor({ label: `${Canvas.name}` }),
		CANVAS: null,
	};


	#canvasDescriptor = Canvas.DEFAULT.CANVAS_DESCRIPTOR.clone();
	#canvas = null;


	constructor(args = {}, canvasDescriptor, canvas) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Canvas.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Canvas.DEFAULT.NAME,
				label: (args.label !== undefined) ? args.label : Canvas.DEFAULT.LABEL,
				division: (args.division !== undefined) ? args.division : Canvas.DEFAULT.DIVISION,
			}
		);

		this.canvasDescriptor = (canvasDescriptor !== undefined) ? canvasDescriptor : {};
		this.canvas = (canvas !== undefined) ? canvas : Canvas.#create(this.canvasDescriptor);
	}


	get canvasDescriptor() { return this.#canvasDescriptor; }
	set canvasDescriptor(canvasDescriptor) { this.#canvasDescriptor = canvasDescriptor; }
	get canvas() { return this.#canvas; }
	set canvas(canvas) {
		this.#canvas = canvas;

		if (this.parent && this.canvas) this.parent.appendChild(this.canvas);
	}
	get parent() { return this.canvas.parentNode; }
	set parent(parent) {
		if (parent && this.canvas) parent.appendChild(this.canvas);
	}

	get size() {
		return {
			width: this.canvas.width,
			height: this.canvas.height
		};
	}
	set size(size) {
		this.canvas.width = size.width;
		this.canvas.height = size.height;
	}
	get width() { return this.canvas.width; }
	set width(width) { this.canvas.width = width; }
	get height() { return this.canvas.height; }
	set height(height) { this.canvas.height = height; }
	get clientWidth() { return this.canvas.clientWidth; }
	get clientHeight() { return this.canvas.clientHeight; }
	get bufferWidth() { return this.canvas.width; }
	get bufferHeight() { return this.canvas.height; }


	static #create(canvasDescriptor) {
		const canvas = document.createElement("canvas");

		//make it visually fill the positioned parent
		//set the display size of the canvas
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		canvas.style.padding = '0';
		canvas.style.margin = '0';
		//canvas.style.border = "1px solid";


		if (canvasDescriptor.parent) canvasDescriptor.parent.appendChild(canvas);

		canvas.width = canvasDescriptor.size.width;
		canvas.height = canvasDescriptor.size.height;


		return canvas;
	}
	update() {
		if (this.canvasDescriptor.isDirty()) {
			// for (const [name, desc] of this.canvasDescriptor.dirtyCache) {
			// 	if (desc !== undefined) this.canvas[name] = desc;
			// }
			this.canvasDescriptor.dirtyCache.forEach((value, name) => {
				console.warn(`Setting: canvas[${name}] =`, value);
				// this.canvas[name] = value;
				this[name] = value;
			});
			this.canvasDescriptor.dirtyCache.clear();
		}
	}

	getContext(contextType, contextAttributes) {
		// const WebGL2 = canvas.getContext("webgl2", contextAttributes);
		// const WebGPU = canvas.getContext("webgpu", contextAttributes);
		const context = this.canvas.getContext(contextType, contextAttributes);
		if (context === null) throw new Error(`Error creating [${contextType}] context`);


		return context;
	}

	destroy() {
		this.canvas.remove();
	}
};
