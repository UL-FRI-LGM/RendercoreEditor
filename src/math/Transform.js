import { Euler } from "./Euler.js";
import { Matrix3 } from "./Matrix3.js";
import { Matrix4 } from "./Matrix4.js";
import { Quaternion } from "./Quaternion.js";
import { Vector3 } from "./Vector3.js";


export class Transform {


	// this._matrix = new Matrix4();		//MMat (TRS) local (parent independent)
	// this._matrixWorld = new Matrix4();	//MMat (TRS) global (parent dependent)
	// // Model view matrix is derived from the object world matrix and inverse camera world matrix
	// this._modelViewMatrix = new Matrix4();
	// this._normalMatrix = new Matrix3();
	// this._modelViewProjectionMatrix = new Matrix4();


	#position = new Vector3(0, 0, 0);
	#rotation = new Euler(0, 0, 0, "XYZ");
	#quaternion = new Quaternion(0, 0, 0, 1);
	#scaling = new Vector3(1, 1, 1);

	#modelMatrix = new Matrix4();
	#modelViewMatrix = new Matrix4();
	#modelViewProjectionMatrix = new Matrix4();
	#normalMatrix = new Matrix3();
	
	#TRSMat = new Matrix4();
	#translationMatrix;
	#rotationMatrix;
	#scalingMatrix;

	#MMat = new Matrix4();
	#MVMat = new Matrix4();
	#MVPMat = new Matrix4();
	#NMat = new Matrix3();


	constructor (args = {}) {
		this.position = (args.position !== undefined) ? args.position : new Vector3(0, 0, 0);
		this.rotation = (args.rotation !== undefined) ? args.rotation : new Euler(0, 0, 0, "XYZ");
		this.quaternion = (args.quaternion !== undefined) ? args.quaternion : new Quaternion(0, 0, 0, 1);
		this.scaling = (args.scaling !== undefined) ? args.scaling : new Vector3(1, 1, 1);
		this.MMat = (args.MMat !== undefined) ? args.MMat : new Matrix4();
		this.MVMat = (args.MVMat !== undefined) ? args.MVMat : new Matrix4();
		this.MVPMat = (args.MVPMat !== undefined) ? args.MVPMat : new Matrix4();
		this.NMat = (args.NMat !== undefined) ? args.NMat : new Matrix3();
	}


	get position() { return this.#position; }
	set position(position) { 
		this.position.copy(position);
		this.MMat = this.MMat.compose(this.position, this.quaternion, this.scaling);
	}
	get positionX() { return this.position.x; }
	set positionX(positionX) { 
		this.position = this.position.setX(positionX);
	}
	get positionY() { return this.position.y; }
	set positionY(positionY) { 
		this.position = this.position.setY(positionY);
	}
	get positionZ() { return this.position.z; }
	set positionZ(positionZ) { 
		this.position = this.position.setZ(positionZ);
	}
	get rotation() { return this.#rotation; }
	set rotation(rotation) { 
		this.rotation.copy(rotation);
		this.quaternion.setFromEuler(this.rotation, false);
		this.MMat = this.MMat.compose(this.position, this.quaternion, this.scaling);
	}
	get rotationX() { return this.rotation.x; }
	set rotationX(rotationX) { 
		this.rotation = this.rotation.setX(rotationX);
	}
	get rotationY() { return this.rotation.y; }
	set rotationY(rotationY) { 
		this.rotation = this.rotation.setY(rotationY);
	}
	get rotationZ() { return this.rotation.z; }
	set rotationZ(rotationZ) { 
		this.rotation = this.rotation.setZ(rotationZ);
	}
	get quaternion() { return this.#quaternion; }
	set quaternion(quaternion) { 
		this.quaternion.copy(quaternion);
		this.rotation.setFromQuaternion(this.quaternion, undefined, false);
		this.MMat = this.MMat.compose(this.position, this.quaternion, this.scaling);
	}
	get scaling() { return this.#scaling; }
	set scaling(scaling) { 
		this.scaling.copy(scaling);
		this.MMat = this.MMat.compose(this.position, this.quaternion, this.scaling);
	}
	get scalingX() { return this.scaling.x; }
	set scalingX(scalingX) { 
		this.scaling = this.scaling.setX(scalingX);
	}
	get scalingY() { return this.scaling.y; }
	set scalingY(scalingY) { 
		this.scaling = this.scaling.setY(scalingY);
	}
	get scalingZ() { return this.scaling.z; }
	set scalingZ(scalingZ) { 
		this.scaling = this.scaling.setZ(scalingZ);
	}
	
	get modelMatrix() { return this.#modelMatrix; }
	set modelMatrix(modelMatrix) { this.#modelMatrix.copy(modelMatrix); }
	get modelViewMatrix() { return this.#modelViewMatrix; }
	set modelViewMatrix(modelViewMatrix) { this.#modelViewMatrix.copy(modelViewMatrix); }
	get modelViewProjectionMatrix() { return this.#modelViewProjectionMatrix; }
	set modelViewProjectionMatrix(modelViewProjectionMatrix) { this.#modelViewProjectionMatrix.copy(modelViewProjectionMatrix); }
	get normalMatrix() { return this.#normalMatrix; }
	set normalMatrix(normalMatrix) { this.#normalMatrix.copy(normalMatrix); }

	get MMat() { return this.modelMatrix; }
	set MMat(MMat) { this.modelMatrix = MMat; }
	get MVMat() { return this.modelViewMatrix; }
	set MVMat(MVMat) { this.modelViewMatrix = MVMat; }
	get MVPMat() { return this.modelViewProjectionMatrix; }
	set MVPMat(MVPMat) { this.modelViewProjectionMatrix = MVPMat; }
	get NMat() { return this.normalMatrix; }
	set NMat(NMat) { this.normalMatrix = NMat; }


	translateOnAxis = (() => {
		// translate object by distance along axis in object space
		// axis is assumed to be normalized
		const v1 = new Vector3();


		return (axis, distance) => {
			v1.copy(axis).applyQuaternion(this.quaternion);
			this.position = this.position.add(v1.multiplyScalar(distance));
		};
	})();
	translateX = (() => {
		const v1 = new Vector3(1, 0, 0);


		return (distance) => {
			return this.translateOnAxis(v1, distance);
		};
	})();
	translateY = (() => {
		const v1 = new Vector3(0, 1, 0);


		return (distance) => {
			return this.translateOnAxis(v1, distance);
		};
	})();
	translateZ = (() => {
		const v1 = new Vector3(0, 0, 1);


		return (distance) => {
			return this.translateOnAxis(v1, distance);
		};
	})();
	translate(distanceVector) {
		this.translateX(distanceVector.x);
		this.translateY(distanceVector.y);
		this.translateZ(distanceVector.z);
	};
	rotateOnAxis = (() => {
		const q1 = new Quaternion();
	

		return (axis, angle) => {
			q1.setFromAxisAngle(axis, angle);
			this.quaternion = this.quaternion.multiply(q1);
		};
	})();
	rotateX = (() => {
		const v1 = new Vector3(1, 0, 0);


		return (angle) => {
			this.rotateOnAxis(v1, angle);
		};
	})();
	rotateY = (() => {
		const v1 = new Vector3(0, 1, 0);


		return (angle) => {
			this.rotateOnAxis(v1, angle);
		};
	})();
	rotateZ = (() => {
		const v1 = new Vector3(0, 0, 1);


		return (angle) => {
			this.rotateOnAxis(v1, angle);
		};
	})();
	rotate(angleVector) {
		this.rotateX(angleVector.x);
		this.rotateY(angleVector.y);
		this.rotateZ(angleVector.z);
	};
	scaleOnAxis = (() => {
		const v1 = new Vector3();


		return (axis, multiplier) => {
			v1.copy(axis);
			this.scaling = this.scaling.add(v1.multiplyScalar(multiplier));
		};
	})();
	scaleX = (() => {
		const v1 = new Vector3(1, 0, 0);


		return (multiplier) => {
			return this.scaleOnAxis(v1, multiplier);
		};
	})();
	scaleY = (() => {
		const v1 = new Vector3(0, 1, 0);


		return (multiplier) => {
			return this.scaleOnAxis(v1, multiplier);
		};
	})();
	scaleZ = (() => {
		const v1 = new Vector3(0, 0, 1);


		return (multiplier) => {
			return this.scaleOnAxis(v1, multiplier);
		};
	})();
	scale(multiplierVector) {
		this.scaleX(multiplierVector.x);
		this.scaleY(multiplierVector.y);
		this.scaleZ(multiplierVector.z);
	};

	lookAt = (() => {
		const m = new Matrix4();
		const q = new Quaternion();


		return (vector, up) => {
			m.lookAt(this.position, vector, up);
			q.setFromRotationMatrix(m);

			this.quaternion = q;
		}
	})();

	copy(transform) {
		this.position.copy(transform.position);
		this.rotation.copy(transform.rotation);
		this.quaternion.copy(transform.quaternion);
		this.scaling.copy(transform.scaling);
		this.TRSMat.copy(transform.TRSMat);
		this.MVMat.copy(transform.MVMat);
		this.MVPMat.copy(transform.MVPMat);
		this.NMat.copy(transform.NMat);
	}
	clone() {
		return new Transform(this);
	}
};