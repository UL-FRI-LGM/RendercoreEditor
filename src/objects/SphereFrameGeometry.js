import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { MeshGeometry } from "./MeshGeometry.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";
import { _Math } from "../RenderCore.js";


export class SphereFrameGeometry extends MeshGeometry {


	static DEFAULT = {
		TYPE: "SphereFrameGeometry",
		NAME: "",

		INDEXED: false,
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


	static assembleIndices(args = {}) {
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


		const indicesArrayBuffer = new Uint32Array(indicesArray);
		const indicesAttributeLocation = new AttributeLocation(
			{
				number: null,
				itemSize: 1,
				arrayBuffer: indicesArrayBuffer,

				bufferDescriptor: new BufferDescriptor(
					{
						label: "sphere frame indices buffer",
						size: indicesArrayBuffer.length,
						usage:  BufferUsage.INDEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				// vertexBufferLayoutDescriptor: new VertexBufferLayout(
				// 	{
				// 		arrayStride: 1 * 4,
				// 		stepMode: VertexStepMode.VERTEX,
				// 		attributes: [
				// 			new VertexAttribute(
				// 				{
				// 					format: VertexFormat.UINT_32,
				// 					offset: 0,
				// 					shaderLocation: 0,
				// 				}
				// 			)
				// 		],			
				// 	}
				// )
				vertexBufferLayoutDescriptor: null
			}
		);
		indicesAttributeLocation.setValue(
			"sphere frame indices",
			new BufferSetInstruction(
				{
					label: "sphere frame indices",

					number: null,

					source: {
						arrayBuffer: indicesArrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: indicesArrayBuffer.length
				}
			)
		);


		return indexed ? indicesAttributeLocation : null;
	}
	static assembleVertices(args = {}) {
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


		const verticesArrayBuffer = new Float32Array(verticesArray);
		const verticesAttributeLocation = new AttributeLocation(
			{
				number: 0,
				itemSize: 3,
				arrayBuffer: verticesArrayBuffer,

				bufferDescriptor: new BufferDescriptor(
					{
						label: "sphere frame vertices buffer",
						size: verticesArrayBuffer.length,
						usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				vertexBufferLayoutDescriptor: new VertexBufferLayout(
					{
						arrayStride: 3 * 4,
						stepMode: VertexStepMode.VERTEX,
						attributes: [
							new VertexAttribute(
								{
									format: VertexFormat.FLOAT_32x3,
									offset: 0,
									shaderLocation: 0,
								}
							)
						],
					}
				)
			}
		);
		verticesAttributeLocation.setValue(
			"sphere frame vertices",
			new BufferSetInstruction(
				{
					label: "sphere frame vertices",

					number: 0,

					source: {
						arrayBuffer: verticesArrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: verticesArrayBuffer.length
				}
			)
		);


		return verticesAttributeLocation;
	}
	static assembleNormals(args = {}) {
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


		const normalsArrayBuffer = new Float32Array(normalsArray);
		const normalsAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: normalsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "sphere frame normals buffer",
						size: normalsArrayBuffer.length,
						usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				vertexBufferLayoutDescriptor: new VertexBufferLayout(
					{
						arrayStride: 3 * 4,
						stepMode: VertexStepMode.VERTEX,
						attributes: [
							new VertexAttribute(
								{
									format: VertexFormat.FLOAT_32x3,
									offset: 0,
									shaderLocation: 1,
								}
							)
						],						
					}
				)
			}
		);
		// normalsAttributeLocation.normalize(); // no need to normalize for this configuration
		normalsAttributeLocation.setValue(
			"sphere frame normals",
			new BufferSetInstruction(
				{
					label: "sphere frame normals",

					number: 1,

					source: {
						arrayBuffer: normalsArrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: normalsArrayBuffer.length
				}
			)
		);


		return normalsAttributeLocation;
	}
	static assembleUVs(args = {}) {
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


		const uvsArrayBuffer = new Float32Array(uvsArray);
		const uvsAttributeLocation = new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: uvsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "sphere frame uvs buffer",
						size: uvsArrayBuffer.length,
						usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				vertexBufferLayoutDescriptor: new VertexBufferLayout(
					{
						arrayStride: 2 * 4,
						stepMode: VertexStepMode.VERTEX,
						attributes: [
							new VertexAttribute(
								{
									format: VertexFormat.FLOAT_32x2,
									offset: 0,
									shaderLocation: 2,
								}
							)
						],
					}
				)
			}
		);
		uvsAttributeLocation.setValue(
			"sphere frame uvs",
			new BufferSetInstruction(
				{
					label: "sphere frame uvs",

					number: 2,

					source: {
						arrayBuffer: uvsArrayBuffer,
						layout: {
							offset: (0),
						}
					},
					destination: {
						buffer: null,
						layout: {
							offset: (0)
						}
					},
					size: uvsArrayBuffer.length
				}
			)
		);


		return uvsAttributeLocation;
	}
};
