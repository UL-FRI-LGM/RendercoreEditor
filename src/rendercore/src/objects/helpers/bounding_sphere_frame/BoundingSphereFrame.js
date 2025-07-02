import { SphereFrame } from "../../sphere_frame/SphereFrame.js";
import { PrimitiveTopology } from "../../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { BoundingSphereFrameGeometry } from "./BoundingSphereFrameGeometry.js";
import { BoundingSphereFrameBasicMaterial } from "../../../materials/helpers/BoundingSphereFrameBasicMaterial.js";
import { ResourcePack } from "../../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../../core/SetT2.js";
import { MapT2 } from "../../../core/MapT2.js";
import { InstructionCache } from "../../../core/data_layouts/InstructionCache.js";


export class BoundingSphereFrame extends SphereFrame {


	static DEFAULT = {
		TYPE: "BoundingSphereFrame",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${BoundingSphereFrame.name}` },
			[
				...SphereFrame.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${BoundingSphereFrame.name}` },
			[
				...SphereFrame.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${BoundingSphereFrame.name}` },
			[
				...SphereFrame.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${BoundingSphereFrame.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${BoundingSphereFrame.name}` },
			[
				...SphereFrame.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${BoundingSphereFrame.name}` },
			[
				...SphereFrame.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new BoundingSphereFrameGeometry(),
		MATERIAL: new BoundingSphereFrameBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingSphereFrame.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingSphereFrame.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : BoundingSphereFrame.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : BoundingSphereFrame.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : BoundingSphereFrame.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : BoundingSphereFrame.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : BoundingSphereFrame.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : BoundingSphereFrame.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : BoundingSphereFrame.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : BoundingSphereFrame.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : BoundingSphereFrame.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : BoundingSphereFrame.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : BoundingSphereFrame.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : BoundingSphereFrame.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : BoundingSphereFrame.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : BoundingSphereFrame.DEFAULT.PRIMITIVE,
			}
		);
	}
};
