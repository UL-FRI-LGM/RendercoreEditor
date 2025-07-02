import { ObjectBase } from "../core/ObjectBase.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { Color4 } from "../math/Color4.js";
import { LoadOp } from "../core/RC/LoadOp.js";
import { StoreOp } from "../core/RC/StoreOp.js";
import { TextureDescriptor } from "../core/RC/textures/TextureDescriptor.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";
import { TextureViewDescriptor } from "../core/RC/textures/TextureViewDescriptor.js";
import { TextureView } from "../core/RC/textures/TextureView.js";
import { TextureDimension } from "../core/RC/textures/TextureDimension.js";
import { TextureFormat } from "../core/RC/textures/TextureFormat.js";
import { TextureUsage } from "../core/RC/textures/TextureUsage.js";
import { RenderTargetColorAttachment } from "./RenderTargetColorAttachment.js";
import { RenderTargetDepthStencilAttachment } from "./RenderTargetDepthStencilAttachment.js";
import { AttachmentSize } from "./AttachmentSize.js";
import { ErrorT2 } from "../ErrorT2.js";


export class RenderTarget extends ObjectBase {


	static DEFAULT = {
		TYPE: "RenderTarget",
		NAME: "",

		COLOR_ATTACHMENTS: new ArrayT2(
			{ name: `${RenderTarget.name} - COLOR ATTACHMENTS` },
			new RenderTargetColorAttachment(
				{
					//color attachment class
					view: null,
					resolveTarget: undefined,

					clearValue: new Color4(0.5, 0.5, 0.5, 1.0),
					loadOp: LoadOp.CLEAR,
					storeOp: StoreOp.STORE,

					textureDescriptor: new TextureDescriptor(
						{
							label: `${RenderTarget.name}`,
							size: new Extent3D(
								{
									width: 1280,
									height: 720,
									depthOrArrayLayers: 1,
								}
							),
							// mipLevelCount: 1,
							// sampleCount: 1,
							// dimension: TextureDimension.D2,
							// format: TextureFormat.DEPTH_24_PLUS_STENCIL_8,
							// usage: TextureUsage.RENDER_ATTACHMENT | TextureUsage.TEXTURE_BINDING,
							// viewFormats: [],
						}
					),
					textureViewDescriptor: new TextureViewDescriptor(
						{
							label: `${RenderTarget.name}`,
							format: TextureFormat.BGRA_8_UNORM,
							dimension: TextureView.DIMENSION.D2,
							aspect: TextureView.ASPECT.ALL,
							baseMipLevel: 0,
							mipLevelCount: 1,
							baseArrayLayer: 0,
							arrayLayerCount: 1,
						}
					),
				}
			)
		),
		DEPTH_STENCIL_ATTACHMENT: new RenderTargetDepthStencilAttachment(
			{
				//DS attachment class
				view: null,

				depthClearValue: 1.0,
				depthLoadOp: LoadOp.CLEAR,
				depthStoreOp: StoreOp.STORE,
				depthReadOnly: false,

				stencilClearValue: 0,
				stencilLoadOp: LoadOp.CLEAR,
				stencilStoreOp: StoreOp.STORE,
				stencilReadOnly: false,

				textureDescriptor: new TextureDescriptor(
					{
						label: `${RenderTarget.name}`,
						size: new Extent3D(
							{
								width: 1280,
								height: 720,
								depthOrArrayLayers: 1,
							}
						),
						mipLevelCount: 1,
						sampleCount: 1,
						dimension: TextureDimension.D2,
						format: TextureFormat.DEPTH_24_PLUS_STENCIL_8,
						usage: TextureUsage.RENDER_ATTACHMENT | TextureUsage.TEXTURE_BINDING,
						viewFormats: new ArrayT2({}),
					}
				),
				textureViewDescriptor: new TextureViewDescriptor(
					{
						label: `${RenderTarget.name} - DEPTH`,
						format: TextureView.FORMAT.DEPTH_24_PLUS_STENCIL_8,
						dimension: TextureView.DIMENSION.D2,
						aspect: TextureView.ASPECT.ALL,
						baseMipLevel: 0,
						mipLevelCount: 1,
						baseArrayLayer: 0,
						arrayLayerCount: 1,
					}
				)
			}
		),
	};


	#colorAttachments;
	#depthStencilAttachment;


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderTarget.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderTarget.DEFAULT.NAME,
			}
		);

		this.colorAttachments = (args.colorAttachments !== undefined) ? args.colorAttachments : RenderTarget.DEFAULT.COLOR_ATTACHMENTS.clone(true);
		// this._drawBuffers = []; // Framebuffer color attachments (textures) - Order is important
		this.depthStencilAttachment = (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderTarget.DEFAULT.DEPTH_STENCIL_ATTACHMENT.clone();
		// this._depthTexture = null; // Depth texture (if null then depth texture wont be fetched)

		// this.type = (args.type !== undefined) ? args.type : RenderPass.DEFAULT.TYPE;
		// this.target = (args.target !== undefined) ? args.target : RenderPass.DEFAULT.TARGET;
	}


	get colorAttachments() { return this.#colorAttachments; }
	set colorAttachments(colorAttachments) { this.#colorAttachments = colorAttachments; }
	get depthStencilAttachment() { return this.#depthStencilAttachment; }
	set depthStencilAttachment(depthStencilAttachment) { this.#depthStencilAttachment = depthStencilAttachment; }

	get clearValue() {
		return {
			color: this.colorAttachments.map((ca) => {
				return ca.clearValue;
			}),
			depth: this.depthStencilAttachment.depthClearValue,
			stencil: this.depthStencilAttachment.stencilClearValue
		};
	}
	set clearValue(clearValue) {
		const zip = new Array(Math.min(this.colorAttachments.length, clearValue.color.length)).keys().reduce((acc, v, k) => {
			return (acc.push([this.colorAttachments[k], clearValue.color[k]]), acc);
		}, []);


		for (const [colorAttachment, colorAttachmentClearValue] of zip) {
			colorAttachment.clearValue = colorAttachmentClearValue;
		}


		const depthStencilAttachment = this.depthStencilAttachment;
		depthStencilAttachment.depthClearValue = clearValue.depth;
		depthStencilAttachment.stencilClearValue = clearValue.stencil;
	}
	get loadOperation() {
		return {
			color: this.colorAttachments.map((ca) => {
				return ca.loadOp;
			}),
			depth: this.depthStencilAttachment.depthLoadOp,
			stencil: this.depthStencilAttachment.stencilLoadOp
		};
	}
	set loadOperation(loadOperation) {
		const zip = new Array(Math.min(this.colorAttachments.length, loadOperation.color.length)).keys().reduce((acc, v, k) => {
			return (acc.push([this.colorAttachments[k], loadOperation.color[k]]), acc);
		}, []);


		for (const [colorAttachment, colorAttachmentLoadOperation] of zip) {
			colorAttachment.loadOp = colorAttachmentLoadOperation;
		}


		const depthStencilAttachment = this.depthStencilAttachment;
		depthStencilAttachment.depthLoadOp = loadOperation.depth;
		depthStencilAttachment.stencilLoadOp = loadOperation.stencil;
	}
	get storeOperation() {
		return {
			color: this.colorAttachments.map((ca) => {
				return ca.storeOp;
			}),
			depth: this.depthStencilAttachment.depthStoreOp,
			stencil: this.depthStencilAttachment.stencilStoreOp
		};
	}
	set storeOperation(storeOperation) {
		const zip = new Array(Math.min(this.colorAttachments.length, storeOperation.color.length)).keys().reduce((acc, v, k) => {
			return (acc.push([this.colorAttachments[k], storeOperation.color[k]]), acc);
		}, []);


		for (const [colorAttachment, colorAttachmentStoreOperation] of zip) {
			colorAttachment.storeOp = colorAttachmentStoreOperation;
		}


		const depthStencilAttachment = this.depthStencilAttachment;
		depthStencilAttachment.depthStoreOp = storeOperation.depth;
		depthStencilAttachment.stencilStoreOp = storeOperation.stencil;
	}
	get attachmentReadOnly() {
		return {
			color: this.colorAttachments.map((ca) => {
				return ca.readOnly;
			}),
			depth: this.depthStencilAttachment.depthReadOnly,
			stencil: this.depthStencilAttachment.stencilReadOnly
		};
	}
	set attachmentReadOnly(attachmentReadOnly) {
		const zip = new Array(Math.min(this.colorAttachments.length, attachmentReadOnly.color.length)).keys().reduce((acc, v, k) => {
			return (acc.push([this.colorAttachments[k], attachmentReadOnly.color[k]]), acc);
		}, []);


		for (const [colorAttachment, colorAttachmentAttachmentReadOnly] of zip) {
			colorAttachment.readOnly = colorAttachmentAttachmentReadOnly;
		}


		const depthStencilAttachment = this.depthStencilAttachment;
		depthStencilAttachment.depthReadOnly = attachmentReadOnly.depth;
		depthStencilAttachment.stencilReadOnly = attachmentReadOnly.stencil;
	}
	get attachmentTextureDescriptor() {
		return {
			color: this.colorAttachments.map((ca) => {
				return ca.textureDescriptor;
			}),
			depthStencil: this.depthStencilAttachment.textureDescriptor,
			// depth: this.depthStencilAttachment.textureDescriptor,
			// stencil: this.depthStencilAttachment.textureDescriptor
		};
	}
	set attachmentTextureDescriptor(attachmentTextureDescriptor) {
		const zip = new Array(Math.min(this.colorAttachments.length, attachmentTextureDescriptor.color.length)).keys().reduce((acc, v, k) => {
			return (acc.push([this.colorAttachments[k], attachmentTextureDescriptor.color[k]]), acc);
		}, []);


		for (const [colorAttachment, colorAttachmentAttachmentTextureDescriptor] of zip) {
			colorAttachment.textureDescriptor = colorAttachmentAttachmentTextureDescriptor;
		}


		const depthStencilAttachment = this.depthStencilAttachment;
		depthStencilAttachment.textureDescriptor = attachmentTextureDescriptor.depthStencil;
	}
	get attachmentTextureViewDescriptor() {
		return {
			color: this.colorAttachments.map((ca) => {
				return ca.textureViewDescriptor;
			}),
			depthStencil: this.depthStencilAttachment.textureViewDescriptor,
			// depth: this.depthStencilAttachment.textureViewDescriptor,
			// stencil: this.depthStencilAttachment.textureViewDescriptor
		};
	}
	set attachmentTextureViewDescriptor(attachmentTextureViewDescriptor) {
		const zip = new Array(Math.min(this.colorAttachments.length, attachmentTextureViewDescriptor.color.length)).keys().reduce((acc, v, k) => {
			return (acc.push([this.colorAttachments[k], attachmentTextureViewDescriptor.color[k]]), acc);
		}, []);


		for (const [colorAttachment, colorAttachmentAttachmentTextureViewDescriptor] of zip) {
			colorAttachment.textureViewDescriptor = colorAttachmentAttachmentTextureViewDescriptor;
		}


		const depthStencilAttachment = this.depthStencilAttachment;
		depthStencilAttachment.textureViewDescriptor = attachmentTextureViewDescriptor.depthStencil;
	}

	get attachmentSize() {
		return new AttachmentSize(
			{
				color: this.colorAttachments.map((ca) => {
					return ca.textureDescriptor.size;
				}),
				depthStencil: this.depthStencilAttachment.textureDescriptor.size,
				// depth: this.depthStencilAttachment.textureDescriptor.size,
				// stencil: this.depthStencilAttachment.textureDescriptor.size
			}
		);
	}
	set attachmentSize(attachmentSize) {
		if (!(attachmentSize instanceof AttachmentSize)) ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });

		const zip = new Array(Math.min(this.colorAttachments.length, attachmentSize.color.length)).keys().reduce((acc, v, k) => {
			return (acc.push([this.colorAttachments[k], attachmentSize.color[k]]), acc);
		}, []);


		for (const [colorAttachment, colorAttachmentAttachmentSize] of zip) {
			colorAttachment.textureDescriptor.size = colorAttachmentAttachmentSize;
			colorAttachment.textureDescriptor.dirty = true;
		}


		const depthStencilAttachment = this.depthStencilAttachment;
		depthStencilAttachment.textureDescriptor.size = attachmentSize.depthStencil;
		depthStencilAttachment.textureDescriptor.dirty = true;
	}


	addColorAttachment(colorAttachment) {
		this.colorAttachments.addLast(colorAttachment);
	}
	removeColorAttachment(colorAttachment) {
		this.colorAttachments.remove(colorAttachment);
	}
	getColorAttachment(index) {
		return this.colorAttachments.get(index);
	}
	clearColorAttachments() {
		this.colorAttachments.clear();
	}
	sizeColorAttachments() {
		return this.colorAttachments.size();
	}
	addDrawBuffer(drawBuffer) { this.addColorAttachment(drawBuffer); }
	removeDrawBuffer(drawBuffer) { this.removeColorAttachment(drawBuffer); }
	getDrawBuffer(index) { return this.getColorAttachment(index); }
	clearDrawBuffers() { this.clearColorAttachments(); }
	sizeDrawBuffers() { return this.sizeColorAttachments(); }

	addDepthStencilAttachment(depthStencilAttachment) {
		this.depthStencilAttachment = depthStencilAttachment;
	}
	removeDepthStencilAttachment() {
		this.depthStencilAttachment = null;
	}
	getDepthStencilAttachment() {
		return this.depthStencilAttachment;
	}
	clearDepthStencilAttachment() {
		this.depthStencilAttachment = null;
	}
	addDepthTexture(depthTexture) { this.addDepthStencilAttachment(depthTexture); }
	removeDepthTexture() { this.removeDepthStencilAttachment(); }
	getDepthTexture() { return this.getDepthStencilAttachment(); }
	clearDepthTexture() { this.clearDepthStencilAttachment(); }
};
