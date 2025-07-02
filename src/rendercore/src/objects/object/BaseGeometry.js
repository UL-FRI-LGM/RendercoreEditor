import { ObjectBase } from "../../core/ObjectBase.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { BaseGeometryElement } from "./BaseGeometryElement.js";


export class BaseGeometry extends ObjectBase {


	static DEFAULT = {
		TYPE: `${BaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${BaseGeometry.name}` },
			new BaseGeometryElement()
		),
	};


	#elements;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BaseGeometry.DEFAULT.NAME,
			}
		);

		this.elements = (args.elements !== undefined) ? args.elements : BaseGeometry.DEFAULT.ELEMENTS.clone();
	}


	get elements() { return this.#elements; }
	set elements(elements) { this.#elements = elements; }


	clone() {
		return new BaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
