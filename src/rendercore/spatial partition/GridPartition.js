import { SpatialPartition } from "./SpatialPartition.js";
import { GridPartitionGeometry } from "./GridPartitionGeometry.js";
import { GridPartitionBasicMaterial } from "./GridPartitionBasicMaterial.js";
import { Vector3, Vector4 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { Color4 } from "../math/Color4.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Vector3F32 } from "../math/vector/Vector3F32.js";
import { GridPartitionClient } from "./GridPartitionClient.js";
import { GridPartitionNode } from "./GridPartitionNode.js";
import { GridPartitionNodeGeometry } from "./GridPartitionNodeGeometry.js";
import { GridPartitionNodeBasicMaterial } from "./GridPartitionNodeBasicMaterial.js";


export class GridPartition extends SpatialPartition {


	static DEFAULT = {
		TYPE: "GridPartition",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new GridPartitionGeometry(
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
								elementspace: new Vector3(8, 8, 8),
								objectspace: null
							},
						}
					]
				}
			}
		),
		MATERIAL: new GridPartitionBasicMaterial(
			{
				
				diffuse: new Color4(1.0, 1.0, 1.0, 0.125),
				transparent: true
			}
		),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,

		NODES: GridPartition.assembleNodes(
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
								elementspace: new Vector3(8, 8, 8),
								objectspace: null
							},
						}
					]
				}
			}
		),

		QUERY_ID: 0,
	};


	#queryID;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GridPartition.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartition.DEFAULT.NAME,

				visible: (args.visible !== undefined) ? args.visible : GridPartition.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : GridPartition.DEFAULT.FRUSTUM_CULLED,

				geometry: (args.geometry !== undefined) ? args.geometry : GridPartition.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : GridPartition.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : GridPartition.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : GridPartition.DEFAULT.PRIMITIVE,

				nodes: (args.nodes !== undefined) ? args.nodes : GridPartition.assembleNodes(
					(args.geometry !== undefined) ? args.geometry : GridPartition.DEFAULT.GEOMETRY
				),
			}
		);

		this.queryID = (args.queryID !== undefined) ? args.queryID : GridPartition.DEFAULT.QUERY_ID;
	}


	get queryID() { return this.#queryID; }
	set queryID(queryID) { this.#queryID = queryID; }


	clone() {
		return new GridPartition(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				visible: (this.visible === Object(this.visible)) ? this.visible.clone() : this.visible,
				frustumCulled: (this.frustumCulled === Object(this.frustumCulled)) ? this.frustumCulled.clone() : this.frustumCulled,

				nodes: this.nodes.clone(),

				queryID: (this.queryID === Object(this.queryID)) ? this.queryID.clone() : this.queryID,
			}
		);
	}

	static assembleNodes(args) {
		const baseGeometry = GridPartitionGeometry.expandBaseGeometry(args.baseGeometry);


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


						return new GridPartitionNode(
							{
								geometry: new GridPartitionNodeGeometry(
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
								material: new GridPartitionNodeBasicMaterial(
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


		return new GridPartitionClient(
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
	
				nodeBounds: baseGeometry.elements.map((ve) => {
					return {
						min: new Vector3(+Infinity, +Infinity, +Infinity),
						max: new Vector3(-Infinity, -Infinity, -Infinity)
					};
				}),
				queryID: 0
			}
		);
	}

	#getNodeBounds(element, position, radius) {
		const min = position.clone().subScalar(radius);
		const max = position.clone().addScalar(radius);


		const offset_os = element.offset.objectspace;
		const resolutionOverSize_os = element.resolutionOverSize.objectspace;
		const resolutionMinusOne_os = element.resolutionMinusOne.objectspace;


		// min.sub(element.center.clone().sub(element.size.clone().divideScalar(2.0)));
		// max.sub(element.center.clone().sub(element.size.clone().divideScalar(2.0)));
		min.sub(offset_os);
		max.sub(offset_os);

		// min.divide(element.size).multiply(element.resolution);
		// max.divide(element.size).multiply(element.resolution);
		min.multiply(resolutionOverSize_os);
		max.multiply(resolutionOverSize_os);


		// min.floor().clamp(Vector3F32.ZERO, new Vector3().subVectors(element.resolution, Vector3F32.ONE));
		// max.floor().clamp(Vector3F32.ZERO, new Vector3().subVectors(element.resolution, Vector3F32.ONE));
		min.floor().clamp(Vector3F32.ZERO, resolutionMinusOne_os);
		max.floor().clamp(Vector3F32.ZERO, resolutionMinusOne_os);


		return { min: min, max: max };
	}

	addClient(client, nodeBoundsExternal = undefined) {
		const position = client.object.position;
		const radius = client.object.bounding.sphere.local.worldspace.radius;


		return this.forEachPartitionElement((element, ke, nodes) => {
			const nodeBounds = (nodeBoundsExternal !== undefined) ? nodeBoundsExternal : this.#getNodeBounds(element, position, radius);


			return this.forEachBoundNode((node) => { return node.addClient(client, nodeBounds); }, nodes, nodeBounds);
		});
	}
	addClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.addClient(v)); return acc;
		}, []);
	}
	updateClient(client) {
		const position = client.object.position;
		const radius = client.object.bounding.sphere.local.worldspace.radius;


		return this.forEachPartitionElement((element, ke, nodes) => {
			const nodeBounds = this.#getNodeBounds(element, position, radius);
			const updateCondition = !(client.nodeBounds[ke].min.equals(nodeBounds.min) && client.nodeBounds[ke].max.equals(nodeBounds.max));


			if (updateCondition) {
				this.forEachBoundNode((node) => { return node.removeClient(client); }, nodes, client.nodeBounds[ke]);
				this.forEachBoundNode((node) => { return node.addClient(client, nodeBounds); }, nodes, nodeBounds);
			}


			return updateCondition;
		});
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
		return clients.reduce((acc, v) => {
			acc.push(this.removeClient(v)); return acc;
		}, []);
	}

	// V1 (for loop)
	// findClients(position, radius, reduce = true) {
	// 	const queryID = ++this.queryID;


	// 	return this.forEachPartitionElement((element, ke, nodes) => {
	// 		const nodeBounds = this.#getNodeBounds(element, position, radius);


	// 		return this.forEachBoundNode((node) => {
	// 			const clients = reduce ? node.findClients(position, radius) : node.clients;
	// 			const clientsSelected = new Array();
	
	// 			for (const client of clients) {
	// 				if (client.queryID !== queryID) {
	// 					client.queryID = queryID;
	// 					clientsSelected.push(client);
	// 				}
	// 			}
	
	
	// 			return clientsSelected;
	// 		}, nodes, nodeBounds);
	// 	});
	// }
	// V2 (reduce)
	findClients(position, radius, reduce = true) {
		const queryID = ++this.queryID;


		return this.forEachPartitionElement((element, ke, nodes) => {
			const nodeBounds = this.#getNodeBounds(element, position, radius);


			return this.forEachBoundNode((node) => {
				const clients = reduce ? node.findClients(position, radius) : node.clients;


				return clients.reduce((acc, client) => {
					if ((client.queryID === queryID) ? false : (client.queryID = queryID, true)) {
						acc.push(client);
					}


					return acc;
				}, []);
			}, nodes, nodeBounds);
		});
	}
};
