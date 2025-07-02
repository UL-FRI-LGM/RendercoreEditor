import { BoxBaseGeometry } from "../box/BoxBaseGeometry.js";
import { ArrayT2 } from "../../core/ArrayT2.js";
import { CubeBaseGeometryElement } from "./CubeBaseGeometryElement.js";


export class CubeBaseGeometry extends BoxBaseGeometry {


	static DEFAULT = {
		TYPE: `${CubeBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: new ArrayT2(
			{ name: `ELEMENTS - ${CubeBaseGeometry.name}` },
			new CubeBaseGeometryElement()
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CubeBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CubeBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : CubeBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new CubeBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}
};
