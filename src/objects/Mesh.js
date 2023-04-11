import { MeshGeometry } from "./MeshGeometry.js";
import { GPUBufferBindingLayout } from "../core/DICTS/GPUBufferBindingLayout.js";
import { RCBufferBindingResource } from "../core/RCBufferBindingResource.js";
import { GPUBufferBindingType } from "../core/ENUM/GPUBufferBindingType.js";
import { Group } from "./Group.js";
import { Matrix4 } from "../RenderCore.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { UniformGroupDescriptor } from "../core/data layouts/UniformGroupDescriptor.js";
import { BindGroupLayoutDescriptor } from "../core/RC/resource binding/BindGroupLayoutDescriptor.js";
import { BindGroupLayoutEntry } from "../core/RC/resource binding/BindGroupLayoutEntry.js";
import { ShaderStage } from "../core/RC/resource binding/ShaderStage.js";
import { BindGroupEntry } from "../core/RC/resource binding/BindGroupEntry.js";
import { BindGroupDescriptor } from "../core/RC/resource binding/BindGroupDescriptor.js";
import { ResourceBinding } from "../core/data layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class Mesh extends Group {

	
	static DEFAULT = {
		NAME: "",
		TYPE: "Mesh",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new MeshGeometry(),
		MATERIAL: null,
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,

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

		this.uniformGroupDescriptor = new UniformGroupDescriptor(
			{
				label: "mesh resource group",
				number: 2,
				resourceBindings: new Map(
					[
						[
							0,
							new ResourceBinding(
								{
									number: 0,
									arrayBuffer: new Float32Array(16 + (9 + 7)),
									
									resourceDescriptor: new BufferDescriptor(
										{
											label: "mesh buffer",
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
						]
					]
				),
				resourceBindingsExteral: new Map(),

				// bindingDescriptors: [
				// 	new BindingDescriptor(
				// 		{
				// 			binding: 0,
				// 			arrayBuffer: new Float32Array(16 + (9 + 7)),
				// 			resourceDescriptor: new BufferDescriptor(
				// 				{
				// 					label: "mesh buffer",
				// 					size: (16 + (9 + 7)),
				// 					usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
				// 					mappedAtCreation: false,
				// 				}
				// 			)
				// 		}
				// 	)
				// ],
				bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
					{
						label: "mesh bind group layout",
						entries: [
							// new BindGroupLayoutEntry(
							// 	{
							// 		binding: 0,
							// 		visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
							// 		buffer: new GPUBufferBindingLayout(
							// 			{
							// 				type: GPUBufferBindingType.UNIFORM,
							// 				hasDynamicOffset: false,
							// 				minBindingSize: 0,
							// 			}
							// 		),
							// 	}
							// ),
						]
					}
				),
				// bindGroupLayoutDescriptor: BindGroupLayoutDescriptor.CONFIGURATION.G02_O,
				bindGroupDescriptor: new BindGroupDescriptor(
					{
						label: "mesh bind group",
						layout: null,
						entries: [
							// new BindGroupEntry(
							// 	{
							// 		binding: 0,
							// 		resource: new RCBufferBindingResource(
							// 			{
							// 				buffer: null,
							// 				offset: 0,
							// 				size: (16 + (9 + 7)) * 4,
							// 			}
							// 		),
							// 	}
							// ),
						],
					}
				)
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

	get transform() { return super.transform; }
	set transform(transform) {
		super.transform = transform;
	}

	setup(context, camera) {
		super.setup();

		// this.geometry.setup(context, camera);
		// this.material.setup(context);

		// this.setupContext(context, camera, renderer);
	}
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


		// this.geometry.update(context);
		// this.material.update(context);


		// this.updateContext(context, camera);


		//set resource / set binding / update resource / update binding
		//binding update
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
		instruction.source.arrayBuffer = new Float32Array(this.g_MMat.elements);

		this.setBufferBinding("MMat", instruction);


		const instruction2 = this.instructionCache.has("NMat") ? 
		this.instructionCache.get("NMat") : 
		this.instructionCache.set(
			"NMat",
			new BufferSetInstruction(
				{
					label: "NMat",

					number: 0,
					target: ResourceBinding.TARGET.INTERNAL,

					source: {
						arrayBuffer: new Float32Array(this.NMat4.elements),
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (1*16)
						}
					},
					size: (16)
				}
			)
		).get("NMat");
		instruction2.source.arrayBuffer = new Float32Array(this.NMat4.elements);

		this.setBufferBinding("NMat", instruction2);
	}

	setBufferBinding(name, setInstruction) {
		this.uniformGroupDescriptor.setBufferBinding(name, setInstruction);
	}
};