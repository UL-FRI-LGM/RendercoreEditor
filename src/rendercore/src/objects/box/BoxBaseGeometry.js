import { MeshBaseGeometry } from "../mesh/MeshBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { BoxBaseGeometryElement } from "./BoxBaseGeometryElement.js";


export class BoxBaseGeometry extends MeshBaseGeometry {


	static DEFAULT = {
		TYPE: `${BoxBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${BoxBaseGeometry.name}` },
			new BoxBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoxBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoxBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : BoxBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new BoxBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
