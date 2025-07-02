import { SphereFrameBaseGeometryElement } from "../../sphere_frame/SphereFrameBaseGeometryElement.js";
import { Euler, Vector3 } from "../../../RenderCore.js";
import { Transform } from "../../../math/Transform.js";
import { Cube } from "../../cube/Cube.js";
import { Sphere } from "../../../math/sphere/Sphere.js";


export class BoundingSphereFrameBaseGeometryElement extends SphereFrameBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${BoundingSphereFrameBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: BoundingSphereFrameBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				mesh: new Cube()
			}
		),
		VERTICES: BoundingSphereFrameBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				mesh: new Cube()
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : BoundingSphereFrameBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : BoundingSphereFrameBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : BoundingSphereFrameBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : BoundingSphereFrameBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : BoundingSphereFrameBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : BoundingSphereFrameBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new BoundingSphereFrameBaseGeometryElement(
			{
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				transform: (this.transform === Object(this.transform)) ? this.transform.clone() : this.transform,

				indexed: (this.indexed === Object(this.indexed)) ? this.indexed.clone() : this.indexed,

				indices: (this.indices === Object(this.indices)) ? this.indices.clone() : this.indices,
				vertices: (this.vertices === Object(this.vertices)) ? this.vertices.clone() : this.vertices,
			}
		);
	}

	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : BoundingSphereFrameBaseGeometryElement.DEFAULT.INDEXED,
			sphere: (args.mesh !== undefined) ? new Sphere(
				args.mesh.bounding.sphere.global.objectspace.center,
				args.mesh.bounding.sphere.global.objectspace.radius
			) : new Sphere(
				new Vector3(+1.0, +1.0, +1.0),
				1
			),
			nPoints: (args.nPoints !== undefined) ? args.nPoints : 32,
		};
	}

	static assembleIndicesArray(args = {}) {
		return SphereFrameBaseGeometryElement.assembleIndicesArray(BoundingSphereFrameBaseGeometryElement.#args(args));
	}
	static assembleVerticesMap(args = {}) {
		return SphereFrameBaseGeometryElement.assembleVerticesMap(BoundingSphereFrameBaseGeometryElement.#args(args));
	}
};
