import { GroupBaseGeometry } from "../group/GroupBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { MeshBaseGeometryElement } from "./MeshBaseGeometryElement.js";


export class MeshBaseGeometry extends GroupBaseGeometry {


	static DEFAULT = {
		TYPE: `${MeshBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${MeshBaseGeometry.name}` },
			new MeshBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : MeshBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : MeshBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : MeshBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new MeshBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
