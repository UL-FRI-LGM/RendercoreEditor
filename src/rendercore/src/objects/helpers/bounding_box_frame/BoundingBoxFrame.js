import { BoxFrame } from "../../box_frame/BoxFrame.js";
import { PrimitiveTopology } from "../../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { BoundingBoxFrameGeometry } from "./BoundingBoxFrameGeometry.js";
import { BoundingBoxFrameBasicMaterial } from "../../../materials/helpers/BoundingBoxFrameBasicMaterial.js";
import { ResourcePack } from "../../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../../core/SetT2.js";
import { MapT2 } from "../../../core/MapT2.js";
import { InstructionCache } from "../../../core/data_layouts/InstructionCache.js";


export class BoundingBoxFrame extends BoxFrame {


	static DEFAULT = {
		TYPE: "BoundingBoxFrame",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${BoundingBoxFrame.name}` },
			[
				...BoxFrame.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${BoundingBoxFrame.name}` },
			[
				...BoxFrame.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${BoundingBoxFrame.name}` },
			[
				...BoxFrame.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${BoundingBoxFrame.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${BoundingBoxFrame.name}` },
			[
				...BoxFrame.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${BoundingBoxFrame.name}` },
			[
				...BoxFrame.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new BoundingBoxFrameGeometry(),
		MATERIAL: new BoundingBoxFrameBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingBoxFrame.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingBoxFrame.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : BoundingBoxFrame.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : BoundingBoxFrame.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : BoundingBoxFrame.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : BoundingBoxFrame.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : BoundingBoxFrame.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : BoundingBoxFrame.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : BoundingBoxFrame.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : BoundingBoxFrame.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : BoundingBoxFrame.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : BoundingBoxFrame.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : BoundingBoxFrame.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : BoundingBoxFrame.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : BoundingBoxFrame.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : BoundingBoxFrame.DEFAULT.PRIMITIVE,
			}
		);
	}
};
