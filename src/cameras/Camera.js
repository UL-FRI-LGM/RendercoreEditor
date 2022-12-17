import { GPUBindGroupDescriptor } from "../core/DICTS/GPUBindGroupDescriptor.js";
import { GPUBindGroupEntry } from "../core/DICTS/GPUBindGroupEntry.js";
import { GPUBindGroupLayoutDescriptor } from "../core/DICTS/GPUBindGroupLayoutDescriptor.js";
import { GPUBindGroupLayoutEntry } from "../core/DICTS/GPUBindGroupLayoutEntry.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferDescriptor } from "../core/DICTS/GPUBufferDescriptor.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { GPUShaderStage } from "../core/NAMESPACE/GPUShaderStage.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { Matrix4 } from "../math/Matrix4.js";
import { Group } from "../objects/Group.js";


export class Camera extends Group {
	static DEFAULT = {
		NAME: "",
		TYPE: "Camera",

		VISIBLE: true,
		FRUSTUM_CULLED: false,

		COMBINED: false,
	};


	#dirtyCache;

	#viewMatrix = new Matrix4();
	#projectionMatrix = new Matrix4();
	#projectionMatrixInverse = new Matrix4();
	// #VMat;
	// #PMat;
	// #PMatInv;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Camera.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Camera.DEFAULT.TYPE,

				visible: (args.visible !== undefined) ? args.visible : Camera.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Camera.DEFAULT.FRUSTUM_CULLED,
			}
		);

		this.dirtyCache = new Map();

		this.viewMatrix = new Matrix4(); 				//VMat
		this.projectionMatrix = new Matrix4(); 			//PMat
        this.projectionMatrixInverse = new Matrix4(); 	//PMatInv

		this.bufferDescriptor = new GPUBufferDescriptor(
			{
				size: 2*4*16,
				usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
				mappedAtCreation: false,
			}
		);
		this.bindGroupLayoutEntry = new GPUBindGroupLayoutEntry(
			{
				binding: 0,
				visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
				buffer: new GPUBufferBindingLayout(
					{
						type: GPUBufferBindingType.UNIFORM,
						hasDynamicOffset: false,
						minBindingSize: 0,
					}
				),
			}
		);
		this.bindGroupLayoutDescriptor = new GPUBindGroupLayoutDescriptor(
			{
				label: "camera bind group layout",
				entries: [
					this.bindGroupLayoutEntry,
				],
			}
		);
		this.bindGroupEntry = new GPUBindGroupEntry(
			{
				binding: 0,
				resource: new RCBufferBindingResource(
					{
						buffer: null,
						offset: 0,
						size: 2*4*16,
					}
				),
			}
		);
		this.bindGroupDescriptor = new GPUBindGroupDescriptor(
			{
				label: "camera bind group",
				layout: null,
				entries: [
					this.bindGroupEntry,
				],
			}
		);
	}


	get modelMatrix() { return super.modelMatrix; }
	set modelMatrix(modelMatrix) {
		super.modelMatrix.copy(modelMatrix);
	}
    get viewMatrix () { return this.#viewMatrix; }
	set viewMatrix (viewMatrix) { 
		this.#viewMatrix.copy(viewMatrix); 

		this.dirtyCache.set("VMat", {offset: 0*4*16, data: new Float32Array(viewMatrix.elements)});
	}
    get projectionMatrix () { return this.#projectionMatrix; }
	set projectionMatrix (projectionMatrix) { 
		this.#projectionMatrix.copy(projectionMatrix); 
		this.projectionMatrixInverse.getInverse(projectionMatrix);

		this.dirtyCache.set("PMat", {offset: 1*4*16, data: new Float32Array(projectionMatrix.elements)});
	}
    get projectionMatrixInverse() { return this.#projectionMatrixInverse; }
	set projectionMatrixInverse(projectionMatrixInverse) { this.#projectionMatrixInverse.copy(projectionMatrixInverse); }

	get VMat() { return this.viewMatrix; }
	set VMat(VMat) { this.viewMatrix = VMat; }
	get PMat() { return this.projectionMatrix; }
	set PMat(PMat) { this.projectionMatrix = PMat; }
	get PMatInv() { return this.projectionMatrixInverse; }
	set PMatInv(PMatInv) { this.projectionMatrixInverse = PMatInv; }

	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }


	create(context) {
		this.buffer = context.createBuffer(this.bufferDescriptor);
		this.bindGroupEntry.resource.buffer = this.buffer;
		this.bindGroupLayout = context.createBindGroupLayout(this.bindGroupLayoutDescriptor);
		this.bindGroupDescriptor.layout = this.bindGroupLayout;
		this.bindGroup = context.createBindGroup(this.bindGroupDescriptor);
	}
	updateUBO(context) {
		for (const [u_name, u_desc] of this.dirtyCache) {
			context.queue.writeBuffer(this.buffer, u_desc.offset, u_desc.data);
		}
		this.dirtyCache.clear();
	}
};