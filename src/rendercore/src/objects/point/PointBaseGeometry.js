import { MeshBaseGeometry } from "../mesh/MeshBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { PointBaseGeometryElement } from "./PointBaseGeometryElement.js";


export class PointBaseGeometry extends MeshBaseGeometry {


	static DEFAULT = {
		TYPE: `${PointBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${PointBaseGeometry.name}` },
			new PointBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : PointBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : PointBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : PointBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new PointBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
