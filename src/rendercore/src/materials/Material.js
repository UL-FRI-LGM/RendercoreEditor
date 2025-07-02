import { ObjectBase } from "../core/ObjectBase.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class Material extends ObjectBase {


	static DEFAULT = {
		TYPE: "Material",
		NAME: "",

		RESOURCE_PACK: new ResourcePack({ name: "RP - MATERIAL" }),
		INSTRUCTION_CACHE: new InstructionCache({ name: "IC - MATERIAL" }),
	};


	#resourcePack;
	#instructionCache;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : Material.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Material.DEFAULT.NAME,
			}
		);


		this.resourcePack = (args.resourcePack !== undefined) ? args.resourcePack : Material.DEFAULT.RESOURCE_PACK.clone();
		this.instructionCache = (args.instructionCache !== undefined) ? args.instructionCache: Material.DEFAULT.INSTRUCTION_CACHE.clone();
	}


	// resource bindings
	get resourcePack() { return this.#resourcePack; }
	set resourcePack(resourcePack) { this.#resourcePack = resourcePack; }
	get instructionCache() { return this.#instructionCache; }
	set instructionCache(instructionCache) { this.#instructionCache = instructionCache; }
};
