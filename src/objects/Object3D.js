import { _Math } from "../math/Math.js";
import { ObjectBase } from "../core/ObjectBase.js";
import { Transform } from "../math/Transform.js";
import { Sphere } from "../math/Sphere.js";
import { Bounding } from "../math/Bounding.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";
import { ResourceBinding } from "../core/data layouts/ResourceBinding.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BindGroupLayoutEntry } from "../core/RC/resource binding/BindGroupLayoutEntry.js";
import { ShaderStage } from "../core/RC/resource binding/ShaderStage.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { BindGroupEntry } from "../core/RC/resource binding/BindGroupEntry.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { ResourcePack } from "../core/data layouts/ResourcePack.js";
import { Box3, Vector3 } from "../RenderCore.js";


export class Object3D extends ObjectBase {


	static DEFAULT = {
		TYPE: "Object3D",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: false,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new Set(),
		ANCESTORS: new Map(),
		DESCENDANTS: new Map(),

		DIRTY_CACHE: new Map(),
		INSTRUCTION_CACHE: new Map(),

		TRANSFORM: { LOCAL: new Transform(), GLOBAL: new Transform() },
		MATRIX_AUTO_UPDATE: true,

		BOUNDING: null,
	};


	#resourcePack;

	#visible = Object3D.DEFAULT.VISIBLE;
	#frustumCulled = Object3D.DEFAULT.FRUSTUM_CULLED;
	#renderOrder = Object3D.DEFAULT.RENDER_ORDER;

	#parent = null;
	#children = new Set();
	#ancestors = new Map();
	#descendants = new Map();

	#dirtyCache = new Map();
	#instructionCache = new Map();

	#transform = { local: new Transform(), global: new Transform() };
	#matrixAutoUpdate = Object3D.DEFAULT.MATRIX_AUTO_UPDATE;

	#bounding = null;


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : Object3D.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Object3D.DEFAULT.TYPE,
			}
		);

		this.resourcePack = new ResourcePack();

		this.visible = (args.visible !== undefined) ? args.visible : Object3D.DEFAULT.VISIBLE;
		this.frustumCulled = (args.frustumCulled !== undefined) ? args.frustumCulled : Object3D.DEFAULT.FRUSTUM_CULLED;
		this.renderOrder = (args.renderOrder !== undefined) ? args.renderOrder : Object3D.DEFAULT.RENDER_ORDER;

		this.parent = null;
		this.children = new Set();
		this.ancestors = new Map();
		this.descendants = new Map();

		this.dirtyCache = new Map();
		this.instructionCache = new Map();

		this.transform = { local: new Transform(), global: new Transform() };
		this.matrixAutoUpdate = (args.matrixAutoUpdate !== undefined) ? args.matrixAutoUpdate : Object3D.DEFAULT.MATRIX_AUTO_UPDATE;
	
		this.bounding = null;


		this.resourcePack.setResourceBindingInternal(
			2,
			0,
			new ResourceBinding(
				{
					number: 0,
					arrayBuffer: new Float32Array(16 + (9 + 7)),
					
					resourceDescriptor: new BufferDescriptor(
						{
							label: "object buffer",
							size: (16 + (9 + 7)),
							usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
							mappedAtCreation: false,
						}
					),
					bindGroupLayoutEntry: new BindGroupLayoutEntry(
						{
							binding: 0,
							visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
							buffer: new GPUBufferBindingLayout(
								{
									type: GPUBufferBindingType.UNIFORM,
									hasDynamicOffset: false,
									minBindingSize: 0,
								}
							),
						}
					),
					bindGroupEntry: new BindGroupEntry(
						{
							binding: 0,
							resource: new RCBufferBindingResource(
								{
									buffer: null,
									offset: 0,
									size: (16 + (9 + 7)) * 4,
								}
							),
						}
					),
				}
			)
		);
	}


	// resource bindings
	get resourcePack() { return this.#resourcePack; }
	set resourcePack(resourcePack) { this.#resourcePack = resourcePack; }

	get visible() { return this.#visible; }
	set visible(visible) { this.#visible = visible; }
	get frustumCulled() { return this.#frustumCulled; }
	set frustumCulled(frustumCulled) { this.#frustumCulled = frustumCulled; }
	get renderOrder() { return this.#renderOrder; }
	set renderOrder(renderOrder) { this.#renderOrder = renderOrder; }

	get parent() { return this.#parent; }
	set parent(parent) { 
		this.#parent = parent;
		
		if (parent !== null) parent.add(this);
	}
	get children() { return this.#children; }
	set children(children) { 
		this.#children = children; 
	
		for (const child of this.children) {
			this.add(child);
		}
	}
	get ancestors() { return this.#ancestors; }
	set ancestors(ancestors) { this.#ancestors = ancestors; }
	get descendants() { return this.#descendants; }
	set descendants(descendants) { this.#descendants = descendants; }

	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }
	get instructionCache() { return this.#instructionCache; }
	set instructionCache(instructionCache) { this.#instructionCache = instructionCache; }

	get transform() { return this.#transform; }
	set transform(transform) { 
		this.#transform = transform; 
		// this.dirtyCache.set("MMat", this.transform.local.MMat);
		// this.dirtyCache.set("MVMat", this.transform.local.MVMat);
		// this.dirtyCache.set("MVPMat", this.transform.local.MVPMat);
		// this.dirtyCache.set("NMat", this.transform.local.NMat);
	}
	get position() { return this.transform.local.position; }
	set position(position) {
		this.transform.local.position = position;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get positionX() { return this.transform.local.positionX; }
	set positionX(positionX) {
		this.transform.local.positionX = positionX;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get positionY() { return this.transform.local.positionY; }
	set positionY(positionY) {
		this.transform.local.positionY = positionY;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get positionZ() { return this.transform.local.positionZ; }
	set positionZ(positionZ) {
		this.transform.local.positionZ = positionZ;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get rotation() { return this.transform.local.rotation; }
	set rotation(rotation) {
		this.transform.local.rotation = rotation;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get rotationX() { return this.transform.local.rotationX; }
	set rotationX(rotationX) {
		this.transform.local.rotationX = rotationX;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get rotationY() { return this.transform.local.rotationY; }
	set rotationY(rotationY) {
		this.transform.local.rotationY = rotationY;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get rotationZ() { return this.transform.local.rotationZ; }
	set rotationZ(rotationZ) {
		this.transform.local.rotationZ = rotationZ;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get quaternion() { return this.transform.local.quaternion; }
	set quaternion(quaternion) {
		this.transform.local.quaternion = quaternion;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get scaling() { return this.transform.local.scaling; }
	set scaling(scaling) {
		this.transform.local.scaling = scaling;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get matrixAutoUpdate() { return this.#matrixAutoUpdate; }
	set matrixAutoUpdate(matrixAutoUpdate) { this.#matrixAutoUpdate = matrixAutoUpdate; }

	get localModelMatrix() { return this.transform.local.modelMatrix; }
	set localModelMatrix(modelMatrix) { 
		this.transform.local.modelMatrix = modelMatrix;
		
		//update global, and children
	}
	get globalModelMatrix() { return this.transform.global.modelMatrix; }
	set globalModelMatrix(modelMatrix) { 
		this.transform.global.modelMatrix = modelMatrix;

		//update bounding
		if (this.#bounding !== null) this.#updateBounding();


		//update MMat
		const instruction = this.instructionCache.has("MMat") ? 
		this.instructionCache.get("MMat") : 
		this.instructionCache.set(
			"MMat",
			new BufferSetInstruction(
				{
					label: "MMat",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array(this.g_MMat.elements),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0*16)
						}
					},
					size: (16)
				}
			)
		).get("MMat");
		instruction.source.arrayBuffer.set(this.g_MMat.elements);

		this.resourcePack.setResourceBindingValueInternal(2, 0, instruction);
	}
	get modelViewMatrix() { return this.transform.global.modelViewMatrix; }
	set modelViewMatrix(modelViewMatrix) { this.transform.global.modelViewMatrix = modelViewMatrix; }
	get modelViewProjectionMatrix() { return this.transform.global.modelViewProjectionMatrix; }
	set modelViewProjectionMatrix(modelViewProjectionMatrix) { this.transform.global.modelViewProjectionMatrix = modelViewProjectionMatrix; }
	get normalMatrix() { return this.transform.global.normalMatrix; }
	set normalMatrix(normalMatrix) { this.transform.global.normalMatrix = normalMatrix; }
	
	get l_MMat() { return this.localModelMatrix; }
	set l_MMat(l_MMat) { this.localModelMatrix = l_MMat; }
	get g_MMat() { return this.globalModelMatrix; }
	set g_MMat(g_MMat) { this.globalModelMatrix = g_MMat; }
	get MVMat() { return this.modelViewMatrix; }
	set MVMat(MVMat) { this.modelViewMatrix = MVMat; }
	get MVPMat() { return this.modelViewProjectionMatrix; }
	set MVPMat(MVPMat) { this.modelViewProjectionMatrix = MVPMat; }
	get NMat() { return this.normalMatrix; }
	set NMat(NMat) { this.normalMatrix = NMat; }

	get bounding() {
		if (this.#bounding === null) this.#bounding = this.computeBounding();


		return this.#bounding;
	}
	set bounding(bounding) { this.#bounding = bounding; }


	translateOnAxis(axis, distance) { this.transform.local.translateOnAxis(axis, distance); }
	translateX(distance) { this.transform.local.translateX(distance); }
	translateY(distance) { this.transform.local.translateY(distance); }
	translateZ(distance) { this.transform.local.translateZ(distance); }
	translate(distanceVector) { this.transform.local.translate(distanceVector); }
	rotateOnAxis(axis, angle) { this.transform.local.rotateOnAxis(axis, angle); }
	rotateX(angle) { this.transform.local.rotateX(angle); }
	rotateY(angle) { this.transform.local.rotateY(angle); }
	rotateZ(angle) { this.transform.local.rotateZ(angle); }
	rotate(angleVector) { this.transform.local.rotate(angleVector); }
	scaleOnAxis(axis, multiplier) { this.transform.local.scaleOnAxis(axis, multiplier); }
	scaleX(multiplier) { this.transform.local.scaleX(multiplier); }
	scaleY(multiplier) { this.transform.local.scaleY(multiplier); }
	scaleZ(multiplier) { this.transform.local.scaleZ(multiplier); }
	scale(multiplierVector) { this.transform.local.scale(multiplierVector); }

	updateMatrixWorld(updateParents, updateChildren) {
		if (updateParents && this.parent !== null) {
			this.parent.updateMatrixWorld(true, false);
		}

		this.l_MMat = this.l_MMat.compose(this.position, this.quaternion, this.scaling);

		if (this.parent === null) {
			this.g_MMat = this.l_MMat;
		} else {
			this.g_MMat = this.g_MMat.multiplyMatrices(this.parent.g_MMat, this.l_MMat);
		}

		if (updateChildren) {
			for (const child of this.children) {
				child.updateMatrixWorld(false, true);
			}
		}
	}

	add(object) {
		// combination of get/set parent and set/get children
		if (object === this) return;
		
		// parent
		if (object.parent !== null) object.parent.remove(object);
		object.#parent = this;

		// children
		this.children.add(object);


		object.#addAncestors(this);
		this.#addDescendants(object);
	}
	addMultiple(children) {
		for (const child of children) {
			this.add(child);
		}
	}
	remove(object) {
		// combination of get/set parent and set/get children
		if (this.children.delete(object)) object.parent = null;


		object.#removeAncestors(this);
		this.#removeDescendants(object);
	}
	removeMultiple(children) {
		for (const child of children) {
			this.remove(child);
		}
	}
	#addAncestors(firstAncestor) {
		// add ancestors to children
		for (const child of this.children) {
			child.#addAncestors(firstAncestor);
		}

		// add ancestors to this object
		firstAncestor.traverseUp((ancestor) => {
			if(!this.ancestors.has(ancestor.type)) this.ancestors.set(ancestor.type, new Set());
			this.ancestors.get(ancestor.type).add(ancestor);
		});
	}
	#removeAncestors(firstAncestor) {
		// remove ancestors from children
		for (const child of this.children) {
			child.#removeAncestors(firstAncestor);
		}

		// remove ancestors from this object
		firstAncestor.traverseUp((ancestor) => {
			if (this.ancestors.has(ancestor.type)) this.ancestors.get(ancestor.type).delete(ancestor);
		});
	}
	#addDescendants(firstDescendant) {
		// add descendants to a parent
		if (this.parent) {
			this.parent.#addDescendants(firstDescendant);
		}
		
		// add descendants to this object
		firstDescendant.traverseDown((descendant) => {
			if (!this.descendants.has(descendant.type)) this.descendants.set(descendant.type, new Set());
			this.descendants.get(descendant.type).add(descendant);
		});
	}
	#removeDescendants(firstDescendant) {
		// remove desendants from a parent
		if (this.parent) {
			this.parent.#removeDescendants(firstDescendant);
		}

		// remove descendants from this object
		firstDescendant.traverseDown((descendant) => {
			if (this.descendants.has(descendant.type)) this.descendants.get(descendant.type).delete(descendant);
		});
	}
	clear() {
		this.children.clear();
	}

	traverseUp(callback) {
		callback(this);

		if (this.parent) this.parent.traverseUp(callback);
	}
	traverseDown(callback) {
		callback(this);

		for (const child of this.children) {
			child.traverseDown(callback);
		}
	}
	traverse(callback) {
		this.traverseDown(callback);
	}

	computeBoundingSphere() {
		const boundingSpheres = new Array();

		// Fetch bounding spheres of all of the children
		this.traverse((object) => {
			if (object.geometry) {
				const boundingSphere = object.geometry.boundingSphere;

				if (!isNaN(boundingSphere.radius) && boundingSphere.radius > 0) {
					boundingSpheres.push(boundingSphere);
				}
			}
		});

		if (boundingSpheres.length > 0) {
			return _Math.computeSpheresBoundingSphere(boundingSpheres);
		} else {
			return new Sphere(new Vector3(0, 0, 0), Infinity);
		}
	}
	computeBoundingBox() {
		const boundingBoxes = new Array();

		// Fetch bounding boxes of all of the children
		this.traverse((object) => {
			if (object.geometry) {
				const boundingBox = object.geometry.boundingBox;

				boundingBoxes.push(boundingBox);
			}
		});

		if (boundingBoxes.length > 0) {
			const min = new Vector3(+Infinity, +Infinity, +Infinity);
			const max = new Vector3(-Infinity, -Infinity, -Infinity);

			for (let i = 0; i < boundingBoxes.length; i++) {
				const boundingBox = boundingBoxes[i];
				
				min.min(boundingBox.min);
				max.max(boundingBox.max);
			}

			return new Box3(min, max);
		} else {
			return new Box3(new Vector3(-Infinity, -Infinity, -Infinity), new Vector3(+Infinity, +Infinity, +Infinity));
		}
	}
	#updateBounding() {
		this.bounding.sphere.worldspace.copy(this.bounding.sphere.objectspace);
		this.bounding.sphere.worldspace.applyMatrix4(this.g_MMat);

		this.bounding.box.worldspace.copy(this.bounding.box.objectspace);
		this.bounding.box.worldspace.applyMatrix4(this.g_MMat);
	}
	computeBounding() {
		const boundingSphere_objectspace = this.computeBoundingSphere();
		const boundingSphere_worldspace = new Sphere().copy(boundingSphere_objectspace).applyMatrix4(this.g_MMat);
		const boundingBox_objectspace = this.computeBoundingBox();
		const boundingBox_worldspace = new Box3().copy(boundingBox_objectspace).applyMatrix4(this.g_MMat);

		const bounding = new Bounding(
			{
				sphere: {
					objectspace: boundingSphere_objectspace,
					worldspace: boundingSphere_worldspace,
				},
				box: {
					objectspace: boundingBox_objectspace,
					worldspace: boundingBox_worldspace,
				},
			}
		);


		return bounding;
	}
};
