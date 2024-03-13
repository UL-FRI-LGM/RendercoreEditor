import { SpatialPartition } from "./SpatialPartition.js";
import { GridPartitionGeometry } from "./GridPartitionGeometry.js";
import { GridPartitionBasicMaterial } from "./GridPartitionBasicMaterial.js";
import { Vector3 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { Color4 } from "../math/Color4.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Vector3F32 } from "../math/vector/Vector3F32.js";
import { SpatialPartitionNode } from "./SpatialPartitionNode.js";
import { SpatialPartitionNodeGeometry } from "./SpatialPartitionNodeGeometry.js";
import { SpatialPartitionNodeBasicMaterial } from "./SpatialPartitionNodeBasicMaterial.js";
import { GridPartitionClient } from "./GridPartitionClient.js";


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
					position: new Vector3(0, 0, 0),
					dimension: { min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) },
					resolution: new Vector3(8, 8, 8),
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

		NODES: new ArrayT2(
			{},
			...new ArrayT2({}, 1).keys().map((vz) => {
				return new ArrayT2(
					{},
					...new ArrayT2({}, 1).keys().map((vy) => {
						return new ArrayT2(
							{},
							...new ArrayT2({}, 1).keys().map((vx) => {
								return new SpatialPartitionNode(
									{
										geometry: new SpatialPartitionNodeGeometry(
											{
												indexed: false,
												baseGeometry: {
													positions: [new Vector3(0, 0, 0)],
													dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
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

										index: new Vector3(vx, vy, vz),
									}
								);
							})
						);
					})
				);
			})
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

				nodes: (args.nodes !== undefined) ? args.nodes : GridPartition.assembleNodes(args),
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
		return SpatialPartition.assembleNodes(args);
	}

	objectToClient(object) {
		const baseGeometry = this.geometry.baseGeometry;

		const dimensionGrid = baseGeometry.dimension;
		const resolutionGrid_ws = baseGeometry.resolution;
		const sizeGrid = baseGeometry.size;


		return new GridPartitionClient(
			{
				object: object,
				index: new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.z)).map((vz) => {
					return new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.y)).map((vy) => {
						return new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.x)).map((vx) => {
							return null;
						});
					});
				}),
	
				nodeBounds: {
					min: new Vector3(+Infinity, +Infinity, +Infinity),
					max: new Vector3(-Infinity, -Infinity, -Infinity)
				},
				queryID: 0
			}
		);
	}

	#getNodeBounds(position, radius) {
		const min = position.clone().subScalar(radius);
		const max = position.clone().addScalar(radius);


		const baseGeometry = this.geometry.baseGeometry;

		const positionGrid_ws = baseGeometry.position;
		const rotationGrid_ws = baseGeometry.rotation;
		const scalingGrid_ws = baseGeometry.scaling;

		
		const dimensionGrid_ps = baseGeometry.dimension;
		const dimensionGrid_ws = {
			min: positionGrid_ws.clone().add(dimensionGrid_ps.min),
			max: positionGrid_ws.clone().add(dimensionGrid_ps.max),
		};

		const sizeGrid_ps = baseGeometry.size;
		const sizeGrid_ws = sizeGrid_ps.clone();

		const resolutionGrid_ps = baseGeometry.resolution;
		const resolutionGrid_ws = resolutionGrid_ps.clone();

		const centerGrid_ps = dimensionGrid_ps.min.clone().add(sizeGrid_ps.clone().divideScalar(2.0));
		const centerGrid_ws = positionGrid_ws.clone().add(centerGrid_ps);


		min.sub(new Vector3().subVectors(centerGrid_ws, sizeGrid_ws.clone().divideScalar(2.0)));
		max.sub(new Vector3().subVectors(centerGrid_ws, sizeGrid_ws.clone().divideScalar(2.0)));

		// min.sub(sizeGrid_ws.clone().divide(resolutionGrid_ws).divideScalar(2.0));
		// max.sub(sizeGrid_ws.clone().divide(resolutionGrid_ws).divideScalar(2.0));

		// min.divide(baseGeometry.size).multiply(baseGeometry.resolution);
		// max.divide(baseGeometry.size).multiply(baseGeometry.resolution);
		min.multiply(baseGeometry.resolutionOverSize);
		max.multiply(baseGeometry.resolutionOverSize);


		// min.floor().clamp(Vector3F32.ZERO, new Vector3().subVectors(baseGeometry.resolution, Vector3F32.ONE));
		// max.floor().clamp(Vector3F32.ZERO, new Vector3().subVectors(baseGeometry.resolution, Vector3F32.ONE));
		min.floor().clamp(Vector3F32.ZERO, baseGeometry.resolutionMinusOne);
		max.floor().clamp(Vector3F32.ZERO, baseGeometry.resolutionMinusOne);


		return { min: min, max: max };
	}

	addClient(client, nodeBoundsExternal = undefined) {
		const position = client.object.position;
		const radius = client.object.bounding.sphere.local.worldspace.radius;
		const nodeBounds = (nodeBoundsExternal !== undefined) ? nodeBoundsExternal : this.#getNodeBounds(position, radius);

		client.nodeBounds = nodeBounds;


		return super.addClient(client, nodeBounds);
	}
	addClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.addClient(v)); return acc;
		}, []);
	}
	updateClient(client) {
		const position = client.object.position;
		const radius = client.object.bounding.sphere.local.worldspace.radius;
		const nodeBounds = this.#getNodeBounds(position, radius);

		const updateCondition = !(client.nodeBounds.min.equals(nodeBounds.min) && client.nodeBounds.max.equals(nodeBounds.max));
		if (updateCondition) {
			this.removeClient(client);
			this.addClient(client, nodeBounds);
		}


		return updateCondition;
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
	// 	const nodeBounds = this.#getNodeBounds(position, radius);
	// 	const queryID = ++this.queryID;


	// 	return this.forEachBoundNode((node) => {
	// 		const clients = reduce ? node.findClients(position, radius) : node.clients;
	// 		const clientsSelected = new Array();

	// 		for (const client of clients) {
	// 			if (client.queryID !== queryID) {
	// 				client.queryID = queryID;
	// 				clientsSelected.push(client);
	// 			}
	// 		}


	// 		return clientsSelected;
	// 	}, nodeBounds);
	// }
	// V2 (reduce)
	findClients(position, radius, reduce = true) {
		const nodeBounds = this.#getNodeBounds(position, radius);
		const queryID = ++this.queryID;


		return this.forEachBoundNode((node) => {
			const clients = reduce ? node.findClients(position, radius) : node.clients;


			return clients.reduce((acc, client) => {
				if ((client.queryID === queryID) ? false : (client.queryID = queryID, true)) {
					acc.push(client);
				}


				return acc;
			}, []);
		}, nodeBounds);
	}
};
