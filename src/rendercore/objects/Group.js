import {Object3D} from "./Object3D.js";
import { GroupGeometry } from "./GroupGeometry.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { MapT2 } from "../core/MapT2.js";


export class Group extends Object3D {


	static DEFAULT = {
		NAME: "",
		TYPE: "Group",

		VISIBLE: true,
		FRUSTUM_CULLED: false,

		RESOURCE_PACK: new ResourcePack({ name: "RP - GROUP" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - GROUP" },
			[
				...Object3D.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: "DC - GROUP" },
			[
				...Object3D.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new GroupGeometry(),
		MATERIAL: null,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : Group.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Group.DEFAULT.TYPE,

				visible: (args.visible !== undefined) ? args.visible : Group.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Group.DEFAULT.FRUSTUM_CULLED,
			
				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Group.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Group.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Group.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Group.DEFAULT.GEOMETRY.clone(),
				material: (args.material !== undefined) ? args.material : Group.DEFAULT.MATERIAL,
			}
		);
	}

	setup(args = {}) {
		super.setup(args);
	}
	update(args = {}) {
		super.update(args);
	}
};