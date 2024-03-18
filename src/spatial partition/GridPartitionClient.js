import { SpatialPartitionClient } from "./SpatialPartitionClient.js";


export class GridPartitionClient extends SpatialPartitionClient {


	static DEFAULT = {
		TYPE: "GridPartitionClient",
		NAME: "",

		OBJECT: null,
		INDEX: null,

		NODE_BOUNDS: null,
		QUERY_ID: null,
	};


	#nodeBounds;
	#queryID;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : GridPartitionClient.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : GridPartitionClient.DEFAULT.NAME,

				object: (args.object !== undefined) ? args.object : GridPartitionClient.DEFAULT.OBJECT,
				index: (args.index !== undefined) ? args.index : GridPartitionClient.DEFAULT.INDEX,
			}
		);

		this.nodeBounds = (args.nodeBounds !== undefined) ? args.nodeBounds : GridPartitionClient.DEFAULT.NODE_BOUNDS;
		this.queryID = (args.queryID !== undefined) ? args.queryID : GridPartitionClient.DEFAULT.QUERY_ID;
	}


	get nodeBounds() { return this.#nodeBounds; }
	set nodeBounds(nodeBounds) { this.#nodeBounds = nodeBounds; }
	get queryID() { return this.#queryID; }
	set queryID(queryID) { this.#queryID = queryID; }


	clone(cloneObject = false) {
		return new GridPartitionClient(
			{
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,
				name: (this.name === Object(this.name)) ? this.name.clone() : this.name,

				object: cloneObject ? ((this.object === Object(this.object)) ? this.object.clone() : this.object) : this.object,
				index: (this.index === Object(this.index)) ? this.index.clone() : this.index,

				nodeBounds: (this.nodeBounds === Object(this.nodeBounds)) ? this.nodeBounds.clone() : this.nodeBounds,
				queryID: (this.queryID === Object(this.queryID)) ? this.queryID.clone() : this.queryID,
			}
		);
	}
};
