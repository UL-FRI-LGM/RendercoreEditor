import { BoxBasicMaterial } from "../materials/BoxBasicMaterial.js";
import { MapT2 } from "../core/MapT2.js";
import { Color4 } from "../math/Color4.js";
import { ResourcePack } from "../core/data layouts/ResourcePack.js";


export class SpatialPartitionNodeBasicMaterial extends BoxBasicMaterial {


	static DEFAULT = {
		TYPE: "SpatialPartitionNodeBasicMaterial",
		NAME: "",

		RESOURCE_PACK: undefined,
		INSTRUCTION_CACHE: new MapT2({ name: "spatial partition node basic material instruction cache" }),

		SHADER_PATH: "/src/shaders/basic/",
		PROGRAM_NAME: "basic_flat",

		UNIFORMS: new MapT2({ name: "spatial partition node basic material uniforms" }),
		ATTRIBUTES: new MapT2({ name: "spatial partition node basic material attributes" }),

		EMISSIVE: new Color4(0.0, 0.0, 0.0, 0.0),
		DIFFUSE: new Color4(1.0, 1.0, 1.0, 0.125),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartitionNodeBasicMaterial.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionNodeBasicMaterial.DEFAULT.NAME,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : new ResourcePack({ name: "MAT" }),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : SpatialPartitionNodeBasicMaterial.DEFAULT.INSTRUCTION_CACHE.clone(),

				shaderPath: SpatialPartitionNodeBasicMaterial.DEFAULT.SHADER_PATH,
				programName: SpatialPartitionNodeBasicMaterial.DEFAULT.PROGRAM_NAME,

				uniforms: (args.uniforms !== undefined) ? args.uniforms : SpatialPartitionNodeBasicMaterial.DEFAULT.UNIFORMS.clone(),
				attributes: (args.attributes !== undefined) ? args.attributes : SpatialPartitionNodeBasicMaterial.DEFAULT.ATTRIBUTES.clone(),

				emissive: (args.emissive !== undefined) ? args.emissive : SpatialPartitionNodeBasicMaterial.DEFAULT.EMISSIVE.clone(),
				diffuse: (args.diffuse !== undefined) ? args.diffuse : SpatialPartitionNodeBasicMaterial.DEFAULT.DIFFUSE.clone(),
			},
		);
	}
};
