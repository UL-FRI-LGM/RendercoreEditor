import { Mesh } from "../../mesh/Mesh.js";
import { PrimitiveTopology } from "../../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { VertexNormalGeometry } from "./VertexNormalGeometry.js";
import { VertexNormalBasicMaterial } from "../../../materials/helpers/VertexNormalBasicMaterial.js";
import { ResourcePack } from "../../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../../core/SetT2.js";
import { MapT2 } from "../../../core/MapT2.js";
import { InstructionCache } from "../../../core/data_layouts/InstructionCache.js";


export class VertexNormal extends Mesh {


	static DEFAULT = {
		TYPE: "VertexNormal",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${VertexNormal.name}` },
			[
				...Mesh.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${VertexNormal.name}` },
			[
				...Mesh.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${VertexNormal.name}` },
			[
				...Mesh.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${VertexNormal.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${VertexNormal.name}` },
			[
				...Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${VertexNormal.name}` },
			[
				...Mesh.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new VertexNormalGeometry(),
		MATERIAL: new VertexNormalBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
			
				type: (args.type !== undefined) ? args.type : VertexNormal.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : VertexNormal.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : VertexNormal.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : VertexNormal.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : VertexNormal.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : VertexNormal.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : VertexNormal.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : VertexNormal.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : VertexNormal.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : VertexNormal.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : VertexNormal.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : VertexNormal.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : VertexNormal.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : VertexNormal.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : VertexNormal.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : VertexNormal.DEFAULT.PRIMITIVE,
			}
		);
	}
};
