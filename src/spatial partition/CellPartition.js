import { SpatialPartition } from "./SpatialPartition.js";
import { CellPartitionGeometry } from "./CellPartitionGeometry.js";
import { CellPartitionBasicMaterial } from "./CellPartitionBasicMaterial.js";
import { Vector3 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { Color4 } from "../math/Color4.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { SpatialPartitionNode } from "./SpatialPartitionNode.js";
import { SpatialPartitionNodeGeometry } from "./SpatialPartitionNodeGeometry.js";
import { SpatialPartitionNodeBasicMaterial } from "./SpatialPartitionNodeBasicMaterial.js";


export class CellPartition extends SpatialPartition {


	static DEFAULT = {
		TYPE: "CellPartition",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new CellPartitionGeometry(
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
		MATERIAL: new CellPartitionBasicMaterial(
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


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CellPartition.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartition.DEFAULT.NAME,

				visible: (args.visible !== undefined) ? args.visible : CellPartition.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : CellPartition.DEFAULT.FRUSTUM_CULLED,

				geometry: (args.geometry !== undefined) ? args.geometry : CellPartition.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : CellPartition.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : CellPartition.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : CellPartition.DEFAULT.PRIMITIVE,

				nodes: (args.nodes !== undefined) ? args.nodes : CellPartition.assembleNodes(args),
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

	static assembleNodes(args) {
		return SpatialPartition.assembleNodes(args);
	}

	objectToClient(object) {
		return super.objectToClient(object);
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
