import { ObjectBase } from "../../core/ObjectBase.js";
import { Float32ArrayT2 } from "../../core/Float32ArrayT2.js";


export class Viewport extends ObjectBase {


	static DEFAULT = {
		TYPE: "Viewport",
		NAME: "",

		ARRAY_BUFFER: new Float32ArrayT2({}, 6),

		X: 0,
		Y: 0,
		WIDTH: 1280,
		HEIGHT: 720,
		MIN_DEPTH: 0,
		MAX_DEPTH: 1,
	};


	#arrayBuffer;

	#x;
	#y;
	#width;
	#height;
	#minDepth;
	#maxDepth;


	constructor(args = {}, arrayBuffer = Viewport.DEFAULT.ARRAY_BUFFER.clone()) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Viewport.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Viewport.DEFAULT.NAME,
			}
		);

		this.arrayBuffer = arrayBuffer;

		this.x = (args.x !== undefined) ? args.x : Viewport.DEFAULT.X;
		this.y = (args.y !== undefined) ? args.y : Viewport.DEFAULT.Y;
		this.width = (args.width !== undefined) ? args.width : Viewport.DEFAULT.WIDTH;
		this.height = (args.height !== undefined) ? args.height : Viewport.DEFAULT.HEIGHT;
		this.minDepth = (args.minDepth !== undefined) ? args.minDepth : Viewport.DEFAULT.MIN_DEPTH;
		this.maxDepth = (args.maxDepth !== undefined) ? args.maxDepth : Viewport.DEFAULT.MAX_DEPTH;
	}


	get arrayBuffer() { return this.#arrayBuffer; }
	set arrayBuffer(arrayBuffer) { this.#arrayBuffer = arrayBuffer; }

	get x() { return this.#x; }
	set x(x) {
		this.arrayBuffer[0] = x;
		this.#x = x;
	}
	get y() { return this.#y; }
	set y(y) {
		this.arrayBuffer[1] = y;
		this.#y = y;
	}
	get width() { return this.#width; }
	set width(width) {
		this.arrayBuffer[2] = width;
		this.#width = width;
	}
	get height() { return this.#height; }
	set height(height) {
		this.arrayBuffer[3] = height;
		this.#height = height;
	}
	get minDepth() { return this.#minDepth; }
	set minDepth(minDepth) {
		this.arrayBuffer[4] = minDepth;
		this.#minDepth = minDepth;
	}
	get maxDepth() { return this.#maxDepth; }
	set maxDepth(maxDepth) {
		this.arrayBuffer[5] = maxDepth;
		this.#maxDepth = maxDepth;
	}


	clone() {
		return new Viewport(
			{
				x: this.x,
				y: this.y,
				width: this.width,
				height: this.height,
				minDepth: this.minDepth,
				maxDepth: this.maxDepth
			}
		);
	}
};
