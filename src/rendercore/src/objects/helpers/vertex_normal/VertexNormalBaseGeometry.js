import { MeshBaseGeometry } from "../../mesh/MeshBaseGeometry.js";
import { ArrayT2 } from "../../../core/ArrayT2.js";
import { VertexNormalBaseGeometryElement } from "./VertexNormalBaseGeometryElement.js";
import { Cube } from "../../cube/Cube.js";
import { Transform } from "../../../math/Transform.js";
import { Euler, Vector3 } from "../../../RenderCore.js";


export class VertexNormalBaseGeometry extends MeshBaseGeometry {


	static DEFAULT = {
		TYPE: `${VertexNormalBaseGeometry.name}`,
		NAME: "",

		ELEMENTS: VertexNormalBaseGeometry.assembleElements(
			{
				mesh: new Cube()
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : VertexNormalBaseGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : VertexNormalBaseGeometry.DEFAULT.NAME,

				elements: (args.elements !== undefined) ? args.elements : VertexNormalBaseGeometry.DEFAULT.ELEMENTS.clone(),
			}
		);
	}


	clone() {
		return new VertexNormalBaseGeometry(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				elements: (this.elements === Object(this.elements)) ? this.elements.clone() : this.elements,
			}
		);
	}


	static assembleElements(args = {}) {
		return new ArrayT2(
			{ name: `ELEMENTS - ${VertexNormalBaseGeometry.name}` },
			...args.mesh.geometry.baseGeometry.elements.map((vElement, kElement) => {
				return new VertexNormalBaseGeometryElement(
					{
						transform: new Transform(
							{
								translation: new Vector3(0, 0, 0),
								rotation: new Euler(0, 0, 0, "XYZ"),
								scaling: new Vector3(1, 1, 1),
							}
						),

						indexed: false,

						indices: VertexNormalBaseGeometryElement.assembleIndicesArray(
							{
								indexed: false,
								element: vElement
							}
						),
						vertices: VertexNormalBaseGeometryElement.assembleVerticesMap(
							{
								indexed: false,
								element: vElement
							}
						),
					}
				);
			})
		);
	}
};
