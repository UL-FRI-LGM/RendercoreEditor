import { Euler } from "./Euler.js";
import { Matrix3 } from "./Matrix3.js";
import { Matrix4 } from "./Matrix4.js";
import { Quaternion } from "./Quaternion.js";
import { Vector3 } from "./Vector3.js";


export class Transform {


	static DEFAULT = {
		TRANSLATION: new Vector3(0, 0, 0),
		ROTATION: new Euler(0, 0, 0, "XYZ"),
		QUATERNION: new Quaternion(0, 0, 0, 1),
		SCALING: new Vector3(1, 1, 1),
		TRANSLATION_ROTATION_SCALING_MATRIX: new Matrix4().set(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		),
		// TRANSLATION_MATRIX: new Matrix4().set(
		// 	1, 0, 0, 0,
		// 	0, 1, 0, 0,
		// 	0, 0, 1, 0,
		// 	0, 0, 0, 1
		// ),
		// ROTATION_MATRIX: new Matrix4().set(
		// 	1, 0, 0, 0,
		// 	0, 1, 0, 0,
		// 	0, 0, 1, 0,
		// 	0, 0, 0, 1
		// ),
		// SCALING_MATRIX: new Matrix4().set(
		// 	1, 0, 0, 0,
		// 	0, 1, 0, 0,
		// 	0, 0, 1, 0,
		// 	0, 0, 0, 1
		// ),

		// MODEL_MATRIX: new Matrix4(),
		MODEL_VIEW_MATRIX: new Matrix4(),
		MODEL_VIEW_PROJECTION_MATRIX: new Matrix4(),
		NORMAL_MATRIX: new Matrix3(),
	};


	// this._matrix = new Matrix4();		//MMat (TRS) local (parent independent)
	// this._matrixWorld = new Matrix4();	//MMat (TRS) global (parent dependent)
	// // Model view matrix is derived from the object world matrix and inverse camera world matrix
	// this._modelViewMatrix = new Matrix4();
	// this._normalMatrix = new Matrix3();
	// this._modelViewProjectionMatrix = new Matrix4();


	#translation = Transform.DEFAULT.TRANSLATION.clone();
	#rotation = Transform.DEFAULT.ROTATION.clone();
	#quaternion = Transform.DEFAULT.QUATERNION.clone();
	#scaling = Transform.DEFAULT.SCALING.clone();
	#translationRotationScalingMatrix = Transform.DEFAULT.TRANSLATION_ROTATION_SCALING_MATRIX.clone();
	// #translationMatrix = Transform.DEFAULT.TRANSLATION_MATRIX.clone();
	// #rotationMatrix = Transform.DEFAULT.ROTATION_MATRIX.clone();
	// #scalingMatrix = Transform.DEFAULT.SCALING_MATRIX.clone();

	// #modelMatrix = Transform.DEFAULT.MODEL_MATRIX.clone();
	#modelViewMatrix = Transform.DEFAULT.MODEL_VIEW_MATRIX.clone();
	#modelViewProjectionMatrix = Transform.DEFAULT.MODEL_VIEW_PROJECTION_MATRIX.clone();
	#normalMatrix = Transform.DEFAULT.NORMAL_MATRIX.clone();


	constructor (args = {}) {
		this.translation = (args.translation !== undefined) ? args.translation : this.translation;
		this.rotation = (args.rotation !== undefined) ? args.rotation : this.rotation;
		this.quaternion = (args.quaternion !== undefined) ? args.quaternion : this.quaternion;
		this.scaling = (args.scaling !== undefined) ? args.scaling : this.scaling;
		this.translationRotationScalingMatrix = ((args.translationRotationScalingMatrix || args.TRSMat) !== undefined) ? (args.translationRotationScalingMatrix || args.TRSMat) : this.translationRotationScalingMatrix;
		// this.translationMatrix = (args.translationMatrix !== undefined) ? args.translationMatrix : this.translationMatrix;
		// this.rotationMatrix = (args.rotationMatrix !== undefined) ? args.rotationMatrix : this.rotationMatrix;
		// this.scalingMatrix = (args.scalingMatrix !== undefined) ? args.scalingMatrix : this.scalingMatrix;

		// this.modelMatrix = ((args.modelMatrix || args.MMat) !== undefined) ? (args.modelMatrix || args.MMat) : this.modelMatrix;
		this.modelViewMatrix = ((args.modelViewMatrix || args.MVMat) !== undefined) ? (args.modelViewMatrix || args.MVMat) : this.modelViewMatrix;
		this.modelViewProjectionMatrix = ((args.modelViewProjectionMatrix || args.MVPMat) !== undefined) ? (args.modelViewProjectionMatrix || args.MVPMat) : this.modelViewProjectionMatrix;
		this.normalMatrix = ((args.normalMatrix || args.NMat) !== undefined) ? (args.normalMatrix || args.NMat) : this.normalMatrix;	
	}


	get translation() { return this.#translation; }
	set translation(translation) {
		this.translation.copy(translation);
		this.translationRotationScalingMatrix.compose(translation, this.quaternion, this.scaling);
	}
	get translationX() { return this.translation.x; }
	set translationX(translationX) {
		this.translation = this.translation.setX(translationX);
	}
	get translationY() { return this.translation.y; }
	set translationY(translationY) {
		this.translation = this.translation.setY(translationY);
	}
	get translationZ() { return this.translation.z; }
	set translationZ(translationZ) {
		this.translation = this.translation.setZ(translationZ);
	}
	get rotation() { return this.#rotation; }
	set rotation(rotation) {
		this.rotation.copy(rotation);
		this.quaternion.setFromEuler(rotation, false);
		this.translationRotationScalingMatrix.compose(this.translation, this.quaternion, this.scaling);
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
		this.rotation.setFromQuaternion(quaternion, undefined, false);
		this.quaternion.copy(quaternion);
		this.translationRotationScalingMatrix.compose(this.translation, quaternion, this.scaling);
	}
	get scaling() { return this.#scaling; }
	set scaling(scaling) {
		this.scaling.copy(scaling);
		this.translationRotationScalingMatrix.compose(this.translation, this.quaternion, scaling);
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
	get translationRotationScalingMatrix() { return this.#translationRotationScalingMatrix; }
	set translationRotationScalingMatrix(translationRotationScalingMatrix) {
		translationRotationScalingMatrix.decompose(this.translation, this.quaternion, this.scaling)
		this.rotation.setFromQuaternion(this.quaternion, undefined, false);
		this.translationRotationScalingMatrix.copy(translationRotationScalingMatrix);
	}
	// get translationMatrix() { return this.#translationMatrix; }
	// set translationMatrix(translationMatrix) { this.translationMatrix = translationMatrix; }
	// get rotationMatrix() { return this.#rotationMatrix; }
	// set rotationMatrix(rotationMatrix) { this.rotationMatrix = rotationMatrix; }
	// get scalingMatrix() { return this.#scalingMatrix; }
	// set scalingMatrix(scalingMatrix) { this.scalingMatrix = scalingMatrix; }

	get modelMatrix() { return this.translationRotationScalingMatrix; }
	set modelMatrix(modelMatrix) { this.translationRotationScalingMatrix = modelMatrix; }
	get modelViewMatrix() { return this.#modelViewMatrix; }
	set modelViewMatrix(modelViewMatrix) { this.#modelViewMatrix.copy(modelViewMatrix); }
	get modelViewProjectionMatrix() { return this.#modelViewProjectionMatrix; }
	set modelViewProjectionMatrix(modelViewProjectionMatrix) { this.#modelViewProjectionMatrix.copy(modelViewProjectionMatrix); }
	get normalMatrix() { return this.#normalMatrix; }
	set normalMatrix(normalMatrix) { this.#normalMatrix.copy(normalMatrix); }

	get TRSMat() { return this.translationRotationScalingMatrix; }
	set TRSMat(TRSMat) { this.translationRotationScalingMatrix = TRSMat; } 
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
			this.translation = this.translation.add(v1.multiplyScalar(distance));
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


		return this;
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


		return this;
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


		return this;
	};

	lookAt = (() => {
		const m = new Matrix4();
		const q = new Quaternion();


		return (vector, up) => {
			m.lookAt(this.translation, vector, up);
			q.setFromRotationMatrix(m);

			this.quaternion = q;
		}
	})();

	copy(transform) {
		this.translation.copy(transform.translation);
		this.rotation.copy(transform.rotation);
		this.quaternion.copy(transform.quaternion);
		this.scaling.copy(transform.scaling);
		this.translationRotationScalingMatrix.copy(transform.translationRotationScalingMatrix);

		this.MMat.copy(transform.MMat);
		this.MVMat.copy(transform.MVMat);
		this.MVPMat.copy(transform.MVPMat);
		this.NMat.copy(transform.NMat);
	}
	clone() {
		return new Transform(this);
	}
	equals(transform) {
		return (
			this.translation.equals(transform.translation) &&
			this.rotation.equals(transform.rotation) &&
			this.quaternion.equals(transform.quaternion) &&
			this.scaling.equals(transform.scaling) &&
			this.translationRotationScalingMatrix.equals(transform.translationRotationScalingMatrix) &&

			this.MMat.equals(transform.MMat) &&
			this.MVMat.equals(transform.MVMat) &&
			this.MVPMat.equals(transform.MVPMat) &&
			this.NMat.equals(transform.NMat)
		);
	}
	approx(transform, epsilon = Number.EPSILON) {
		return (
			this.translation.approx(transform.translation, epsilon) &&
			this.rotation.approx(transform.rotation, epsilon) &&
			this.quaternion.approx(transform.quaternion, epsilon) &&
			this.scaling.approx(transform.scaling, epsilon) &&
			this.translationRotationScalingMatrix.approx(transform.translationRotationScalingMatrix, epsilon) &&

			this.MMat.approx(transform.MMat, epsilon) &&
			this.MVMat.approx(transform.MVMat, epsilon) &&
			this.MVPMat.approx(transform.MVPMat, epsilon) &&
			this.NMat.approx(transform.NMat, epsilon)
		);
	}
};
