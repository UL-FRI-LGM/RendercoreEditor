import { MeshBaseGeometry } from "../mesh/MeshBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { QuadBaseGeometryElement } from "./QuadBaseGeometryElement.js";


export class QuadBaseGeometry extends MeshBaseGeometry {


	static DEFAULT = {
		TYPE: `${QuadBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${QuadBaseGeometry.name}` },
			new QuadBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : QuadBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : QuadBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : QuadBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new QuadBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
