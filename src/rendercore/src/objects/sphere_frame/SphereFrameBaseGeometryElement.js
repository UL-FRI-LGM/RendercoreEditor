import { MeshBaseGeometryElement } from "../mesh/MeshBaseGeometryElement.js";
import { Euler, Vector3, _Math } from "../../RenderCore.js";
import { Transform } from "../../math/Transform.js";
import { MeshGeometryIndicesArray } from "../geometry/MeshGeometryIndicesArray.js";
import { MeshGeometryVerticesMap } from "../geometry/MeshGeometryVerticesMap.js";
import { GeometryArray } from "../geometry/GeometryArray.js";
import { Sphere } from "../../math/sphere/Sphere.js";


export class SphereFrameBaseGeometryElement extends MeshBaseGeometryElement {


	static DEFAULT = {
		TYPE: `${SphereFrameBaseGeometryElement.name}`,
		NAME: "",

		TRANSFORM: new Transform(
			{
				translation: new Vector3(0, 0, 0),
				rotation: new Euler(0, 0, 0, "XYZ"),
				scaling: new Vector3(1, 1, 1),
			}
		),

		INDEXED: false,

		INDICES: SphereFrameBaseGeometryElement.assembleIndicesArray(
			{
				indexed: false,
				sphere: new Sphere(new Vector3(+0.0, +0.0, +0.0), 1),
				nPoints: 32
			}
		),
		VERTICES: SphereFrameBaseGeometryElement.assembleVerticesMap(
			{
				indexed: false,
				sphere: new Sphere(new Vector3(+0.0, +0.0, +0.0), 1),
				nPoints: 32
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SphereFrameBaseGeometryElement.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SphereFrameBaseGeometryElement.DEFAULT.NAME,

				transform: (args.transform !== undefined) ? args.transform : SphereFrameBaseGeometryElement.DEFAULT.TRANSFORM.clone(),

				indexed: (args.indexed !== undefined) ? args.indexed : SphereFrameBaseGeometryElement.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : SphereFrameBaseGeometryElement.DEFAULT.INDICES.clone(),
				vertices: (args.vertices !== undefined) ? args.vertices : SphereFrameBaseGeometryElement.DEFAULT.VERTICES.clone(),
			}
		);
	}


	clone() {
		return new SphereFrameBaseGeometryElement(
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

	static assembleIndicesArray(args = {}) {
		const sphere = args.sphere;
		const center = sphere.center;
		const radius = sphere.radius;
		const nPoints = args.nPoints;


		const indicesItemSize = 1;
		const verticesItemSize = 3;

		const nSegments = 3;
		const segmentIndicesCount = (args.indexed) ? (nPoints * 2) : (nPoints * 2);
		const segmentVerticesCount = (args.indexed) ? (nPoints) : (nPoints * 2);
		const segmentIndicesLength = segmentIndicesCount * indicesItemSize;
		const segmentVerticesLength = segmentVerticesCount * verticesItemSize;

		const indicesCount = (args.indexed) ? (nSegments * nPoints * 2) : (nSegments * nPoints * 2);
		const verticesCount = (args.indexed) ? (nSegments * nPoints) : (nSegments * nPoints * 2);


		const array = new Array(indicesCount * indicesItemSize);


		if (args.indexed) {
			//plane xy
			for (let point = 0; point <= nPoints; point++) {
				if (point === 0) {
					array[segmentIndicesLength*0 + (point*2 - 1) + 1] = nPoints*0 + 0; //vertex 0
				} else if (0 < point && point < nPoints) {
					array[segmentIndicesLength*0 + (point*2 - 1) + 0] = nPoints*0 + point; //vertex point
					array[segmentIndicesLength*0 + (point*2 - 1) + 1] = nPoints*0 + point; //vertex point
				} else if (point === nPoints) {
					array[segmentIndicesLength*0 + (point*2 - 1) + 0] = nPoints*0 + 0; //vertex 0
				}
			}
			//plane xz
			for (let point = 0; point <= nPoints; point++) {
				if (point === 0) {
					array[segmentIndicesLength*1 + (point*2 - 1) + 1] = nPoints*1 + 0; //vertex 0
				} else if (0 < point && point < nPoints) {
					array[segmentIndicesLength*1 + (point*2 - 1) + 0] = nPoints*1 + point; //vertex point
					array[segmentIndicesLength*1 + (point*2 - 1) + 1] = nPoints*1 + point; //vertex point
				} else if (point === nPoints) {
					array[segmentIndicesLength*1 + (point*2 - 1) + 0] = nPoints*1 + 0; //vertex 0
				}
			}
			//plane yz
			for (let point = 0; point <= nPoints; point++) {
				if (point === 0) {
					array[segmentIndicesLength*2 + (point*2 - 1) + 1] = nPoints*2 + 0; //vertex 0
				} else if (0 < point && point < nPoints) {
					array[segmentIndicesLength*2 + (point*2 - 1) + 0] = nPoints*2 + point; //vertex point
					array[segmentIndicesLength*2 + (point*2 - 1) + 1] = nPoints*2 + point; //vertex point
				} else if (point === nPoints) {
					array[segmentIndicesLength*2 + (point*2 - 1) + 0] = nPoints*2 + 0; //vertex 0
				}
			}
		} else {
			//plane xy
			for (let point = 0; point < nPoints + nPoints; point++) {
				array[segmentIndicesLength*0 + point] = segmentIndicesLength*0 + point; 
			}
			//plane xz
			for (let point = 0; point < nPoints + nPoints; point++) {
				array[segmentIndicesLength*1 + point] = segmentIndicesLength*1 + point;
			}
			//plane yz
			for (let point = 0; point < nPoints + nPoints; point++) {
				array[segmentIndicesLength*2 + point] = segmentIndicesLength*2 + point;
			}
		}


		return new MeshGeometryIndicesArray(
			{ 
				name: `INDICES - ${SphereFrameBaseGeometryElement.name}`,

				itemSize: 1,
			},
			...array
		);
	}
	static #assemblePositionsGeometryArray(args = {}) {
		const sphere = args.sphere;
		const center = sphere.center;
		const radius = sphere.radius;
		const nPoints = args.nPoints;


		const indicesItemSize = 1;
		const verticesItemSize = 3;

		const nSegments = 3;
		const segmentIndicesCount = (args.indexed) ? (nPoints * 2) : (nPoints * 2);
		const segmentVerticesCount = (args.indexed) ? (nPoints) : (nPoints * 2);
		const segmentIndicesLength = segmentIndicesCount * indicesItemSize;
		const segmentVerticesLength = segmentVerticesCount * verticesItemSize;

		const indicesCount = (args.indexed) ? (nSegments * nPoints * 2) : (nSegments * nPoints * 2);
		const verticesCount = (args.indexed) ? (nSegments * nPoints) : (nSegments * nPoints * 2);


		const array = new Array(verticesCount * verticesItemSize);


		if (args.indexed) {
			//plane xy
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = radius * Math.cos(phi) + center.x;
				const y = radius * Math.sin(phi) + center.y;
				const z = 0 + center.z;

				array[segmentVerticesLength*0 + point*3 + 0] = x; //vertex point x
				array[segmentVerticesLength*0 + point*3 + 1] = y; //vertex point y
				array[segmentVerticesLength*0 + point*3 + 2] = z; //vertex point z
			}
			//plane xz
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = radius * Math.sin(phi) + center.x;
				const y = 0 + center.y;
				const z = radius * Math.cos(phi) + center.z;

				array[segmentVerticesLength*1 + point*3 + 0] = x; //vertex point x
				array[segmentVerticesLength*1 + point*3 + 1] = y; //vertex point y
				array[segmentVerticesLength*1 + point*3 + 2] = z; //vertex point z
			}
			//plane yz
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = 0 + center.x;
				const y = radius * Math.cos(phi) + center.y;
				const z = radius * Math.sin(phi) + center.z;

				array[segmentVerticesLength*2 + point*3 + 0] = x; //vertex point x
				array[segmentVerticesLength*2 + point*3 + 1] = y; //vertex point y
				array[segmentVerticesLength*2 + point*3 + 2] = z; //vertex point z
			}
		} else {
			//plane xy
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = radius * Math.cos(phi) + center.x;
				const y = radius * Math.sin(phi) + center.y;
				const z = 0 + center.z;

				if (point === 0) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
				} else if (point === nPoints) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
				}
			}
			//plane xz
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = radius * Math.sin(phi) + center.x;
				const y = 0 + center.y;
				const z = radius * Math.cos(phi) + center.z;

				if (point === 0) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
				} else if (point === nPoints) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
				}
			}
			//plane yz
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = 0 + center.x;
				const y = radius * Math.cos(phi) + center.y;
				const z = radius * Math.sin(phi) + center.z;

				if (point === 0) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
				} else if (point === nPoints) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
				}
			}
		}


		return new GeometryArray(
			{
				name: `VERTICES - POSITIONS - ${SphereFrameBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleNormalsGeometryArray(args = {}) {
		const sphere = args.sphere;
		const center = sphere.center;
		const radius = sphere.radius;
		const nPoints = args.nPoints;


		const indicesItemSize = 1;
		const verticesItemSize = 3;

		const nSegments = 3;
		const segmentIndicesCount = (args.indexed) ? (nPoints * 2) : (nPoints * 2);
		const segmentVerticesCount = (args.indexed) ? (nPoints) : (nPoints * 2);
		const segmentIndicesLength = segmentIndicesCount * indicesItemSize;
		const segmentVerticesLength = segmentVerticesCount * verticesItemSize;

		const indicesCount = (args.indexed) ? (nSegments * nPoints * 2) : (nSegments * nPoints * 2);
		const verticesCount = (args.indexed) ? (nSegments * nPoints) : (nSegments * nPoints * 2);


		const array = new Array(verticesCount * verticesItemSize);


		if (args.indexed) {
			//plane xy
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = Math.cos(phi);
				const y = Math.sin(phi);
				const z = 0;

				array[segmentVerticesLength*0 + point*3 + 0] = x; //vertex point x
				array[segmentVerticesLength*0 + point*3 + 1] = y; //vertex point y
				array[segmentVerticesLength*0 + point*3 + 2] = z; //vertex point z
			}
			//plane xz
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = Math.sin(phi);
				const y = 0;
				const z = Math.cos(phi);

				array[segmentVerticesLength*1 + point*3 + 0] = x; //vertex point x
				array[segmentVerticesLength*1 + point*3 + 1] = y; //vertex point y
				array[segmentVerticesLength*1 + point*3 + 2] = z; //vertex point z
			}
			//plane yz
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = 0;
				const y = Math.cos(phi);
				const z = Math.sin(phi);

				array[segmentVerticesLength*2 + point*3 + 0] = x; //vertex point x
				array[segmentVerticesLength*2 + point*3 + 1] = y; //vertex point y
				array[segmentVerticesLength*2 + point*3 + 2] = z; //vertex point z
			}
		} else {
			//plane xy
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = Math.cos(phi);
				const y = Math.sin(phi);
				const z = 0;

				if (point === 0) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
				} else if (point === nPoints) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
				}
			}
			//plane xz
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = Math.sin(phi);
				const y = 0;
				const z = Math.cos(phi);

				if (point === 0) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
				} else if (point === nPoints) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
				}
			}
			//plane yz
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = 0;
				const y = Math.cos(phi);
				const z = Math.sin(phi);

				if (point === 0) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
				} else if (point === nPoints) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
				}
			}
		}


		return new GeometryArray(
			{
				name: `VERTICES - NORMALS - ${SphereFrameBaseGeometryElement.name}`,

				itemSize: 3,
			},
			...array
		);
	}
	static #assembleUVsGeometryArray(args = {}) {
		const sphere = args.sphere;
		const center = sphere.center;
		const radius = sphere.radius;
		const nPoints = args.nPoints;


		const indicesItemSize = 1;
		const verticesItemSize = 2;

		const nSegments = 3;
		const segmentIndicesCount = (args.indexed) ? (nPoints * 2) : (nPoints * 2);
		const segmentVerticesCount = (args.indexed) ? (nPoints) : (nPoints * 2);
		const segmentIndicesLength = segmentIndicesCount * indicesItemSize;
		const segmentVerticesLength = segmentVerticesCount * verticesItemSize;

		const indicesCount = (args.indexed) ? (nSegments * nPoints * 2) : (nSegments * nPoints * 2);
		const verticesCount = (args.indexed) ? (nSegments * nPoints) : (nSegments * nPoints * 2);


		const array = new Array(verticesCount * verticesItemSize);


		if (args.indexed) {
			//plane xy
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = radius * Math.cos(phi) + center.x;
				const y = radius * Math.sin(phi) + center.y;
				const z = 0 + center.z;

				array[segmentVerticesLength*0 + point*2 + 0] = 0; //vertex point x
				array[segmentVerticesLength*0 + point*2 + 1] = 0; //vertex point y
			}
			//plane xz
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = radius * Math.sin(phi) + center.x;
				const y = 0 + center.y;
				const z = radius * Math.cos(phi) + center.z;

				array[segmentVerticesLength*1 + point*2 + 0] = 0; //vertex point x
				array[segmentVerticesLength*1 + point*2 + 1] = 0; //vertex point y
			}
			//plane yz
			for (let point = 0; point < nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = 0 + center.x;
				const y = radius * Math.cos(phi) + center.y;
				const z = radius * Math.sin(phi) + center.z;

				array[segmentVerticesLength*2 + point*2 + 0] = 0; //vertex point x
				array[segmentVerticesLength*2 + point*2 + 1] = 0; //vertex point y
			}
		} else {
			//plane xy
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = radius * Math.cos(phi) + center.x;
				const y = radius * Math.sin(phi) + center.y;
				const z = 0 + center.z;

				if (point === 0) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex 0 x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex 0 y
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex point x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex point y
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex point x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex point y
				} else if (point === nPoints) {
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex 0 x
					array[segmentVerticesLength*0 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex 0 y
				}
			}
			//plane xz
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = radius * Math.sin(phi) + center.x;
				const y = 0 + center.y;
				const z = radius * Math.cos(phi) + center.z;

				if (point === 0) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex 0 x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex 0 y
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex point x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex point y
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex point x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex point y
				} else if (point === nPoints) {
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex 0 x
					array[segmentVerticesLength*1 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex 0 y
				}
			}
			//plamne yz
			for (let point = 0; point <= nPoints; point++) {
				const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
				const x = 0 + center.x;
				const y = radius * Math.cos(phi) + center.y;
				const z = radius * Math.sin(phi) + center.z;

				if (point === 0) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex 0 x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex 0 y
				} else if (0 < point && point < nPoints) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex point x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex point y
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex point x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex point y
				} else if (point === nPoints) {
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex 0 x
					array[segmentVerticesLength*2 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex 0 y
				}
			}
		}


		return new GeometryArray(
			{
				name: `VERTICES - UVS - ${SphereFrameBaseGeometryElement.name}`,

				itemSize: 2,
			},
			...array
		);
	}
	static assembleVerticesMap(args = {}) {
		return new MeshGeometryVerticesMap(
			{ name: `VERTICES - ${SphereFrameBaseGeometryElement.name}` },
			[
				["positions", SphereFrameBaseGeometryElement.#assemblePositionsGeometryArray(args)],
				["normals", SphereFrameBaseGeometryElement.#assembleNormalsGeometryArray(args)],
				["uvs", SphereFrameBaseGeometryElement.#assembleUVsGeometryArray(args)],
			]
		);
	}
};
