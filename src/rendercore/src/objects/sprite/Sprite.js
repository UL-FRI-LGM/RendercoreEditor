import { Quad } from "../quad/Quad.js";
import { SpriteGeometry } from "./SpriteGeometry.js";
import { SpriteBasicMaterial } from "../../materials/SpriteBasicMaterial.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class Sprite extends Quad {


	static DEFAULT = {
		TYPE: "Sprite",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Sprite.name}` },
			[
				...Quad.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Sprite.name}` },
			[
				...Quad.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Sprite.name}` },
			[
				...Quad.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${Sprite.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${Sprite.name}` },
			[
				...Quad.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${Sprite.name}` },
			[
				...Quad.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new SpriteGeometry(),
		MATERIAL: new SpriteBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
				
				type: (args.type !== undefined) ? args.type : Sprite.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Sprite.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Sprite.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Sprite.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Sprite.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Sprite.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Sprite.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Sprite.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Sprite.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Sprite.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Sprite.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Sprite.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Sprite.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Sprite.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Sprite.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Sprite.DEFAULT.PRIMITIVE,
			}
		);
	}
};
