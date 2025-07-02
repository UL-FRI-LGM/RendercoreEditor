import { Box } from "../box/Box.js";
import { CubeGeometry } from "./CubeGeometry.js";
import { CubeBasicMaterial } from "../../materials/CubeBasicMaterial.js";
import { PrimitiveTopology } from "../../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ResourcePack } from "../../core/data_layouts/ResourcePack.js";
import { SetT2 } from "../../core/SetT2.js";
import { MapT2 } from "../../core/MapT2.js";
import { InstructionCache } from "../../core/data_layouts/InstructionCache.js";


export class Cube extends Box {


	static DEFAULT = {
		TYPE: "Cube",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${Cube.name}` },
			[
				...Box.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${Cube.name}` },
			[
				...Box.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${Cube.name}` },
			[
				...Box.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: "RP - CUBE" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${Cube.name}` },
			[
				...Box.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${Cube.name}` },
			[
				...Box.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new CubeGeometry(),
		MATERIAL: new CubeBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,
	};


	constructor(args = {}) {
		super(
			{
				...args,
				
				type: (args.type !== undefined) ? args.type : Cube.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Cube.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : Cube.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : Cube.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : Cube.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : Cube.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : Cube.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : Cube.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : Cube.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : Cube.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : Cube.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : Cube.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : Cube.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : Cube.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : Cube.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : Cube.DEFAULT.PRIMITIVE,
			}
		);
	}
};
