import { Color3 } from "./Color3.js";


export class Color4 extends Color3 {
	static DEFAULT = {
		R: Color3.DEFAULT.R,
		G: Color3.DEFAULT.G,
		B: Color3.DEFAULT.B,
		A: 1.0,
	};


	constructor (r, g, b, a) {
		super(r, g, b);

		this.a = (a !== undefined) ? a : Color4.DEFAULT.A;
	}


	get a() { return this.color.a; }
	set a(a) { this.color.a = a; }
};