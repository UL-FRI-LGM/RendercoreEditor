import { SpatialPartition } from "./SpatialPartition.js";
import { GridPartitionGeometry } from "./GridPartitionGeometry.js";
import { GridPartitionBasicMaterial } from "./GridPartitionBasicMaterial.js";
import { Vector3 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { Color4 } from "../math/Color4.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Vector3F32 } from "../math/vector/Vector3F32.js";


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
					// dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
					dimension: { min: new Vector3(-10, -10, -10), max: new Vector3(+10, +10, +10) },
					resolution: new Vector3(20, 20, 20),
				}
			}
		),
		MATERIAL: new GridPartitionBasicMaterial(
			{
				
				diffuse: new Color4(0.0, 0.0, 1.0, 0.125),
				transparent: true
			}
		),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,

		CLIENTS: new ArrayT2({ name: "grid partition clients" }),

		CELL_PARTITIONS: null,
		QUERY_ID: 0,
	};


	#cellPartitions;
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

				clients: (args.clients !== undefined) ? args.clients : GridPartition.DEFAULT.CLIENTS.clone(),
			}
		);

		this.cellPartitions = (args.cellPartitions !== undefined) ? args.cellPartitions : GridPartition.assembleCellPartitions(args);
		this.queryID = (args.queryID !== undefined) ? args.queryID : GridPartition.DEFAULT.QUERY_ID;
	}


	get cellPartitions() { return this.#cellPartitions; }
	set cellPartitions(cellPartitions) { this.#cellPartitions = cellPartitions; }
	get queryID() { return this.#queryID; }
	set queryID(queryID) { this.#queryID = queryID; }


	clone(cloneClients = false) {
		return new GridPartition(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
						
				clients: this.clients.clone(cloneClients),

				cellPartitions: (this.cellPartitions === Object(this.cellPartitions)) ? this.cellPartitions.clone() : this.cellPartitions,
				queryID: (this.queryID === Object(this.queryID)) ? this.queryID.clone() : this.queryID,
			}
		);
	}

	objectToClient(object) {
		const baseGeometry = this.geometry.baseGeometry;

		const dimensionGrid = baseGeometry.dimension;
		const resolutionGrid = baseGeometry.resolution;
		const sizeGrid = baseGeometry.size;


		return {
			object: object,
			index: null,

			cellPartitionsBounds: {
				min: new Vector3(+Infinity, +Infinity, +Infinity),
				max: new Vector3(-Infinity, -Infinity, -Infinity)
			},
			cellPartitionsIndex: [...new Array(resolutionGrid.z)].map((v) => { return [...new Array(resolutionGrid.y)].map((v) => { return [...new Array(resolutionGrid.x)].map((v) => { return null; }); }); }),
			queryID: 0
		};
	}

	static assembleCellPartitions(args = {}) {
		const baseGeometry = args.geometry.baseGeometry;

		const dimensionGrid = baseGeometry.dimension;
		const resolutionGrid = baseGeometry.resolution;
		const sizeGrid = baseGeometry.size;


		// return [...new Array(resolutionGrid.z)].map((v) => { return [...new Array(resolutionGrid.y)].map((v) => { return [...new Array(resolutionGrid.x)].map((v) => { return new Set(); }); }); });
		return [...new Array(resolutionGrid.z)].map((v) => { return [...new Array(resolutionGrid.y)].map((v) => { return [...new Array(resolutionGrid.x)].map((v) => { return new Array(); }); }); });		
	}

	#getCellPartitionsBounds(position, radius) {
		const min = new Vector3(position.x - radius, position.y - radius, position.z - radius);
		const max = new Vector3(position.x + radius, position.y + radius, position.z + radius);

		min.sub(this.geometry.baseGeometry.dimension.min);
		max.sub(this.geometry.baseGeometry.dimension.min);


		// min.divide(this.geometry.baseGeometry.size).multiply(this.geometry.baseGeometry.resolution).floor();
		// max.divide(this.geometry.baseGeometry.size).multiply(this.geometry.baseGeometry.resolution).floor();
		min.multiply(this.geometry.baseGeometry.resolutionOverSize).floor();
		max.multiply(this.geometry.baseGeometry.resolutionOverSize).floor();


		// min.clamp(Vector3F32.ZERO, new Vector3().subVectors(this.baseGeometry.resolution, Vector3F32.ONE));
		// max.clamp(Vector3F32.ZERO, new Vector3().subVectors(this.baseGeometry.resolution, Vector3F32.ONE));
		min.clamp(Vector3F32.ZERO, this.geometry.baseGeometry.resolutionMinusOne);
		max.clamp(Vector3F32.ZERO, this.geometry.baseGeometry.resolutionMinusOne);


		return { min: min, max: max };
	}
	#addClientToCellPartitions(client, cellPartitionsBounds) {
		client.cellPartitionsBounds = cellPartitionsBounds;

		for (let z = cellPartitionsBounds.min.z; z <= cellPartitionsBounds.max.z; z++) {
			// const cellPartitionsZ = this.cellPartitions[z];

			for (let y = cellPartitionsBounds.min.y; y <= cellPartitionsBounds.max.y; y++) {
				// const cellPartitionsZY = cellPartitionsZ[y];

				for (let x = cellPartitionsBounds.min.x; x <= cellPartitionsBounds.max.x; x++) {
					const cellPartition = this.cellPartitions[z][y][x];
					// const cellPartition = cellPartitionsZY[x];

					// cellPartition.add(client);
					const length = cellPartition.push(client);
					client.cellPartitionsIndex[z][y][x] = length - 1;
				}
			}
		}
	}
	#removeClientFromCellPartitions(client) {
		const cellPartitionsBounds = client.cellPartitionsBounds;

		for (let z = cellPartitionsBounds.min.z; z <= cellPartitionsBounds.max.z; z++) {
			// const cellPartitionsZ = this.cellPartitions[z];

			for (let y = cellPartitionsBounds.min.y; y <= cellPartitionsBounds.max.y; y++) {
				// const cellPartitionsZY = cellPartitionsZ[y];

				for (let x = cellPartitionsBounds.min.x; x <= cellPartitionsBounds.max.x; x++) {
					const cellPartition = this.cellPartitions[z][y][x];
					// const cellPartition = cellPartitionsZY[x];

					// cellPartition.delete(client);
					const clientLast = cellPartition.pop();

					if (client.cellPartitionsIndex[z][y][x] !== cellPartition.length) {
						clientLast.cellPartitionsIndex[z][y][x] = client.cellPartitionsIndex[z][y][x];
						cellPartition[client.cellPartitionsIndex[z][y][x]] = clientLast;
					}					
					// client.cellPartitionsIndex[z][y][x] = undefined;
				}
			}
		}
	}

	addClient(client) {
		const length = super.addClient(client);

		const position = client.object.position;
		const radius = client.object.bounding.sphere.local.worldspace.radius;
		const cellPartitionsBounds = this.#getCellPartitionsBounds(position, radius);
		
		this.#addClientToCellPartitions(client, cellPartitionsBounds);
		

		return length;
	}
	addClients(clients) {
		return super.addClients(clients);
	}
	updateClient(client) {
		const position = client.object.position;
		const radius = client.object.bounding.sphere.local.worldspace.radius;

		const cellPartitionsBounds = this.#getCellPartitionsBounds(position, radius);

		if (!(client.cellPartitionsBounds.min.equals(cellPartitionsBounds.min) && client.cellPartitionsBounds.max.equals(cellPartitionsBounds.max))) {
			this.#removeClientFromCellPartitions(client);
			this.#addClientToCellPartitions(client, cellPartitionsBounds);
		}
	}
	updateClients(clients) {
		super.updateClients(clients);
	}
	removeClient(client) {
		this.#removeClientFromCellPartitions(client);
		

		return super.removeClient(client);
	}
	removeClients(clients) {
		return super.removeClients(clients);
	}

	findClients(position, radius) {
		const clients = new Array();
		const cellPartitionsBounds = this.#getCellPartitionsBounds(position, radius);
		const queryID = ++this.queryID;

		for (let z = cellPartitionsBounds.min.z; z <= cellPartitionsBounds.max.z; z++) {
			// const cellPartitionsZ = this.cellPartitions[z];

			for (let y = cellPartitionsBounds.min.y; y <= cellPartitionsBounds.max.y; y++) {
				// const cellPartitionsZY = cellPartitionsZ[y];

				for (let x = cellPartitionsBounds.min.x; x <= cellPartitionsBounds.max.x; x++) {
					const cellPartition = this.cellPartitions[z][y][x];
					// const cellPartition = cellPartitionsZY[x];

					for (const client of cellPartition) {
						if (client.queryID !== queryID) {
							client.queryID = queryID;
							clients.push(client);
						}
					}
				}
			}
		}


		return clients;
	}
};
