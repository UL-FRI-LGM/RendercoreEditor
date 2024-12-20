import { ObjectBase } from "../core/ObjectBase.js";
import { ArrayT2 } from "../core/ArrayT2.js";


export class AttachmentApplicator extends ObjectBase {


	static DEFAULT = {
		TYPE: "AttachmentApplicator",
		NAME: "",

		COLOR: new ArrayT2({ name: "default attachment entry color array" }),
		DEPTH_STENCIL: null,
		DEPTH: null,
		STENCIL: null,
	};


	#color;
	#depthStencil;
	#depth;
	#stencil;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : AttachmentApplicator.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : AttachmentApplicator.DEFAULT.NAME,
			}
		);

		this.color = (args.color !== undefined) ? args.color : AttachmentApplicator.DEFAULT.COLOR.clone(true);
		this.depthStencil = (args.depthStencil !== undefined) ? args.depthStencil : AttachmentApplicator.DEFAULT.DEPTH_STENCIL;
		this.depth = (args.depth !== undefined) ? args.depth : AttachmentApplicator.DEFAULT.DEPTH;
		this.stencil = (args.stencil !== undefined) ? args.stencil : AttachmentApplicator.DEFAULT.STENCIL;
	}


	get color() { return this.#color; }
	set color(color) { this.#color = color; }
	get depthStencil() { return this.#depthStencil; }
	set depthStencil(depthStencil) { this.#depthStencil = depthStencil; }
	get depth() { return this.#depth; }
	set depth(depth) { this.#depth = depth; }
	get stencil() { return this.#stencil; }
	set stencil(stencil) { this.#stencil = stencil; }


	clone() {
		return new AttachmentApplicator(
			{
				color: (this.color === Object(this.color)) ? this.color.clone() : this.color,
				depthStencil: (this.depthStencil === Object(this.depthStencil)) ? this.depthStencil.clone() : this.depthStencil,
				depth: (this.depth === Object(this.depth)) ? this.depth.clone() : this.depth,
				stencil: (this.stencil === Object(this.stencil)) ? this.stencil.clone() : this.stencil,
			}
		);
	}
};
