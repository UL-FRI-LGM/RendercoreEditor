import { ObjectBase } from "../../core/ObjectBase.js";
import { Float32ArrayT2 } from "../../core/Float32ArrayT2.js";
import { ErrorT2 } from "../../ErrorT2.js";


export class ScissorRectangle extends ObjectBase {


	static DEFAULT = {
		TYPE: "ScissorRectangle",
		NAME: "",

		ARRAY_BUFFER: new Float32ArrayT2({}, 4),

		X: 0,
		Y: 0,
		WIDTH: 1280,
		HEIGHT: 720,
	};


	#arrayBuffer;

	#x;
	#y;
	#width;
	#height;


	constructor(args = {}, arrayBuffer = ScissorRectangle.DEFAULT.ARRAY_BUFFER.clone()) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : ScissorRectangle.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : ScissorRectangle.DEFAULT.NAME,
			}
		);

		this.arrayBuffer = arrayBuffer;

		this.x = (args.x !== undefined) ? args.x : ScissorRectangle.DEFAULT.X;
		this.y = (args.y !== undefined) ? args.y : ScissorRectangle.DEFAULT.Y;
		this.width = (args.width !== undefined) ? args.width : ScissorRectangle.DEFAULT.WIDTH;
		this.height = (args.height !== undefined) ? args.height : ScissorRectangle.DEFAULT.HEIGHT;
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


	copy(scissorRectangle) {
		if (!(scissorRectangle instanceof ScissorRectangle)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(scissorRectangle);

		this.x = scissorRectangle.x;
		this.y = scissorRectangle.y;
		this.width = scissorRectangle.width;
		this.height = scissorRectangle.height;


		return this;
	}
	clone() {
		return new ScissorRectangle(
			Object.assign(
				super.clone(), 
				{
					x: (this.x === Object(this.x)) ? this.x.clone() : this.x,
					y: (this.y === Object(this.y)) ? this.y.clone() : this.y,
					width: (this.width === Object(this.width)) ? this.width.clone() : this.width,
					height: (this.height === Object(this.height)) ? this.height.clone() : this.height,
				}
			)
		);
	}
};
