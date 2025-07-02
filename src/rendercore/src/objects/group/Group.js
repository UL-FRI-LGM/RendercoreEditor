import {Object3D} from "../object/Object3D.js";
import { GroupGeometry } from "./GroupGeometry.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";
import { MapT2 } from "../../core/MapT2.js";
import { SetT2 } from "../../core/SetT2.js";


export class Group extends Object3D {


	static DEFAULT = {
		NAME: "",
		TYPE: "Group",

		VISIBLE: true,
		FRUSTUM_CULLED: false,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Group.name}` },
			[
				...Object3D.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Group.name}` },
			[
				...Object3D.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Group.name}` },
			[
				...Object3D.DEFAULT.DESCENDANTS.clone(false),
			]
		),

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
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Group.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Group.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Group.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Group.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Group.DEFAULT.DESCENDANTS.clone(false),

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