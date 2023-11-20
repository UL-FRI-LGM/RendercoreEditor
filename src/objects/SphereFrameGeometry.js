import { MeshGeometry } from "./MeshGeometry.js";
import { _Math } from "../RenderCore.js";
import { Vector3 } from "../math/Vector3.js";


export class SphereFrameGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "SphereFrameGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {
			positions: [new Vector3(0, 0, 0)],
			centers: [new Vector3(0, 0, 0)],
			radiuses: [1],
			nPoints: 32,
		},
	};
	

	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SphereFrameGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SphereFrameGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : SphereFrameGeometry.DEFAULT.INDEXED,

				indices: (args.indices !== undefined) ? args.indices : SphereFrameGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : SphereFrameGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : SphereFrameGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : SphereFrameGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);
	}


	static createIndicesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const centers = baseGeometry.centers;
		const radiuses = baseGeometry.radiuses;
		const nPoints = baseGeometry.nPoints;

		const nSegments = 3;
		const segmentStride = nPoints;
		const segmentIndexStride = (nPoints * 2) * 1;
		const segmentVertexStride = (nPoints * 2) * 1;

		const instanceStride = nSegments * nPoints;
		const instanceIndexStride = (nSegments * nPoints * 2) * 1;
		const instanceVertexStride = (nSegments * nPoints * 2) * 1;

		const indicesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {	
				const instanceOffset = instanceStride * p;


				//plane xy
				for (let point = 0; point <= nPoints; point++) {
					if (point === 0) {
						array[segmentIndexStride*0 + (point*2 - 1) + 1] = instanceOffset + nPoints*0 + 0; //vertex 0
					} else if (0 < point && point < nPoints) {
						array[segmentIndexStride*0 + (point*2 - 1) + 0] = instanceOffset + nPoints*0 + point; //vertex point
						array[segmentIndexStride*0 + (point*2 - 1) + 1] = instanceOffset + nPoints*0 + point; //vertex point
					} else if (point === nPoints) {
						array[segmentIndexStride*0 + (point*2 - 1) + 0] = instanceOffset + nPoints*0 + 0; //vertex 0
					}
				}
				for (let point = 0; point <= nPoints; point++) {
					if (point === 0) {
						array[segmentIndexStride*1 + (point*2 - 1) + 1] = instanceOffset + nPoints*1 + 0; //vertex 0
					} else if (0 < point && point < nPoints) {
						array[segmentIndexStride*1 + (point*2 - 1) + 0] = instanceOffset + nPoints*1 + point; //vertex point
						array[segmentIndexStride*1 + (point*2 - 1) + 1] = instanceOffset + nPoints*1 + point; //vertex point
					} else if (point === nPoints) {
						array[segmentIndexStride*1 + (point*2 - 1) + 0] = instanceOffset + nPoints*1 + 0; //vertex 0
					}
				}
				for (let point = 0; point <= nPoints; point++) {
					if (point === 0) {
						array[segmentIndexStride*2 + (point*2 - 1) + 1] = instanceOffset + nPoints*2 + 0; //vertex 0
					} else if (0 < point && point < nPoints) {
						array[segmentIndexStride*2 + (point*2 - 1) + 0] = instanceOffset + nPoints*2 + point; //vertex point
						array[segmentIndexStride*2 + (point*2 - 1) + 1] = instanceOffset + nPoints*2 + point; //vertex point
					} else if (point === nPoints) {
						array[segmentIndexStride*2 + (point*2 - 1) + 0] = instanceOffset + nPoints*2 + 0; //vertex 0
					}
				}


				indicesArray.push(...array);
			}
		} else {
			//noop
		}


		return new Uint32Array(indicesArray);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = SphereFrameGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = SphereFrameGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		SphereFrameGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const centers = baseGeometry.centers;
		const radiuses = baseGeometry.radiuses;
		const nPoints = baseGeometry.nPoints;

		const nSegments = 3;
		const segmentStride = nPoints;
		const segmentIndexStride = (nPoints) * 3;
		const segmentVertexStride = (nPoints * 2) * 3;

		const instanceStride = nSegments * nPoints;
		const instanceIndexStride = (nSegments * nPoints) * 3;
		const instanceVertexStride = (nSegments * nPoints * 2) * 3;

		const verticesArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const center = centers[p];
				const radius = radiuses[p];


				//circle on xy plane
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = radius * Math.cos(phi) + center.x;
					const y = radius * Math.sin(phi) + center.y;
					const z = 0 + center.z;

					array[segmentIndexStride*0 + point*3 + 0] = px+x; //vertex point x
					array[segmentIndexStride*0 + point*3 + 1] = py+y; //vertex point y
					array[segmentIndexStride*0 + point*3 + 2] = pz+z; //vertex point z
				}
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = radius * Math.sin(phi) + center.x;
					const y = 0 + center.y;
					const z = radius * Math.cos(phi) + center.z;

					array[segmentIndexStride*1 + point*3 + 0] = px+x; //vertex point x
					array[segmentIndexStride*1 + point*3 + 1] = py+y; //vertex point y
					array[segmentIndexStride*1 + point*3 + 2] = pz+z; //vertex point z
				}
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = 0 + center.x;
					const y = radius * Math.cos(phi) + center.y;
					const z = radius * Math.sin(phi) + center.z;

					array[segmentIndexStride*2 + point*3 + 0] = px+x; //vertex point x
					array[segmentIndexStride*2 + point*3 + 1] = py+y; //vertex point y
					array[segmentIndexStride*2 + point*3 + 2] = pz+z; //vertex point z
				}


				verticesArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const center = centers[p];
				const radius = radiuses[p];


				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = radius * Math.cos(phi) + center.x;
					const y = radius * Math.sin(phi) + center.y;
					const z = 0 + center.z;

					if (point === 0) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 0] = px+x; //vertex 0 x
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 1] = py+y; //vertex 0 y
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 2] = pz+z; //vertex 0 z
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 0] = px+x; //vertex point x
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 1] = py+y; //vertex point y
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 2] = pz+z; //vertex point z
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 0] = px+x; //vertex point x
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 1] = py+y; //vertex point y
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 2] = pz+z; //vertex point z	
					} else if (point === nPoints) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 0] = px+x; //vertex 0 x
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 1] = py+y; //vertex 0 y
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 2] = pz+z; //vertex 0 z					}
					}
				}
				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = radius * Math.sin(phi) + center.x;
					const y = 0 + center.y;
					const z = radius * Math.cos(phi) + center.z;

					if (point === 0) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 0] = px+x; //vertex 0 x
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 1] = py+y; //vertex 0 y
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 2] = pz+z; //vertex 0 z
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 0] = px+x; //vertex point x
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 1] = py+y; //vertex point y
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 2] = pz+z; //vertex point z
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 0] = px+x; //vertex point x
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 1] = py+y; //vertex point y
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 2] = pz+z; //vertex point z	
					} else if (point === nPoints) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 0] = px+x; //vertex 0 x
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 1] = py+y; //vertex 0 y
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 2] = pz+z; //vertex 0 z					}
					}
				}
				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = 0 + center.x;
					const y = radius * Math.cos(phi) + center.y;
					const z = radius * Math.sin(phi) + center.z;

					if (point === 0) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 0] = px+x; //vertex 0 x
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 1] = py+y; //vertex 0 y
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 2] = pz+z; //vertex 0 z
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 0] = px+x; //vertex point x
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 1] = py+y; //vertex point y
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 2] = pz+z; //vertex point z
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 0] = px+x; //vertex point x
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 1] = py+y; //vertex point y
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 2] = pz+z; //vertex point z	
					} else if (point === nPoints) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 0] = px+x; //vertex 0 x
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 1] = py+y; //vertex 0 y
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 2] = pz+z; //vertex 0 z					}
					}
				}


				verticesArray.push(...array);
			}
		}


		return new Float32Array(verticesArray);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = SphereFrameGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = SphereFrameGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		SphereFrameGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const centers = baseGeometry.centers;
		const radiuses = baseGeometry.radiuses;
		const nPoints = baseGeometry.nPoints;

		const nSegments = 3;
		const segmentStride = nPoints;
		const segmentIndexStride = (nPoints) * 3;
		const segmentVertexStride = (nPoints * 2) * 3;

		const instanceStride = nSegments * nPoints;
		const instanceIndexStride = (nSegments * nPoints) * 3;
		const instanceVertexStride = (nSegments * nPoints * 2) * 3;

		const normalsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const center = centers[p];
				const radius = radiuses[p];


				//circle on xy plane
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = Math.cos(phi);
					const y = Math.sin(phi);
					const z = 0;

					array[segmentIndexStride*0 + point*3 + 0] = x; //vertex point x
					array[segmentIndexStride*0 + point*3 + 1] = y; //vertex point y
					array[segmentIndexStride*0 + point*3 + 2] = z; //vertex point z
				}
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = Math.sin(phi);
					const y = 0;
					const z = Math.cos(phi);

					array[segmentIndexStride*1 + point*3 + 0] = x; //vertex point x
					array[segmentIndexStride*1 + point*3 + 1] = y; //vertex point y
					array[segmentIndexStride*1 + point*3 + 2] = z; //vertex point z
				}
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = 0;
					const y = Math.cos(phi);
					const z = Math.sin(phi);

					array[segmentIndexStride*2 + point*3 + 0] = x; //vertex point x
					array[segmentIndexStride*2 + point*3 + 1] = y; //vertex point y
					array[segmentIndexStride*2 + point*3 + 2] = z; //vertex point z
				}


				normalsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const center = centers[p];
				const radius = radiuses[p];


				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = Math.cos(phi);
					const y = Math.sin(phi);
					const z = 0;

					if (point === 0) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
					} else if (point === nPoints) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
					}
				}
				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = Math.sin(phi);
					const y = 0;
					const z = Math.cos(phi);

					if (point === 0) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
					} else if (point === nPoints) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
					}
				}
				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = 0;
					const y = Math.cos(phi);
					const z = Math.sin(phi);

					if (point === 0) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex 0 x
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex 0 y
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex 0 z
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex point x
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex point y
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex point z
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 0] = x; //vertex point x
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 1] = y; //vertex point y
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*3 + 2] = z; //vertex point z	
					} else if (point === nPoints) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 0] = x; //vertex 0 x
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 1] = y; //vertex 0 y
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*3 + 2] = z; //vertex 0 z					}
					}
				}


				normalsArray.push(...array);
			}
		}


		return new Float32Array(normalsArray);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = SphereFrameGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = SphereFrameGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		SphereFrameGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;
		const positions = baseGeometry.positions;
		const centers = baseGeometry.centers;
		const radiuses = baseGeometry.radiuses;
		const nPoints = baseGeometry.nPoints;

		const nSegments = 3;
		const segmentStride = nPoints;
		const segmentIndexStride = (nPoints) * 2;
		const segmentVertexStride = (nPoints * 2) * 2;

		const instanceStride = nSegments * nPoints;
		const instanceIndexStride = (nSegments * nPoints) * 2;
		const instanceVertexStride = (nSegments * nPoints * 2) * 2;

		const uvsArray = new Array();


		if (indexed) {
			const array = new Array(instanceIndexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const center = centers[p];
				const radius = radiuses[p];


				//circle on xy plane
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = radius * Math.cos(phi) + center.x;
					const y = radius * Math.sin(phi) + center.y;
					const z = 0 + center.z;

					array[segmentIndexStride*0 + point*2 + 0] = 0; //vertex point x
					array[segmentIndexStride*0 + point*2 + 1] = 0; //vertex point y
				}
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = radius * Math.sin(phi) + center.x;
					const y = 0 + center.y;
					const z = radius * Math.cos(phi) + center.z;

					array[segmentIndexStride*1 + point*2 + 0] = 0; //vertex point x
					array[segmentIndexStride*1 + point*2 + 1] = 0; //vertex point y
				}
				for (let point = 0; point < nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = 0 + center.x;
					const y = radius * Math.cos(phi) + center.y;
					const z = radius * Math.sin(phi) + center.z;

					array[segmentIndexStride*2 + point*2 + 0] = 0; //vertex point x
					array[segmentIndexStride*2 + point*2 + 1] = 0; //vertex point y
				}


				uvsArray.push(...array);
			}
		} else {
			const array = new Array(instanceVertexStride);


			for (let p = 0; p < positions.length; p++) {
				const position = positions[p];
				const px = position.x;
				const py = position.y;
				const pz = position.z;
				const center = centers[p];
				const radius = radiuses[p];


				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = radius * Math.cos(phi) + center.x;
					const y = radius * Math.sin(phi) + center.y;
					const z = 0 + center.z;

					if (point === 0) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex 0 x
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex 0 y
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex point x
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex point y
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex point x
						array[segmentVertexStride*0 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex point y
					} else if (point === nPoints) {
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex 0 x
						array[segmentVertexStride*0 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex 0 y
					}
				}
				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = radius * Math.sin(phi) + center.x;
					const y = 0 + center.y;
					const z = radius * Math.cos(phi) + center.z;

					if (point === 0) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex 0 x
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex 0 y
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex point x
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex point y
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex point x
						array[segmentVertexStride*1 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex point y
					} else if (point === nPoints) {
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex 0 x
						array[segmentVertexStride*1 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex 0 y
					}
				}
				for (let point = 0; point <= nPoints; point++) {
					const phi = _Math.lerp(0, 2*Math.PI, point/nPoints);
					const x = 0 + center.x;
					const y = radius * Math.cos(phi) + center.y;
					const z = radius * Math.sin(phi) + center.z;

					if (point === 0) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex 0 x
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex 0 y
					} else if (0 < point && point < nPoints) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex point x
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex point y
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*2 + 0] = 0; //vertex point x
						array[segmentVertexStride*2 + ((point*2 - 1) + 1)*2 + 1] = 0; //vertex point y
					} else if (point === nPoints) {
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*2 + 0] = 0; //vertex 0 x
						array[segmentVertexStride*2 + ((point*2 - 1) + 0)*2 + 1] = 0; //vertex 0 y
					}
				}


				uvsArray.push(...array);
			}
		}


		return new Float32Array(uvsArray);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sphere frame uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = SphereFrameGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = SphereFrameGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		SphereFrameGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
