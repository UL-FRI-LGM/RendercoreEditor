import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";


export class Size extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "Size",
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

				type: (args.type !== undefined) ? args.type : Size.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : Size.DEFAULT.NAME,
			
				color: (args.color !== undefined) ? args.color : Size.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : Size.DEFAULT.DEPTH_STENCIL.clone(),
				depth: (args.depth !== undefined) ? args.depth : Size.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : Size.DEFAULT.STENCIL,
			}
		);
	}


	clone() {
		return new Size(
			{
				color: (this.color === Object(this.color)) ? this.color.clone() : this.color,
				depthStencil: (this.depthStencil === Object(this.depthStencil)) ? this.depthStencil.clone() : this.depthStencil,
				depth: (this.depth === Object(this.depth)) ? this.depth.clone() : this.depth,
				stencil: (this.stencil === Object(this.stencil)) ? this.stencil.clone() : this.stencil,
			}
		);
	}
};
