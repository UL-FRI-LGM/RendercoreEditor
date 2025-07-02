import { Mesh } from "../mesh/Mesh.js";
import { BoxGeometry } from "./BoxGeometry.js";
import { BoxBasicMaterial } from "../../materials/BoxBasicMaterial.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class Box extends Mesh {


	static DEFAULT = {
		TYPE: "Box",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Box.name}` },
			[
				...Mesh.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Box.name}` },
			[
				...Mesh.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Box.name}` },
			[
				...Mesh.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${Box.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${Box.name}` },
			[
				...Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${Box.name}` },
			[
				...Mesh.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new BoxGeometry(),
		MATERIAL: new BoxBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
				
				type: (args.type !== undefined) ? args.type : Box.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Box.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Box.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Box.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Box.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Box.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Box.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Box.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Box.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Box.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Box.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Box.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Box.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Box.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Box.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Box.DEFAULT.PRIMITIVE,
			}
		);
	}
};
