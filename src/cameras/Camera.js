import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { Matrix4 } from "../math/Matrix4.js";
import { Group } from "../objects/Group.js";
import { Frustum } from "../RenderCore.js";
import { UniformGroupDescriptor } from "../core/data layouts/UniformGroupDescriptor.js";
import { BindGroupLayoutEntry } from "../core/RC/resource binding/BindGroupLayoutEntry.js";
import { ShaderStage } from "../core/RC/resource binding/ShaderStage.js";
import { BindGroupLayoutDescriptor } from "../core/RC/resource binding/BindGroupLayoutDescriptor.js";
import { BindGroupEntry } from "../core/RC/resource binding/BindGroupEntry.js";
import { BindGroupDescriptor } from "../core/RC/resource binding/BindGroupDescriptor.js";


export class Camera extends Group {


	static DEFAULT = {
		NAME: "",
		TYPE: "Camera",

		VISIBLE: true,
		FRUSTUM_CULLED: false,
	};


	// #dirtyCache = new Map();

	#viewMatrix = new Matrix4();
	#projectionMatrix = new Matrix4();
	#projectionMatrixInverse = new Matrix4();
	#viewProjectionMatrix = new Matrix4();
	// #VMat;
	// #PMat;
	// #PMatInv;

	#frustum = new Frustum();


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

		// this.dirtyCache = new Map();

		this.viewMatrix = new Matrix4(); 				//VMat
		this.projectionMatrix = new Matrix4(); 			//PMat
        this.projectionMatrixInverse = new Matrix4(); 	//PMatInv
		this.viewProjectionMatrix = new Matrix4();		//VPMat

		this.frustum = new Frustum();

		this.uniformGroupDescriptor = new UniformGroupDescriptor(
			{
				resourceDescriptors: [
					new BufferDescriptor(
						{
							label: "camera buffer",
							// size: (16*2) * 4,
							size: 16*2,
							usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
							mappedAtCreation: false,
						}
					)
				],
				bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
					{
						label: "camera bind group layout",
						entries: [
							new BindGroupLayoutEntry(
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
						],
					}
				),
				bindGroupDescriptor: new BindGroupDescriptor(
					{
						label: "camera bind group",
						layout: null,
						entries: [
							new BindGroupEntry(
								{
									binding: 0,
									resource: new RCBufferBindingResource(
										{
											buffer: null,
											offset: 0,
											size: (16*2) * 4,
										}
									),
								}
							),
						],
					}
				)
			}
		);
	}


	// get dirtyCache() { return this.#dirtyCache; }
	// set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }

	get localModelMatrix() { return super.localModelMatrix; }
	set localModelMatrix(modelMatrix) { super.localModelMatrix = modelMatrix; }
	get globalModelMatrix() { return super.globalModelMatrix; }
	set globalModelMatrix(modelMatrix) { 
		super.globalModelMatrix = modelMatrix;

		this.VMat = this.VMat.getInverse(this.g_MMat);
	}

    get viewMatrix() { return this.#viewMatrix; }
	set viewMatrix(viewMatrix) { 
		this.#viewMatrix.copy(viewMatrix); 

		this.VPMat = this.VPMat.multiplyMatrices(this.PMat, this.VMat);

		this.dirtyCache.set("VMat", {bufferOffset: 0*4*16, data: new Float32Array(viewMatrix.elements).buffer, dataOffset: 0, size: 4*16});
	}
    get projectionMatrix() { return this.#projectionMatrix; }
	set projectionMatrix(projectionMatrix) { 
		this.#projectionMatrix.copy(projectionMatrix); 

		this.projectionMatrixInverse.getInverse(projectionMatrix);
		this.VPMat = this.VPMat.multiplyMatrices(this.PMat, this.VMat);

		this.dirtyCache.set("PMat", {bufferOffset: 1*4*16, data: new Float32Array(projectionMatrix.elements).buffer, dataOffset: 0, size: 4*16});
	}
    get projectionMatrixInverse() { return this.#projectionMatrixInverse; }
	set projectionMatrixInverse(projectionMatrixInverse) { 
		this.#projectionMatrixInverse.copy(projectionMatrixInverse); 
	}
	get viewProjectionMatrix() { return this.#viewProjectionMatrix; }
	set viewProjectionMatrix(viewProjectionMatrix) { 
		this.#viewProjectionMatrix.copy(viewProjectionMatrix);

		this.frustum.setFromMatrix(this.VPMat);
	}

	get VMat() { return this.viewMatrix; }
	set VMat(VMat) { this.viewMatrix = VMat; }
	get PMat() { return this.projectionMatrix; }
	set PMat(PMat) { this.projectionMatrix = PMat; }
	get PMatInv() { return this.projectionMatrixInverse; }
	set PMatInv(PMatInv) { this.projectionMatrixInverse = PMatInv; }
	get VPMat() { return this.viewProjectionMatrix; }
	set VPMat(VPMat) { this.viewProjectionMatrix = VPMat; }

	get frustum() { return this.#frustum; }
	set frustum(frustum) { 
		this.#frustum.copy(frustum); 
	
		this.frustum.setFromMatrix(this.VPMat);
	}
};