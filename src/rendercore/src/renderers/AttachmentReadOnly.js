import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { ErrorT2 } from "../ErrorT2.js";


export class AttachmentReadOnly extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "AttachmentReadOnly",
		NAME: "",

		COLOR: new ArrayT2(
			{ name: `C - ${AttachmentReadOnly.name}` },
			null
		),
		DEPTH_STENCIL: null,
		DEPTH: false,
		STENCIL: false,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : AttachmentReadOnly.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : AttachmentReadOnly.DEFAULT.NAME,

				color: (args.color !== undefined) ? args.color : AttachmentReadOnly.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : AttachmentReadOnly.DEFAULT.DEPTH_STENCIL,
				depth: (args.depth !== undefined) ? args.depth : AttachmentReadOnly.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : AttachmentReadOnly.DEFAULT.STENCIL,
			}
		);
	}


	copy(attachmentReadOnly) {
		return (attachmentReadOnly instanceof AttachmentReadOnly) ? super.copy(attachmentReadOnly) : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
	}
	clone() {
		return new AttachmentReadOnly(Object.assign(super.clone(), {}));
	}
};
