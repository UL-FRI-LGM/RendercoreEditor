import { Mesh } from "../mesh/Mesh.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { SphereFrameGeometry } from "./SphereFrameGeometry.js";
import { SphereFrameBasicMaterial } from "../../materials/SphereFrameBasicMaterial.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class SphereFrame extends Mesh {


	static DEFAULT = {
		TYPE: "SphereFrame",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${SphereFrame.name}` },
			[
				...Mesh.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${SphereFrame.name}` },
			[
				...Mesh.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${SphereFrame.name}` },
			[
				...Mesh.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${SphereFrame.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${SphereFrame.name}` },
			[
				...Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${SphereFrame.name}` },
			[
				...Mesh.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new SphereFrameGeometry(),
		MATERIAL: new SphereFrameBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SphereFrame.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SphereFrame.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : SphereFrame.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : SphereFrame.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : SphereFrame.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : SphereFrame.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : SphereFrame.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : SphereFrame.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : SphereFrame.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : SphereFrame.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : SphereFrame.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : SphereFrame.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : SphereFrame.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : SphereFrame.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : SphereFrame.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : SphereFrame.DEFAULT.PRIMITIVE,
			}
		);
	}
};
