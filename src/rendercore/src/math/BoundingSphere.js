import { Sphere } from "./sphere/Sphere.js";
import { Vector3 } from "./Vector3.js";


export class BoundingSphere extends Sphere {


	static DEFAULT = {
		CENTER: new Vector3(0, 0, 0),
		RADIUS: 0,
	};


	constructor (center = BoundingSphere.DEFAULT.CENTER.clone(), radius = BoundingSphere.DEFAULT.RADIUS) {
		super(center, radius);
	}


	copy(boundingSphere) {
		return super.copy(boundingSphere);
	}
	clone() {
		return new BoundingSphere(
			this.center.clone(),
			this.radius
		);
	}

	reset(CLASS = BoundingSphere) {
		super.reset(CLASS);
	}

	intersectsBoundingSphere(boundingSphere) {
		const radiusesSum = this.radius + boundingSphere.radius;
		const radiusesSumSquared = radiusesSum * radiusesSum;

		return this.center.distanceToSquared(boundingSphere.center) < (radiusesSumSquared);
	}
};
