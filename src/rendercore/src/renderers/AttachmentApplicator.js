import { ObjectBase } from "../core/ObjectBase.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { ErrorT2 } from "../ErrorT2.js";


export class AttachmentApplicator extends ObjectBase {


	static DEFAULT = {
		TYPE: "AttachmentApplicator",
		NAME: "",

		COLOR: new ArrayT2({ name: "default attachment entry color array" }),
		DEPTH_STENCIL: null,
		DEPTH: undefined,
		STENCIL: undefined,
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


	copy(attachmentApplicator) {
		if (!(attachmentApplicator instanceof AttachmentApplicator)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		super.copy(attachmentApplicator);

		this.color.copy(attachmentApplicator.color);
		this.depthStencil = (this.depthStencil === Object(this.depthStencil)) ? this.depthStencil.copy(attachmentApplicator.depthStencil) : attachmentApplicator.depthStencil;
		this.depth = (this.depth === Object(this.depth)) ? this.depth.copy(attachmentApplicator.depth) : attachmentApplicator.depth;
		this.stencil = (this.stencil === Object(this.stencil)) ? this.stencil.copy(attachmentApplicator.stencil) : attachmentApplicator.stencil;


		return this;
	}
	clone() {
		return new AttachmentApplicator(
			Object.assign(
				super.clone(), 
				{
					color: (this.color === Object(this.color)) ? this.color.clone() : this.color,
					depthStencil: (this.depthStencil === Object(this.depthStencil)) ? this.depthStencil.clone() : this.depthStencil,
					depth: (this.depth === Object(this.depth)) ? this.depth.clone() : this.depth,
					stencil: (this.stencil === Object(this.stencil)) ? this.stencil.clone() : this.stencil,
				}
			)
		);
	}
};
