import { BoxFrame } from "../objects/BoxFrame.js";
import { SpatialPartitionGeometry } from "./SpatialPartitionGeometry.js";
import { SpatialPartitionBasicMaterial } from "./SpatialPartitionBasicMaterial.js";
import { Vector3, Vector4 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { SpatialPartitionNode } from "./SpatialPartitionNode.js";
import { SpatialPartitionNodeGeometry } from "./SpatialPartitionNodeGeometry.js";
import { SpatialPartitionNodeBasicMaterial } from "./SpatialPartitionNodeBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { SpatialPartitionClient } from "./SpatialPartitionClient.js";


export class SpatialPartition extends BoxFrame {


	static DEFAULT = {
		TYPE: "SpatialPartition",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new SpatialPartitionGeometry(
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
		MATERIAL: new SpatialPartitionBasicMaterial(
			{
				diffuse: new Color4(1.0, 1.0, 1.0, 0.125),
				transparent: true
			}
		),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,

		NODES: SpatialPartition.assembleNodes(
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


	#nodes;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartition.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartition.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : SpatialPartition.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : SpatialPartition.DEFAULT.FRUSTUM_CULLED,

				geometry: (args.geometry !== undefined) ? args.geometry : SpatialPartition.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : SpatialPartition.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : SpatialPartition.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : SpatialPartition.DEFAULT.PRIMITIVE,
			}
		);

		this.nodes = (args.nodes !== undefined) ? args.nodes : SpatialPartition.assembleNodes(
			(args.geometry !== undefined) ? args.geometry : SpatialPartition.DEFAULT.GEOMETRY
		);
	}


	get nodes() { return this.#nodes; }
	set nodes(nodes) {
		this.#nodes = nodes;

		this.forEachPartitionElement((element, ke, nodes) => {
			this.forEachBoundNode((node) => { this.add(node);
		}, nodes, undefined); });
	}


	clone() {
		return new SpatialPartition(
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
		const baseGeometry = SpatialPartitionGeometry.expandBaseGeometry(args.baseGeometry);


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


						return new SpatialPartitionNode(
							{
								geometry: new SpatialPartitionNodeGeometry(
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
								material: new SpatialPartitionNodeBasicMaterial(
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

	forEachPartitionElement(callback) {
		const returnValues = new Array();

		for (let i = 0; i <  this.geometry.baseGeometry.elements.length; i++) {
			const element = this.geometry.baseGeometry.elements[i];
			const nodes = this.nodes[i];

			returnValues.push(callback(element, i, nodes));
		}


		return returnValues;
	}
	forEachBoundNode = (() => {
		const boundsDefault = { min: new Vector3(-Infinity, -Infinity, -Infinity), max: new Vector3(+Infinity, +Infinity, +Infinity) };
		const boundsClamp = { min: new Vector3(), max: new Vector3() };


		return (callback, nodes, bounds = boundsDefault) => {
			const returnValues = new Array();

			// V1
			// boundsClamp.min.z = Math.max(bounds.min.z, 0);
			// boundsClamp.max.z = Math.min(bounds.max.z, nodes.length - 1);

			// for (let z = boundsClamp.min.z; z <= boundsClamp.max.z; z++) {
			// 	boundsClamp.min.y = Math.max(bounds.min.y, 0);
			// 	boundsClamp.max.y = Math.min(bounds.max.y, nodes[z].length - 1);

			// 	for (let y = boundsClamp.min.y; y <= boundsClamp.max.y; y++) {
			// 		boundsClamp.min.x = Math.max(bounds.min.x, 0);
			// 		boundsClamp.max.x = Math.min(bounds.max.x, nodes[z][y].length - 1);

			// 		for (let x = boundsClamp.min.x; x <= boundsClamp.max.x; x++) {
			// 			const node = nodes[z][y][x];

			// 			returnValues.push(callback(node));
			// 		}
			// 	}
			// }

			// V2
			boundsClamp.min.z = Math.max(bounds.min.z, 0);
			boundsClamp.max.z = Math.min(bounds.max.z, nodes.length - 1);

			for (let z = boundsClamp.min.z, maxZ = boundsClamp.max.z; z <= maxZ; z++) {
				const nodesZ = nodes[z];
				boundsClamp.min.y = Math.max(bounds.min.y, 0);
				boundsClamp.max.y = Math.min(bounds.max.y, nodesZ.length - 1);

				for (let y = boundsClamp.min.y, maxY = boundsClamp.max.y; y <= maxY; y++) {
					const nodesZY = nodesZ[y];
					boundsClamp.min.x = Math.max(bounds.min.x, 0);
					boundsClamp.max.x = Math.min(bounds.max.x, nodesZY.length - 1);

					for (let x = boundsClamp.min.x, maxX = boundsClamp.max.x; x <= maxX; x++) {
						const node = nodesZY[x];

						returnValues.push(callback(node));
					}
				}
			}
	
	
			return returnValues;
		};
	})();

	objectToClient(object) {
		const baseGeometry = this.geometry.baseGeometry;


		return new SpatialPartitionClient(
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

	addClient(client, nodeBounds = undefined) {
		return this.forEachPartitionElement((element, ke, nodes) => {
			return this.forEachBoundNode((node) => { return node.addClient(client); }, nodes, nodeBounds);
		});
	}
	addClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.addClient(v, undefined)); return acc;
		}, []);
	}
	updateClient(client) {
		return this.forEachPartitionElement((element, ke, nodes) => {
			return this.forEachBoundNode((node) => { return node.updateClient(client); }, nodes, undefined);
		});
	}
	updateClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.updateClient(v)); return acc;
		}, []);
	}
	removeClient(client) {
		return this.forEachPartitionElement((element, ke, nodes) => {
			return this.forEachBoundNode((node) => { return node.removeClient(client); }, nodes, client.nodeBounds);
		});
	}
	removeClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.removeClient(v)); return acc;
		}, []);
	}

	findClients(position, radius) {
		return this.forEachPartitionElement((element, ke, nodes) => {
			return this.forEachBoundNode((node) => { return node.findClients(position, radius); }, nodes, undefined);
		});
	}
};
