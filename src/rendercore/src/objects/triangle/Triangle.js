import { Mesh } from "../mesh/Mesh.js";
import { TriangleGeometry } from "./TriangleGeometry.js";
import { TriangleBasicMaterial } from "../../materials/TriangleBasicMaterial.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class Triangle extends Mesh {

	
	static DEFAULT = {
		TYPE: "Triangle",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Triangle.name}` },
			[
				...Mesh.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Triangle.name}` },
			[
				...Mesh.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Triangle.name}` },
			[
				...Mesh.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${Triangle.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${Triangle.name}` },
			[
				...Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${Triangle.name}` },
			[
				...Mesh.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new TriangleGeometry(),
		MATERIAL: new TriangleBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Triangle.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Triangle.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Triangle.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Triangle.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Triangle.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Triangle.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Triangle.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Triangle.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Triangle.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Triangle.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Triangle.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Triangle.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Triangle.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Triangle.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Triangle.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Triangle.DEFAULT.PRIMITIVE,
			}
		);
	}
};
