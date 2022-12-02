export class Color3 {
	static DEFAULT = {
		R: 0.0,
		G: 0.0,
		B: 0.0,
	};


	#color;


	constructor (r, g, b) {
		this.color = { r: null, g: null, b: null };

		this.r = (r !== undefined) ? r : Color3.DEFAULT.R;
		this.g = (g !== undefined) ? g : Color3.DEFAULT.G;
		this.b = (b !== undefined) ? b : Color3.DEFAULT.B;
	}


	get color() { return this.#color; }
	set color(color) { this.#color = color; }

	get r() { return this.color.r; }
	set r(r) { this.color.r = r; }
	get g() { return this.color.g; }
	set g(g) { this.color.g = g; }
	get b() { return this.color.b; }
	set b(b) { this.color.b = b; }
};