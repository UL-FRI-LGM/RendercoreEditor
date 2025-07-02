import { SpatialPartitionClient } from "./SpatialPartitionClient.js";


export class CellPartitionClient extends SpatialPartitionClient {


	static DEFAULT = {
		TYPE: "CellPartitionClient",
		NAME: "",

		OBJECT: null,
		INDEX: null,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : CellPartitionClient.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : CellPartitionClient.DEFAULT.NAME,

				object: (args.object !== undefined) ? args.object : CellPartitionClient.DEFAULT.OBJECT,
				index: (args.index !== undefined) ? args.index : CellPartitionClient.DEFAULT.INDEX,
			}
		);
	}


	clone(cloneObject = false) {
		return new CellPartitionClient(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				object: cloneObject ? ((this.object === Object(this.object)) ? this.object.clone() : this.object) : this.object,
				index: (this.index === Object(this.index)) ? this.index.clone() : this.index,
			}
		);
	}
};
