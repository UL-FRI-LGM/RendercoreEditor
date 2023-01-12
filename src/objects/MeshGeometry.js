import { Vector2 } from "../math/Vector2.js";
import { Vector3 } from "../math/Vector3.js";
import { Geometry } from "./Geometry.js";
import { RCBufferDescriptor } from "../core/RC/buffers/RCBufferDescriptor.js";
import { GPUVertexFormat } from "../core/ENUM/GPUVertexFormat.js";


export class MeshGeometry extends Geometry {
	static DEFAULT = {
		TYPE: "MeshGeometry",
		NAME: "",
	};


	#bufferDescriptors;

	#indices;
	#vertices;
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
			}
		);


		this.bufferDescriptors = new Map();

		// buffer descriptors
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
	}


	get bufferDescriptors() { return this.#bufferDescriptors; }
	set bufferDescriptors(bufferDescriptors) { this.#bufferDescriptors = bufferDescriptors; }

	get indices() { return this.#indices; }
	set indices(indices) { 
		this.#indices = indices;
		this.bufferDescriptors.set("indices", indices);
	}
	get vertices() { return this.#vertices; }
	set vertices(vertices) { 
		this.#vertices = vertices;
		this.bufferDescriptors.set("vertices", vertices);
	}
	get normals() { return this.#normals; }
	set normals(normals) { 
		this.#normals = normals;
		this.bufferDescriptors.set("normals", normals);
	}
	get tangents() { return this.#tangents; }
	set tangents(tangents) { 
		this.#tangents = tangents;
		this.bufferDescriptors.set("tangents", tangents);
	}
	get bitangents() { return this.#bitangents; }
	set bitangents(bitangents) { 
		this.#bitangents = bitangents;
		this.bufferDescriptors.set("bitangents", bitangents);
	}
	get colors() { return this.#colors; }
	set colors(colors) { 
		this.#colors = colors;
		this.bufferDescriptors.set("colors", colors);
	}
	get uvs() { return this.#uvs; }
	set uvs(uvs) { 
		this.#uvs = uvs;
		this.bufferDescriptors.set("uvs", uvs);
	}
	get MMats() { return this.#MMats; }
	set MMats(MMats) { 
		this.#MMats = MMats;
		this.bufferDescriptors.set("MMats", MMats);
	}
	get translations() { return this.#translations; }
	set translations(translations) { 
		this.#translations = translations;
		this.bufferDescriptors.set("translations", translations);
	}

	get wireframeIndices() { return this.#wireframeIndices; }
	set wireframeIndices(wireframeIndices) { 
		this.#wireframeIndices = wireframeIndices;
		this.bufferDescriptors.set("wireframeIndices", wireframeIndices);
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
		const wireframeIndicesBufferDescriptor = new RCBufferDescriptor(
			{
				size: wireframeIndicesArrayBuffer.length,
				itemSize: 1,
				shaderLocation: -1,
				format: GPUVertexFormat.UINT_32,

				arrayBuffer: wireframeIndicesArrayBuffer,
			}
		);
		this.wireframeIndices = wireframeIndicesBufferDescriptor;
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
		const normalsBufferDescriptor = new RCBufferDescriptor(
			{
				size: normalsArrayBuffer.length,
				itemSize: 3,
				shaderLocation: 1,
				format: GPUVertexFormat.FLOAT_32x3,

				arrayBuffer: normalsArrayBuffer,
			}
		);
		normalsBufferDescriptor.normalize();

		this.normals = normalsBufferDescriptor;
		this.normals.needsUpdate = true;
		return normalsBufferDescriptor;
	}
	computeVertexTangents(){
		if (this.indices) {
			const indices = this.indices;
			const vertices = this.vertices;
			const UVs = this.uvs;

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

			const tangents = new Array(vertices.count() * vertices.itemSize);

			//for each tringle
			for (let i = 0; i < indices.count(); i+=3) {

				//vertices
				v1.x = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*vertices.itemSize + 0];
				v1.y = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*vertices.itemSize + 1];
				v1.z = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*vertices.itemSize + 2];

				v2.x = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*vertices.itemSize + 0];
				v2.y = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*vertices.itemSize + 1];
				v2.z = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*vertices.itemSize + 2];

				v3.x = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*vertices.itemSize + 0];
				v3.y = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*vertices.itemSize + 1];
				v3.z = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*vertices.itemSize + 2];

				//UVs
				uv1.x = UVs.arrayBuffer[indices.arrayBuffer[i + 0]*UVs.itemSize + 0];
				uv1.y = UVs.arrayBuffer[indices.arrayBuffer[i + 0]*UVs.itemSize + 1];

				uv2.x = UVs.arrayBuffer[indices.arrayBuffer[i + 1]*UVs.itemSize + 0];
				uv2.y = UVs.arrayBuffer[indices.arrayBuffer[i + 1]*UVs.itemSize + 1];

				uv3.x = UVs.arrayBuffer[indices.arrayBuffer[i + 2]*UVs.itemSize + 0];
				uv3.y = UVs.arrayBuffer[indices.arrayBuffer[i + 2]*UVs.itemSize + 1];


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
				tangents[indices.arrayBuffer[i + 0]*vertices.itemSize + 0] = tangent.x;
				tangents[indices.arrayBuffer[i + 0]*vertices.itemSize + 1] = tangent.y;
				tangents[indices.arrayBuffer[i + 0]*vertices.itemSize + 2] = tangent.z;

				tangents[indices.arrayBuffer[i + 1]*vertices.itemSize + 0] = tangent.x;
				tangents[indices.arrayBuffer[i + 1]*vertices.itemSize + 1] = tangent.y;
				tangents[indices.arrayBuffer[i + 1]*vertices.itemSize + 2] = tangent.z;

				tangents[indices.arrayBuffer[i + 2]*vertices.itemSize + 0] = tangent.x;
				tangents[indices.arrayBuffer[i + 2]*vertices.itemSize + 1] = tangent.y;
				tangents[indices.arrayBuffer[i + 2]*vertices.itemSize + 2] = tangent.z;
			}


			const tangentsBufferDescriptor = new RCBufferDescriptor(
				{
					size: tangents.length,
					itemSize: 3,
					shaderLocation: -1,
					format: GPUVertexFormat.FLOAT_32x3,

					arrayBuffer: tangents,
				}
			);
			// tangentsBufferDescriptor.normalize();
			this.tangents = tangentsBufferDescriptor;
		} else {
			const vertices = this.vertices;
			const UVs = this.uv;

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

			const tangents = new Array(vertices.count() * vertices.itemSize);

			//for each tringle
			for (let i = 0; i < vertices.count(); i+=3) {

				//vertices
				v1.x = vertices.arrayBuffer[i*vertices.itemSize + 0];
				v1.y = vertices.arrayBuffer[i*vertices.itemSize + 1];
				v1.z = vertices.arrayBuffer[i*vertices.itemSize + 2];

				v2.x = vertices.arrayBuffer[i*vertices.itemSize + 3];
				v2.y = vertices.arrayBuffer[i*vertices.itemSize + 4];
				v2.z = vertices.arrayBuffer[i*vertices.itemSize + 5];

				v3.x = vertices.arrayBuffer[i*vertices.itemSize + 6];
				v3.y = vertices.arrayBuffer[i*vertices.itemSize + 7];
				v3.z = vertices.arrayBuffer[i*vertices.itemSize + 8];

				//UVs
				uv1.x = UVs.arrayBuffer[i*UVs.itemSize + 0];
				uv1.y = UVs.arrayBuffer[i*UVs.itemSize + 1];

				uv2.x = UVs.arrayBuffer[i*UVs.itemSize + 2];
				uv2.y = UVs.arrayBuffer[i*UVs.itemSize + 3];

				uv3.x = UVs.arrayBuffer[i*UVs.itemSize + 4];
				uv3.y = UVs.arrayBuffer[i*UVs.itemSize + 5];

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
				tangents[i*vertices.itemSize + 0] = tangent.x;
				tangents[i*vertices.itemSize + 1] = tangent.y;
				tangents[i*vertices.itemSize + 2] = tangent.z;

				tangents[i*vertices.itemSize + 3] = tangent.x;
				tangents[i*vertices.itemSize + 4] = tangent.y;
				tangents[i*vertices.itemSize + 5] = tangent.z;

				tangents[i*vertices.itemSize + 6] = tangent.x;
				tangents[i*vertices.itemSize + 7] = tangent.y;
				tangents[i*vertices.itemSize + 8] = tangent.z;
			}
	

			const tangentsBufferDescriptor = new RCBufferDescriptor(
				{
					size: tangents.length,
					itemSize: 3,
					shaderLocation: -1,
					format: GPUVertexFormat.FLOAT_32x3,

					arrayBuffer: tangents,
				}
			);
			// tangentsBufferDescriptor.normalize();
			this.tangents = tangentsBufferDescriptor;
		}
	}
	computeVertexBitangents(){
		if (this.indices) {
			const indices = this.indices;
			const vertices = this.vertices;
			const UVs = this.uv;

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

			const bitangents = new Array(vertices.count() * vertices.itemSize);

			//for each tringle
			for (let i = 0; i < indices.count(); i+=3) {
				//vertices
				v1.x = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*vertices.itemSize + 0];
				v1.y = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*vertices.itemSize + 1];
				v1.z = vertices.arrayBuffer[indices.arrayBuffer[i + 0]*vertices.itemSize + 2];

				v2.x = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*vertices.itemSize + 0];
				v2.y = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*vertices.itemSize + 1];
				v2.z = vertices.arrayBuffer[indices.arrayBuffer[i + 1]*vertices.itemSize + 2];

				v3.x = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*vertices.itemSize + 0];
				v3.y = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*vertices.itemSize + 1];
				v3.z = vertices.arrayBuffer[indices.arrayBuffer[i + 2]*vertices.itemSize + 2];

				//UVs
				uv1.x = UVs.arrayBuffer[indices.arrayBuffer[i + 0]*UVs.itemSize + 0];
				uv1.y = UVs.arrayBuffer[indices.arrayBuffer[i + 0]*UVs.itemSize + 1];

				uv2.x = UVs.arrayBuffer[indices.arrayBuffer[i + 1]*UVs.itemSize + 0];
				uv2.y = UVs.arrayBuffer[indices.arrayBuffer[i + 1]*UVs.itemSize + 1];

				uv3.x = UVs.arrayBuffer[indices.arrayBuffer[i + 2]*UVs.itemSize + 0];
				uv3.y = UVs.arrayBuffer[indices.arrayBuffer[i + 2]*UVs.itemSize + 1];


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
				bitangents[indices.arrayBuffer[i + 0]*vertices.itemSize + 0] = bitangent.x;
				bitangents[indices.arrayBuffer[i + 0]*vertices.itemSize + 1] = bitangent.y;
				bitangents[indices.arrayBuffer[i + 0]*vertices.itemSize + 2] = bitangent.z;

				bitangents[indices.arrayBuffer[i + 1]*vertices.itemSize + 0] = bitangent.x;
				bitangents[indices.arrayBuffer[i + 1]*vertices.itemSize + 1] = bitangent.y;
				bitangents[indices.arrayBuffer[i + 1]*vertices.itemSize + 2] = bitangent.z;

				bitangents[indices.arrayBuffer[i + 2]*vertices.itemSize + 0] = bitangent.x;
				bitangents[indices.arrayBuffer[i + 2]*vertices.itemSize + 1] = bitangent.y;
				bitangents[indices.arrayBuffer[i + 2]*vertices.itemSize + 2] = bitangent.z;
			}


			const bitangentsBufferDescriptor = new RCBufferDescriptor(
				{
					size: bitangents.length,
					itemSize: 3,
					shaderLocation: -1,
					format: GPUVertexFormat.FLOAT_32x3,

					arrayBuffer: bitangents,
				}
			);
			// bitangentsBufferDescriptor.normalize();
			this.bitangents = bitangentsBufferDescriptor;
		} else {
			const vertices = this.vertices;
			const UVs = this.uv;

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

			const bitangents = new Array(vertices.count() * vertices.itemSize);

			//for each tringle
			for (let i = 0; i < vertices.count(); i+=3) {
				//vertices
				v1.x = vertices.arrayBuffer[i*vertices.itemSize + 0];
				v1.y = vertices.arrayBuffer[i*vertices.itemSize + 1];
				v1.z = vertices.arrayBuffer[i*vertices.itemSize + 2];

				v2.x = vertices.arrayBuffer[i*vertices.itemSize + 3];
				v2.y = vertices.arrayBuffer[i*vertices.itemSize + 4];
				v2.z = vertices.arrayBuffer[i*vertices.itemSize + 5];

				v3.x = vertices.arrayBuffer[i*vertices.itemSize + 6];
				v3.y = vertices.arrayBuffer[i*vertices.itemSize + 7];
				v3.z = vertices.arrayBuffer[i*vertices.itemSize + 8];

				//UVs
				uv1.x = UVs.arrayBuffer[i*UVs.itemSize + 0];
				uv1.y = UVs.arrayBuffer[i*UVs.itemSize + 1];

				uv2.x = UVs.arrayBuffer[i*UVs.itemSize + 2];
				uv2.y = UVs.arrayBuffer[i*UVs.itemSize + 3];

				uv3.x = UVs.arrayBuffer[i*UVs.itemSize + 4];
				uv3.y = UVs.arrayBuffer[i*UVs.itemSize + 5];


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
				bitangents[i*vertices.itemSize + 0] = bitangent.x;
				bitangents[i*vertices.itemSize + 1] = bitangent.y;
				bitangents[i*vertices.itemSize + 2] = bitangent.z;

				bitangents[i*vertices.itemSize + 3] = bitangent.x;
				bitangents[i*vertices.itemSize + 4] = bitangent.y;
				bitangents[i*vertices.itemSize + 5] = bitangent.z;

				bitangents[i*vertices.itemSize + 6] = bitangent.x;
				bitangents[i*vertices.itemSize + 7] = bitangent.y;
				bitangents[i*vertices.itemSize + 8] = bitangent.z;
			}


			const bitangentsBufferDescriptor = new RCBufferDescriptor(
				{
					size: bitangents.length,
					itemSize: 3,
					shaderLocation: -1,
					format: GPUVertexFormat.FLOAT_32x3,

					arrayBuffer: bitangents,
				}
			);
			// bitangentsBufferDescriptor.normalize();
			this.bitangents = bitangentsBufferDescriptor;
		}
	}

	generateBuffer(context, bufferDescriptor) {
		bufferDescriptor.generate(context);
	}
	generate(context, camera) {
		for (const [name, descriptor] of this.bufferDescriptors) {
			if (descriptor !== null) this.generateBuffer(context, descriptor);
		}
	}

	updateBuffer(context, bufferDescriptor) {
		bufferDescriptor.update(context);
	}
	update(context) {
		for (const [name, descriptor] of this.bufferDescriptors) {
			if (descriptor !== null) this.updateBuffer(context, descriptor);
		}
	}

	setBuffer(renderPassEncoder, bufferDescriptor, slot) {
		bufferDescriptor.set(renderPassEncoder, slot);
	}
	set(renderPassEncoder) {
		let slot = 0; //TODO: this has to be managed somehow

		for (const [name, descriptor] of this.bufferDescriptors) {
			if (descriptor !== null) this.setBuffer(renderPassEncoder, descriptor, slot++);
		}
	}
};