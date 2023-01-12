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
	};


	#geometry;
	#material;
	#pickable;
	#primitive;

	#instanced;
	#instancedTranslation;
	#instanceCount;


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

		this.bufferDescriptor = new GPUBufferDescriptor(
			{
				size: (4*16) + (4*(9 + 7)),
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
						size: 4*16*2,
					}
				),
			}
		);
		this.bindGroupDescriptor = new GPUBindGroupDescriptor(
			{
				label: "mesh bind group",
				layout: null,
				entries: [
					this.bindGroupEntry,
				],
			}
		);

		this.pipelineLayoutDescriptor = new GPUPipelineLayoutDescriptor(
			{
				bindGroupLayouts: new Array(),
			}
		);
		this.vs_state =  new GPUVertexState(
			{
				module: null,
				entryPoint: "main",
				buffers: new Array(),
			}
		);
		this.fs_state = new GPUFragmentState(
			{
				module: null,
				entryPoint: "main",
				targets: [
					new GPUColorTargetState(
						{
							format: GPUTextureFormat.RGBA_8_UNORM,
						}
					),
				],
			}
		)
		this.renderPipelineDescriptor = new GPURenderPipelineDescriptor(
            {
                layout: GPUAutoLayoutMode.AUTO,
                vertex: this.vs_state,
                primitive: new GPUPrimitiveState(
                    {
                        topology: this.primitive,
                        stripIndexFormat: undefined,
                        frontFace: GPUFrontFace.CCW,
                        cullMode: GPUCullMode.NONE,
                        unclippedDepth: false,
                    }
                ),
                depthStencil: new GPUDepthStencilState(
                    {
                        format: GPUTextureFormat.DEPTH_32_FLOAT,
                        depthWriteEnabled: true,
                        depthCompare: GPUCompareFunction.LESS_EQUAL,
                        stencilFront: new GPUStencilFaceState(
                            {
                                compare: GPUCompareFunction.ALWAYS,
                                failOp: GPUStencilOperation.KEEP,
                                depthFailOp: GPUStencilOperation.KEEP,
                                passOp: GPUStencilOperation.KEEP,
                            }
                        ),
                        stencilBack: new GPUStencilFaceState(
                            {
                                compar: GPUCompareFunction.ALWAYS,
                                failOp: GPUStencilOperation.KEEP,
                                depthFailOp: GPUStencilOperation.KEEP,
                                passOp: GPUStencilOperation.KEEP,
                            }
                        ),
                        stencilReadMask: 0xFFFFFFFF,
                        stencilWriteMask: 0xFFFFFFFF,
                        depthBias: 0,
                        depthBiasSlopeScale: 0,
                        depthBiasClamp: 0,
                    }
                ),
                multisample: new GPUMultisampleState(
                    {
                        count: 1,
                        mask: 0xFFFFFFFF,
                        alphaToCoverageEnabled: false,
                    }
                ),
                fragment: this.fs_state,
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

	fillRenderArray(_renderArrayManager) {
		if (this.material.transparent) {
			_renderArrayManager.transparentObjects.addlast(this);
		} else {
			_renderArrayManager.opaqueObjects.addlast(this);
		}
	}
	async draw(renderer, renderPassEncoder, bindGroupLayout, camera) {
		const context = renderer.context;


		//geomtry property
		//************************************************* */
		if(!this.geometry.GENERATED) {
			this.geometry.generate(context, camera);
			this.geometry.GENERATED = true;
		}

		this.geometry.update(context);

		// renderPassEncoder.setVertexBuffer(0, this.geometry.vertices.buffer);
		// renderPassEncoder.setVertexBuffer(1, this.geometry.normals.buffer);
		// renderPassEncoder.setVertexBuffer(2, this.geometry.uvs.buffer);
		this.geometry.set(renderPassEncoder);




		//PER MATERIAL property (plugs into bind group descriptor)
		//************************************************* */
		if(!this.material.GENERATED){
			await this.material.generate(context, this.renderPipelineDescriptor);
			this.material.GENERATED = true;
		}

		this.material.update(context);

		renderPassEncoder.setBindGroup(3, this.material.bindGroup);




		//PER MESH property (plugs into bind group descriptor)
		//************************************************* */
		//geom + mat = mesh info
		//************************************************* */
		if(!this.GENERATED) {
			await this.generate(context, camera, bindGroupLayout);
			this.GENERATED = true;
		}
		this.updateBufferObject(context, camera);

		renderPassEncoder.setBindGroup(2, this.bindGroup);

		if(renderer.PIP != this.renderPipeline){
			renderPassEncoder.setPipeline(this.renderPipeline); //TODO add only once
			renderer.PIP = this.renderPipeline;
		}





		renderPassEncoder.draw(this.geometry.vertices.count(), this.instanceCount, 0, 0);
	}

	async generate(context, camera, bindGroupLayout) {
		this.buffer = context.createBuffer(this.bufferDescriptor);

		this.bindGroupEntry.resource.buffer = this.buffer;
		this.bindGroupLayout = context.createBindGroupLayout(this.bindGroupLayoutDescriptor);
		this.bindGroupDescriptor.layout = this.bindGroupLayout;
		this.bindGroup = context.createBindGroup(this.bindGroupDescriptor);


		this.pipelineLayoutDescriptor.bindGroupLayouts = [];
		this.pipelineLayoutDescriptor.bindGroupLayouts.push(camera.bindGroupLayout);
		this.pipelineLayoutDescriptor.bindGroupLayouts.push(bindGroupLayout);
		this.pipelineLayoutDescriptor.bindGroupLayouts.push(this.bindGroupLayout);
		this.pipelineLayoutDescriptor.bindGroupLayouts.push(this.material.bindGroupLayout);

		this.renderPipelineDescriptor.layout = context.createPipelineLayout(this.pipelineLayoutDescriptor);




		this.vs_state.buffers = [];
		this.vs_state.buffers.push(this.geometry.vertices.vertexBufferLayout);
		this.vs_state.buffers.push(this.geometry.normals.vertexBufferLayout);
		if (this.geometry.uvs) this.vs_state.buffers.push(this.geometry.uvs.vertexBufferLayout);



		this.renderPipeline  = context.createRenderPipeline(this.renderPipelineDescriptor);
	}
	updateBufferObject(context, camera) {
		const MMat = new Float32Array(this.g_MMat.elements);
		context.queue.writeBuffer(this.buffer, 0*4*16, MMat.buffer);
		this.MVMat.multiplyMatrices(camera.VMat, this.g_MMat);
		this.NMat.getNormalMatrix(this.MVMat);
		// const NMat = new Float32Array(this.NMat.elements);
		const me = this.NMat.elements;
		const NMat4 = new Matrix4().set(
			me[0], me[3], me[6], 0,
			me[1], me[4], me[7], 0,
			me[2], me[5], me[8], 0,
			    0,     0,     0, 1
		);
		const NMat = new Float32Array(NMat4.elements);
		context.queue.writeBuffer(this.buffer, 1*4*16, NMat.buffer);
	}
};