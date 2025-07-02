import { BoundingSphere } from "./BoundingSphere.js";
import { BoundingBox } from "./BoundingBox.js";
import { Vector3 } from "./Vector3.js";


export class Bounding {


	static DEFAULT = {
		SPHERE: {
			LOCAL: {
				objectspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
				worldspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
			},
			GLOBAL: {
				objectspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
				worldspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
			}
		},
		BOX: {
			LOCAL: {
				objectspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
				worldspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
			},
			GLOBAL: {
				objectspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
				worldspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
			}
		}
	};


	#sphere = {
		local: {
			objectspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
			worldspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
		},
		global: {
			objectspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
			worldspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
		}
	};
	#box = {
		local: {
			objectspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
			worldspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
		},
		global: {
			objectspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
			worldspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
		}
	};


	constructor (args = {}) {
		this.sphere = (args.sphere !== undefined) ? args.sphere : {
			local: {
				objectspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
				worldspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
			},
			global: {
				objectspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
				worldspace: new BoundingSphere(new Vector3(0, 0, 0), 0),
			},
		};
		this.box = (args.box !== undefined) ? args.box : {
			local: {
				objectspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
				worldspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
			},
			global: {
				objectspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
				worldspace: new BoundingBox(new Vector3(+Infinity, +Infinity, +Infinity), new Vector3(-Infinity, -Infinity, -Infinity)),
			},
		};
	}


	get sphere() { return this.#sphere; }
	set sphere(sphere) {
		this.sphere.local.objectspace.copy(sphere.local.objectspace);
		this.sphere.local.worldspace.copy(sphere.local.worldspace);
		this.sphere.global.objectspace.copy(sphere.global.objectspace);
		this.sphere.global.worldspace.copy(sphere.global.worldspace);
	}
	get box() { return this.#box; }
	set box(box) {
		this.box.local.objectspace.copy(box.local.objectspace);
		this.box.local.worldspace.copy(box.local.worldspace);
		this.box.global.objectspace.copy(box.global.objectspace);
		this.box.global.worldspace.copy(box.global.worldspace);
	}


	copy(bounding) {
		this.sphere = bounding.sphere;
		this.box = bounding.box;
	}
	clone() {
		return new Bounding(this);
	}
};
