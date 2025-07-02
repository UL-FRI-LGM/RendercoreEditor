import { SpatialPartition } from "./SpatialPartition.js";
import { CellPartitionGeometry } from "./CellPartitionGeometry.js";
import { CellPartitionBasicMaterial } from "./CellPartitionBasicMaterial.js";
import { Vector3, Vector4 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { Color4 } from "../math/Color4.js";
import { CellPartitionClient } from "./CellPartitionClient.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { CellPartitionNode } from "./CellPartitionNode.js";
import { CellPartitionNodeGeometry } from "./CellPartitionNodeGeometry.js";
import { CellPartitionNodeBasicMaterial } from "./CellPartitionNodeBasicMaterial.js";
import { SetT2 } from "../core/SetT2.js";
import { MapT2 } from "../core/MapT2.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class CellPartition extends SpatialPartition {


	static DEFAULT = {
		TYPE: "CellPartition",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${CellPartition.name}` },
			[
				...SpatialPartition.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${CellPartition.name}` },
			[
				...SpatialPartition.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${CellPartition.name}` },
			[
				...SpatialPartition.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${CellPartition.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${CellPartition.name}` },
			[
				...SpatialPartition.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${CellPartition.name}` },
			[
				...SpatialPartition.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new CellPartitionGeometry(
			{
				indexed: false,
				baseGeometry: {
					// positions: [new Vector3(0, 0, 0)],
					// dimensions: [{ min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) }],
					elements: [
						{
							position: {
								elementspace: null,
								objectspace: new Vector3(0, 0, 0)
							},

							dimension: {
								elementspace: { min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) },
								objectspace: null
							},
							resolution: {
								elementspace: new Vector3(1, 1, 1),
								objectspace: null
							},
						}
					]
				}
			}
		),
		MATERIAL: new CellPartitionBasicMaterial(
			{
				
				diffuse: new Color4(1.0, 1.0, 1.0, 0.125),
				transparent: true
			}
		),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,

		NODES: CellPartition.assembleNodes(
			{
				baseGeometry: {
					// positions: [new Vector3(0, 0, 0)],
					// dimensions: [{ min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) }],
					elements: [
						{
							position: {
								elementspace: null,
								objectspace: new Vector3(0, 0, 0)
							},

							dimension: {
								elementspace: { min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) },
								objectspace: null
							},
							resolution: {
								elementspace: new Vector3(1, 1, 1),
								objectspace: null
							},
						}
					]
				}
			}
		),
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CellPartition.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartition.DEFAULT.NAME,

				visible: (args.visible !== undefined) ? args.visible : CellPartition.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : CellPartition.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : CellPartition.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : CellPartition.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : CellPartition.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : CellPartition.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : CellPartition.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : CellPartition.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : CellPartition.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : CellPartition.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : CellPartition.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : CellPartition.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : CellPartition.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : CellPartition.DEFAULT.PRIMITIVE,

				nodes: (args.nodes !== undefined) ? args.nodes : CellPartition.assembleNodes(
					(args.geometry !== undefined) ? args.geometry : CellPartition.DEFAULT.GEOMETRY
				),
			}
		);
	}


	clone() {
		return new CellPartition(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				visible: (this.visible === Object(this.visible)) ? this.visible.clone() : this.visible,
				frustumCulled: (this.frustumCulled === Object(this.frustumCulled)) ? this.frustumCulled.clone() : this.frustumCulled,

				nodes: this.nodes.clone()
			}
		);
	}

	static assembleNodes(args = {}) {
		const baseGeometry = CellPartitionGeometry.expandBaseGeometry(args.baseGeometry);


		const nodes = baseGeometry.elements.map((ve, ke) => {
			const gridCenter_os = ve.center.objectspace;

			const gridSize_es = ve.size.elementspace;
			const gridSize_os = ve.size.objectspace;
			const gridResolution_es = ve.resolution.elementspace;
			const gridResolution_os = ve.resolution.objectspace;


			return new ArrayT2({}, ...new ArrayT2({}, gridResolution_os.z).keys().map((vz) => {
				return new ArrayT2({}, ...new ArrayT2({}, gridResolution_os.y).keys().map((vy) => {
					return new ArrayT2({}, ...new ArrayT2({}, gridResolution_os.x).keys().map((vx) => {
						const nodeIndex_os = new Vector3(vx, vy, vz);

						const nodePosition_os = nodeIndex_os.clone()
						.multiply(gridSize_os).divide(gridResolution_os)
						.add(gridSize_os.clone().divide(gridResolution_os).divideScalar(2.0))
						.add(new Vector3().subVectors(gridCenter_os, gridSize_os.clone().divideScalar(2.0)));


						const nodeDimension_es = {
							min: gridSize_es.clone().divide(gridResolution_es).divideScalar(-2.0),
							max: gridSize_es.clone().divide(gridResolution_es).divideScalar(+2.0)
						};


						return new CellPartitionNode(
							{
								geometry: new CellPartitionNodeGeometry(
									{
										indexed: false,
										baseGeometry: {
											elements: [
												{
													position: {
														elementspace: null,
														objectspace: nodePosition_os.clone()
													},
	
													dimension: {
														elementspace: {
															min: nodeDimension_es.min.clone().multiplyScalar(0.95),
															max: nodeDimension_es.max.clone().multiplyScalar(0.95)
														},
														objectspace: null
													},
												}
											]
										}
									}
								),
								material: new CellPartitionNodeBasicMaterial(
									{
										transparent: true,
	
										emissive: new Color4(0.0, 0.0, 0.0, 0.0),
										diffuse: new Color4(1.0, 1.0, 1.0, 0.125),
									}
								),
	
								index: new Vector4(vx, vy, vz, ke),
							}
						);
					}));
				}));
			}));
		});


		return nodes;
	}

	objectToClient(object) {
		const baseGeometry = this.geometry.baseGeometry;


		return new CellPartitionClient(
			{
				object: object,
				index: baseGeometry.elements.map((ve) => {
					const gridResolution_os = ve.resolution.objectspace;


					return new ArrayT2({}, ...new ArrayT2({}, gridResolution_os.z)).map((vz) => {
						return new ArrayT2({}, ...new ArrayT2({}, gridResolution_os.y)).map((vy) => {
							return new ArrayT2({}, ...new ArrayT2({}, gridResolution_os.x)).map((vx) => {
								return null;
							});
						});
					})
				}),
			}
		);
	}

	addClient(client) {
		return super.addClient(client);
	}
	addClients(clients) {
		// return super.addClients(clients);
		return clients.reduce((acc, v) => {
			acc.push(this.addClient(v)); return acc;
		}, []);
	}
	updateClient(client) {
		return super.updateClient(client);
	}
	updateClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.updateClient(v)); return acc;
		}, []);
	}
	removeClient(client) {
		return super.removeClient(client);
	}
	removeClients(clients) {
		// return super.removeClients(clients);
		return clients.reduce((acc, v) => {
			acc.push(this.removeClient(v)); return acc;
		}, []);
	}

    findClients(position, radius) {
		return super.findClients(position, radius);
	}
};
