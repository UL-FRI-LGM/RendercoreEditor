import { MeshBaseGeometry } from "../mesh/MeshBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { LineBaseGeometryElement } from "./LineBaseGeometryElement.js";


export class LineBaseGeometry extends MeshBaseGeometry {


	static DEFAULT = {
		TYPE: `${LineBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${LineBaseGeometry.name}` },
			new LineBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : LineBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : LineBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : LineBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new LineBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
