import { BoxFrame } from "../objects/BoxFrame.js";
import { SpatialPartitionGeometry } from "./SpatialPartitionGeometry.js";
import { SpatialPartitionBasicMaterial } from "./SpatialPartitionBasicMaterial.js";
import { Vector3 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { SpatialPartitionNode } from "./SpatialPartitionNode.js";
import { SpatialPartitionNodeGeometry } from "./SpatialPartitionNodeGeometry.js";
import { SpatialPartitionNodeBasicMaterial } from "./SpatialPartitionNodeBasicMaterial.js";
import { Color4 } from "../math/Color4.js";
import { Vector3F32 } from "../math/vector/Vector3F32.js";
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
					position: new Vector3(0, 0, 0),
					dimension: { min: new Vector3(-4, -4, -4), max: new Vector3(+4, +4, +4) },
					resolution: new Vector3(1, 1, 1),
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

		this.nodes = (args.nodes !== undefined) ? args.nodes : SpatialPartition.assembleNodes(args);
	}


	get nodes() { return this.#nodes; }
	set nodes(nodes) {
		this.#nodes = nodes;

		this.forEachBoundNode((node) => { this.add(node); }, undefined);
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

	static assembleNodes(args) {
		const baseGeometry = args.geometry.baseGeometry;

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


		return new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.z).keys().map((vz) => {
			return new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.y).keys().map((vy) => {
				return new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.x).keys().map((vx) => {
					const indexCell_ws = new Vector3(vx, vy, vz);

					const positionCell_ws = indexCell_ws.clone()
					.multiply(sizeGrid_ws).divide(resolutionGrid_ws)
					.add(sizeGrid_ws.clone().divide(resolutionGrid_ws).divideScalar(2.0))
					.add(new Vector3().subVectors(centerGrid_ws, sizeGrid_ws.clone().divideScalar(2.0)));

					const dimensionCell_ps = {
						min: sizeGrid_ps.clone().divide(resolutionGrid_ps).divideScalar(-2.0),
						max: sizeGrid_ps.clone().divide(resolutionGrid_ps).divideScalar(+2.0)
					};
					const dimensionCell_ws = {
						min: positionCell_ws.clone().add(dimensionCell_ps.min),
						max: positionCell_ws.clone().add(dimensionCell_ps.max),
					};
			
					const sizeCell_ps = dimensionCell_ps.max.clone().sub(dimensionCell_ps.min);
					const sizeCell_ws = sizeCell_ps.clone();

					const centerCell_ps = dimensionCell_ps.min.clone().add(sizeCell_ps.clone().divideScalar(2.0));
					const centerCell_ws = positionCell_ws.clone().add(centerCell_ps);

					// const dimensionPosition_ps = {
					// 	min: dimensionGrid_ps.min.clone().sub(dimensionCell_ps.min),
					// 	max: dimensionGrid_ps.max.clone().sub(dimensionCell_ps.max)
					// };


					return new SpatialPartitionNode(
						{
							geometry: new SpatialPartitionNodeGeometry(
								{
									indexed: false,
									baseGeometry: {
										positions: [
											positionCell_ws.clone()
										],
										dimensions: [
											{
												min: dimensionCell_ps.min.clone().multiplyScalar(0.95),
												max: dimensionCell_ps.max.clone().multiplyScalar(0.95)
											}
										],
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
				}));
			}));
		}));
	}

	forEachBoundNode = (() => {
		const boundsDefault = { min: new Vector3(-Infinity, -Infinity, -Infinity), max: new Vector3(+Infinity, +Infinity, +Infinity) };
		const boundsClamp = { min: new Vector3(), max: new Vector3() };


		return (callback, bounds = boundsDefault) => {
			const returnValues = new Array();

			// V1
			// boundsClamp.min.z = Math.max(bounds.min.z, 0);
			// boundsClamp.max.z = Math.min(bounds.max.z, this.nodes.length - 1);

			// for (let z = boundsClamp.min.z; z <= boundsClamp.max.z; z++) {
			// 	boundsClamp.min.y = Math.max(bounds.min.y, 0);
			// 	boundsClamp.max.y = Math.min(bounds.max.y, this.nodes[z].length - 1);

			// 	for (let y = boundsClamp.min.y; y <= boundsClamp.max.y; y++) {
			// 		boundsClamp.min.x = Math.max(bounds.min.x, 0);
			// 		boundsClamp.max.x = Math.min(bounds.max.x, this.nodes[z][y].length - 1);

			// 		for (let x = boundsClamp.min.x; x <= boundsClamp.max.x; x++) {
			// 			const node = this.nodes[z][y][x];

			// 			returnValues.push(callback(node));
			// 		}
			// 	}
			// }

			// V2
			const nodes = this.nodes;
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

		const dimensionGrid = baseGeometry.dimension;
		const resolutionGrid_ws = baseGeometry.resolution;
		const sizeGrid_ps = baseGeometry.size;


		return new SpatialPartitionClient(
			{
				object: object,
				index: new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.z)).map((vz) => {
					return new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.y)).map((vy) => {
						return new ArrayT2({}, ...new ArrayT2({}, resolutionGrid_ws.x)).map((vx) => {
							return null;
						});
					});
				}),
			}
		);
	}

	addClient(client, nodeBounds = undefined) {
		return this.forEachBoundNode((node) => { return node.addClient(client); }, nodeBounds);
	}
	addClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.addClient(v)); return acc;
		}, []);
	}
	updateClient(client) {
		return this.forEachBoundNode((node) => { return node.updateClient(client); }, undefined);
	}
	updateClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.updateClient(v)); return acc;
		}, []);
	}
	removeClient(client) {
		return this.forEachBoundNode((node) => { return node.removeClient(client); }, client.nodeBounds);
	}
	removeClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.removeClient(v)); return acc;
		}, []);
	}

	findClients(position, radius) {
		return this.forEachBoundNode((node) => { return node.findClients(position, radius); }, undefined);
	}
};
