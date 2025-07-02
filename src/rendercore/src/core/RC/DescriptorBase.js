import { ObjectBase } from "../ObjectBase.js";
import { Division } from "../../Division.js";
import { MapT2 } from "../MapT2.js";
import { ErrorT2 } from "../../ErrorT2.js";


export class DescriptorBase extends ObjectBase {


	static DEFAULT = {
		TYPE: "DescriptorBase",
		NAME: "",
		LABEL: "",
		DIVISION: Division.ALL,

		DIRTY_CACHE: new MapT2({ label: `${DescriptorBase.name}` }),
	};


	#dirtyCache = new MapT2({ label: `${DescriptorBase.name}` });


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
	set dirtyCache(dirtyCache) { this.#dirtyCache = (dirtyCache instanceof MapT2) ? dirtyCache : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type }); }


	copy(object) {
		if (!(object instanceof DescriptorBase)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(object);

		this.dirtyCache.copy(object.dirtyCache);


		return this;
	}
	clone() {
		return new DescriptorBase(
			Object.assign(
				super.clone(), 
				{
					dirtyCache: this.dirtyCache.clone(),
				}
			)
		);
	}

	isDirty() {
		return this.dirtyCache.size > 0;
	}
};
