import { ObjectBase } from "./ObjectBase.js";
import { Division } from "../Division.js";
import { MapT2 } from "./MapT2.js";
import { ErrorT2 } from "../ErrorT2.js";


export class ManagerBase extends ObjectBase { //RC manager base (WebGL2 / WebGPU)


	static DEFAULT = {
		TYPE: "ManagerBase",
		NAME: "",
		LABEL: "",
		DIVISION: Division.ALL,

		ENTITIES: new MapT2({ label: `${ManagerBase.name}` }),
	};


	#entities = ManagerBase.DEFAULT.ENTITIES.clone();


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : ManagerBase.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : ManagerBase.DEFAULT.NAME,
				label: (args.label !== undefined) ? args.label : ManagerBase.DEFAULT.LABEL,
				division: (args.division !== undefined) ? args.division : ManagerBase.DEFAULT.DIVISION,
			}
		);

		this.entities = (args.entities !== undefined) ? args.entities : ManagerBase.DEFAULT.ENTITIES.clone();
	}


	get entities() { return this.#entities; }
	set entities(entities) { this.#entities = (entities instanceof MapT2) ? entities : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type }); }


	copy(object) {
		if (!(object instanceof ManagerBase)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(object);

		this.entities.copy(object.entities);


		return this;
	}
	clone() {
		return new ManagerBase(
			Object.assign(
				super.clone(),
				{
					entities: this.entities.clone(),
				}
			)
		);
	}

	#createTarget(descriptor, target) {
		ErrorT2.throw(ErrorT2.MESSAGE.NOT_IMPLEMENTED, { cause: this.type });
    }
	createTarget(descriptor) {
		return this.entities.has(descriptor) ? this.entities.get(descriptor) : this.#createTarget(descriptor, undefined);
	}
	#updateTarget(descriptor, target) {
		return descriptor.isDirty() ? target.update(descriptor) : target; 
	}
	updateTarget(descriptor) {
		return this.entities.has(descriptor) ? this.#updateTarget(descriptor, this.entities.get(descriptor)) : this.#createTarget(descriptor, undefined);
	}
	#getTarget(descriptor, target) {
		return target
	}
    getTarget(descriptor) {
		return this.entities.has(descriptor) ? this.#getTarget(descriptor, this.entities.get(descriptor)) : this.#createTarget(descriptor, undefined);
	}
	#setTarget(descriptor, target) {
		return this.entities.set(descriptor, target);
	}
	setTarget(descriptor, target) {
		return this.entities.has(descriptor) ? this.#destroyTarget(descriptor, this.entities.get(descriptor)) : this.#setTarget(descriptor, target);
	}
	#destroyTarget(descriptor, target) {
		return this.entities.delete(descriptor) && target.destroy();
	}
    destroyTarget(descriptor) {
		return this.entities.has(descriptor) ? this.#destroyTarget(descriptor) : false;
    }
};
