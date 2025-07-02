import { Mesh } from "../mesh/Mesh.js";
import { QuadGeometry } from "./QuadGeometry.js";
import { QuadBasicMaterial } from "../../materials/QuadBasicMaterial.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class Quad extends Mesh {


	static DEFAULT = {
		TYPE: "Quad",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Quad.name}` },
			[
				...Mesh.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Quad.name}` },
			[
				...Mesh.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Quad.name}` },
			[
				...Mesh.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${Quad.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${Quad.name}` },
			[
				...Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${Quad.name}` },
			[
				...Mesh.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new QuadGeometry(),
		MATERIAL: new QuadBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
				
				type: (args.type !== undefined) ? args.type : Quad.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Quad.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Quad.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Quad.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Quad.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Quad.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Quad.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Quad.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Quad.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Quad.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Quad.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Quad.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Quad.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Quad.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Quad.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Quad.DEFAULT.PRIMITIVE,
			}
		);
	}
};
