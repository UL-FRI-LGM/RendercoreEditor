import { MeshGeometry } from "./MeshGeometry.js";
import { GPURenderPipeline } from "../core/PRIMITIVES/pipelines/GPURenderPipeline.js";
import { GPUVertexBufferLayout } from "../core/DICTS/GPUVertexBufferLayout.js";
import { GPUVertexAttribute } from "../core/DICTS/GPUVertexAttribute.js";
import { GPUVertexFormat } from "../core/ENUM/GPUVertexFormat.js";
import { GPUVertexState } from "../core/DICTS/GPUVertexState.js";
import { GPUBufferDescriptor } from "../core/DICTS/GPUBufferDescriptor.js";
import { GPUPipelineLayout } from "../core/PRIMITIVES/binding/GPUPipelineLayout.js";
import { GPUPipelineLayoutDescriptor } from "../core/DICTS/GPUPipelineLayoutDescriptor.js";
import { GPUBindGroupLayoutDescriptor } from "../core/DICTS/GPUBindGroupLayoutDescriptor.js";
import { GPUBindGroupLayoutEntry } from "../core/DICTS/GPUBindGroupLayoutEntry.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { GPUBindGroupDescriptor } from "../core/DICTS/GPUBindGroupDescriptor.js";
import { GPUBindGroupEntry } from "../core/DICTS/GPUBindGroupEntry.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { Group } from "./Group.js";
import { Matrix4 } from "../RenderCore.js";
import { GPUPrimitiveTopology } from "../core/ENUM/GPUPrimitiveTopology.js";
import { GPUVertexStepMode } from "../core/ENUM/GPUVertexStepMode.js";
import { GPUFragmentState } from "../core/DICTS/GPUFragmentState.js";
import { GPUColorTargetState } from "../core/DICTS/GPUColorTargetState.js";
import { GPUTextureFormat } from "../core/ENUM/GPUTextureFormat.js";
import { GPURenderPipelineDescriptor } from "../core/DICTS/GPURenderPipelineDescriptor.js";
import { GPUPrimitiveState } from "../core/DICTS/GPUPrimitiveState.js";
import { GPUAutoLayoutMode } from "../core/ENUM/GPUAutoLayoutMode.js";
import { GPUDepthStencilState } from "../core/DICTS/GPUDepthStencilState.js";
import { GPUStencilFaceState } from "../core/DICTS/GPUStencilFaceState.js";
import { GPUCompareFunction } from "../core/ENUM/GPUCompareFunction.js";
import { GPUStencilOperation } from "../core/ENUM/GPUStencilOperation.js";
import { GPUFrontFace } from "../core/ENUM/GPUFrontFace.js";
import { GPUCullMode } from "../core/ENUM/GPUCullMode.js";
import { GPUMultisampleState } from "../core/DICTS/GPUMultisampleState.js";
import { GPUBufferUsage } from "../core/NAMESPACE/GPUBufferUsage.js";
import { GPUShaderStage } from "../core/NAMESPACE/GPUShaderStage.js";
import { GPUColorWrite } from "../core/NAMESPACE/GPUColorWrite.js";
import { GPUBlendState } from "../core/DICTS/GPUBlendState.js";
import { GPUBlendComponent } from "../core/DICTS/GPUBlendComponent.js";
import { GPUBlendOperation } from "../core/ENUM/GPUBlendOperation.js";
import { GPUBlendFactor } from "../core/ENUM/GPUBlendFactor.js";
import { GPUSamplerBindingLayout } from "../core/DICTS/GPUSamplerBindingLayout.js";
import { GPUSamplerBindingType } from "../core/ENUM/GPUSamplerBindingType.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";


export class Mesh extends Group {
	static DEFAULT = {
		NAME: "",
		TYPE: "Mesh",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new MeshGeometry(),
		MATERIAL: null,
		PICKABLE: false,
		PRIMITIVE: GPUPrimitiveTopology.TRIANGLE_LIST,

		INSTANCED: false,
		INSTANCED_TRANSLATION: false,
		INSTANCE_COUNT: 1,
		FIRST_VERTEX: 0,
		FIRST_INSTANCE: 0,
	};


	#geometry;
	#material;
	#pickable;
	#primitive;

	#instanced;
	#instancedTranslation;
	#instanceCount;
	#firstVertex = 0;
	#firstInstance = 0;


	constructor(args = {}) {
		super(
			{
				...args, 
				name: (args.name !== undefined) ? args.name : Mesh.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Mesh.DEFAULT.TYPE,
			
				visible: (args.visible !== undefined) ? args.visible : Mesh.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Mesh.DEFAULT.FRUSTUM_CULLED,
			}
		);

		this.geometry = (args.geometry !== undefined) ? args.geometry : Mesh.DEFAULT.GEOMETRY;
		this.material = (args.material !== undefined) ? args.material : Mesh.DEFAULT.MATERIAL;
		this.pickable = (args.pickable !== undefined) ? args.pickable : Mesh.DEFAULT.PICKABLE;
		this.primitive = (args.primitive !== undefined) ? args.primitive : Mesh.DEFAULT.PRIMITIVE;

		this.instanced = (args.instanced !== undefined) ? args.instanced : Mesh.DEFAULT.INSTANCED;
		this.instancedTranslation = (args.instancedTranslation !== undefined) ? args.instancedTranslation : Mesh.DEFAULT.INSTANCED_TRANSLATION;
		this.instanceCount = (args.instanceCount !== undefined) ? args.instanceCount : Mesh.DEFAULT.INSTANCE_COUNT;
		this.firstVertex = (args.firstVertex !== undefined) ? args.firstVertex : Mesh.DEFAULT.FIRST_VERTEX;
		this.firstInstance = (args.firstInstance !== undefined) ? args.firstInstance : Mesh.DEFAULT.FIRST_INSTANCE;

		this.bufferDescriptor = new BufferDescriptor(
			{
				label: "mesh buffer",
				// size: (16 + (9 + 7)) * 4,
				size: (16 + (9 + 7)),
				usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
				mappedAtCreation: false,

				arrayBuffer: new Float32Array(16 + (9 + 7)),
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
				label: "mesh bind group layout",
				entries: [
					this.bindGroupLayoutEntry,
				],
			}
		);

		this.bufferBindGroupEntry = new GPUBindGroupEntry(
			{
				binding: this.bindGroupLayoutEntry.binding,
				resource: new RCBufferBindingResource(
					{
						buffer: null,
						offset: 0,
						size: this.bufferDescriptor.size,
					}
				),
			}
		);
		this.bindGroupDescriptor = new GPUBindGroupDescriptor(
			{
				label: "mesh bind group",
				layout: null,
				entries: [
					this.bufferBindGroupEntry,
				],
			}
		);
	}


	get geometry() { return this.#geometry; }
	set geometry(geometry) { this.#geometry = geometry; }
	get material() { return this.#material; }
	set material(material) { this.#material = material; }
	get pickable() { return this.#pickable; }
	set pickable(pickable) { this.#pickable = pickable; }
	get primitive() { return this.#primitive; }
	set primitive(primitive) { this.#primitive = primitive; }

	get instanced() { return this.#instanced; }
	set instanced(instanced) {
		this.#instanced = instanced;
	}
	get instancedTranslation() { return this.#instancedTranslation; }
	set instancedTranslation(instancedTranslation) {
		this.#instancedTranslation = instancedTranslation;
	}
	get instanceCount() { return this.#instanceCount; }
	set instanceCount(instanceCount) { this.#instanceCount = instanceCount; }
	get firstVertex() { return this.#firstVertex; }
	set firstVertex(firstVertex) { this.#firstVertex = firstVertex; }
	get firstInstance() { return this.#firstInstance; }
	set firstInstance(firstInstance) { this.#firstInstance = firstInstance; }


	// draw(renderPassManager, renderer, camera) {
	// 	//record draw command
	// 	// renderPassEncoder.draw(this.geometry.vertices.count(), this.instanceCount, this.firstVertex, this.firstInstance);
	// 	renderPassManager.draw(this.geometry.vertices.count(), this.instanceCount, this.firstVertex, this.firstInstance);
	// }

	// setupContext(context) {
	// 	if (this.buffer) this.buffer.destroy();
	// 	this.buffer = context.createBuffer(this.bufferDescriptor);
	// 	this.bufferBindGroupEntry.resource.buffer = this.buffer;

	// 	this.bindGroupLayout = context.createBindGroupLayout(Mesh.bindGroupLayoutDescriptor);
	// 	this.bindGroupDescriptor.layout = this.bindGroupLayout;
		
	// 	this.bindGroup = context.createBindGroup(this.bindGroupDescriptor);
	// }
	setup(context, camera) {
		super.setup();

		this.geometry.setup(context, camera);
		this.material.setup(context);

		// this.setupContext(context, camera, renderer);
	}
	// updateContext(context, camera) {
	// 	const MMat = new Float32Array(this.g_MMat.elements);
	// 	context.queue.writeBuffer(this.buffer, 0*4*16, MMat.buffer);
	// 	this.MVMat.multiplyMatrices(camera.VMat, this.g_MMat);
	// 	this.NMat.getNormalMatrix(this.MVMat);
	// 	// const NMat = new Float32Array(this.NMat.elements);
	// 	const me = this.NMat.elements;
	// 	const NMat4 = new Matrix4().set(
	// 		me[0], me[3], me[6], 0,
	// 		me[1], me[4], me[7], 0,
	// 		me[2], me[5], me[8], 0,
	// 		    0,     0,     0, 1
	// 	);
	// 	const NMat = new Float32Array(NMat4.elements);
	// 	context.queue.writeBuffer(this.buffer, 1*4*16, NMat.buffer);
	// }
	update(context, camera) {
		super.update();

		this.MVMat.multiplyMatrices(camera.VMat, this.g_MMat);
		this.NMat.getNormalMatrix(this.MVMat);

		const me = this.NMat.elements;
		this.NMat4 = new Matrix4().set(
			me[0], me[3], me[6], 0,
			me[1], me[4], me[7], 0,
			me[2], me[5], me[8], 0,
			    0,     0,     0, 1
		);


		this.geometry.update(context);
		this.material.update(context);


		// this.updateContext(context, camera);
	}
};