import { ObjectBase } from "./ObjectBase.js";
import { Division } from "../Division.js";
import { MapT2 } from "./MapT2.js";


export class DescriptorBase extends ObjectBase { //RC descriptor base (WebGL2 / WebGPU)


	static DEFAULT = {
		TYPE: "DescriptorBase",
		NAME: "",
		LABEL: "",
		DIVISION: Division.ALL,

		DIRTY_CACHE: new MapT2({ label: `${DescriptorBase.name}` }),
	};


	#dirtyCache = DescriptorBase.DEFAULT.DIRTY_CACHE.clone(true);


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : DescriptorBase.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : DescriptorBase.DEFAULT.NAME,
				label: (args.label !== undefined) ? args.label : DescriptorBase.DEFAULT.LABEL,
				division: (args.division !== undefined) ? args.division : DescriptorBase.DEFAULT.DIVISION,
			}
		);

		this.dirtyCache = (args.dirtyCache !== undefined) ? args.dirtyCache : DescriptorBase.DEFAULT.DIRTY_CACHE.clone(true);
	}


	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }


	isDirty() {
		return this.dirtyCache.size > 0;
	}
};
