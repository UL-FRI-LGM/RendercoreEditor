import { ObjectBase } from "../ObjectBase.js";
import { MapT2 } from "../MapT2.js";


export class DescriptorBase extends ObjectBase {


    static DEFAULT = {
        NAME: "",
		TYPE: "DescriptorBase",

        LABEL: "",
        DIRTY_CACHE: new MapT2(),
    };


    #label = "";
    #dirtyCache = new MapT2();


    constructor(args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : DescriptorBase.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : DescriptorBase.DEFAULT.TYPE,
			}
		);

        this.label = (args.label !== undefined) ? args.label : DescriptorBase.DEFAULT.LABEL;
        this.dirtyCache = (args.dirtyCache !== undefined) ? args.dirtyCache : DescriptorBase.DEFAULT.DIRTY_CACHE.clone(true);
    }

    
    get label() { return this.#label; }
    set label(label) { this.#label = label; }
	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }
};