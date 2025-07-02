import { Mesh } from "../mesh/Mesh.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { BoxFrameGeometry } from "./BoxFrameGeometry.js";
import { BoxFrameBasicMaterial } from "../../materials/BoxFrameBasicMaterial.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class BoxFrame extends Mesh {


	static DEFAULT = {
		TYPE: "BoxFrame",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${BoxFrame.name}` },
			[
				...Mesh.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${BoxFrame.name}` },
			[
				...Mesh.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${BoxFrame.name}` },
			[
				...Mesh.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${BoxFrame.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${BoxFrame.name}` },
			[
				...Mesh.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${BoxFrame.name}` },
			[
				...Mesh.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new BoxFrameGeometry(),
		MATERIAL: new BoxFrameBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxFrame.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxFrame.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : BoxFrame.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : BoxFrame.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : BoxFrame.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : BoxFrame.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : BoxFrame.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : BoxFrame.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : BoxFrame.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : BoxFrame.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : BoxFrame.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : BoxFrame.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : BoxFrame.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : BoxFrame.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : BoxFrame.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : BoxFrame.DEFAULT.PRIMITIVE,
			}
		);
	}
};
