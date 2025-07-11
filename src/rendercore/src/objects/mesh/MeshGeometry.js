import { Vector2 } from "../../math/Vector2.js";
import { Vector3 } from "../../math/Vector3.js";
import { Geometry } from "../object/Geometry.js";
import { BufferDescriptor } from "../../core/RC/buffers/BufferDescriptor.js";
import { AttributeLocation } from "../../core/data_layouts/AttributeLocation.js";
import { VertexFormat } from "../../core/RC/pipeline/vertex_state/VertexFormat.js";
import { VertexAttribute } from "../../core/RC/pipeline/vertex_state/VertexAttribute.js";
import { VertexStepMode } from "../../core/RC/pipeline/vertex_state/VertexStepMode.js";
import { VertexBufferLayout } from "../../core/RC/pipeline/vertex_state/VertexBufferLayout.js";
import { BufferUsage } from "../../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../../core/data_layouts/BufferSetInstruction.js";
import { GroupGeometry } from "../group/GroupGeometry.js";
import { MeshBaseGeometry } from "./MeshBaseGeometry.js";
import { Matrix3, Matrix4 } from "../../RenderCore.js";


export class MeshGeometry extends GroupGeometry { //mesh custom geometry


	static DEFAULT = {
		TYPE: "MeshGeometry",
		NAME: "",

		BOUNDING_SPHERE: null,
		BOUNDING_BOX: null,

		INDEXED: false,
		BASE_GEOMETRY: new MeshBaseGeometry(),
	};


	#indexed;

	#attributeLocationDescriptors; //#resourceLocationDescriptors;

	#indices;
	#vertices; //positions
	#normals;
	#tangents;
	#bitangents;
	#colors;
	#uvs;
	#MMats;
	#translations;

	#wireframeIndices;


	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : MeshGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : MeshGeometry.DEFAULT.TYPE,

				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : MeshGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				boundingSphere: (args.boundingSphere !== undefined) ? args.boundingSphere : MeshGeometry.DEFAULT.BOUNDING_SPHERE,
				boundingBox: (args.boundingBox !== undefined) ? args.boundingBox : MeshGeometry.DEFAULT.BOUNDING_BOX,
			}
		);

		this.indexed = (args.indexed !== undefined) ? args.indexed : MeshGeometry.DEFAULT.INDEXED;

		this.attributeLocationDescriptors = new Map(
			[
				// ["indices", null],
				["vertices", null],
				["normals", null],
				["tangents", null],
				["bitangents", null],
				["colors", null],
				["uvs", null],
				["MMats", null],
				["translations", null],
				
				["wireframeIndices", null],
			]
		);

		// attribute locations
		this.indices = (args.indices !== undefined) ? args.indices : MeshGeometry.assembleIndices(args);
		this.vertices = (args.vertices !== undefined) ? args.vertices : MeshGeometry.assembleVertices(args);
		this.normals = (args.normals !== undefined) ? args.normals : MeshGeometry.assembleNormals(args);
		this.tangents = (args.tangents !== undefined) ? args.tangents : null;
		this.bitangents = (args.bitangents !== undefined) ? args.bitangents : null;
		this.colors = (args.colors !== undefined) ? args.colors : null;
		this.uvs = (args.uvs !== undefined) ? args.uvs : MeshGeometry.assembleUVs(args);
		this.MMats = (args.MMats !== undefined) ? args.MMats : null;
		this.translations = (args.translations !== undefined) ? args.translations : null;

		this.wireframeIndices = (args.wireframeIndices !== undefined) ? args.wireframeIndices : null;
	}


	get indexed() { return this.#indexed; }
	set indexed(indexed) { this.#indexed = indexed; }

	get attributeLocationDescriptors() { return this.#attributeLocationDescriptors; }
	set attributeLocationDescriptors(attributeLocationDescriptors) { this.#attributeLocationDescriptors = attributeLocationDescriptors; }

	get indices() { return this.#indices; }
	set indices(indices) { 
		this.#indices = indices;
		// this.attributeLocationDescriptors.set("indices", indices);
	}
	get vertices() { return this.#vertices; }
	set vertices(vertices) { 
		this.#vertices = vertices;
		this.attributeLocationDescriptors.set("vertices", vertices);
	}
	get normals() { return this.#normals; }
	set normals(normals) { 
		this.#normals = normals;
		this.attributeLocationDescriptors.set("normals", normals);
	}
	get tangents() { return this.#tangents; }
	set tangents(tangents) { 
		this.#tangents = tangents;
		this.attributeLocationDescriptors.set("tangents", tangents);
	}
	get bitangents() { return this.#bitangents; }
	set bitangents(bitangents) { 
		this.#bitangents = bitangents;
		this.attributeLocationDescriptors.set("bitangents", bitangents);
	}
	get colors() { return this.#colors; }
	set colors(colors) { 
		this.#colors = colors;
		this.attributeLocationDescriptors.set("colors", colors);
	}
	get uvs() { return this.#uvs; }
	set uvs(uvs) { 
		this.#uvs = uvs;
		this.attributeLocationDescriptors.set("uvs", uvs);
	}
	get MMats() { return this.#MMats; }
	set MMats(MMats) { 
		this.#MMats = MMats;
		this.attributeLocationDescriptors.set("MMats", MMats);
	}
	get translations() { return this.#translations; }
	set translations(translations) { 
		this.#translations = translations;
		this.attributeLocationDescriptors.set("translations", translations);
	}

	get wireframeIndices() { return this.#wireframeIndices; }
	set wireframeIndices(wireframeIndices) { 
		this.#wireframeIndices = wireframeIndices;
		this.attributeLocationDescriptors.set("wireframeIndices", wireframeIndices);
	}


	buildWireframeBuffer() {
		const indicesArray = [];

		if (this.indices !== null) {
			const indices = this.indices;
			const vertexMap = new Map();

			for (let i = 0; i < indices.arrayBuffer.length; i += 3) {
				const a = indices.arrayBuffer[i  ];
				const b = indices.arrayBuffer[i+1];
				const c = indices.arrayBuffer[i+2];

				// A - B - C - A
				//indicesArray.push( a, b, b, c, c, a );
				this.#sanitize(vertexMap, a, b, indicesArray);
				this.#sanitize(vertexMap, b, c, indicesArray);
				this.#sanitize(vertexMap, c, a, indicesArray);
			}
		} else {
			const vertices = this.vertices;

			for (let i = 0; i < vertices.count(); i += 3) {
				const a = i;
				const b = i + 1;
				const c = i + 2;

				// A - B - C - A
				indicesArray.push(a, b, b, c, c, a);
			}
		}

		// Create new buffer geometry for the wireframe
		const wireframeIndicesArrayBuffer = new Uint32Array(indicesArray);
		const wireframeIndicesAttributeLocation = new AttributeLocation(
			{
				itemSize: 1,
				arrayBuffer: wireframeIndicesArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "mesh geometry wireframe indices buffer",
						size: wireframeIndicesArrayBuffer.length,
						usage: BufferUsage.VERTEX | BufferUsage.COPY_DST,
						mappedAtCreation: false
					}
				),
				vertexBufferLayoutDescriptor: new VertexBufferLayout(
					{
						arrayStride: 1 * 4,
						stepMode: VertexStepMode.VERTEX,
						attributes: [
							new VertexAttribute(
								{
									format: VertexFormat.UINT_32,
									offset: 0,
									shaderLocation: -1,
								}
							)
						],						
					}
				)
			}
		);
		wireframeIndicesAttributeLocation.setValue(
			"mesh wireframe indices",
			new BufferSetInstruction(
				{
					label: "mesh wireframe indices",

					number: -1,

					source: {
						arrayBuffer: wireframeIndicesArrayBuffer,
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
					size: wireframeIndicesArrayBuffer.length
				}
			)
		);


		this.wireframeIndices = wireframeIndicesAttributeLocation;
	}
	#sanitize(vertexMap, x, y, indicesArray){
		let foundX = false, foundY = false, foundXY = false, foundYX = false;
		let arrayX, arrayY;


		if(vertexMap.has(x)){
			foundX = true;
			arrayX = vertexMap.get(x);

			for(let i = 0; i < arrayX.length; i++){
				if(arrayX[i] === y){
					foundXY = true;
					break;
				}
			}
		}

		if(vertexMap.has(y)){
			foundY = true;
			arrayY = vertexMap.get(y);

			for(let i = 0; i < arrayY.length; i++){
				if(arrayY[i] === x){
					foundYX = true;
					break;
				}
			}
		}



		if(!foundX){
			vertexMap.set(x, [y]);
		}
		if(!foundY){
			vertexMap.set(y, [x]);
		}
		if(foundX){

			if(!foundXY){
				arrayX.push(y);
			}
		}
		if(foundY){

			if(!foundYX){
				arrayY.push(x);
			}
		}
		if(!foundX || !foundY || !foundXY || !foundYX){
			indicesArray.push(x, y);
		}
	}

	computeVertexNormals() {
		const positions = this.vertices.arrayBuffer;
		const normals = new Float32Array(positions.length);

		const pA = new Vector3();
		const pB = new Vector3();
		const pC = new Vector3();
		const cb = new Vector3();
		const ab = new Vector3();

		if (this.indices && this.vertices) {
			const indices = this.indices.arrayBuffer;

			for (let i = 0; i < indices.length; i += 3) {
				const vA = indices[i    ] * 3;
				const vB = indices[i + 1] * 3;
				const vC = indices[i + 2] * 3;

				pA.fromArray(positions, vA);
				pB.fromArray(positions, vB);
				pC.fromArray(positions, vC);

				cb.subVectors(pC, pB);
				ab.subVectors(pA, pB);
				cb.cross(ab);

				normals[vA    ] += cb.x;
				normals[vA + 1] += cb.y;
				normals[vA + 2] += cb.z;

				normals[vB    ] += cb.x;
				normals[vB + 1] += cb.y;
				normals[vB + 2] += cb.z;

				normals[vC    ] += cb.x;
				normals[vC + 1] += cb.y;
				normals[vC + 2] += cb.z;
			}
		} else if (!this.indices && this.vertices) {
			for (let i = 0; i < positions.length; i += 9) {
				pA.fromArray( positions, i );
				pB.fromArray( positions, i + 3 );
				pC.fromArray( positions, i + 6 );

				cb.subVectors(pC, pB);
				ab.subVectors(pA, pB);
				cb.cross(ab);

				normals[i    ] = cb.x;
				normals[i + 1] = cb.y;
				normals[i + 2] = cb.z;

				normals[i + 3] = cb.x;
				normals[i + 4] = cb.y;
				normals[i + 5] = cb.z;

				normals[i + 6] = cb.x;
				normals[i + 7] = cb.y;
				normals[i + 8] = cb.z;
			}
		}

		const normalsArrayBuffer = new Float32Array(normals);
		const normalsAttributeLocation = new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: normalsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: "mesh geometry normals buffer",
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
		normalsAttributeLocation.normalize();
		normalsAttributeLocation.setValue(
			"mesh normals",
			new BufferSetInstruction(
				{
					label: "mesh normals",

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


		this.normals = normalsAttributeLocation;
		this.normals.needsUpdate = true;
		return normalsAttributeLocation;
	}
	computeVertexTangents(){
		if (this.indices) {
			const indices = this.indices;
			const vertices = this.vertices;
			const uvs = this.uvs;

			const verticesItemSize = vertices.itemSize;
			const uvsItemSize = uvs.itemSize;

			const v1 = new Vector3();
			const v2 = new Vector3();
			const v3 = new Vector3();
			const uv1 = new Vector2();
			const uv2 = new Vector2();
			const uv3 = new Vector2();

			const deltaPos1 = new Vector3();
			const deltaPos2 = new Vector3();
			const deltaUV1 = new Vector2();
			const deltaUV2 = new Vector2();

			const tangent = new Vector3();

			const tangents = new Array(vertices.count() * verticesItemSize);

			//for each tringle
			for (let i = 0; i < indices.count(); i+=3) {

				//vertices
				v1.x = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*verticesItemSize + 0];
				v1.y = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*verticesItemSize + 1];
				v1.z = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*verticesItemSize + 2];

				v2.x = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*verticesItemSize + 0];
				v2.y = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*verticesItemSize + 1];
				v2.z = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*verticesItemSize + 2];

				v3.x = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*verticesItemSize + 0];
				v3.y = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*verticesItemSize + 1];
				v3.z = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*verticesItemSize + 2];

				//uvs
				uv1.x = uvs.arrayBuffer[indices.arrayBuffer[i + 0]*uvsItemSize + 0];
				uv1.y = uvs.arrayBuffer[indices.arrayBuffer[i + 0]*uvsItemSize + 1];

				uv2.x = uvs.arrayBuffer[indices.arrayBuffer[i + 1]*uvsItemSize + 0];
				uv2.y = uvs.arrayBuffer[indices.arrayBuffer[i + 1]*uvsItemSize + 1];

				uv3.x = uvs.arrayBuffer[indices.arrayBuffer[i + 2]*uvsItemSize + 0];
				uv3.y = uvs.arrayBuffer[indices.arrayBuffer[i + 2]*uvsItemSize + 1];


				//position delta
				deltaPos1.subVectors(v2, v1);
				deltaPos2.subVectors(v3, v1);

				//UV delta
				deltaUV1.subVectors(uv2, uv1);
				deltaUV2.subVectors(uv3, uv1);

				const d = 1.0 / (deltaUV1.x * deltaUV2.y - deltaUV1.y * deltaUV2.x);
				tangent.subVectors(deltaPos1.multiplyScalar(deltaUV2.y), deltaPos2.multiplyScalar(deltaUV1.y)).multiplyScalar(d); 
				tangent.normalize();

				//same tangent for each vertex in traingle
				//(possible rewrite of same vertex attributes because of indices)
				//must align with correct vertex in sequence
				tangents[indices.arrayBuffer[i + 0]*verticesItemSize + 0] = tangent.x;
				tangents[indices.arrayBuffer[i + 0]*verticesItemSize + 1] = tangent.y;
				tangents[indices.arrayBuffer[i + 0]*verticesItemSize + 2] = tangent.z;

				tangents[indices.arrayBuffer[i + 1]*verticesItemSize + 0] = tangent.x;
				tangents[indices.arrayBuffer[i + 1]*verticesItemSize + 1] = tangent.y;
				tangents[indices.arrayBuffer[i + 1]*verticesItemSize + 2] = tangent.z;

				tangents[indices.arrayBuffer[i + 2]*verticesItemSize + 0] = tangent.x;
				tangents[indices.arrayBuffer[i + 2]*verticesItemSize + 1] = tangent.y;
				tangents[indices.arrayBuffer[i + 2]*verticesItemSize + 2] = tangent.z;
			}

			const tangentsArrayBuffer = new Float32Array(tangents);
			const tangentsAttributeLocation = new AttributeLocation(
				{
					itemSize: 3,
					arrayBuffer: tangentsArrayBuffer,
					bufferDescriptor: new BufferDescriptor(
						{
							label: "mesh geometry tangents buffer",
							size: tangentsArrayBuffer.length,
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
										shaderLocation: -1,
									}
								)
							],						
						}
					)
				}
			);
			// tangentsAttributeLocation.normalize();
			tangentsAttributeLocation.setValue(
				"mesh tangents",
				new BufferSetInstruction(
					{
						label: "mesh tangents",
	
						number: -1,
	
						source: {
							arrayBuffer: tangentsArrayBuffer,
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
						size: tangentsArrayBuffer.length
					}
				)
			);


			this.tangents = tangentsAttributeLocation;
		} else {
			const vertices = this.vertices;
			const uvs = this.uvs;

			const verticesItemSize = vertices.itemSize;
			const uvsItemSize = uvs.itemSize;

			const v1 = new Vector3();
			const v2 = new Vector3();
			const v3 = new Vector3();
			const uv1 = new Vector2();
			const uv2 = new Vector2();
			const uv3 = new Vector2();

			const deltaPos1 = new Vector3();
			const deltaPos2 = new Vector3();
			const deltaUV1 = new Vector2();
			const deltaUV2 = new Vector2();

			const tangent = new Vector3();

			const tangents = new Array(vertices.count() * verticesItemSize);

			//for each tringle
			for (let i = 0; i < vertices.count(); i+=3) {

				//vertices
				v1.x = vertices.arrayBuffer[i*verticesItemSize + 0];
				v1.y = vertices.arrayBuffer[i*verticesItemSize + 1];
				v1.z = vertices.arrayBuffer[i*verticesItemSize + 2];

				v2.x = vertices.arrayBuffer[i*verticesItemSize + 3];
				v2.y = vertices.arrayBuffer[i*verticesItemSize + 4];
				v2.z = vertices.arrayBuffer[i*verticesItemSize + 5];

				v3.x = vertices.arrayBuffer[i*verticesItemSize + 6];
				v3.y = vertices.arrayBuffer[i*verticesItemSize + 7];
				v3.z = vertices.arrayBuffer[i*verticesItemSize + 8];

				//uvs
				uv1.x = uvs.arrayBuffer[i*uvsItemSize + 0];
				uv1.y = uvs.arrayBuffer[i*uvsItemSize + 1];

				uv2.x = uvs.arrayBuffer[i*uvsItemSize + 2];
				uv2.y = uvs.arrayBuffer[i*uvsItemSize + 3];

				uv3.x = uvs.arrayBuffer[i*uvsItemSize + 4];
				uv3.y = uvs.arrayBuffer[i*uvsItemSize + 5];

				//position delta
				deltaPos1.subVectors(v2, v1);
				deltaPos2.subVectors(v3, v1);

				//UV delta
				deltaUV1.subVectors(uv2, uv1);
				deltaUV2.subVectors(uv3, uv1);

				const d = 1.0 / (deltaUV1.x * deltaUV2.y - deltaUV1.y * deltaUV2.x);
				tangent.subVectors(deltaPos1.multiplyScalar(deltaUV2.y), deltaPos2.multiplyScalar(deltaUV1.y)).multiplyScalar(d); 
				tangent.normalize();

				//same tangen for each vertex in traingle
				tangents[i*verticesItemSize + 0] = tangent.x;
				tangents[i*verticesItemSize + 1] = tangent.y;
				tangents[i*verticesItemSize + 2] = tangent.z;

				tangents[i*verticesItemSize + 3] = tangent.x;
				tangents[i*verticesItemSize + 4] = tangent.y;
				tangents[i*verticesItemSize + 5] = tangent.z;

				tangents[i*verticesItemSize + 6] = tangent.x;
				tangents[i*verticesItemSize + 7] = tangent.y;
				tangents[i*verticesItemSize + 8] = tangent.z;
			}

			const tangentsArrayBuffer = new Float32Array(tangents);
			const tangentsAttributeLocation = new AttributeLocation(
				{
					itemSize: 3,
					arrayBuffer: tangentsArrayBuffer,
					bufferDescriptor: new BufferDescriptor(
						{
							label: "mesh geometry tangents buffer",
							size: tangentsArrayBuffer.length,
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
										shaderLocation: -1,
									}
								)
							],						
						}
					)
				}
			);
			// tangentsAttributeLocation.normalize();
			tangentsAttributeLocation.setValue(
				"mesh tangents",
				new BufferSetInstruction(
					{
						label: "mesh tangents",
	
						number: -1,
	
						source: {
							arrayBuffer: tangentsArrayBuffer,
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
						size: tangentsArrayBuffer.length
					}
				)
			);


			this.tangents = tangentsAttributeLocation;
		}
	}
	computeVertexBitangents(){
		if (this.indices) {
			const indices = this.indices;
			const vertices = this.vertices;
			const uvs = this.uvs;

			const verticesItemSize = vertices.itemSize;
			const uvsItemSize = uvs.itemSize;

			const v1 = new Vector3();
			const v2 = new Vector3();
			const v3 = new Vector3();
			const uv1 = new Vector2();
			const uv2 = new Vector2();
			const uv3 = new Vector2();

			const deltaPos1 = new Vector3();
			const deltaPos2 = new Vector3();
			const deltaUV1 = new Vector2();
			const deltaUV2 = new Vector2();

			const bitangent = new Vector3();

			const bitangents = new Array(vertices.count() * verticesItemSize);

			//for each tringle
			for (let i = 0; i < indices.count(); i+=3) {
				//vertices
				v1.x = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*verticesItemSize + 0];
				v1.y = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*verticesItemSize + 1];
				v1.z = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*verticesItemSize + 2];

				v2.x = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*verticesItemSize + 0];
				v2.y = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*verticesItemSize + 1];
				v2.z = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*verticesItemSize + 2];

				v3.x = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*verticesItemSize + 0];
				v3.y = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*verticesItemSize + 1];
				v3.z = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*verticesItemSize + 2];

				//uvs
				uv1.x = uvs.arrayBuffer[indices.arrayBuffer[i + 0]*uvsItemSize + 0];
				uv1.y = uvs.arrayBuffer[indices.arrayBuffer[i + 0]*uvsItemSize + 1];

				uv2.x = uvs.arrayBuffer[indices.arrayBuffer[i + 1]*uvsItemSize + 0];
				uv2.y = uvs.arrayBuffer[indices.arrayBuffer[i + 1]*uvsItemSize + 1];

				uv3.x = uvs.arrayBuffer[indices.arrayBuffer[i + 2]*uvsItemSize + 0];
				uv3.y = uvs.arrayBuffer[indices.arrayBuffer[i + 2]*uvsItemSize + 1];


				//position delta
				deltaPos1.subVectors(v2, v1);
				deltaPos2.subVectors(v3, v1);

				//UV delta
				deltaUV1.subVectors(uv2, uv1);
				deltaUV2.subVectors(uv3, uv1);

				const d = 1.0 / (deltaUV1.x * deltaUV2.y - deltaUV1.y * deltaUV2.x);
				bitangent.subVectors(deltaPos2.multiplyScalar(deltaUV1.x), deltaPos1.multiplyScalar(deltaUV2.x)).multiplyScalar(d); 
				bitangent.normalize();

				//same tangent for each vertex in traingle
				//(possible rewrite of same vertex attributes because of indices)
				//must align with correct vertex in sequence
				bitangents[indices.arrayBuffer[i + 0]*verticesItemSize + 0] = bitangent.x;
				bitangents[indices.arrayBuffer[i + 0]*verticesItemSize + 1] = bitangent.y;
				bitangents[indices.arrayBuffer[i + 0]*verticesItemSize + 2] = bitangent.z;

				bitangents[indices.arrayBuffer[i + 1]*verticesItemSize + 0] = bitangent.x;
				bitangents[indices.arrayBuffer[i + 1]*verticesItemSize + 1] = bitangent.y;
				bitangents[indices.arrayBuffer[i + 1]*verticesItemSize + 2] = bitangent.z;

				bitangents[indices.arrayBuffer[i + 2]*verticesItemSize + 0] = bitangent.x;
				bitangents[indices.arrayBuffer[i + 2]*verticesItemSize + 1] = bitangent.y;
				bitangents[indices.arrayBuffer[i + 2]*verticesItemSize + 2] = bitangent.z;
			}

			const bitangentsArrayBuffer = new Float32Array(tangents);
			const bitangentsAttributeLocation = new AttributeLocation(
				{
					itemSize: 3,
					arrayBuffer: bitangentsArrayBuffer,
					bufferDescriptor: new BufferDescriptor(
						{
							label: "mesh geometry bitangents buffer",
							size: bitangentsArrayBuffer.length,
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
										shaderLocation: -1,
									}
								)
							],						
						}
					)
				}
			);
			// bitangentsAttributeLocation.normalize();
			bitangentsAttributeLocation.setValue(
				"mesh bitangents",
				new BufferSetInstruction(
					{
						label: "mesh bitangents",
	
						number: -1,
	
						source: {
							arrayBuffer: bitangentsArrayBuffer,
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
						size: bitangentsArrayBuffer.length
					}
				)
			);


			this.bitangents = bitangentsAttributeLocation;
		} else {
			const vertices = this.vertices;
			const uvs = this.uvs;

			const verticesItemSize = vertices.itemSize;
			const uvsItemSize = uvs.itemSize;

			const v1 = new Vector3();
			const v2 = new Vector3();
			const v3 = new Vector3();
			const uv1 = new Vector2();
			const uv2 = new Vector2();
			const uv3 = new Vector2();

			const deltaPos1 = new Vector3();
			const deltaPos2 = new Vector3();
			const deltaUV1 = new Vector2();
			const deltaUV2 = new Vector2();

			const bitangent = new Vector3();

			const bitangents = new Array(vertices.count() * verticesItemSize);

			//for each tringle
			for (let i = 0; i < vertices.count(); i+=3) {
				//vertices
				v1.x = vertices.arrayBuffer[i*verticesItemSize + 0];
				v1.y = vertices.arrayBuffer[i*verticesItemSize + 1];
				v1.z = vertices.arrayBuffer[i*verticesItemSize + 2];

				v2.x = vertices.arrayBuffer[i*verticesItemSize + 3];
				v2.y = vertices.arrayBuffer[i*verticesItemSize + 4];
				v2.z = vertices.arrayBuffer[i*verticesItemSize + 5];

				v3.x = vertices.arrayBuffer[i*verticesItemSize + 6];
				v3.y = vertices.arrayBuffer[i*verticesItemSize + 7];
				v3.z = vertices.arrayBuffer[i*verticesItemSize + 8];

				//uvs
				uv1.x = uvs.arrayBuffer[i*uvsItemSize + 0];
				uv1.y = uvs.arrayBuffer[i*uvsItemSize + 1];

				uv2.x = uvs.arrayBuffer[i*uvsItemSize + 2];
				uv2.y = uvs.arrayBuffer[i*uvsItemSize + 3];

				uv3.x = uvs.arrayBuffer[i*uvsItemSize + 4];
				uv3.y = uvs.arrayBuffer[i*uvsItemSize + 5];


				//position delta
				deltaPos1.subVectors(v2, v1);
				deltaPos2.subVectors(v3, v1);

				//UV delta
				deltaUV1.subVectors(uv2, uv1);
				deltaUV2.subVectors(uv3, uv1);

				const d = 1.0 / (deltaUV1.x * deltaUV2.y - deltaUV1.y * deltaUV2.x);
				bitangent.subVectors(deltaPos2.multiplyScalar(deltaUV1.x), deltaPos1.multiplyScalar(deltaUV2.x)).multiplyScalar(d); 
				bitangent.normalize();

				//same tangen for each vertex in traingle
				bitangents[i*verticesItemSize + 0] = bitangent.x;
				bitangents[i*verticesItemSize + 1] = bitangent.y;
				bitangents[i*verticesItemSize + 2] = bitangent.z;

				bitangents[i*verticesItemSize + 3] = bitangent.x;
				bitangents[i*verticesItemSize + 4] = bitangent.y;
				bitangents[i*verticesItemSize + 5] = bitangent.z;

				bitangents[i*verticesItemSize + 6] = bitangent.x;
				bitangents[i*verticesItemSize + 7] = bitangent.y;
				bitangents[i*verticesItemSize + 8] = bitangent.z;
			}

			const bitangentsArrayBuffer = new Float32Array(tangents);
			const bitangentsAttributeLocation = new AttributeLocation(
				{
					itemSize: 3,
					arrayBuffer: bitangentsArrayBuffer,
					bufferDescriptor: new BufferDescriptor(
						{
							label: "mesh geometry bitangents buffer",
							size: bitangentsArrayBuffer.length,
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
										shaderLocation: -1,
									}
								)
							],						
						}
					)
				}
			);
			// bitangentsAttributeLocation.normalize();
			bitangentsAttributeLocation.setValue(
				"mesh bitangents",
				new BufferSetInstruction(
					{
						label: "mesh bitangents",
	
						number: -1,
	
						source: {
							arrayBuffer: bitangentsArrayBuffer,
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
						size: bitangentsArrayBuffer.length
					}
				)
			);


			this.bitangents = bitangentsAttributeLocation;
		}
	}

	static createGeometryArray(args = {}, kGeometry, applyTransform) {
		const indexed = args.indexed;
		const baseGeometry = args.baseGeometry;

		const elements = baseGeometry.elements;

		const geometryArray = new Array();


		for (let ke = 0, offset = 0; ke < elements.length; ke++) {
			const element = elements[ke];

			const transform = element.transform;
			const indices = element.indices;
			const vertices = element.vertices;

			const vGeometry = vertices.get(kGeometry);


			for (let ki = 0; ki < indices.length; ki += indices.itemSize) {
				const vi = indices[ki];

				//get item
				// const vv = new Vector3();
				// vv.x = vertices.positions[vi*3 + 0];
				// vv.y = vertices.positions[vi*3 + 1];
				// vv.z = vertices.positions[vi*3 + 2];
				const item = vGeometry.getItemAt(vi);

				//transform item
				// vv.applyMatrix4(transform.TRSMat);
				const itemTransformed = applyTransform(item, transform, vi, ki);

				//set array
				// verticesArray[(offset + (indexed ? vi : ki))*3 + 0] = vv.x;
				// verticesArray[(offset + (indexed ? vi : ki))*3 + 1] = vv.y;
				// verticesArray[(offset + (indexed ? vi : ki))*3 + 2] = vv.z;
				for (let ks = 0; ks < vGeometry.itemSize; ks++) {
					geometryArray[(offset + (indexed ? vi : ki))*vGeometry.itemSize + ks] = itemTransformed[0*vGeometry.itemSize + ks];
				}
			}


			offset = offset + (indexed ? vertices.count : indices.count);
		}


		return geometryArray;
	}

	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), MeshGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), MeshGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}
	static createIndicesArrayBuffer(args = {}) {
		const indexed = MeshGeometry.#args(args).indexed;
		const baseGeometry = MeshGeometry.#args(args).baseGeometry;

		const elements = baseGeometry.elements;

		const indicesArray = new Array();


		for (let ke = 0, offset = 0; ke < elements.length; ke++) {
			const element = elements[ke];

			const transform = element.transform;
			const indices = element.indices;
			const vertices = element.vertices;


			for (let ki = 0; ki < indices.length; ki += indices.itemSize) {
				const vi = indices[ki];

				const item = offset + (indexed ? vi : ki); // call transform

				indicesArray.push(item);
			}


			offset = offset + (indexed ? vertices.count : indices.count);
		}


		return new Uint32Array(indicesArray);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		// return new AttributeLocation(
		// 	{
		// 		number: (args.number !== undefined) ? args.number : null,
		// 		itemSize: (args.itemSize !== undefined) ? args.itemSize : (1),
		// 		arrayBuffer: indicesArrayBuffer,

		// 		bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
		// 			{
		// 				label: (args.label !== undefined) ? args.label : "mesh indices buffer",
		// 				size: (args.size !== undefined) ? args.size : (indicesArrayBuffer.length),
		// 				usage: (args.usage !== undefined) ? args.usage : (BufferUsage.INDEX | BufferUsage.COPY_DST),
		// 				mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
		// 			}
		// 		),
		// 		// vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
		// 		// 	{
		// 		// 		arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (1) * indicesArrayBuffer.BYTES_PER_ELEMENT,
		// 		// 		stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
		// 		// 		attributes: (args.attributes !== undefined) ? args.attributes : [
		// 		// 			new VertexAttribute(
		// 		// 				{
		// 		// 					format: (args.format !== undefined) ? args.format : VertexFormat.UINT_32,
		// 		// 					offset: (args.offset !== undefined) ? args.offset : (0) * indicesArrayBuffer.BYTES_PER_ELEMENT,
		// 		// 					shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 0
		// 		// 				}
		// 		// 			)
		// 		// 		]
		// 		// 	}
		// 		// )
		// 		vertexBufferLayoutDescriptor: null
		// 	}
		// );
		return super.createAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				number: (args.number !== undefined) ? args.number : null,
				itemSize: (args.itemSize !== undefined) ? args.itemSize : (1),
				arrayBuffer: indicesArrayBuffer,

				bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
					{
						label: (args.label !== undefined) ? args.label : "mesh indices buffer",
						size: (args.size !== undefined) ? args.size : (indicesArrayBuffer.length),
						usage: (args.usage !== undefined) ? args.usage : (BufferUsage.INDEX | BufferUsage.COPY_DST),
						mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
					}
				),
				// vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
				// 	{
				// 		arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (1) * indicesArrayBuffer.BYTES_PER_ELEMENT,
				// 		stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
				// 		attributes: (args.attributes !== undefined) ? args.attributes : [
				// 			new VertexAttribute(
				// 				{
				// 					format: (args.format !== undefined) ? args.format : VertexFormat.UINT_32,
				// 					offset: (args.offset !== undefined) ? args.offset : (0) * indicesArrayBuffer.BYTES_PER_ELEMENT,
				// 					shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 0
				// 				}
				// 			)
				// 		]
				// 	}
				// )
				vertexBufferLayoutDescriptor: null
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		// indicesAttributeLocation.setValue(
		// 	(args.label !== undefined) ? args.label : "mesh vertices",
		// 	(args.bufferSetInstruction !== undefined) ? args.bufferSetInstruction : new BufferSetInstruction(
		// 		{
		// 			label: (args.label !== undefined) ? args.label : "mesh indices",

		// 			number: (args.number !== undefined) ? args.number : null,

		// 			source: (args.source !== undefined) ? args.source : {
		// 				arrayBuffer: indicesArrayBuffer,
		// 				layout: {
		// 					offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
		// 				}
		// 			},
		// 			destination: (args.destination !== undefined) ? args.destination : {
		// 				buffer: null,
		// 				layout: {
		// 					offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
		// 				}
		// 			},
		// 			size: (args.size !== undefined) ? args.size : (indicesArrayBuffer.length)
		// 		}
		// 	)
		// );
		super.setValueAttributeLocation(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				label: (args.label !== undefined) ? args.label : "mesh indices",

				number: (args.number !== undefined) ? args.number : null,

				source: (args.source !== undefined) ? args.source : {
					arrayBuffer: indicesArrayBuffer,
					layout: {
						offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
					}
				},
				destination: (args.destination !== undefined) ? args.destination : {
					buffer: null,
					layout: {
						offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
					}
				},
				size: (args.size !== undefined) ? args.size : (indicesArrayBuffer.length)
			}
		);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = MeshGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = MeshGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		MeshGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return indicesAttributeLocation;
	}

	static createVerticesArrayBuffer(args = {}) {
		return new Float32Array(MeshGeometry.createGeometryArray(
			MeshGeometry.#args(args),
			"positions",
			(item, transform) => {
				return new Vector3().fromArray(item).applyMatrix4(transform.TRSMat).toArray();
			},
		));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		// return new AttributeLocation(
		// 	{
		// 		number: (args.number !== undefined) ? args.number : 0,
		// 		itemSize: (args.itemSize !== undefined) ? args.itemSize : (3),
		// 		arrayBuffer: verticesArrayBuffer,

		// 		bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
		// 			{
		// 				label: (args.label !== undefined) ? args.label : "mesh vertices buffer",
		// 				size: (args.size !== undefined) ? args.size : (verticesArrayBuffer.length),
		// 				usage: (args.usage !== undefined) ? args.usage : (BufferUsage.VERTEX | BufferUsage.COPY_DST),
		// 				mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
		// 			}
		// 		),
		// 		vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
		// 			{
		// 				arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (3) * verticesArrayBuffer.BYTES_PER_ELEMENT,
		// 				stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
		// 				attributes: (args.attributes !== undefined) ? args.attributes : [
		// 					new VertexAttribute(
		// 						{
		// 							format: (args.format !== undefined) ? args.format : VertexFormat.FLOAT_32x3,
		// 							offset: (args.offset !== undefined) ? args.offset : (0) * verticesArrayBuffer.BYTES_PER_ELEMENT,
		// 							shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 0
		// 						}
		// 					)
		// 				]
		// 			}
		// 		)
		// 	}
		// );
		return super.createAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				number: (args.number !== undefined) ? args.number : 0,
				itemSize: (args.itemSize !== undefined) ? args.itemSize : (3),
				arrayBuffer: verticesArrayBuffer,

				bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
					{
						label: (args.label !== undefined) ? args.label : "mesh vertices buffer",
						size: (args.size !== undefined) ? args.size : (verticesArrayBuffer.length),
						usage: (args.usage !== undefined) ? args.usage : (BufferUsage.VERTEX | BufferUsage.COPY_DST),
						mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
					}
				),
				vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
					{
						arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (3) * verticesArrayBuffer.BYTES_PER_ELEMENT,
						stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
						attributes: (args.attributes !== undefined) ? args.attributes : [
							new VertexAttribute(
								{
									format: (args.format !== undefined) ? args.format : VertexFormat.FLOAT_32x3,
									offset: (args.offset !== undefined) ? args.offset : (0) * verticesArrayBuffer.BYTES_PER_ELEMENT,
									shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 0
								}
							)
						]
					}
				)
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		// verticesAttributeLocation.setValue(
		// 	(args.label !== undefined) ? args.label : "mesh vertices",
		// 	(args.bufferSetInstruction !== undefined) ? args.bufferSetInstruction : new BufferSetInstruction(
		// 		{
		// 			label: (args.label !== undefined) ? args.label : "mesh vertices",

		// 			number: (args.number !== undefined) ? args.number : 0,

		// 			source: (args.source !== undefined) ? args.source : {
		// 				arrayBuffer: verticesArrayBuffer,
		// 				layout: {
		// 					offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
		// 				}
		// 			},
		// 			destination: (args.destination !== undefined) ? args.destination : {
		// 				buffer: null,
		// 				layout: {
		// 					offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
		// 				}
		// 			},
		// 			size: (args.size !== undefined) ? args.size : (verticesArrayBuffer.length)
		// 		}
		// 	)
		// );
		super.setValueAttributeLocation(
			verticesAttributeLocation,
			verticesArrayBuffer,
			{
				label: (args.label !== undefined) ? args.label : "mesh vertices",

				number: (args.number !== undefined) ? args.number : 0,

				source: (args.source !== undefined) ? args.source : {
					arrayBuffer: verticesArrayBuffer,
					layout: {
						offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
					}
				},
				destination: (args.destination !== undefined) ? args.destination : {
					buffer: null,
					layout: {
						offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
					}
				},
				size: (args.size !== undefined) ? args.size : (verticesArrayBuffer.length)
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = MeshGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = MeshGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		MeshGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return new Float32Array(MeshGeometry.createGeometryArray(
			MeshGeometry.#args(args),
			"normals",
			(item, transform) => {
				return new Vector3().fromArray(item).applyMatrix3(new Matrix3().getNormalMatrix(transform.TRSMat)).toArray();
			},
		));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		// return new AttributeLocation(
		// 	{
		// 		number: (args.number !== undefined) ? args.number : 1,
		// 		itemSize: (args.itemSize !== undefined) ? args.itemSize : (3),
		// 		arrayBuffer: normalsArrayBuffer,

		// 		bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
		// 			{
		// 				label:  (args.label !== undefined) ? args.label : "mesh normals buffer",
		// 				size: (args.size !== undefined) ? args.size : (normalsArrayBuffer.length),
		// 				usage: (args.usage !== undefined) ? args.usage : (BufferUsage.VERTEX | BufferUsage.COPY_DST),
		// 				mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
		// 			}
		// 		),
		// 		vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
		// 			{
		// 				arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (3) * normalsArrayBuffer.BYTES_PER_ELEMENT,
		// 				stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
		// 				attributes: (args.attributes !== undefined) ? args.attributes : [
		// 					new VertexAttribute(
		// 						{
		// 							format: (args.format !== undefined) ? args.format : VertexFormat.FLOAT_32x3,
		// 							offset: (args.offset !== undefined) ? args.offset : (0) * normalsArrayBuffer.BYTES_PER_ELEMENT,
		// 							shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 1
		// 						}
		// 					)
		// 				]
		// 			}
		// 		),
		// 	}
		// );
		// normalsAttributeLocation.normalize(); // no need to normalize for this configuration
		return super.createAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				number: (args.number !== undefined) ? args.number : 1,
				itemSize: (args.itemSize !== undefined) ? args.itemSize : (3),
				arrayBuffer: normalsArrayBuffer,

				bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
					{
						label: (args.label !== undefined) ? args.label : "mesh normals buffer",
						size: (args.size !== undefined) ? args.size : (normalsArrayBuffer.length),
						usage: (args.usage !== undefined) ? args.usage : (BufferUsage.VERTEX | BufferUsage.COPY_DST),
						mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
					}
				),
				vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
					{
						arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (3) * normalsArrayBuffer.BYTES_PER_ELEMENT,
						stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
						attributes: (args.attributes !== undefined) ? args.attributes : [
							new VertexAttribute(
								{
									format: (args.format !== undefined) ? args.format : VertexFormat.FLOAT_32x3,
									offset: (args.offset !== undefined) ? args.offset : (0) * normalsArrayBuffer.BYTES_PER_ELEMENT,
									shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 1
								}
							)
						]
					}
				)
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		// normalsAttributeLocation.setValue(
		// 	(args.label !== undefined) ? args.label : "mesh normals",
		// 	(args.bufferSetInstruction !== undefined) ? args.bufferSetInstruction : new BufferSetInstruction(
		// 		{
		// 			label: (args.label !== undefined) ? args.label : "mesh normals",

		// 			number: (args.number !== undefined) ? args.number : 1,

		// 			source: (args.source !== undefined) ? args.source : {
		// 				arrayBuffer: normalsArrayBuffer,
		// 				layout: {
		// 					offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
		// 				}
		// 			},
		// 			destination: (args.destination !== undefined) ? args.destination : {
		// 				buffer: null,
		// 				layout: {
		// 					offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
		// 				}
		// 			},
		// 			size: (args.size !== undefined) ? args.size : (normalsArrayBuffer.length)
		// 		}
		// 	)
		// );
		super.setValueAttributeLocation(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				label: (args.label !== undefined) ? args.label : "mesh normals",

				number: (args.number !== undefined) ? args.number : 1,

				source: (args.source !== undefined) ? args.source : {
					arrayBuffer: normalsArrayBuffer,
					layout: {
						offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
					}
				},
				destination: (args.destination !== undefined) ? args.destination : {
					buffer: null,
					layout: {
						offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
					}
				},
				size: (args.size !== undefined) ? args.size : (normalsArrayBuffer.length)
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = MeshGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = MeshGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		MeshGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}

	static createUVsArrayBuffer(args = {}) {
		return new Float32Array(MeshGeometry.createGeometryArray(
			MeshGeometry.#args(args),
			"uvs",
			(item, transform) => {
				return item;
			},
		));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		// return new AttributeLocation(
		// 	{
		// 		number: (args.number !== undefined) ? args.number : 2,
		// 		itemSize: (args.itemSize !== undefined) ? args.itemSize : (2),
		// 		arrayBuffer: uvsArrayBuffer,

		// 		bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
		// 			{
		// 				label: (args.label !== undefined) ? args.label : "mesh uvs buffer",
		// 				size: (args.size !== undefined) ? args.size : (uvsArrayBuffer.length),
		// 				usage: (args.usage !== undefined) ? args.usage : (BufferUsage.VERTEX | BufferUsage.COPY_DST),
		// 				mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
		// 			}
		// 		),
		// 		vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
		// 			{
		// 				arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (2) * uvsArrayBuffer.BYTES_PER_ELEMENT,
		// 				stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
		// 				attributes: (args.attributes !== undefined) ? args.attributes : [
		// 					new VertexAttribute(
		// 						{
		// 							format: (args.format !== undefined) ? args.format : VertexFormat.FLOAT_32x2,
		// 							offset: (args.offset !== undefined) ? args.offset : (0) * uvsArrayBuffer.BYTES_PER_ELEMENT,
		// 							shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 2
		// 						}
		// 					)
		// 				]
		// 			}
		// 		)
		// 	}
		// );
		return super.createAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				number: (args.number !== undefined) ? args.number : 2,
				itemSize: (args.itemSize !== undefined) ? args.itemSize : (2),
				arrayBuffer: uvsArrayBuffer,

				bufferDescriptor: (args.bufferDescriptor !== undefined) ? args.bufferDescriptor : new BufferDescriptor(
					{
						label: (args.label !== undefined) ? args.label : "mesh uvs buffer",
						size: (args.size !== undefined) ? args.size : (uvsArrayBuffer.length),
						usage: (args.usage !== undefined) ? args.usage : (BufferUsage.VERTEX | BufferUsage.COPY_DST),
						mappedAtCreation: (args.mappedAtCreation !== undefined) ? args.mappedAtCreation : false
					}
				),
				vertexBufferLayoutDescriptor: (args.vertexBufferLayoutDescriptor !== undefined) ? args.vertexBufferLayoutDescriptor : new VertexBufferLayout(
					{
						arrayStride: (args.arrayStride !== undefined) ? args.arrayStride : (2) * uvsArrayBuffer.BYTES_PER_ELEMENT,
						stepMode: (args.stepMode !== undefined) ? args.stepMode : VertexStepMode.VERTEX,
						attributes: (args.attributes !== undefined) ? args.attributes : [
							new VertexAttribute(
								{
									format: (args.format !== undefined) ? args.format : VertexFormat.FLOAT_32x2,
									offset: (args.offset !== undefined) ? args.offset : (0) * uvsArrayBuffer.BYTES_PER_ELEMENT,
									shaderLocation: (args.shaderLocation !== undefined) ? args.shaderLocation : 2
								}
							)
						]
					}
				)
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		// uvsAttributeLocation.setValue(
		// 	(args.label !== undefined) ? args.label : "mesh uvs",
		// 	(args.bufferSetInstruction !== undefined) ? args.bufferSetInstruction : new BufferSetInstruction(
		// 		{
		// 			label: (args.label !== undefined) ? args.label : "mesh uvs",

		// 			number: (args.number !== undefined) ? args.number : 2,

		// 			source: (args.source !== undefined) ? args.source : {
		// 				arrayBuffer: uvsArrayBuffer,
		// 				layout: {
		// 					offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
		// 				}
		// 			},
		// 			destination: (args.destination !== undefined) ? args.destination : {
		// 				buffer: null,
		// 				layout: {
		// 					offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
		// 				}
		// 			},
		// 			size: (args.size !== undefined) ? args.size : (uvsArrayBuffer.length)
		// 		}
		// 	)
		// );
		super.setValueAttributeLocation(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				label: (args.label !== undefined) ? args.label : "mesh uvs",

				number: (args.number !== undefined) ? args.number : 2,

				source: (args.source !== undefined) ? args.source : {
					arrayBuffer: uvsArrayBuffer,
					layout: {
						offset: (args.sourceOffset !== undefined) ? args.sourceOffset : (0)
					}
				},
				destination: (args.destination !== undefined) ? args.destination : {
					buffer: null,
					layout: {
						offset: (args.destinationOffset !== undefined) ? args.destinationOffset : (0)
					}
				},
				size: (args.size !== undefined) ? args.size : (uvsArrayBuffer.length)
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = MeshGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = MeshGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		MeshGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}
};
