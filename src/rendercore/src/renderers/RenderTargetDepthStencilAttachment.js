export class RenderTargetDepthStencilAttachment {


	#view;

	#depthClearValue;
	#depthLoadOp;
	#depthStoreOp;
	#depthReadOnly;

	#stencilClearValue;
	#stencilLoadOp;
	#stencilStoreOp;
	#stencilReadOnly;

	#textureDescriptor;
	#textureViewDescriptor;


	constructor(args = {}) {
		this.view = args.view !== undefined ? args.view : undefined;

		this.depthClearValue = args.depthClearValue !== undefined ? args.depthClearValue : undefined;
		this.depthLoadOp = args.depthLoadOp !== undefined ? args.depthLoadOp : undefined;
		this.depthStoreOp = args.depthStoreOp !== undefined ? args.depthStoreOp : undefined;
		this.depthReadOnly = args.depthReadOnly !== undefined ? args.depthReadOnly : undefined;

		this.stencilClearValue = args.stencilClearValue !== undefined ? args.stencilClearValue : undefined;
		this.stencilLoadOp = args.stencilLoadOp !== undefined ? args.stencilLoadOp : undefined;
		this.stencilStoreOp = args.stencilStoreOp !== undefined ? args.stencilStoreOp : undefined;
		this.stencilReadOnly = args.stencilReadOnly !== undefined ? args.stencilReadOnly : undefined;

		this.textureDescriptor = args.textureDescriptor !== undefined ? args.textureDescriptor : undefined;
		this.textureViewDescriptor = args.textureViewDescriptor !== undefined ? args.textureViewDescriptor : undefined;
	}


	get view() { return this.#view; }
	set view(view) { this.#view = view; }

	get depthClearValue() { return this.#depthClearValue; }
	set depthClearValue(depthClearValue) { this.#depthClearValue = depthClearValue; }
	get depthLoadOp() { return this.#depthLoadOp; }
	set depthLoadOp(depthLoadOp) { this.#depthLoadOp = depthLoadOp; }
	get depthStoreOp() { return this.#depthStoreOp; }
	set depthStoreOp(depthStoreOp) { this.#depthStoreOp = depthStoreOp; }
	get depthReadOnly() { return this.#depthReadOnly; }
	set depthReadOnly(depthReadOnly) { this.#depthReadOnly = depthReadOnly; }

	get stencilClearValue() { return this.#stencilClearValue; }
	set stencilClearValue(stencilClearValue) { this.#stencilClearValue = stencilClearValue; }
	get stencilLoadOp() { return this.#stencilLoadOp; }
	set stencilLoadOp(stencilLoadOp) { this.#stencilLoadOp = stencilLoadOp; }
	get stencilStoreOp() { return this.#stencilStoreOp; }
	set stencilStoreOp(stencilStoreOp) { this.#stencilStoreOp = stencilStoreOp; }
	get stencilReadOnly() { return this.#stencilReadOnly; }
	set stencilReadOnly(stencilReadOnly) { this.#stencilReadOnly = stencilReadOnly; }

	get textureDescriptor() { return this.#textureDescriptor; }
	set textureDescriptor(textureDescriptor) { this.#textureDescriptor = textureDescriptor; }
	get textureViewDescriptor() { return this.#textureViewDescriptor; }
	set textureViewDescriptor(textureViewDescriptor) { this.#textureViewDescriptor = textureViewDescriptor; }


	clone() {
		return new RenderTargetDepthStencilAttachment(
			{
				view: (this.view === Object(this.view)) ? this.view.clone() : this.view,

				depthClearValue: (this.depthClearValue === Object(this.depthClearValue)) ? this.depthClearValue.clone() : this.depthClearValue,
				depthLoadOp: (this.depthLoadOp === Object(this.depthLoadOp)) ? this.depthLoadOp.clone() : this.depthLoadOp,
				depthStoreOp: (this.depthStoreOp === Object(this.depthStoreOp)) ? this.depthStoreOp.clone() : this.depthStoreOp,
				depthReadOnly: (this.depthReadOnly === Object(this.depthReadOnly)) ? this.depthReadOnly.clone() : this.depthReadOnly,

				stencilClearValue: (this.stencilClearValue === Object(this.stencilClearValue)) ? this.stencilClearValue.clone() : this.stencilClearValue,
				stencilLoadOp: (this.stencilLoadOp === Object(this.stencilLoadOp)) ? this.stencilLoadOp.clone() : this.stencilLoadOp,
				stencilStoreOp: (this.stencilStoreOp === Object(this.stencilStoreOp)) ? this.stencilStoreOp.clone() : this.stencilStoreOp,
				stencilReadOnly: (this.stencilReadOnly === Object(this.stencilReadOnly)) ? this.stencilReadOnly.clone() : this.stencilReadOnly,

				textureDescriptor: (this.textureDescriptor === Object(this.textureDescriptor)) ? this.textureDescriptor.clone() : this.textureDescriptor,
				textureViewDescriptor: (this.textureViewDescriptor === Object(this.textureViewDescriptor)) ? this.textureViewDescriptor.clone() : this.textureViewDescriptor,
			}
		);
	}
};
