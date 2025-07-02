import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { StoreOp } from "../core/RC/StoreOp.js";
import { ErrorT2 } from "../ErrorT2.js";


export class StoreOperation extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "StoreOperation",
		NAME: "",

		COLOR: new ArrayT2(
			{ name: "default store operation color array" },
			StoreOp.STORE
		),
		DEPTH_STENCIL: null,
		DEPTH: StoreOp.STORE,
		STENCIL: undefined,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : StoreOperation.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : StoreOperation.DEFAULT.NAME,
			
				color: (args.color !== undefined) ? args.color : StoreOperation.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : StoreOperation.DEFAULT.DEPTH_STENCIL,
				depth: (args.depth !== undefined) ? args.depth : StoreOperation.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : StoreOperation.DEFAULT.STENCIL,
			}
		);
	}


	copy(storeOperation) {
		return (storeOperation instanceof StoreOperation) ? super.copy(storeOperation) : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
	}
	clone() {
		return new StoreOperation(Object.assign(super.clone(), {}));
	}
};
