import { Color3 } from "./Color3.js";


export class Color4 extends Color3 {
	static DEFAULT = {
		R: Color3.DEFAULT.R,
		G: Color3.DEFAULT.G,
		B: Color3.DEFAULT.B,
		A: 1.0,
	};


	#a;


	constructor (r, g, b, a, arrayBuffer = new Float32Array(4)) {
		super(r, g, b, arrayBuffer);

		this.a = (a !== undefined) ? a : Color4.DEFAULT.A;
	}


	get a() { return this.#a; }
	set a(a) { 
		this.arrayBuffer[3] = a;
		this.#a = a; 
	}


	copy(color) {
		super.copy(color);
		this.a = color.a;
	}
	clone() {
		return new Color4(this.r, this.g, this.b, this.a);
	}
	toArray() {
		return new Array(this.r, this.g, this.b, this.a);
	}
};