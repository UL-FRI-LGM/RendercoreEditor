import { SpatialPartitionNodeBasicMaterial } from "./SpatialPartitionNodeBasicMaterial.js";
import { MapT2 } from "../core/MapT2.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data layouts/ResourcePack.js";


export class GridPartitionNodeBasicMaterial extends SpatialPartitionNodeBasicMaterial {


	static DEFAULT = {
		TYPE: "GridPartitionNodeBasicMaterial",
		NAME: "",

		RESOURCE_PACK: undefined,
		INSTRUCTION_CACHE: new MapT2({ name: "grid partition node basic material instruction cache" }),

		SHADER_PATH: "/src/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		UNIFORMS: new MapT2({ name: "grid partition node basic material uniforms" }),
		ATTRIBUTES: new MapT2({ name: "grid partition node basic material attributes" }),

		EMISSIVE: new Color4(0.0, 0.0, 0.0, 0.0),
		DIFFUSE: new Color4(1.0, 1.0, 1.0, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GridPartitionNodeBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionNodeBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : new ResourcePack({ name: "MAT" }),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : GridPartitionNodeBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: GridPartitionNodeBasicMaterial.DEFAULT.SHADER_PATH,
				programName: GridPartitionNodeBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : GridPartitionNodeBasicMaterial.DEFAULT.UNIFORMS.clone(),
				attributes: (args.attributes !== undefined) ? args.attributes : GridPartitionNodeBasicMaterial.DEFAULT.ATTRIBUTES.clone(),

				emissive: (args.emissive !== undefined) ? args.emissive : GridPartitionNodeBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : GridPartitionNodeBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
