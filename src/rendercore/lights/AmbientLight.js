import { Color3 } from "../math/Color3.js";
import { Color4 } from "../math/Color4.js";
import { Light } from "./Light.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { MapT2 } from "../core/MapT2.js";


export class AmbientLight extends Light {


	static DEFAULT = {
		NAME: "",
		TYPE: "AmbientLight",

		FRUSTUM_CULLED: false,

		RESOURCE_PACK: new ResourcePack({ name: "RP - AMBIENT LIGHT" }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: "IC - AMBIENT LIGHT" },
			[
				...Light.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: "DC -  AMBIENT LIGHT" },
			[
				...Light.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		COLOR_INTENSITY: new Color4(1.0, 1.0, 1.0, 0.1),
		COLOR: new Color3(1.0, 1.0, 1.0),
		INTENSITY: 0.1,
	};


	constructor (args = {}) {
		super(
			{
				...args,
				 
				name: (args.name !== undefined) ? args.name : AmbientLight.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : AmbientLight.DEFAULT.TYPE,

				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : AmbientLight.DEFAULT.FRUSTUM_CULLED,

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : AmbientLight.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : AmbientLight.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : AmbientLight.DEFAULT.DIRTY_CACHE.clone(),

				colorIntensity: (args.colorIntensity !== undefined) ? args.colorIntensity : AmbientLight.DEFAULT.COLOR_INTENSITY,
				// color: (args.color !== undefined) ? args.color : AmbientLight.DEFAULT.COLOR,
				// intensity: (args.intensity !== undefined) ? args.intensity : AmbientLight.DEFAULT.INTENSITY,
			}
		);
	}
};