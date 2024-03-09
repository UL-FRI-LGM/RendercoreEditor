import { BoxFrame } from "../objects/BoxFrame.js";
import { SpatialPartitionEntry } from "./SpatialPartitionEntry.js";
import { SpatialPartitionBasicMaterial } from "./SpatialPartitionBasicMaterial.js";
import { Vector3 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { ArrayT2 } from "../core/ArrayT2.js";


export class SpatialPartition extends BoxFrame {


	static DEFAULT = {
		TYPE: "SpatialPartition",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new SpatialPartitionEntry(
			{
				indexed: false,
				baseGeometry: {
					positions: [new Vector3(0, 0, 0)],
					dimensions: [{ min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1)}],
				}
			}
		),
		MATERIAL: new SpatialPartitionBasicMaterial(),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.LINE_LIST,

		CLIENTS: new ArrayT2({ name: "spatial partition clients" }),
	};


	#clients;


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

		this.clients = (args.clients !== undefined) ? args.clients : SpatialPartition.DEFAULT.CLIENTS.clone();
	}


	get clients() { return this.#clients; }
	set clients(clients) {
		this.#clients = clients;
	
		this.addClients(clients);
	}


	clone(cloneClients = false) {
		return new SpatialPartition(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
						
				clients: this.clients.clone(cloneClients)
			}
		);
	}

	addClient(client) {
		const length = this.clients.push(client);
		client.index = length - 1;
		
	
		return length;
	}
	addClients(clients) {
		// clients.forEach((v, k) => {
		// 	this.addClient(v);
		// });
		return clients.reduce((acc, v) => { return this.addClient(v); }, 0);
	}
	updateClient(client) {
		throw new Error("NOT IMPLEMENTED");
	}
	updateClients(clients = undefined) {
		((clients !== undefined) ? clients : this.clients).forEach((v, k) => {
			this.updateClient(v);
		});
	}
	removeClient(client) {
		// if (client.index + 1 === this.clients.length) {
		// 	return this.clients.pop();
		// } else {
		// 	const clientLast = this.clients.pop();
		// 	clientLast.index = client.index;
		// 	this.clients[client.index] = clientLast;

		// 	return client;
		// }
		const clientLast = this.clients.pop();

		if (client.index !== this.clients.length) {
			clientLast.index = client.index;
			this.clients[client.index] = clientLast;
		}
		client.index = null;


		return client;
	}
	removeClients(clients) {
		// clients.forEach((v, k) => {
		// 	this.removeClient(v);
		// });
		return clients.reduce((acc, v) => { return this.removeClient(v); }, null);
	}

	findClients(position, radius) {
		throw new Error("NOT IMPLEMENTED");
	}
};
