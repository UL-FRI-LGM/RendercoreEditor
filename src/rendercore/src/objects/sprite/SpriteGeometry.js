import { QuadGeometry } from "../quad/QuadGeometry.js";
import { BufferDescriptor } from "../../core/RC/buffers/BufferDescriptor.js";
import { VertexAttribute } from "../../core/RC/pipeline/vertex_state/VertexAttribute.js";
import { VertexBufferLayout } from "../../core/RC/pipeline/vertex_state/VertexBufferLayout.js";
import { VertexFormat } from "../../core/RC/pipeline/vertex_state/VertexFormat.js";
import { VertexStepMode } from "../../core/RC/pipeline/vertex_state/VertexStepMode.js";
import { AttributeLocation } from "../../core/data_layouts/AttributeLocation.js";
import { BufferUsage } from "../../core/RC/buffers/BufferUsage.js";
import { BufferSetInstruction } from "../../core/data_layouts/BufferSetInstruction.js";
import { SpriteBaseGeometry } from "./SpriteBaseGeometry.js";


export class SpriteGeometry extends QuadGeometry {


	static DEFAULT = {
		TYPE: "SpriteGeometry",
		NAME: "",

		INDEXED: false,
		BASE_GEOMETRY: new SpriteBaseGeometry(),
	};
	

	#directions;
	#magnitudes;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpriteGeometry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpriteGeometry.DEFAULT.NAME,

				indexed: (args.indexed !== undefined) ? args.indexed : SpriteGeometry.DEFAULT.INDEXED,
				baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : SpriteGeometry.DEFAULT.BASE_GEOMETRY.clone(),

				indices: (args.indices !== undefined) ? args.indices : SpriteGeometry.assembleIndices(args),
				vertices: (args.vertices !== undefined) ? args.vertices : SpriteGeometry.assembleVertices(args),
				normals: (args.normals !== undefined) ? args.normals : SpriteGeometry.assembleNormals(args),
				tangents: (args.tangents !== undefined) ? args.tangents : null,
				bitangents: (args.bitangents !== undefined) ? args.bitangents : null,
				colors: (args.colors !== undefined) ? args.colors : null,
				uvs: (args.uvs !== undefined) ? args.uvs : SpriteGeometry.assembleUVs(args),
				MMats: (args.MMats !== undefined) ? args.MMats : null,
				translations: (args.translations !== undefined) ? args.translations : null,
			}
		);

		this.directions = (args.directions !== undefined) ? args.directions : SpriteGeometry.assembleDirections(args);
		this.magnitudes = (args.magnitudes !== undefined) ? args.magnitudes : SpriteGeometry.assembleMagnitudes(args);
	}


	get directions() { return this.#directions; }
	set directions(directions) { 
		this.#directions = directions;
		this.attributeLocationDescriptors.set("directions", directions);
	}
	get magnitudes() { return this.#magnitudes; }
	set magnitudes(magnitudes) { 
		this.#magnitudes = magnitudes;
		this.attributeLocationDescriptors.set("magnitudes", magnitudes);
	}


	static #args(args = {}) {
		return {
			...args,

			indexed: (args.indexed !== undefined) ? args.indexed : (console.warn("ARGS: DEFAULT"), SpriteGeometry.DEFAULT.INDEXED),
			baseGeometry: (args.baseGeometry !== undefined) ? args.baseGeometry : (console.warn("ARGS: DEFAULT"), SpriteGeometry.DEFAULT.BASE_GEOMETRY.clone()),
		};
	}

	static createIndicesArrayBuffer(args = {}) {
		return QuadGeometry.createIndicesArrayBuffer(SpriteGeometry.#args(args));
	}
	static createIndicesAttributeLocation(indicesArrayBuffer, args = {}) {
		return super.createIndicesAttributeLocation(
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite indices buffer",
			}
		);
	}
	static setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args = {}) {
		super.setValueIndices(
			indicesAttributeLocation,
			indicesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite indices",
			}
			);
	}
	static assembleIndices(args = {}) {
		const indicesArrayBuffer = SpriteGeometry.createIndicesArrayBuffer(args);
		const indicesAttributeLocation = SpriteGeometry.createIndicesAttributeLocation(indicesArrayBuffer, args);
		SpriteGeometry.setValueIndices(indicesAttributeLocation, indicesArrayBuffer, args);


		return args.indexed ? indicesAttributeLocation : null;
	}

	static createVerticesArrayBuffer(args = {}) {
		return QuadGeometry.createVerticesArrayBuffer(SpriteGeometry.#args(args));
	}
	static createVerticesAttributeLocation(verticesArrayBuffer, args = {}) {
		return super.createVerticesAttributeLocation(
			verticesArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite vertices buffer",
			}
		);
	}
	static setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args = {}) {
		super.setValueVertices(
			verticesAttributeLocation,
			verticesArrayBuffer,
			args = {
				...args,

				label: (args.label !== undefined) ? args.label : "sprite vertices",
			}
		);
	}
	static assembleVertices(args = {}) {
		const verticesArrayBuffer = SpriteGeometry.createVerticesArrayBuffer(args);
		const verticesAttributeLocation = SpriteGeometry.createVerticesAttributeLocation(verticesArrayBuffer, args);
		SpriteGeometry.setValueVertices(verticesAttributeLocation, verticesArrayBuffer, args);


		return verticesAttributeLocation;
	}

	static createNormalsArrayBuffer(args = {}) {
		return QuadGeometry.createNormalsArrayBuffer(SpriteGeometry.#args(args));
	}
	static createNormalsAttributeLocation(normalsArrayBuffer, args = {}) {
		return super.createNormalsAttributeLocation(
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite normals buffer",
			}
		);
	}
	static setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args = {}) {
		super.setValueNormals(
			normalsAttributeLocation,
			normalsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite normals",
			}
		);
	}
	static assembleNormals(args = {}) {
		const normalsArrayBuffer = SpriteGeometry.createNormalsArrayBuffer(args);
		const normalsAttributeLocation = SpriteGeometry.createNormalsAttributeLocation(normalsArrayBuffer, args);
		SpriteGeometry.setValueNormals(normalsAttributeLocation, normalsArrayBuffer, args);


		return normalsAttributeLocation;
	}
	
	static createUVsArrayBuffer(args = {}) {
		return QuadGeometry.createUVsArrayBuffer(SpriteGeometry.#args(args));
	}
	static createUVsAttributeLocation(uvsArrayBuffer, args = {}) {
		return super.createUVsAttributeLocation(
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite uvs buffer",
			}
		);
	}
	static setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args = {}) {
		super.setValueUVs(
			uvsAttributeLocation,
			uvsArrayBuffer,
			{
				...args,

				label: (args.label !== undefined) ? args.label : "sprite uvs",
			}
		);
	}
	static assembleUVs(args = {}) {
		const uvsArrayBuffer = SpriteGeometry.createUVsArrayBuffer(args);
		const uvsAttributeLocation = SpriteGeometry.createUVsAttributeLocation(uvsArrayBuffer, args);
		SpriteGeometry.setValueUVs(uvsAttributeLocation, uvsArrayBuffer, args);


		return uvsAttributeLocation;
	}

	static createDirectionsArrayBuffer(args = {}) {
		return new Float32Array(SpriteGeometry.createGeometryArray(
			SpriteGeometry.#args(args),
			"directions",
			(item, transform) => {
				return item;
			},
		));
	}
	static createDirectionsAttributeLocation(directionsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "sprite directions buffer";


		return new AttributeLocation(
			{
				itemSize: 2,
				arrayBuffer: directionsArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: label,
						size: directionsArrayBuffer.length,
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
									shaderLocation: 3,
								}
							)
						],						
					}
				)
			}
		);
	}
	static setValueDirections(directionsAttributeLocation, directionsArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "sprite directions";


		directionsAttributeLocation.setValue(
			label,
			new BufferSetInstruction(
				{
					label: label,

					number: 3,

					source: {
						arrayBuffer: directionsArrayBuffer,
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
					size: directionsArrayBuffer.length
				}
			)
		);
	}
	static assembleDirections(args = {}) {
		const directionsArrayBuffer = SpriteGeometry.createDirectionsArrayBuffer(args);
		const directionsAttributeLocation = SpriteGeometry.createDirectionsAttributeLocation(directionsArrayBuffer, args);
		SpriteGeometry.setValueDirections(directionsAttributeLocation, directionsArrayBuffer, args);


		return directionsAttributeLocation;
	}

	static createMagnitudesArrayBuffer(args = {}) {
		return new Float32Array(SpriteGeometry.createGeometryArray(
			SpriteGeometry.#args(args),
			"magnitudes",
			(item, transform) => {
				return item;
			},
		));
	}
	static createMagnitudesAttributeLocation(magnitudesArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "sprite magnitudes buffer";


		return new AttributeLocation(
			{
				itemSize: 1,
				arrayBuffer: magnitudesArrayBuffer,
				bufferDescriptor: new BufferDescriptor(
					{
						label: label,
						size: magnitudesArrayBuffer.length,
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
									format: VertexFormat.FLOAT_32,
									offset: 0,
									shaderLocation: 4,
								}
							)
						],						
					}
				)
			}
		);
	}
	static setValueMagnitudes(magnitudesAttributeLocation, magnitudesArrayBuffer, args = {}) {
		const label = (args.label !== undefined) ? args.label : "sprite magnitudes";


		magnitudesAttributeLocation.setValue(
			label,
			new BufferSetInstruction(
				{
					label: label,

					number: 4,

					source: {
						arrayBuffer: magnitudesArrayBuffer,
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
					size: magnitudesArrayBuffer.length
				}
			)
		);
	}
	static assembleMagnitudes(args = {}) {
		const magnitudesArrayBuffer = SpriteGeometry.createMagnitudesArrayBuffer(args);
		const magnitudesAttributeLocation = SpriteGeometry.createMagnitudesAttributeLocation(magnitudesArrayBuffer, args);
		SpriteGeometry.setValueMagnitudes(magnitudesAttributeLocation, magnitudesArrayBuffer, args);


		return magnitudesAttributeLocation;
	}
};
