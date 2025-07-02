import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";
import { ErrorT2 } from "../ErrorT2.js";


export class AttachmentSize extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "AttachmentSize",
		NAME: "",

		COLOR: new ArrayT2(
			{ name: "default size color array" },
			new Extent3D(
				{
					width: 1280,
					height: 720,
					depthOrArrayLayers: 1
				}
			)
		),
		DEPTH_STENCIL: new Extent3D(
			{
				width: 1280,
				height: 720,
				depthOrArrayLayers: 1
			}
		),
		DEPTH: null,
		STENCIL: null,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : AttachmentSize.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : AttachmentSize.DEFAULT.NAME,
			
				color: (args.color !== undefined) ? args.color : AttachmentSize.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : AttachmentSize.DEFAULT.DEPTH_STENCIL.clone(),
				depth: (args.depth !== undefined) ? args.depth : AttachmentSize.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : AttachmentSize.DEFAULT.STENCIL,
			}
		);
	}


	copy(size) {
		return (size instanceof AttachmentSize) ? super.copy(size) : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
	}
	clone() {
		return new AttachmentSize(Object.assign(super.clone(), {}));
	}
};
