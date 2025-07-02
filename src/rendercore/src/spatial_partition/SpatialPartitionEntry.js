import { ObjectBase } from "../core/ObjectBase.js";


export class SpatialPartitionEntry extends ObjectBase {


	static DEFAULT = {
		TYPE: "SpatialPartitionEntry",
		NAME: "",

		PARTITION: null,
		ENABLED: false,
	};


	#partition;
	#enabled;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : SpatialPartitionEntry.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : SpatialPartitionEntry.DEFAULT.NAME,
			}
		);

		this.partition = (args.partition !== undefined) ? args.partition : SpatialPartitionEntry.DEFAULT.PARTITION;
		this.enabled = (args.enabled !== undefined) ? args.enabled : SpatialPartitionEntry.DEFAULT.ENABLED;
	}


	get partition() { return this.#partition; }
	set partition(partition) { this.#partition = partition; }
	get enabled() { return this.#enabled; }
	set enabled(enabled) { this.#enabled = enabled; }


	clone() {
		return new SpatialPartitionEntry(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				partition: (this.partition === Object(this.partition)) ? this.partition.clone() : this.partition,
				enabled: (this.enabled === Object(this.enabled)) ? this.enabled.clone() : this.enabled,
			}
		);
	}
};
