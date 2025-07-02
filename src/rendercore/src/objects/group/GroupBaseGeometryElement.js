import { BaseGeometryElement } from "../object/BaseGeometryElement.js";
import { Euler, Vector3 } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";


export class GroupBaseGeometryElement extends BaseGeometryElement {


	static DEFAULT = {
		TYPE: `${GroupBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GroupBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GroupBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : GroupBaseGeometryElement.DEFAULT.TRANSFORM.clone(),
			}
		);
	}


	clone() {
		return new GroupBaseGeometryElement(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				transform: (this.transform === Object(this.transform)) ? this.transform.clone() : this.transform,
			}
		);
	}
};
