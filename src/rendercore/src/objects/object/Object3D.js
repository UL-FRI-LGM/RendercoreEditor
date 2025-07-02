import { _Math } from "../../math/Math.js";
import { ObjectBase } from "../../core/ObjectBase.js";
import { Transform } from "../../math/Transform.js";
import { BoundingSphere } from "../../math/BoundingSphere.js";
import { BoundingBox } from "../../math/BoundingBox.js";
import { Bounding } from "../../math/Bounding.js";
import { BufferSetInstruction } from "../../core/data_layouts/BufferSetInstruction.js";
import { ResourceBinding } from "../../core/data_layouts/ResourceBinding.js";
import { BufferDescriptor } from "../../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../../core/RC/buffers/BufferUsage.js";
import { BindGroupLayoutEntry } from "../../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { ShaderStage } from "../../core/RC/resource_binding/ShaderStage.js";
import { BufferBindingLayout } from "../../core/RC/resource_binding/BufferBindingLayout.js";
import { BufferBindingType } from "../../core/RC/resource_binding/BufferBindingType.js";
import { BindGroupEntry } from "../../core/RC/resource_binding/BindGroupEntry.js";
import { RCBufferBindingResource } from "../../core/RCBufferBindingResource.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { Vector3 } from "../../RenderCore.js";
import { Geometry } from "./Geometry.js";
import { Material } from "../../materials/Material.js";
import { Helper } from "./Helper.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";
import { Source } from "../../core/data_layouts/Source.js";
import { Float32ArrayT2 } from "../../core/Float32ArrayT2.js";
import { Layout } from "../../core/data_layouts/Layout.js";
import { Destination } from "../../core/data_layouts/Destination.js";
import { MapT2 } from "../../core/MapT2.js";
import { SetT2 } from "../../core/SetT2.js";


export class Object3D extends ObjectBase {


	static DEFAULT = {
		TYPE: "Object3D",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: false,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2({ name: `C - ${Object3D.name}` }),
		ANCESTORS: new MapT2({ name: `A - ${Object3D.name}` }),
		DESCENDANTS: new MapT2({ name: `D - ${Object3D.name}` }),

		RESOURCE_PACK: new ResourcePack({ name: "RP - OBJECT3D" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - OBJECT3D" },
			[
				[
					"MMat",
					new BufferSetInstruction(
						{
							label: "MMat",
		
							number: 0,
							target: ResourceBinding.TARGET.INTERNAL,
		
							source: new Source(
								{
									arrayBuffer: new Float32ArrayT2({}, 16),
									layout: new Layout(
										{
											offset: (0),
										}
									)
								}
							),
							destination: new Destination(
								{
									buffer: null,
									layout: new Layout(
										{
											offset: (0*16),
										}
									)
								}
							),
							size: (16)
						}
					)
				],
			]
		),
		DIRTY_CACHE: new MapT2({ name: "DC - OBJECT3D" }),

		TRANSFORM: { LOCAL: new Transform(), GLOBAL: new Transform() },
		MATRIX_AUTO_UPDATE: true,

		BOUNDING: new Bounding(),
		BOUNDING_AUTO_UPDATE: true,

		GEOMETRY: null,
		MATERIAL: null,
		HELPER: new Helper(),
	};


	#visible = Object3D.DEFAULT.VISIBLE;
	#frustumCulled = Object3D.DEFAULT.FRUSTUM_CULLED;
	#renderOrder = Object3D.DEFAULT.RENDER_ORDER;

	#parent = Object3D.DEFAULT.PARENT;
	#children = Object3D.DEFAULT.CHILDREN.clone(false);
	#ancestors = Object3D.DEFAULT.ANCESTORS.clone(false);
	#descendants = Object3D.DEFAULT.DESCENDANTS.clone(false);

	#resourcePack;
	#instructionCache;
	#dirtyCache;

	#transform = { local: new Transform(), global: new Transform() };
	#matrixAutoUpdate = Object3D.DEFAULT.MATRIX_AUTO_UPDATE;

	#bounding = new Bounding();
	#boundingAutoUpdate = Object3D.DEFAULT.BOUNDING_AUTO_UPDATE;

	#geometry = new Geometry();
	#material = new Material();
	#helper = new Helper();


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : Object3D.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Object3D.DEFAULT.TYPE,
			}
		);

		this.visible = (args.visible !== undefined) ? args.visible : Object3D.DEFAULT.VISIBLE;
		this.frustumCulled = (args.frustumCulled !== undefined) ? args.frustumCulled : Object3D.DEFAULT.FRUSTUM_CULLED;
		this.renderOrder = (args.renderOrder !== undefined) ? args.renderOrder : Object3D.DEFAULT.RENDER_ORDER;

		this.parent = (args.parent !== undefined) ? args.parent : Object3D.DEFAULT.PARENT;
		this.children = (args.children !== undefined) ? args.children : Object3D.DEFAULT.CHILDREN.clone();
		this.ancestors = (args.ancestors !== undefined) ? args.ancestors : Object3D.DEFAULT.ANCESTORS.clone();
		this.descendants = (args.descendants !== undefined) ? args.descendants : Object3D.DEFAULT.DESCENDANTS.clone();

		this.resourcePack = (args.resourcePack !== undefined) ? args.resourcePack : Object3D.DEFAULT.RESOURCE_PACK.clone();
		this.instructionCache = (args.instructionCache !== undefined) ? args.instructionCache: Object3D.DEFAULT.INSTRUCTION_CACHE.clone();
		this.dirtyCache = (args.dirtyCache !== undefined) ? args.dirtyCache : Object3D.DEFAULT.DIRTY_CACHE.clone();

		this.transform = { local: new Transform(), global: new Transform() };
		this.matrixAutoUpdate = (args.matrixAutoUpdate !== undefined) ? args.matrixAutoUpdate : Object3D.DEFAULT.MATRIX_AUTO_UPDATE;
	
		this.bounding = (args.bounding !== undefined) ? args.bounding : Object3D.DEFAULT.BOUNDING.clone();
		this.boundingAutoUpdate = (args.boundingAutoUpdate !== undefined) ? args.boundingAutoUpdate : Object3D.DEFAULT.BOUNDING_AUTO_UPDATE;

		this.geometry = (args.geometry !== undefined) ? args.geometry : this.geometry;
		this.material = (args.material !== undefined) ? args.material : this.material;
		this.helper = (args.helper !== undefined) ? args.helper : Object3D.DEFAULT.HELPER.clone(true, false);

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
							buffer: new BufferBindingLayout(
								{
									type: BufferBindingType.UNIFORM,
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

	// resource bindings
	get resourcePack() { return this.#resourcePack; }
	set resourcePack(resourcePack) { this.#resourcePack = resourcePack; }	
	get instructionCache() { return this.#instructionCache; }
	set instructionCache(instructionCache) { this.#instructionCache = instructionCache; }
	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }

	get transform() { return this.#transform; }
	set transform(transform) { 
		this.#transform = transform; 
		// this.dirtyCache.set("MMat", this.transform.local.MMat);
		// this.dirtyCache.set("MVMat", this.transform.local.MVMat);
		// this.dirtyCache.set("MVPMat", this.transform.local.MVPMat);
		// this.dirtyCache.set("NMat", this.transform.local.NMat);
	}
	get translation() { return this.transform.local.translation; }
	set translation(translation) {
		this.transform.local.translation = translation;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get translationX() { return this.transform.local.translationX; }
	set translationX(translationX) {
		this.transform.local.translationX = translationX;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get translationY() { return this.transform.local.translationY; }
	set translationY(translationY) {
		this.transform.local.translationY = translationY;
		this.dirtyCache.set("local transform", this.transform.local.MMat);
	}
	get translationZ() { return this.transform.local.translationZ; }
	set translationZ(translationZ) {
		this.transform.local.translationZ = translationZ;
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

	get position() { return this.translation; }
	set position(position) { this.translation = position; }
	get positionX() { return this.translationX; }
	set positionX(positionX) { this.translationX = positionX; }
	get positionY() { return this.translationY; }
	set positionY(positionY) { this.translationY = positionY; }
	get positionZ() { return this.translationZ; }
	set positionZ(positionZ) { this.translationZ = positionZ; }

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
		const instruction = this.instructionCache.get("MMat");
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

	get bounding() { return this.#bounding; }
	set bounding(bounding) { this.#bounding = bounding; }
	get boundingAutoUpdate() { return this.#boundingAutoUpdate; }
	set boundingAutoUpdate(boundingAutoUpdate) { this.#boundingAutoUpdate = boundingAutoUpdate; }

	get geometry() { return this.#geometry; }
	set geometry(geometry) { this.#geometry = geometry; }
	get material() { return this.#material; }
	set material(material) { this.#material = material; }
	get helper() { return this.#helper; }
	set helper(helper) {
		this.#helper = helper;
	
		this.helper.target = this;
	}


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

	#computeTransform() {
		this.l_MMat = this.l_MMat.compose(this.translation, this.quaternion, this.scaling);

		if (this.parent === null) {
			this.g_MMat = this.l_MMat;
		} else {
			this.g_MMat = this.g_MMat.multiplyMatrices(this.parent.g_MMat, this.l_MMat);
		}
	}
	#updateTransform(updateParents, updateChildren) {
		if (updateParents && this.parent !== null) {
			this.parent.#updateTransform(true, false);
		}

		this.#computeTransform();

		if (updateChildren) {
			for (const child of this.children) {
				child.#updateTransform(false, true);
			}
		}
	}

	#computeBoundingSphere = (() => {
		const BS = new BoundingSphere();


		return () => {
			const BS_L_O = this.bounding.sphere.local.objectspace;
			const BS_L_W = this.bounding.sphere.local.worldspace;
			const BS_G_O = this.bounding.sphere.global.objectspace;
			const BS_G_W = this.bounding.sphere.global.worldspace;


			BS_L_O.copy(this.geometry.boundingSphere);
			BS_L_W.copy(BS_L_O).applyMatrix4(this.g_MMat);
			
			BS_G_O.copy(this.geometry.boundingSphere);
			BS_G_W.copy(this.geometry.boundingSphere).applyMatrix4(this.g_MMat);

			for (const child of this.children) {
				BS_G_O.union(BS.copy(child.bounding.sphere.global.objectspace).applyMatrix4(child.l_MMat));
				BS_G_W.union(child.bounding.sphere.global.worldspace);
			}
		};
	})();
	#computeBoundingBox = (() => {
		const BB = new BoundingBox();


		return () => {
			const BB_L_O = this.bounding.box.local.objectspace;
			const BB_L_W = this.bounding.box.local.worldspace;
			const BB_G_O = this.bounding.box.global.objectspace;
			const BB_G_W = this.bounding.box.global.worldspace;


			BB_L_O.copy(this.geometry.boundingBox);
			BB_L_W.copy(BB_L_O).applyMatrix4(this.g_MMat);

			BB_G_O.copy(this.geometry.boundingBox);
			BB_G_W.copy(this.geometry.boundingBox).applyMatrix4(this.g_MMat);

			for (const child of this.children) {
				BB_G_O.union(BB.copy(child.bounding.box.global.objectspace).applyMatrix4(child.l_MMat));
				BB_G_W.union(child.bounding.box.global.worldspace);
			}
		};
	})();
	#computeBounding() {
		this.#computeBoundingSphere();
		this.#computeBoundingBox();
	}
	#updateBounding(updateParents, updateChildren) {
		if (updateChildren) {
			for (const child of this.children) {
				child.#updateBounding(false, true);
			}
		}

		this.#computeBounding();

		if (updateParents && this.parent !== null) {
			this.parent.#updateBounding(true, false);
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

	setup(args = {}) {
		// NOOP
	}
	update(args = {}) {
		this.#updateTransform(args.updateParents, args.updateChildren);
	}
};
