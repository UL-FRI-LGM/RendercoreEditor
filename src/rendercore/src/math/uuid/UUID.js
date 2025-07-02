import { _Math } from "../Math.js";
import { ErrorT2 } from "../../ErrorT2.js";


export class UUID extends Object {


	static DEFAULT = {
		GENERATOR: () => { return _Math.generateUUID(); },
		VALUE: undefined,
	};


	#generator;
	#value;


	constructor(generator = UUID.DEFAULT.GENERATOR, value = UUID.DEFAULT.VALUE) {
		super();

		this.generator = generator;
		this.value = (value !== undefined) ? value : generator();
	}


	get generator() { return this.#generator; }
	set generator(generator) { this.#generator = (typeof generator == "function") ? generator : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type }); }
	get value() { return this.#value; }
	set value(value) { this.#value = (typeof value == "string") ? value : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_TYPE, { cause: this.type }); }


	copy(object, { copyValue = false } = { }) {
		if (!(object instanceof UUID)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		this.generator = object.generator;
		this.value = copyValue ? object.value : this.value;


		return this;
	}
	clone({ cloneValue = false } = { }) {
		return new UUID(this.generator, cloneValue ? this.value : undefined);
	}
};
