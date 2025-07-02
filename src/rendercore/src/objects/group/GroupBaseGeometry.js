import { BaseGeometry } from "../object/BaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { GroupBaseGeometryElement } from "./GroupBaseGeometryElement.js";


export class GroupBaseGeometry extends BaseGeometry {


	static DEFAULT = {
		TYPE: `${GroupBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${GroupBaseGeometry.name}` },
			new GroupBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GroupBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GroupBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : GroupBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new GroupBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
