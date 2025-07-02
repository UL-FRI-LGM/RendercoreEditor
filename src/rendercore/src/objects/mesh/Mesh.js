import { Group } from "../group/Group.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { Matrix4 } from "../../RenderCore.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ResourceBinding } from "../../core/data_layouts/ResourceBinding.js";
import { BufferSetInstruction } from "../../core/data_layouts/BufferSetInstruction.js";
import { BufferDescriptor } from "../../core/RC/buffers/BufferDescriptor.js";
import { BufferUsage } from "../../core/RC/buffers/BufferUsage.js";
import { BindGroupLayoutEntry } from "../../core/RC/resource_binding/BindGroupLayoutEntry.js";
import { ShaderStage } from "../../core/RC/resource_binding/ShaderStage.js";
import { BufferBindingLayout } from "../../core/RC/resource_binding/BufferBindingLayout.js";
import { BufferBindingType } from "../../core/RC/resource_binding/BufferBindingType.js";
import { BindGroupEntry } from "../../core/RC/resource_binding/BindGroupEntry.js";
import { RCBufferBindingResource } from "../../core/RCBufferBindingResource.js";
import { MeshHelper } from "./MeshHelper.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";
import { Source } from "../../core/data_layouts/Source.js";
import { Float32ArrayT2 } from "../../core/Float32ArrayT2.js";
import { Layout } from "../../core/data_layouts/Layout.js";
import { Destination } from "../../core/data_layouts/Destination.js";
import { MapT2 } from "../../core/MapT2.js";
import { SetT2 } from "../../core/SetT2.js";


export class Mesh extends Group {

	
	static DEFAULT = {
		NAME: "",
		TYPE: "Mesh",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Mesh.name}` },
			[
				...Group.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Mesh.name}` },
			[
				...Group.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Mesh.name}` },
			[
				...Group.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: "RP - MESH" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - MESH" },
			[
				...Group.DEFAULT.INSTRUCTION_CACHE.clone(),

				[
					"NMat",
					new BufferSetInstruction(
						{
							label: "NMat",

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
				]
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: "DC - MESH" },
			[
				...Group.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new MeshGeometry(),
		MATERIAL: null,
		HELPER: new MeshHelper(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,

		// INSTANCED: false,
		// INSTANCED_TRANSLATION: false,
		INDEX_COUNT: Infinity,
		VERTEX_COUNT: Infinity,
		INSTANCE_COUNT: 1,
		FIRST_INDEX: 0,
		FIRST_VERTEX: 0,
		FIRST_INSTANCE: 0,
		BASE_VERTEX: 0,

		INSTANCES: new Array(new Matrix4()),
	};


	#pickable;
	#primitive;

	// #instanced;
	// #instancedTranslation;
	#indexCount = Infinity;
	#vertexCount = Infinity;
	#instanceCount = 1;
	#firstIndex = 0;
	#firstVertex = 0;
	#firstInstance = 0;
	#baseVertex = 0;

	#instances = new Array(new Matrix4());


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : Mesh.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Mesh.DEFAULT.TYPE,
			
				visible: (args.visible !== undefined) ? args.visible : Mesh.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Mesh.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Mesh.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Mesh.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Mesh.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Mesh.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Mesh.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Mesh.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Mesh.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Mesh.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Mesh.DEFAULT.MATERIAL,
				helper: (args.helper !== undefined) ? args.helper : Mesh.DEFAULT.HELPER.clone(true, false),
			}
		);

		this.pickable = (args.pickable !== undefined) ? args.pickable : Mesh.DEFAULT.PICKABLE;
		this.primitive = (args.primitive !== undefined) ? args.primitive : Mesh.DEFAULT.PRIMITIVE;

		// this.instanced = (args.instanced !== undefined) ? args.instanced : Mesh.DEFAULT.INSTANCED;
		// this.instancedTranslation = (args.instancedTranslation !== undefined) ? args.instancedTranslation : Mesh.DEFAULT.INSTANCED_TRANSLATION;
		this.indexCount = (args.indexCount !== undefined) ? args.indexCount : Mesh.DEFAULT.INDEX_COUNT;
		this.vertexCount = (args.vertexCount !== undefined) ? args.vertexCount : Mesh.DEFAULT.VERTEX_COUNT;
		this.instanceCount = (args.instanceCount !== undefined) ? args.instanceCount : Mesh.DEFAULT.INSTANCE_COUNT;
		this.firstIndex = (args.firstIndex !== undefined) ? args.firstIndex : Mesh.DEFAULT.FIRST_INDEX;
		this.firstVertex = (args.firstVertex !== undefined) ? args.firstVertex : Mesh.DEFAULT.FIRST_VERTEX;
		this.firstInstance = (args.firstInstance !== undefined) ? args.firstInstance : Mesh.DEFAULT.FIRST_INSTANCE;
		this.baseVertex = (args.baseVertex !== undefined) ? args.baseVertex : Mesh.DEFAULT.BASE_VERTEX;

		this.instances = (args.instances !== undefined) ? args.instances : new Array(...Mesh.DEFAULT.INSTANCES);

		this.NMat4 = new Matrix4();


		this.updateResources();
	}


	get localModelMatrix() { return super.localModelMatrix; }
	set localModelMatrix(modelMatrix) { super.localModelMatrix = modelMatrix; }
	get globalModelMatrix() { return super.globalModelMatrix; }
	set globalModelMatrix(modelMatrix) { 
		super.globalModelMatrix = modelMatrix;


		// PERFORMANCE
		// old MMat computation
		// this.MVMat.multiplyMatrices(camera.VMat, this.g_MMat);
		// this.NMat.getNormalMatrix(this.MVMat); 
		// new MMat computation
		this.NMat.getNormalMatrix(this.g_MMat);

		const me = this.NMat.elements;
		this.NMat4.set(
			me[0], me[3], me[6], 0,
			me[1], me[4], me[7], 0,
			me[2], me[5], me[8], 0,
			    0,     0,     0, 1
		);


		//set resource / set binding / update resource / update binding
		//binding update
		const instruction = this.instructionCache.get("NMat");
		instruction.source.arrayBuffer.set(this.NMat4.elements);

		this.resourcePack.setResourceBindingValueInternal(2, 0, instruction);
	}

	get pickable() { return this.#pickable; }
	set pickable(pickable) { this.#pickable = pickable; }
	get primitive() { return this.#primitive; }
	set primitive(primitive) { this.#primitive = primitive; }

	// get instanced() { return this.#instanced; }
	// set instanced(instanced) {
	// 	this.#instanced = instanced;
	// }
	// get instancedTranslation() { return this.#instancedTranslation; }
	// set instancedTranslation(instancedTranslation) {
	// 	this.#instancedTranslation = instancedTranslation;
	// }
	get indexCount() {
		// return this.#indexCount ?? this.geometry.indices.count();
		return Math.min(this.#indexCount, this.geometry.indices.count());
	}
	set indexCount(indexCount) {
		this.#indexCount = Math.floor(indexCount);
	}
	get vertexCount() {
		// return this.#vertexCount ?? this.geometry.vertices.count();
		return Math.min(this.#vertexCount, this.geometry.vertices.count());
	}
	set vertexCount(vertexCount) {
		this.#vertexCount = Math.floor(vertexCount);
	}
	get instanceCount() {
		// return this.#instanceCount ?? this.instances.length;
		return Math.min(this.#instanceCount, this.instances.length);
	}
	set instanceCount(instanceCount) {
		this.#instanceCount = Math.floor(instanceCount);


		this.updateResources();
	}
	get firstIndex() { return this.#firstIndex; }
	set firstIndex(firstIndex) { this.#firstIndex = firstIndex; }
	get firstVertex() { return this.#firstVertex; }
	set firstVertex(firstVertex) { this.#firstVertex = firstVertex; }
	get firstInstance() { return this.#firstInstance; }
	set firstInstance(firstInstance) { this.#firstInstance = firstInstance; }
	get baseVertex() { return this.#baseVertex; }
	set baseVertex(baseVertex) { this.#baseVertex = baseVertex; }

	get instances() { return this.#instances; }
	set instances(instances) {
		this.#instances = instances;


		this.updateResources();
	}

	get transform() { return super.transform; }
	set transform(transform) {
		super.transform = transform;
	}


	updateResources() {
		const instanceCount = this.instanceCount;
		const instances = this.instances;


		this.resourcePack.setResourceBindingInternal(
			2,
			1,
			new ResourceBinding(
				{
					number: 1,
					arrayBuffer: new Float32Array(instanceCount * 16),
					
					resourceDescriptor: new BufferDescriptor(
						{
							label: "object instance buffer",
							size: (instanceCount * 16),
							usage: BufferUsage.STORAGE | BufferUsage.COPY_DST,
							mappedAtCreation: false,
						}
					),
					bindGroupLayoutEntry: new BindGroupLayoutEntry(
						{
							binding: 1,
							visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
							buffer: new BufferBindingLayout(
								{
									type: BufferBindingType.READ_ONLY_STORAGE,
									hasDynamicOffset: false,
									minBindingSize: 0,
								}
							),
						}
					),
					bindGroupEntry: new BindGroupEntry(
						{
							binding: 1,
							resource: new RCBufferBindingResource(
								{
									buffer: null,
									offset: 0,
									size: (instanceCount * 16) * 4,
								}
							),
						}
					),
				}
			)
		);


		for (let i = 0; i < instanceCount; i++) {
			const IMMat = instances[i];

			const instructionName = `IMMat_${i}`;
			const instruction = this.instructionCache.has(instructionName) ? 
			this.instructionCache.get(instructionName) : 
			this.instructionCache.set(
				instructionName,
				new BufferSetInstruction(
					{
						label: instructionName,
	
						number: 1,
						target: ResourceBinding.TARGET.INTERNAL,
	
						source: {
							arrayBuffer: new Float32Array(IMMat.elements),
							layout: {
								offset: (0),
							}
						},
						destination: {
							buffer: null,
							layout: {
								offset: (i*16)
							}
						},
						size: (16)
					}
				)
			).get(instructionName);
			instruction.source.arrayBuffer.set(IMMat.elements);
	
			this.resourcePack.setResourceBindingValueInternal(2, 1, instruction);
		}


		// this.uniformGroupDescriptor = new UniformGroupDescriptor(
		// 	{
		// 		label: "mesh resource group",
		// 		number: 2,
		// 		resourceBindingsInternal: new Map(
		// 			[
		// 				[
		// 					0,
		// 					new ResourceBinding(
		// 						{
		// 							number: 0,
		// 							arrayBuffer: new Float32Array(16 + (9 + 7)),
									
		// 							resourceDescriptor: new BufferDescriptor(
		// 								{
		// 									label: "mesh buffer",
		// 									size: (16 + (9 + 7)),
		// 									usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
		// 									mappedAtCreation: false,
		// 								}
		// 							),
		// 							bindGroupLayoutEntry: new BindGroupLayoutEntry(
		// 								{
		// 									binding: 0,
		// 									visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
		// 									buffer: new BufferBindingLayout(
		// 										{
		// 											type: BufferBindingType.UNIFORM,
		// 											hasDynamicOffset: false,
		// 											minBindingSize: 0,
		// 										}
		// 									),
		// 								}
		// 							),
		// 							bindGroupEntry: new BindGroupEntry(
		// 								{
		// 									binding: 0,
		// 									resource: new RCBufferBindingResource(
		// 										{
		// 											buffer: null,
		// 											offset: 0,
		// 											size: (16 + (9 + 7)) * 4,
		// 										}
		// 									),
		// 								}
		// 							),
		// 						}
		// 					)
		// 				]
		// 			]
		// 		),
		// 		resourceBindingsExternal: new Map(),

		// 		// bindingDescriptors: [
		// 		// 	new BindingDescriptor(
		// 		// 		{
		// 		// 			binding: 0,
		// 		// 			arrayBuffer: new Float32Array(16 + (9 + 7)),
		// 		// 			resourceDescriptor: new BufferDescriptor(
		// 		// 				{
		// 		// 					label: "mesh buffer",
		// 		// 					size: (16 + (9 + 7)),
		// 		// 					usage: BufferUsage.UNIFORM | BufferUsage.COPY_DST,
		// 		// 					mappedAtCreation: false,
		// 		// 				}
		// 		// 			)
		// 		// 		}
		// 		// 	)
		// 		// ],
		// 		bindGroupLayoutDescriptor: new BindGroupLayoutDescriptor(
		// 			{
		// 				label: "mesh bind group layout",
		// 				entries: [
		// 					// new BindGroupLayoutEntry(
		// 					// 	{
		// 					// 		binding: 0,
		// 					// 		visibility: ShaderStage.VERTEX | ShaderStage.FRAGMENT,
		// 					// 		buffer: new BufferBindingLayout(
		// 					// 			{
		// 					// 				type: BufferBindingType.UNIFORM,
		// 					// 				hasDynamicOffset: false,
		// 					// 				minBindingSize: 0,
		// 					// 			}
		// 					// 		),
		// 					// 	}
		// 					// ),
		// 				]
		// 			}
		// 		),
		// 		bindGroupDescriptor: new BindGroupDescriptor(
		// 			{
		// 				label: "mesh bind group",
		// 				layout: null,
		// 				entries: [
		// 					// new BindGroupEntry(
		// 					// 	{
		// 					// 		binding: 0,
		// 					// 		resource: new RCBufferBindingResource(
		// 					// 			{
		// 					// 				buffer: null,
		// 					// 				offset: 0,
		// 					// 				size: (16 + (9 + 7)) * 4,
		// 					// 			}
		// 					// 		),
		// 					// 	}
		// 					// ),
		// 				],
		// 			}
		// 		)
		// 	}
		// );
	}

	
	setup(camera) {
		super.setup();
	}
	update(camera) {
		super.update();
	}
};