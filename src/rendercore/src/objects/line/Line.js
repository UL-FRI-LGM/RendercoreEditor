import { Mesh } from "../mesh/Mesh.js";
import { LineGeometry } from "./LineGeometry.js";
import { LineBasicMaterial } from "../../materials/LineBasicMaterial.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class Line extends Mesh {


	static DEFAULT = {
		TYPE: "Line",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Line.name}` },
			[
				...Mesh.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Line.name}` },
			[
				...Mesh.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Line.name}` },
			[
				...Mesh.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${Line.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${Line.name}` },
			[
				...Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${Line.name}` },
			[
				...Mesh.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new LineGeometry(),
		MATERIAL: new LineBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Line.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Line.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Line.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Line.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Line.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Line.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Line.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Line.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Line.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Line.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Line.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Line.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Line.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Line.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Line.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Line.DEFAULT.PRIMITIVE,
			}
		);
	}
};
