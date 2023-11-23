import { Vector2 } from "../math/Vector2.js";
import { Vector3 } from "../math/Vector3.js";
import { Box3 } from "../math/Box3.js";
import { Sphere } from "../math/Sphere.js";
import { Geometry } from "./Geometry.js";
import { BufferDescriptor } from "../core/RC/buffers/BufferDescriptor.js";
import { AttributeLocation } from "../core/data layouts/AttributeLocation.js";
import { VertexFormat } from "../core/RC/pipeline/vertex state/VertexFormat.js";
import { VertexAttribute } from "../core/RC/pipeline/vertex state/VertexAttribute.js";
import { VertexStepMode } from "../core/RC/pipeline/vertex state/VertexStepMode.js";
import { VertexBufferLayout } from "../core/RC/pipeline/vertex state/VertexBufferLayout.js";
import { BufferUsage } from "../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../core/data layouts/BufferSetInstruction.js";


export class MeshGeometry extends Geometry { //mesh custom geometry


	static DEFAULT = {
		TYPE: "MeshGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: {

		},
	};


	#indexed;
	#baseGeometry;

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

	#boundingBox;
	#boundingSphere;
	

	constructor(args = {}) {
		super(
			{
				...args,

				name: (args.name !== undefined) ? args.name : MeshGeometry.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : MeshGeometry.DEFAULT.TYPE,
			}
		);

		this.indexed = (args.indexed !== undefined) ? args.indexed : MeshGeometry.DEFAULT.INDEXED;
		this.baseGeometry = (args.baseGeometry !== undefined) ? args.baseGeometry : MeshGeometry.DEFAULT.BASE_GEOMETRY;

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
		this.indices = (args.indices !== undefined) ? args.indices : null;
		this.vertices = (args.vertices !== undefined) ? args.vertices : null;
		this.normals = (args.normals !== undefined) ? args.normals : null;
		this.tangents = (args.tangents !== undefined) ? args.tangents : null;
		this.bitangents = (args.bitangents !== undefined) ? args.bitangents : null;
		this.colors = (args.colors !== undefined) ? args.colors : null;
		this.uvs = (args.uvs !== undefined) ? args.uvs : null;
		this.MMats = (args.MMats !== undefined) ? args.MMats : null;
		this.translations = (args.translations !== undefined) ? args.translations : null;

		this.wireframeIndices = (args.wireframeIndices !== undefined) ? args.wireframeIndices : null;
	
		// Bounding
		this.boundingBox = null;
		this.boundingSphere = null;
	}


	get indexed() { return this.#indexed; }
	set indexed(indexed) { this.#indexed = indexed; }
	get baseGeometry() { return this.#baseGeometry; }
	set baseGeometry(baseGeometry) { this.#baseGeometry = baseGeometry; }

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

	get boundingBox() {
		// If the bounding sphere was not yet computed compute it
		if (this.#boundingBox === null) this.computeBoundingBox();

		return this.#boundingBox;
	}
	set boundingBox(boundingBox) { this.#boundingBox = boundingBox; }
	get boundingSphere() {
		// If the bounding sphere was not yet computed compute it
		if (this.#boundingSphere === null) this.computeBoundingSphere();

		return this.#boundingSphere;
	}
	set boundingSphere(boundingSphere) { this.#boundingSphere = boundingSphere; }


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

	/**
	 * Compute minimal bounding box that encapsulates all triangles.
	 */
	computeBoundingBox() {

		// Check if the bounding box already exist
		if (this.#boundingBox === null) {
			this.#boundingBox = new Box3();
		}

		// Create new bounding box using the vertices
		if (this.vertices) {
			this.boundingBox.setFromArray(this.vertices.arrayBuffer);
		}

		if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
			console.error("Geometry error: One or more of bounding box axis min is NaN.");
		}
	}

	/**
	 * Compute minimal bounding sphere that encapsulates all triangles.
	 */
	computeBoundingSphere() {

		// Check if the sphere already exists
		if (this.#boundingSphere === null) {
			this.#boundingSphere = new Sphere();
		}

		// Create new bounding sphere using the vertices
		if (this.vertices) {
			const box = new Box3();
			const vector = new Vector3();
			const arrayBuffer = this.vertices.arrayBuffer;
			const center = this.boundingSphere.center;

			// Set initial bounding sphere based on the bounding box
			box.setFromArray(arrayBuffer);
			box.center(center);

			// Optimize sphere radius
			let maxRadiusSq = 0;

			for (let i = 0; i < arrayBuffer.length; i += 3) {
				vector.fromArray(arrayBuffer, i);
				maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
			}

			this.boundingSphere.radius = Math.sqrt(maxRadiusSq);
		}

		if (isNaN(this.boundingSphere.radius)) {
			console.error("Geometry error: Bounding sphere radius is NaN.");
		}
	}

	static createIndicesArrayBuffer(args = {}) {
		return super.createIndicesArrayBuffer(args);
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "mesh indices buffer";


		return new AttributeLocation(
			{
				number: null,
				itemSize: 1,
				arrayBuffer: indicesArrayBuffer,

				bufferDescriptor: new BufferDescriptor(
					{
						label: label,
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
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "mesh indices";


		indicesAttributeLocation.setValue(
			label,
			new BufferSetInstruction(
				{
					label: label,

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
	}
	static assembleIndices(args = {}) {
		return super.assembleIndices(args);
	}

	static createVerticesArrayBuffer(args = {}) {
		return super.createVerticesArrayBuffer(args);
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "mesh vertices buffer";


		return new AttributeLocation(
			{
				number: 0,
				itemSize: 3,
				arrayBuffer: verticesArrayBuffer,

				bufferDescriptor: new BufferDescriptor(
					{
						label: label,
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
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "mesh vertices";


		verticesAttributeLocation.setValue(
			label,
			new BufferSetInstruction(
				{
					label: label,

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
	}
	static assembleVertices(args = {}) {
		return super.assembleVertices(args);
	}

	static createNormalsArrayBuffer(args = {}) {
		return super.createNormalsArrayBuffer(args);
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "mesh normals buffer";

		
		return new AttributeLocation(
			{
				itemSize: 3,
				arrayBuffer: normalsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: label,
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
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "mesh normals";


		normalsAttributeLocation.setValue(
			label,
			new BufferSetInstruction(
				{
					label: label,

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
	}
	static assembleNormals(args = {}) {
		return super.assembleNormals(args);
	}

	static createUVsArrayBuffer(args = {}) {
		return super.createUVsArrayBuffer(args);
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "mesh uvs buffer";

		
		return new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: uvsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: label,
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
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "mesh uvs";


		uvsAttributeLocation.setValue(
			label,
			new BufferSetInstruction(
				{
					label: label,

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
	}
	static assembleUVs(args = {}) {
		return super.assembleUVs(args);
	}
};