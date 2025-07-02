import { MeshBaseGeometry } from "../mesh/MeshBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { TriangleBaseGeometryElement } from "./TriangleBaseGeometryElement.js";


export class TriangleBaseGeometry extends MeshBaseGeometry {


	static DEFAULT = {
		TYPE: `${TriangleBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${TriangleBaseGeometry.name}` },
			new TriangleBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : TriangleBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : TriangleBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : TriangleBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new TriangleBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
