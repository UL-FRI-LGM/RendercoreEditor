export class RenderTargetColorAttachment {


	#view;
	#resolveTarget;

	#clearValue;
	#loadOp;
	#storeOp;

	#textureDescriptor;
	#textureViewDescriptor;


	constructor(args = {}) {
		this.view = args.view !== undefined ? args.view : undefined;
		this.resolveTarget = args.resolveTarget !== undefined ? args.resolveTarget : undefined;

		this.clearValue = args.clearValue !== undefined ? args.clearValue : undefined;
		this.loadOp = args.loadOp !== undefined ? args.loadOp : undefined;
		this.storeOp = args.storeOp !== undefined ? args.storeOp : undefined;

		this.textureDescriptor = args.textureDescriptor !== undefined ? args.textureDescriptor : undefined;
		this.textureViewDescriptor = args.textureViewDescriptor !== undefined ? args.textureViewDescriptor : undefined;
	}


	get view() { return this.#view; }
	set view(view) { this.#view = view; }
	get resolveTarget() { return this.#resolveTarget; }
	set resolveTarget(resolveTarget) { this.#resolveTarget = resolveTarget; }

	get clearValue() { return this.#clearValue; }
	set clearValue(clearValue) { this.#clearValue = clearValue; }
	get loadOp() { return this.#loadOp; }
	set loadOp(loadOp) { this.#loadOp = loadOp; }
	get storeOp() { return this.#storeOp; }
	set storeOp(storeOp) { this.#storeOp = storeOp; }

	get textureDescriptor() { return this.#textureDescriptor; }
	set textureDescriptor(textureDescriptor) { this.#textureDescriptor = textureDescriptor; }
	get textureViewDescriptor() { return this.#textureViewDescriptor; }
	set textureViewDescriptor(textureViewDescriptor) { this.#textureViewDescriptor = textureViewDescriptor; }


	clone() {
		return new RenderTargetColorAttachment(
			{
				view: (this.view === Object(this.view)) ? this.view.clone() : this.view,
				resolveTarget: (this.resolveTarget === Object(this.resolveTarget)) ? this.resolveTarget.clone() : this.resolveTarget,

				clearValue: (this.clearValue === Object(this.clearValue)) ? this.clearValue.clone() : this.clearValue,
				loadOp: (this.loadOp === Object(this.loadOp)) ? this.loadOp.clone() : this.loadOp,
				storeOp: (this.storeOp === Object(this.storeOp)) ? this.storeOp.clone() : this.storeOp,

				textureDescriptor: (this.textureDescriptor === Object(this.textureDescriptor)) ? this.textureDescriptor.clone() : this.textureDescriptor,
				textureViewDescriptor: (this.textureViewDescriptor === Object(this.textureViewDescriptor)) ? this.textureViewDescriptor.clone() : this.textureViewDescriptor,
			}
		);
	}
};
