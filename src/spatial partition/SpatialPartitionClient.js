import { ObjectBase } from "../core/ObjectBase.js";


export class SpatialPartitionClient extends ObjectBase {


	static DEFAULT = {
		TYPE: "SpatialPartitionClient",
		NAME: "",

		OBJECT: null,
		INDEX: null,
	};


	#object;
	#index;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartitionClient.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionClient.DEFAULT.NAME,
			}
		);

		this.object = (args.object !== undefined) ? args.object : SpatialPartitionClient.DEFAULT.OBJECT;
		this.index = (args.index !== undefined) ? args.index : SpatialPartitionClient.DEFAULT.INDEX;
	}


	get object() { return this.#object; }
	set object(object) { this.#object = object; }
	get index() { return this.#index; }
	set index(index) { this.#index = index; }


	clone(cloneObject = false) {
		return new SpatialPartitionClient(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				object: cloneObject ? ((this.object === Object(this.object)) ? this.object.clone() : this.object) : this.object,
				index: (this.index === Object(this.index)) ? this.index.clone() : this.index,
			}
		);
	}
};
