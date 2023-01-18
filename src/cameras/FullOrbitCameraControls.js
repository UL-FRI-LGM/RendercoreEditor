import { Vector3 } from "../math/Vector3.js";
import { Quaternion } from "../math/Quaternion.js";
import { Group } from "../objects/Group.js";


export class FullOrbitCameraControls {
	static DEFAULT = {
		LOCKED: false,
		COMBINED: false,
		KEY_MAP: {
			ROT_X_NEG: "ArrowDown",
			ROT_X_POS: "ArrowUp",
			ROT_Y_NEG: "ArrowRight",
			ROT_Y_POS: "ArrowLeft",
			//ROT_Z_NEG: 'e',
			ROT_Z_NEG: undefined,
			//ROT_Z_POS: 'q',
			ROT_Z_POS: undefined,
	
			MV_X_NEG: 'a',
			MV_X_POS: 'd',
			//MV_Y_NEG: "Control",
			MV_Y_NEG:'q',
			//MV_Y_POS: ' ',
			MV_Y_POS: 'e',
			MV_Z_NEG: 'w',
			MV_Z_POS: 's',
		},

		ORBIT_CENTER: new Vector3(0, 0, 0),
		DIRECTION: new Vector3(0, 0, 1),
		RADIUS: {
			VALUE: 32,
			MIN: 0.0,
			MAX: Infinity,
		},

		CLAMP: {
			MIN: new Vector3(-1, -1, -1),
			MAX: new Vector3(+1, +1, +1),
		},
		TRANSLATION: {
			ENABLE: true,
			SPEED: 1.0,
		},
		ROTATION: {
			ENABLE: true,
			SPEED: 1.0,
		},
		ZOOM: {
			ENABLE: true,
			SPEED: 1.0,
		},
		INERTIA: {
			VALUE: new Vector3(0, 0, 0),
			ENABLE: true,
			TYPE: undefined,
			DECAY: 0.8,
		},
	};


	#locked;
	#combined;
	#cameraP;
	#cameraC;
	#marker;
	#keyMap;

	#orbitCenter = FullOrbitCameraControls.DEFAULT.ORBIT_CENTER.clone();
	#minRadius;
	#maxRadius;
	#direction = FullOrbitCameraControls.DEFAULT.DIRECTION.clone();
	#radius = FullOrbitCameraControls.DEFAULT.RADIUS.VALUE;
	#position = new Vector3();

	#clampMin = FullOrbitCameraControls.DEFAULT.CLAMP.MIN.clone();
	#clampMax = FullOrbitCameraControls.DEFAULT.CLAMP.MAX.clone();
	#enableTranslation;
	#translationSpeed;
	#enableRotation;
	#rotationSpeed;
	#enableZoom;
	#zoomSpeed;
	#enableInertia;
	#inertiaType;
	#translationInertia = new Vector3();
	#rotationInertia = new Vector3();
	#inertiaDecay;


	constructor(camera, orbitCenter, direction, radius, args = {}, scene) {
		this.locked = (args.locked !== undefined) ? args.locked : FullOrbitCameraControls.DEFAULT.LOCKED;
		this.combined = (args.combined !== undefined) ? args.combined : FullOrbitCameraControls.DEFAULT.COMBINED;
		if (this.combined) {
			this.cameraP = new Group();
			this.cameraC = camera;

			if (this.cameraC.parent === null) {
				this.cameraP.add(this.cameraC);
			} else {
				this.cameraC.parent.add(this.cameraP);
				this.cameraP.add(this.cameraC);
			}
		} else {
			this.cameraP = camera;
			this.cameraC = camera;
		}
		this.marker = (args.marker !== undefined) ? args.marker : undefined;
		this.keyMap = (args.keyMap !== undefined) ? args.keyMap : FullOrbitCameraControls.DEFAULT.KEY_MAP;

		this.orbitCenter = orbitCenter;
		this.minRadius = (args.minRadius !== undefined) ? args.minRadius : FullOrbitCameraControls.DEFAULT.RADIUS.MIN;
		this.maxRadius = (args.maxRadius !== undefined) ? args.maxRadius : FullOrbitCameraControls.DEFAULT.RADIUS.MAX;
		this.direction = direction;
		this.radius = radius;

		this.clampMin = (args.clampMin !== undefined) ? args.clampMin : FullOrbitCameraControls.DEFAULT.CLAMP.MIN;
		this.clampMax = (args.clampMax !== undefined) ? args.clampMax : FullOrbitCameraControls.DEFAULT.CLAMP.MAX;
		this.enableTranslation = (args.enableTranslation !== undefined) ? args.enableTranslation : FullOrbitCameraControls.DEFAULT.TRANSLATION.ENABLE;
		this.translationSpeed = (args.translationSpeed !== undefined) ? args.translationSpeed : FullOrbitCameraControls.DEFAULT.TRANSLATION.ENABLE;
		this.enableRotation = (args.enableRotation !== undefined) ? args.enableRotation : FullOrbitCameraControls.DEFAULT.ROTATION.ENABLE;
		this.rotationSpeed = (args.rotationSpeed !== undefined) ? args.rotationSpeed : FullOrbitCameraControls.DEFAULT.ROTATION.ENABLE;
		this.enableZoom = (args.enableZoom !== undefined) ? args.enableZoom : FullOrbitCameraControls.DEFAULT.ZOOM.ENABLE;
		this.zoomSpeed = (args.zoomSpeed !== undefined) ? args.zoomSpeed : FullOrbitCameraControls.DEFAULT.ZOOM.ENABLE;
		this.enableInertia = (args.enableInertia !== undefined) ? args.enableInertia : FullOrbitCameraControls.DEFAULT.INERTIA.ENABLE;
		this.inertiaType = undefined;
		this.translationInertia = new Vector3();
		this.rotationInertia = new Vector3();
		this.inertiaDecay = (args.inertiaDecay !== undefined) ? args.inertiaDecay : FullOrbitCameraControls.DEFAULT.INERTIA.DECAY;

		scene.add(this.cameraP);
	}


	get locked() { return this.#locked; }
	set locked(locked) { this.#locked = locked; }
	get combined() { return this.#combined; }
	set combined(combined) { this.#combined = combined; }
	get cameraP() { return this.#cameraP; }
	set cameraP(cameraP) { this.#cameraP = cameraP; }
	get cameraC() { return this.#cameraC; }
	set cameraC(cameraC) { this.#cameraC = cameraC; }
	get marker() { return this.#marker; }
	set marker(marker){ this.#marker = marker; }
	get keyMap() { return this.#keyMap; }
	set keyMap(keyMap) { this.#keyMap = keyMap; }

	get orbitCenter() { return this.#orbitCenter; }
	set orbitCenter(orbitCenter) { this.#orbitCenter.copy(orbitCenter); }
	get direction() { return this.#direction; }
	set direction(direction) { this.#direction.copy(direction).normalize(); }
	get minRadius() { return this.#minRadius; }
	set minRadius(minRadius) { this.#minRadius = minRadius; }
	get maxRadius() { return this.#maxRadius; }
	set maxRadius(maxRadius) { this.#maxRadius = maxRadius; }
	// get position() { 
	// 	return this.#position; 
	// }
	// set position(position) {
	// 	const preRadius = position.distanceTo(this.orbitCenter);
	// 	const newRadius = Math.max(this.minRadius, Math.min(this.maxRadius, preRadius));
	// 	this.#radius = newRadius;

	// 	const prePosition = position;
	// 	const newPosition = new Vector3(1.0, 1.0, 1.0).addVectors(
	// 		this.orbitCenter, 
	// 		(new Vector3(1.0, 1.0, 1.0).subVectors(
	// 			prePosition, 
	// 			this.orbitCenter
	// 		).normalize().multiplyScalar(newRadius))
	// 	);	
	// 	this.cameraP.position = newPosition;
	// 	this.#position.copy(newPosition);

	// 	if (this.marker) this.marker.scaling = new Vector3(1.0, 1.0, 1.0).multiplyScalar(newRadius / 32);
	// }
	get radius() { return this.#radius; }
	set radius(radius) { 
		// this.cameraP.position.distanceTo(this.orbitCenter)

		// set radius
		this.#radius = Math.max(this.minRadius, Math.min(this.maxRadius, radius));
		this.#radius = Math.max(Number.MIN_VALUE, Math.min(Number.MAX_VALUE, this.#radius));

		// update position
		const newPosition = new Vector3(1.0, 1.0, 1.0).addVectors(
			this.orbitCenter, 
			this.direction.clone().multiplyScalar(this.radius)
		);	
		this.#position.copy(newPosition);
		this.cameraP.position = newPosition;

		if (this.marker) this.marker.scaling = new Vector3(1.0, 1.0, 1.0).multiplyScalar(this.radius / 32);
	}

	get clampMin() { return this.#clampMin; }
	set clampMin(clampMin) { this.#clampMin.copy(clampMin); }
	get clampMax() { return this.#clampMax; }
	set clampMax(clampMax) { this.#clampMax.copy(clampMax); }
	get enableTranslation() { return this.#enableTranslation; }
	set enableTranslation(enableTranslation) { this.#enableTranslation = enableTranslation; }
	get translationSpeed() { return this.#translationSpeed; }
	set translationSpeed(translationSpeed) { this.#translationSpeed = translationSpeed; }
	get enableRotation() { return this.#enableRotation; }
	set enableRotation(enableRotation) { this.#enableRotation = enableRotation; }
	get rotationSpeed() { return this.#rotationSpeed; }
	set rotationSpeed(rotationSpeed) { this.#rotationSpeed = rotationSpeed; }
	get enableZoom() { return this.#enableZoom; }
	set enableZoom(enableZoom) { this.#enableZoom = enableZoom; }
	get zoomSpeed() { return this.#zoomSpeed; }
	set zoomSpeed(zoomSpeed) { this.#zoomSpeed = zoomSpeed; }
	get enableInertia() { return this.#enableInertia; }
	set enableInertia(enableInertia) { this.#enableInertia = enableInertia; }
	get inertiaType() { return this.#inertiaType; }
	set inertiaType(inertiaType) { this.#inertiaType = inertiaType; }
	get translationInertia() { return this.#translationInertia; }
	set translationInertia(translationInertia) { this.#translationInertia.copy(translationInertia); }
	get rotationInertia() { return this.#rotationInertia; }
	set rotationInertia(rotationInertia) { this.#rotationInertia.copy(rotationInertia); }
	get inertiaDecay() { return this.#inertiaDecay; }
	set inertiaDecay(inertiaDecay) { this.#inertiaDecay = inertiaDecay; }


	#getKeyboardVectors(keyboard, delta) {
		const translation = new Vector3();
		const rotation = new Vector3();

		if (keyboard.has(this.keyMap.MV_X_NEG)) translation.x += -1;
		if (keyboard.has(this.keyMap.MV_X_POS)) translation.x += +1;
		if (keyboard.has(this.keyMap.MV_Y_NEG)) translation.y += -1;
		if (keyboard.has(this.keyMap.MV_Y_POS)) translation.y += +1;
		if (keyboard.has(this.keyMap.MV_Z_NEG)) translation.z += -1;
		if (keyboard.has(this.keyMap.MV_Z_POS)) translation.z += +1;
		if (keyboard.has(this.keyMap.ROT_X_NEG)) rotation.x += -1;
		if (keyboard.has(this.keyMap.ROT_X_POS)) rotation.x += +1;
		if (keyboard.has(this.keyMap.ROT_Y_NEG)) rotation.y += -1;
		if (keyboard.has(this.keyMap.ROT_Y_POS)) rotation.y += +1;
		if (keyboard.has(this.keyMap.ROT_Z_NEG)) rotation.z += -1;
		if (keyboard.has(this.keyMap.ROT_Z_POS)) rotation.z += +1;

		translation.clamp(this.clampMin, this.clampMax);
		rotation.clamp(this.clampMin, this.clampMax);

		translation.multiplyScalar(this.radius * delta * 0.004);
		rotation.multiplyScalar(this.radius * delta * 0.0004);


		return { translation: translation, rotation: rotation };
	}
	#getMouseVectors(mouse, delta) {
		const translation = new Vector3();
		const rotation = new Vector3();

		translation.x = (mouse.prevPosition.x - mouse.currPosition.x);
		translation.y = (mouse.prevPosition.y - mouse.currPosition.y);
		translation.z = 0;
		rotation.x = (mouse.prevPosition.y - mouse.currPosition.y);
		rotation.y = (mouse.prevPosition.x - mouse.currPosition.x);
		rotation.z = 0;

		translation.clamp(this.clampMin, this.clampMax);
		rotation.clamp(this.clampMin, this.clampMax);

		translation.multiplyScalar(Math.min(this.radius * 1/16 * delta, 8.0));
		rotation.multiplyScalar(Math.min(this.radius * 1/16 * delta, 8.0));
		

		return { translation: translation, rotation: rotation };
	}
	#getZoomScale(mouse, delta) {
		let s = Math.pow(0.95, this.zoomSpeed * delta * 0.1);

		if (mouse.wheel.deltaY > 0) {
			s = -s;
		} else if (mouse.wheel.deltaY < 0) {
			s = s;
		}


		return { translation: new Vector3(0, 0, -s), rotation: new Vector3() };
	}

	#applyRotationPrime(vector) {
		this.cameraP.rotateX(-vector.x);
		this.cameraP.rotateY(+vector.y);


		const bVector = new Vector3(0, 0, +1).applyQuaternion(this.cameraP.quaternion);
		const fVector = new Vector3(0, 0, -1).applyQuaternion(this.cameraP.quaternion);
		const rVector = new Vector3(1, 0, 0).applyQuaternion(this.cameraP.quaternion).setY(0);
		const uVector = new Vector3().crossVectors(rVector, fVector);
		

		this.orbitCenter = this.cameraP.position.clone().add(fVector.clone().multiplyScalar(this.radius));
		this.cameraP.lookAt(this.orbitCenter, uVector);
	}
	#applyOrbitalRotationPrime(vector) {
		//transform vector to world space (only rotation is necessary for vectors)
		vector.applyQuaternion(this.cameraP.quaternion);

		const orbitCenterToCameraVector1 = this.cameraP.position.clone().sub(this.orbitCenter);
		const orbitCenterToCameraVector2 = orbitCenterToCameraVector1.clone().add(vector);
		
		orbitCenterToCameraVector1.normalize();
		orbitCenterToCameraVector2.normalize();

		const deltaRotQ = new Quaternion().setFromUnitVectors(orbitCenterToCameraVector1, orbitCenterToCameraVector2);


		const bVector = new Vector3(0, 0, +1).applyQuaternion(this.cameraP.quaternion);
		const fVector = new Vector3(0, 0, -1).applyQuaternion(this.cameraP.quaternion);
		const rVector = new Vector3(1, 0, 0).applyQuaternion(this.cameraP.quaternion).setY(0);
		const uVector = new Vector3().crossVectors(rVector, fVector);
		// const uVector = new Vector3(0, 1, 0).applyQuaternion(this.cameraP.quaternion).applyQuaternion(deltaRotQ);


		//camera world space
		this.cameraP.position = this.cameraP.position.clone().sub(this.orbitCenter).applyQuaternion(deltaRotQ).add(this.orbitCenter);
		this.cameraP.lookAt(this.orbitCenter, uVector);
		this.direction = new Vector3().subVectors(this.cameraP.position, this.orbitCenter).normalize();
	}
	#applyTranslation(vector) {
		const vector_xspace = vector.clone().applyQuaternion(this.cameraC.quaternion);
		// this.cameraP.translate(vector);
		this.cameraP.translate(vector_xspace);

		const fVector = new Vector3(0, 0, -1).applyQuaternion(this.cameraC.quaternion).applyQuaternion(this.cameraP.quaternion);

		this.orbitCenter = this.cameraP.position.clone().add(fVector.clone().multiplyScalar(this.radius));
		this.direction = new Vector3().subVectors(this.cameraP.position, this.orbitCenter).normalize();
	}
	#applyZoomTranslation(vector) {
		const vector_xspace = vector.clone().applyQuaternion(this.cameraC.quaternion);
		// this.cameraP.translate(vector);
		this.cameraP.translate(vector_xspace);

		const fVector = new Vector3(0, 0, -1).applyQuaternion(this.cameraC.quaternion).applyQuaternion(this.cameraP.quaternion);

		// this.orbitCenter = this.cameraP.position.clone().add(fVector.clone().multiplyScalar(this.radius));
		// this.direction = new Vector3().subVectors(this.cameraP.position, this.orbitCenter).normalize();
		this.radius = this.cameraP.position.distanceTo(this.orbitCenter);
	}
	#applyRotation(vector) {
		const vector_xspace = vector.clone().applyQuaternion(this.cameraC.quaternion);
		// this.cameraP.rotateY(+vector.y);
		// this.cameraC.rotateX(-vector.x);
		this.cameraC.rotateX(-vector_xspace.x);
		this.cameraP.rotateY(+vector_xspace.y);

		const fVector = new Vector3(0, 0, -1).applyQuaternion(this.cameraC.quaternion).applyQuaternion(this.cameraP.quaternion);

		this.orbitCenter = this.cameraP.position.clone().add(fVector.clone().multiplyScalar(this.radius));
		this.direction = new Vector3().subVectors(this.cameraP.position, this.orbitCenter).normalize();
	}
	#applyOrbitalRotation(vector) {
		const vector_xspace = vector.clone().applyQuaternion(this.cameraC.quaternion);
		// this.cameraP.rotateY(+vector.y);
		// this.cameraC.rotateX(-vector.x);
		this.cameraC.rotateX(-vector_xspace.x);
		this.cameraP.rotateY(+vector_xspace.y);
		
		const bVector = new Vector3(0, 0, +1).applyQuaternion(this.cameraC.quaternion).applyQuaternion(this.cameraP.quaternion);

		this.cameraP.position = this.orbitCenter.clone().add(bVector.clone().multiplyScalar(this.radius));
		this.direction = new Vector3().subVectors(this.cameraP.position, this.orbitCenter).normalize();
	}
	#applyKeyboardTransform(vectors) {
		const translationVector = vectors.translation;
		const rotationVector = vectors.rotation;

		this.#applyTranslation(translationVector);
		this.#applyRotation(rotationVector);
	}
	#applyLeftTransform(vectors) {
		const translationVector = vectors.translation;
		const rotationVector = vectors.rotation;

		this.#applyOrbitalRotation(rotationVector);
		// this.#applyOrbitalRotationPrime(translationVector.clone().multiplyScalar(16));
	}
	#applyMiddleTransform(vectors) {
		const translationVector = vectors.translation;
		const rotationVector = vectors.rotation;

		this.#applyTranslation(translationVector);
	}
	#applyRightTransform(vectors) {
		const translationVector = vectors.translation;
		const rotationVector = vectors.rotation;

		this.#applyTranslation(translationVector);
		this.#applyRotation(rotationVector);
		// this.#applyRotationPrime(rotationVector);
	}
	#applyZoomTransform(vectors) {
		const translationVector = vectors.translation;
		const rotationVector = vectors.rotation;

		this.#applyZoomTranslation(translationVector);
	}
	
	update(input, time) {
		if (this.locked) return;
	
	
		const mouse = input.mouseInput.mouse;
		const keyboard = input.keyboardInput.keyboard;


		if (keyboard.size > 0) {
			const keyboardVecotr = this.#getKeyboardVectors(keyboard, time.delta);
			this.#applyKeyboardTransform(keyboardVecotr);

			if (this.marker) this.marker.position = this.orbitCenter;
		}

		if (mouse.buttons.left && !mouse.buttons.middle && !mouse.buttons.right && this.enableRotation) {
			const mouseVectors = this.#getMouseVectors(mouse, time.delta);
			this.#applyLeftTransform(mouseVectors);
	
			if (this.marker) this.marker.position = this.orbitCenter;

			if (this.enableInertia) {
				this.inertiaType = 0;
				this.translationInertia = mouseVectors.translation;
				this.rotationInertia = mouseVectors.rotation;
			}
		}
	
		if (!mouse.buttons.left && mouse.buttons.middle && !mouse.buttons.right && this.enableTranslation) {
			const mouseVectors = this.#getMouseVectors(mouse, time.delta);
			this.#applyMiddleTransform(mouseVectors);
	
			if (this.marker) this.marker.position = this.orbitCenter;

			if (this.enableInertia) {
				this.inertiaType = 1;
				this.translationInertia = mouseVectors.translation;
				this.rotationInertia = mouseVectors.rotation;
			}
		}
	
		if (!mouse.buttons.left && !mouse.buttons.middle && mouse.buttons.right && this.enableTranslation && this.enableRotation) {
			const mouseVectors = this.#getMouseVectors(mouse, time.delta);
			this.#applyRightTransform(mouseVectors);
	
			if (this.marker) this.marker.position = this.orbitCenter;

			if (this.enableInertia) {
				this.inertiaType = 2;
				this.translationInertia = mouseVectors.translation;
				this.rotationInertia = mouseVectors.rotation;
			}
		}
	
		if (mouse.wheel.deltaY !== 0 && this.enableZoom) {
			const zoomScale = this.#getZoomScale(mouse, time.delta);
			this.#applyZoomTransform(zoomScale);

			if (this.marker) this.marker.position = this.orbitCenter;
			
			if (this.enableInertia) {
				this.inertiaType = 3;
				this.translationInertia = zoomScale.translation;
				this.rotationInertia = zoomScale.rotation;
			}
		}
	
	
		if(this.enableInertia && (this.translationInertia.length() > 0.001 || this.#rotationInertia.length() > 0.001)) {
			switch (this.inertiaType) {
				case 0:
					if (mouse.buttons.left === false) {
						this.#applyLeftTransform(
							{ 
								translation: this.translationInertia.multiplyScalar(this.inertiaDecay),
								rotation: this.rotationInertia.multiplyScalar(this.inertiaDecay),
							}
						);
					}
					break;
				case 1:
					if (mouse.buttons.middle === false) {
						this.#applyMiddleTransform(
							{
								translation: this.translationInertia.multiplyScalar(this.inertiaDecay),
								rotation: this.rotationInertia.multiplyScalar(this.inertiaDecay),
							}
						);
					}
					break;
				case 2:
					if (mouse.buttons.right === false) {
						this.#applyRightTransform(
							{
								translation: this.translationInertia.multiplyScalar(this.inertiaDecay),
								rotation: this.rotationInertia.multiplyScalar(this.inertiaDecay),
							}
						);
					}
					break;
				case 3:
					if (mouse.wheel.deltaY === 0) {
						this.#applyZoomTransform(
							{
								translation: this.translationInertia.multiplyScalar(this.inertiaDecay),
								rotation: this.rotationInertia.multiplyScalar(this.inertiaDecay),
							}
						);
					}
				default:
					break;
			}
		}
	};
};