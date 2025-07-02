import { ObjectBase } from "../ObjectBase.js";


export class Resource extends ObjectBase { //resource base


	static DEFAULT = {
		NAME: "",
		TYPE: "Resource",

		DIRTY_CACHE: new Map(),
	};


    #dirtyCache;


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : Resource.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : Resource.DEFAULT.TYPE,
            }
		);

		this.dirtyCache = (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(Resource.DEFAULT.DIRTY_CACHE);
	}


	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }
};