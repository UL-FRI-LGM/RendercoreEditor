import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { LoadOp } from "../core/RC/LoadOp.js";


export class LoadOperation extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "LoadOperation",
		NAME: "",

		COLOR: new ArrayT2(
			{ name: "default load operation color array" },
			LoadOp.CLEAR
		),
		DEPTH_STENCIL: null,
		DEPTH: LoadOp.CLEAR,
		STENCIL: LoadOp.CLEAR,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : LoadOperation.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : LoadOperation.DEFAULT.NAME,
			
				color: (args.color !== undefined) ? args.color : LoadOperation.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : LoadOperation.DEFAULT.DEPTH_STENCIL,
				depth: (args.depth !== undefined) ? args.depth : LoadOperation.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : LoadOperation.DEFAULT.STENCIL,
			}
		);
	}


	clone() {
		return new LoadOperation(
			{
				color: (this.color === Object(this.color)) ? this.color.clone() : this.color,
				depthStencil: (this.depthStencil === Object(this.depthStencil)) ? this.depthStencil.clone() : this.depthStencil,
				depth: (this.depth === Object(this.depth)) ? this.depth.clone() : this.depth,
				stencil: (this.stencil === Object(this.stencil)) ? this.stencil.clone() : this.stencil,
			}
		);
	}
};
