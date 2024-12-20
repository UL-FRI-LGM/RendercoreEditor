import { BufferBindingLayout } from "../core/RC/resource_binding/BufferBindingLayout.js";
import { BufferBindingType } from "../core/RC/resource_binding/BufferBindingType.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { Matrix4 } from "../math/Matrix4.js";
import { Group } from "../objects/Group.js";
import { Frustum } from "../RenderCore.js";
import { BindGroupLayoutEntry } from "../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { ShaderStage } from "../core/RC/resource_binding/ShaderStage.js";
import { BindGroupEntry } from "../core/RC/resource_binding/BindGroupEntry.js";
import { ResourceBinding } from "../core/data_layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../core/data_layouts/BufferSetInstruction.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { Source } from "../core/data_layouts/Source.js";
import { Float32ArrayT2 } from "../core/Float32ArrayT2.js";
import { Layout } from "../core/data_layouts/Layout.js";
import { Destination } from "../core/data_layouts/Destination.js";
import { MapT2 } from "../core/MapT2.js";


export class Camera extends Group {


	static DEFAULT = {
		NAME: "",
		TYPE: "Camera",

		VISIBLE: true,
		FRUSTUM_CULLED: false,

		RESOURCE_PACK: new ResourcePack({ name: "RP - CAMERA" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - CAMERA" },
			[
				...Group.DEFAULT.INSTRUCTION_CACHE.clone(),

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
				[
					"VMat",
					new BufferSetInstruction(
						{
							label: "VMat",
		
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
											offset: (1*16),
										}
									)
								}
							),
							size: (16)
						}
					)
				],
				[
					"PMat",
					new BufferSetInstruction(
						{
							label: "PMat",

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
											offset: (2*16),
										}
									)
								}
							),
							size: (16)
						}
					)
				]
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: "DC - CAMERA" },
			[
				...Group.DEFAULT.DIRTY_CACHE.clone(),
			]
		),
	};


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

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Camera.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Camera.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Camera.DEFAULT.DIRTY_CACHE.clone(),
			}
		);

		this.resourcePack.setResourceBindingInternal(
			0,
			0,
			new ResourceBinding(
				{
					number: 0,
					arrayBuffer: new Float32Array(16*3),
	
					resourceDescriptor: new BufferDescriptor(
						{
							label: "camera buffer",
							size: 16*3,
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
					bindGroupLayoutEntry: BindGroupLayoutEntry.CONFIGURATION.BGLE00_VVF_RB_TU,
					bindGroupEntry: new BindGroupEntry(
						{
							binding: 0,
							resource: new RCBufferBindingResource(
								{
									buffer: null,
									offset: 0,
									size: (16*3) * 4,
								}
							),
						}
					),
				}
			)
		);

		this.viewMatrix = new Matrix4(); 				//VMat
		this.projectionMatrix = new Matrix4(); 			//PMat
        this.projectionMatrixInverse = new Matrix4(); 	//PMatInv
		this.viewProjectionMatrix = new Matrix4();		//VPMat

		this.frustum = new Frustum();
	}


	get localModelMatrix() { return super.localModelMatrix; }
	set localModelMatrix(modelMatrix) { super.localModelMatrix = modelMatrix; }
	get globalModelMatrix() { return super.globalModelMatrix; }
	set globalModelMatrix(modelMatrix) { 
		super.globalModelMatrix = modelMatrix;

		this.VMat = this.VMat.getInverse(this.g_MMat);

		const instruction = this.instructionCache.get("MMat");
		instruction.source.arrayBuffer.set(this.g_MMat.elements);

		this.resourcePack.setResourceBindingValueInternal(0, 0, instruction);
	}

    get viewMatrix() { return this.#viewMatrix; }
	set viewMatrix(viewMatrix) { 
		this.#viewMatrix.copy(viewMatrix); 

		this.VPMat = this.VPMat.multiplyMatrices(this.PMat, this.VMat);

		const instruction = this.instructionCache.get("VMat");
		instruction.source.arrayBuffer.set(viewMatrix.elements);

		this.resourcePack.setResourceBindingValueInternal(0, 0, instruction);
	}
    get projectionMatrix() { return this.#projectionMatrix; }
	set projectionMatrix(projectionMatrix) { 
		this.#projectionMatrix.copy(projectionMatrix); 

		this.projectionMatrixInverse.getInverse(projectionMatrix);
		this.VPMat = this.VPMat.multiplyMatrices(this.PMat, this.VMat);

		const instruction = this.instructionCache.get("PMat");
		instruction.source.arrayBuffer.set(projectionMatrix.elements);

		this.resourcePack.setResourceBindingValueInternal(0, 0, instruction);
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


	setup(args = {}) {
		super.setup(args);
	}
	update(args = {}) {
		super.update(args);
	}
};