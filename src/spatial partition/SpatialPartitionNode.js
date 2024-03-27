import { Box } from "../objects/Box.js";
import { SpatialPartitionNodeGeometry } from "./SpatialPartitionNodeGeometry.js";
import { SpatialPartitionNodeBasicMaterial } from "./SpatialPartitionNodeBasicMaterial.js";
import { Vector3, Vector4 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Color4 } from "../math/Color4.js";
import { BoundingSphere } from "../math/BoundingSphere.js";


export class SpatialPartitionNode extends Box {


	static DEFAULT = {
		TYPE: "SpatialPartitionNode",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,

		GEOMETRY: new SpatialPartitionNodeGeometry(
			{
				indexed: false,
				baseGeometry: {
					elements: [
						{
							position: {
								elementspace: null,
								objectspace: new Vector3(0, 0, 0)
							},

							dimension: {
								elementspace: { min: new Vector3(-1, -1, -1), max: new Vector3(+1, +1, +1) },
								objectspace: null
							},
						}
					]
				}
			}
		),
		MATERIAL: new SpatialPartitionNodeBasicMaterial(
			{
				emissive: new Color4(0.0, 0.0, 0.0, 0.0),
				diffuse: new Color4(1.0, 1.0, 1.0, 0.125),
			}
		),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,

		INDEX: new Vector4(0, 0, 0, 0),
		CLIENTS: new ArrayT2({ name: "spatial partition node clients" }),	
	};


	#index;
	#clients;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartitionNode.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionNode.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : SpatialPartitionNode.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : SpatialPartitionNode.DEFAULT.FRUSTUM_CULLED,

				geometry: (args.geometry !== undefined) ? args.geometry : SpatialPartitionNode.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : SpatialPartitionNode.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : SpatialPartitionNode.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : SpatialPartitionNode.DEFAULT.PRIMITIVE,
			}
		);

		this.index = (args.index !== undefined) ? args.index : SpatialPartitionNode.DEFAULT.INDEX.clone();
		this.clients = (args.clients !== undefined) ? args.clients : SpatialPartitionNode.DEFAULT.CLIENTS.clone();
	}


	get index() { return this.#index; }
	set index(index) { this.#index = index; }
	get clients() { return this.#clients; }
	set clients(clients) { this.#clients = clients; }


	clone(cloneClients = false) {
		return new SpatialPartitionNode(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				visible: (this.visible === Object(this.visible)) ? this.visible.clone() : this.visible,
				frustumCulled: (this.frustumCulled === Object(this.frustumCulled)) ? this.frustumCulled.clone() : this.frustumCulled,

				geometry: (this.geometry === Object(this.geometry)) ? this.geometry.clone() : this.geometry,
				material: (this.material === Object(this.material)) ? this.material.clone() : this.material,
				pickable: (this.pickable === Object(this.pickable)) ? this.pickable.clone() : this.pickable,
				primitive: (this.primitive === Object(this.primitive)) ? this.primitive.clone() : this.primitive,

				index: (this.index === Object(this.index)) ? this.index.clone() : this.index,
				clients: this.clients.clone(cloneClients)
			}
		);
	}

	addClient(client) {
		const kn = this.index;

		const length = this.clients.push(client);
		client.index[kn.w][kn.z][kn.y][kn.x] = length - 1;
		
	
		return length;
	};
	addClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.addClient(v)); return acc;
		}, []);
	}
	updateClient(client) {
		// NOOP


		return true;
	}
	updateClients(clients = undefined) {
		return ((clients !== undefined) ? clients : this.clients).reduce((acc, v) => {
			return (acc && this.updateClient(v));
		}, true);
	}
	removeClient(client) {
		const kn = this.index;

		// V1
		// if (client.index[kn.w][kn.z][kn.y][kn.x] + 1 === this.clients.length) {
		// 	return this.clients.pop();
		// } else {
		// 	const clientLast = this.clients.pop();
		// 	clientLast.index[kn.w][kn.z][kn.y][kn.x] = client.index[kn.w][kn.z][kn.y][kn.x];
		// 	this.clients[client.index[kn.w][kn.z][kn.y][kn.x]] = clientLast;

		// 	return client;
		// }

		//V2
		const clientLast = this.clients.pop();

		if (client.index[kn.w][kn.z][kn.y][kn.x] !== this.clients.length) {
			clientLast.index[kn.w][kn.z][kn.y][kn.x] = client.index[kn.w][kn.z][kn.y][kn.x];
			this.clients[client.index[kn.w][kn.z][kn.y][kn.x]] = clientLast;
		}
		client.index[kn.w][kn.z][kn.y][kn.x] = null;


		return client;
	};
	removeClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.removeClient(v)); return acc;
		}, []);
	}

	// V1 (for loop)
	// findClients = (() => {
	// 	const boundingSphereTarget = new BoundingSphere();


	// 	return (position, radius) => {
	// 		const clients = this.clients;
	// 		const clientsSelected = new Array();

	// 		boundingSphereTarget.center = position;
	// 		boundingSphereTarget.radius = radius;

	// 		for (const client of clients) {
	// 			const object = client.object;
	// 			const boundingSphereObject = object.bounding.sphere.local.worldspace;

	// 			if (boundingSphereTarget.intersectsBoundingSphere(boundingSphereObject)) {
	// 				clientsSelected.push(client);
	// 			}
	// 		}


	// 		return clientsSelected;
	// 	};
	// })();
	// V2 (reduce)
	findClients = (() => {
		const boundingSphereTarget = new BoundingSphere();


		return (position, radius) => {
			const clients = this.clients;

			boundingSphereTarget.center = position;
			boundingSphereTarget.radius = radius;


			return clients.reduce((acc, client) => {
				const object = client.object;
				const boundingSphereObject = object.bounding.sphere.local.worldspace;

				if (boundingSphereTarget.intersectsBoundingSphere(boundingSphereObject)) {
					acc.push(client);
				}


				return acc;
			}, []);
		};
	})();
};
