import { Vector3 } from "../Vector3.js";


export class Circle {


	static DEFAULT = {
		CENTER: new Vector3(0, 0, 0),
		RADIUS: 0,
	};


	#center = Circle.DEFAULT.CENTER.clone();
	#radius = Circle.DEFAULT.RADIUS;


	constructor (center = Circle.DEFAULT.CENTER.clone(), radius = Circle.DEFAULT.RADIUS) {
		this.center = center;
		this.radius = radius;
	}


	get center() { return this.#center; }
	set center(center) { this.#center.copy(center); }
	get radius() { return this.#radius; }
	set radius(radius) { this.#radius = radius; }


	copy(circle) {
		this.center.copy(circle.center);
		this.radius = circle.radius;


		return this;
	}
	clone() {
		return new Circle(
			this.center.clone(),
			this.radius
		);
	}

	reset(CLASS = Circle) {
		this.center.copy(CLASS.DEFAULT.CENTER);
		this.radius = CLASS.DEFAULT.RADIUS;
	}
};
