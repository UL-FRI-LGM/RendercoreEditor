import { ObjectBase } from "../../core/ObjectBase.js";
import { Transform } from "../../math/Transform.js";
import { Euler, Vector3 } from "../../RenderCore.js";


export class BaseGeometryElement extends ObjectBase {


	static DEFAULT = {
		TYPE: `${BaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),
	};


	#transform;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BaseGeometryElement.DEFAULT.NAME,
			}
		);

		this.transform = (args.transform !== undefined) ? args.transform : BaseGeometryElement.DEFAULT.TRANSFORM.clone();
	}


	get transform() { return this.#transform; }
	set transform(transform) { this.#transform = transform; }


	clone() {
		return new BaseGeometryElement(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				transform: (this.transform === Object(this.transform)) ? this.transform.clone() : this.transform,
			}
		);
	}
};
