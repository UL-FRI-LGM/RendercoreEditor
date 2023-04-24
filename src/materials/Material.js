import { ObjectBase } from "../core/ObjectBase.js";
import { ResourcePack } from "../core/data layouts/ResourcePack.js";


export class Material extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "Material",

		RESOURCE_RACK: undefined,
		INSTRUCTION_CACHE: new Map(),
	};


	#resourcePack;
	#instructionCache = new Map();


	constructor(args = {}) {
		super(
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : Material.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Material.DEFAULT.TYPE,
			}
		);


		this.resourcePack = new ResourcePack();
		this.instructionCache = new Map();
	}


	// resource bindings
	get resourcePack() { return this.#resourcePack; }
	set resourcePack(resourcePack) { this.#resourcePack = resourcePack; }
	get instructionCache() { return this.#instructionCache; }
	set instructionCache(instructionCache) { this.#instructionCache = instructionCache; }
};