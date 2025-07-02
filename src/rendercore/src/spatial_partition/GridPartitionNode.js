import { SpatialPartitionNode } from "./SpatialPartitionNode.js";
import { GridPartitionNodeGeometry } from "./GridPartitionNodeGeometry.js";
import { GridPartitionNodeBasicMaterial } from "./GridPartitionNodeBasicMaterial.js";
import { Vector3, Vector4 } from "../RenderCore.js";
import { PrimitiveTopology } from "../core/RC/pipeline/primitive_state/PrimitiveTopology.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Color4 } from "../math/Color4.js";
import { SetT2 } from "../core/SetT2.js";
import { MapT2 } from "../core/MapT2.js";
import { ResourcePack } from "../core/data_layouts/ResourcePack.js";
import { InstructionCache } from "../core/data_layouts/InstructionCache.js";


export class GridPartitionNode extends SpatialPartitionNode {


	static DEFAULT = {
		TYPE: "GridPartitionNode",
		NAME: "",

		VISIBLE: true,
		FRUSTUM_CULLED: true,
		RENDER_ORDER: 0,

		PARENT: null,
		CHILDREN: new SetT2(
			{ name: `C - ${GridPartitionNode.name}` },
			[
				...SpatialPartitionNode.DEFAULT.CHILDREN.clone(false),
			]
		),
		ANCESTORS: new MapT2(
			{ name: `A - ${GridPartitionNode.name}` },
			[
				...SpatialPartitionNode.DEFAULT.ANCESTORS.clone(false),
			]
		),
		DESCENDANTS: new MapT2({
			name: `D - ${GridPartitionNode.name}` },
			[
				...SpatialPartitionNode.DEFAULT.DESCENDANTS.clone(false),
			]
		),

		RESOURCE_PACK: new ResourcePack({ name: `RP - ${GridPartitionNode.name}` }),
		INSTRUCTION_CACHE: new InstructionCache(
			{ name: `IC - ${GridPartitionNode.name}` },
			[
				...SpatialPartitionNode.DEFAULT.INSTRUCTION_CACHE.clone(),
			]
		),
		DIRTY_CACHE: new MapT2(
			{ name: `DC - ${GridPartitionNode.name}` },
			[
				...SpatialPartitionNode.DEFAULT.DIRTY_CACHE.clone(),
			]
		),

		GEOMETRY: new GridPartitionNodeGeometry(
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
		MATERIAL: new GridPartitionNodeBasicMaterial(
			{
				emissive: new Color4(0.0, 0.0, 0.0, 0.0),
				diffuse: new Color4(1.0, 1.0, 1.0, 0.125),
			}
		),
		PICKABLE: false,
		PRIMITIVE: PrimitiveTopology.TRIANGLE_LIST,

		INDEX: new Vector4(0, 0, 0, 0),
		CLIENTS: new ArrayT2({ name: "grid partition node clients" }),	
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GridPartitionNode.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionNode.DEFAULT.NAME,
			
				visible: (args.visible !== undefined) ? args.visible : GridPartitionNode.DEFAULT.VISIBLE,
				frustumCulled: (args.frustumCulled !== undefined) ? args.frustumCulled : GridPartitionNode.DEFAULT.FRUSTUM_CULLED,
				renderOrder: (args.renderOrder !== undefined) ? args.renderOrder : GridPartitionNode.DEFAULT.RENDER_ORDER,

				parent: (args.parent !== undefined) ? args.parent : GridPartitionNode.DEFAULT.PARENT,
				children: (args.children !== undefined) ? args.children : GridPartitionNode.DEFAULT.CHILDREN.clone(false),
				ancestors: (args.ancestors !== undefined) ? args.ancestors : GridPartitionNode.DEFAULT.ANCESTORS.clone(false),
				descendants: (args.descendants !== undefined) ? args.descendants : GridPartitionNode.DEFAULT.DESCENDANTS.clone(false),

				resourcePack: (args.resourcePack !== undefined) ? args.resourcePack : GridPartitionNode.DEFAULT.RESOURCE_PACK.clone(),
				instructionCache: (args.instructionCache !== undefined) ? args.instructionCache : GridPartitionNode.DEFAULT.INSTRUCTION_CACHE.clone(),
				dirtyCache: (args.dirtyCache !== undefined) ? args.dirtyCache : GridPartitionNode.DEFAULT.DIRTY_CACHE.clone(),

				geometry: (args.geometry !== undefined) ? args.geometry : GridPartitionNode.DEFAULT.GEOMETRY,
				material: (args.material !== undefined) ? args.material : GridPartitionNode.DEFAULT.MATERIAL,
				pickable: (args.pickable !== undefined) ? args.pickable : GridPartitionNode.DEFAULT.PICKABLE,
				primitive: (args.primitive !== undefined) ? args.primitive : GridPartitionNode.DEFAULT.PRIMITIVE,

				index: (args.index !== undefined) ? args.index : GridPartitionNode.DEFAULT.INDEX.clone(),
				clients: (args.clients !== undefined) ? args.clients : GridPartitionNode.DEFAULT.CLIENTS.clone(),
			}
		);

		
	}


	clone(cloneClients = false) {
		return new GridPartitionNode(
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
				clients: (this.clients == Object(this.clients)) ? this.clients.clone(cloneClients) : this.clients,
			}
		);
	}

	addClient(client) {
		return super.addClient(client);
	};
	addClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.addClient(v)); return acc;
		}, []);
	}
	updateClient(client) {
		return super.updateClient(client);
	}
	updateClients(clients = undefined) {
		return ((clients !== undefined) ? clients : this.clients).reduce((acc, v) => {
			return (acc && this.updateClient(v));
		}, true);
	}
	removeClient(client) {
		return super.removeClient(client);
	};
	removeClients(clients) {
		return clients.reduce((acc, v) => {
			acc.push(this.removeClient(v)); return acc;
		}, []);
	}

	findClients(position, radius) {
		return super.findClients(position, radius);
	};
};
