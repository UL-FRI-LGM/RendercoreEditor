import { ObjectBase } from "../ObjectBase.js";


export class DescriptorBase extends ObjectBase {


    static DEFAULT = {
        NAME: "",
		TYPE: "DescriptorBase",

        LABEL: "",
        DIRTY_CACHE: new Map(),
    };


    #label = "";
    #dirtyCache = new Map();


    constructor(args = {}) {
        super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : DescriptorBase.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : DescriptorBase.DEFAULT.TYPE,
			}
		);

        this.label = (args.label !== undefined) ? args.label : DescriptorBase.DEFAULT.LABEL;
        this.dirtyCache = (args.dirtyCache !== undefined) ? args.dirtyCache : new Map(DescriptorBase.DEFAULT.DIRTY_CACHE);
    }

    
    get label() { return this.#label; }
    set label(label) { this.#label = label; }
	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }
};