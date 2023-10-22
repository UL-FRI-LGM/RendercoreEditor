import { Sphere } from "./Sphere.js";
import { Box3 } from "./Box3.js";
import { Vector3 } from "./Vector3.js";


export class Bounding {


	static DEFAULT = {
		SPHERE: {
			objectspace: new Sphere(new Vector3(0, 0, 0), 0),
			worldspace: new Sphere(new Vector3(0, 0, 0), 0),
		},
		BOX: {
			objectspace: new Box3(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
			worldspace: new Box3(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
		}
	};


	#sphere = {
		objectspace: new Sphere(new Vector3(0, 0, 0), 0),
		worldspace: new Sphere(new Vector3(0, 0, 0), 0),
	};
	#box = {
		objectspace: new Box3(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
		worldspace: new Box3(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
	};


	constructor (args = {}) {
		this.sphere = (args.sphere !== undefined) ? args.sphere : { objectspace: new Sphere(new Vector3(0, 0, 0), 0), worldspace: new Sphere(new Vector3(0, 0, 0), 0) };
		this.box = (args.box !== undefined) ? args.box : { objectspace: new Box3(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)), worldspace: new Box3(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)) };
	}


	get sphere() { return this.#sphere; }
	set sphere(sphere) {
		this.sphere.objectspace.copy(sphere.objectspace);
		this.sphere.worldspace.copy(sphere.worldspace);
	}
	get box() { return this.#box; }
	set box(box) {
		this.box.objectspace.copy(box.objectspace);
		this.box.worldspace.copy(box.worldspace);
	}


	copy(bounding) {
		this.sphere = bounding.sphere;
		this.box = bounding.box;
	}
	clone() {
		return new Bounding(this);
	}
};
