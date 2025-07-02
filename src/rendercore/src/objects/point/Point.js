import { Mesh } from "../mesh/Mesh.js";
import { PointGeometry } from "./PointGeometry.js";
import { PointBasicMaterial } from "../../materials/PointBasicMaterial.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class Point extends Mesh {

	
	static DEFAULT = {
		TYPE: "Point",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Point.name}` },
			[
				...Mesh.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Point.name}` },
			[
				...Mesh.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Point.name}` },
			[
				...Mesh.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${Point.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${Point.name}` },
			[
				...Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${Point.name}` },
			[
				...Mesh.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new PointGeometry(),
		MATERIAL: new PointBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.POINT_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Point.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Point.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Point.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Point.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Mesh.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Point.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Point.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Point.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Point.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Point.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Point.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Point.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Point.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Point.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Point.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Point.DEFAULT.PRIMITIVE,
			}
		);
	}
};
