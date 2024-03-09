import { SpatialPartition } from "./SpatialPartition.js";
import { CellPartitionGeometry } from "./CellPartitionGeometry.js";
import { CellPartitionBasicMaterial } from "./CellPartitionBasicMaterial.js";
import { Vector3 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive state/PrimitiveTopology.js";
import { Color4 } from "../math/Color4.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { BoundingSphere } from "../math/BoundingSphere.js";


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
					positions: [new Vector3(0, 0, 0)],
					dimensions: [{ min: new Vector3(-10, -10, -10), max: new Vector3(+10, +10, +10)}],
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

		CLIENTS: new ArrayT2({ name: "cell partition clients" }),
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

				clients: (args.clients !== undefined) ? args.clients : CellPartition.DEFAULT.CLIENTS.clone(),
			}
		);
	}


	clone(cloneClients = false) {
		return new CellPartition(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
						
				clients: this.clients.clone(cloneClients)
			}
		);
	}

	objectToClient(object) {
		return super.objectToClient(object);
	}

	addClient(client) {
		return super.addClient(client);
	}
	addClients(clients) {
		return super.addClients(clients);
	}
	updateClient(client) {
		// NOOP
	}
	updateClients(clients) {
		// NOOP
	}
	removeClient(client) {
		return super.removeClient(client);
	}
	removeClients(clients) {
		return super.removeClients(clients);
	}

    findClients = (() => {
		const boundingSphereTarget = new BoundingSphere();


		return (position, radius) => {
			const clients = new Array();

			boundingSphereTarget.center = position;
			boundingSphereTarget.radius = radius;

			for (let i = 0; i < this.clients.length; i++) {
				const client = this.clients[i];
				const object = client.object;
				const boundingSphereObject = object.bounding.sphere.local.worldspace;

				// const radiusesSum = radius + boundingSphereObject.radius;
				// const radiusesSumSquared = radiusesSum * radiusesSum;

				// if (position.distanceToSquared(boundingSphereObject.center) < (radiusesSumSquared)) {
				// 	clients.push(client);
				// }

				if (boundingSphereTarget.intersectsBoundingSphere(boundingSphereObject)) {
					clients.push(client);
				}
			}


			return clients;
		};
	})();
};
