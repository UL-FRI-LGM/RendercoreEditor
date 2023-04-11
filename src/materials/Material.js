import { ObjectBase } from "../core/ObjectBase.js";


export class Material extends ObjectBase {


	static DEFAULT = {
		NAME: "",
		TYPE: "Material",

		INSTRUCTION_CACHE: new Map(),
	};


	#instructionCache = new Map();


	constructor(args = {}) {
		super(
			{
				...args,
				
				name: (args.name !== undefined) ? args.name : Material.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Material.DEFAULT.TYPE,
			}
		);


		this.instructionCache = new Map();
	}


	get instructionCache() { return this.#instructionCache; }
	set instructionCache(instructionCache) { this.#instructionCache = instructionCache; }
};