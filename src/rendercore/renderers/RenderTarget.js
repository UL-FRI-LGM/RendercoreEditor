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


export class RenderTarget extends ObjectBase {


	static DEFAULT = {
		TYPE: "RenderTarget",
		NAME: "",

		RENDERER: null,

		COLOR_ATTACHMENTS: new ArrayT2(
			{ name: "COLOR ATTACHMENTS - RENDER TARGET" },
			new RenderTargetColorAttachment(
				{
					//color attachment class
					view: null,
					resolveTarget: undefined,
	
					clearValue: new Color4(0.5, 0.5, 0.5, 1.0),
					loadOp: LoadOp.CLEAR,
					storeOp: StoreOp.STORE,
	
	
					screen: true,
					textureDescriptor: new TextureDescriptor(
						{
							label: "RP-00 CA-00 T CANVAS",
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
							label: "RP-00 CA-00 TV",
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
						label: "RP-00 DSA-00 T",
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
						label: "RP-00 DSA-00 TV",
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


	constructor(renderer, args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : RenderTarget.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : RenderTarget.DEFAULT.NAME,
			}
		);

		this.renderer = renderer;
		this.context = renderer.context;
		this.canvas = renderer.canvas;

		this.colorAttachments = (args.colorAttachments !== undefined) ? args.colorAttachments : RenderTarget.DEFAULT.COLOR_ATTACHMENTS.clone(true);
		// this._drawBuffers = []; // Framebuffer color attachments (textures) - Order is important
		this.depthStencilAttachment = (args.depthStencilAttachment !== undefined) ? args.depthStencilAttachment : RenderTarget.DEFAULT.DEPTH_STENCIL_ATTACHMENT.clone();
		// this._depthTexture = null; // Depth texture (if null then depth texture wont be fetched)

		// this.type = (args.type !== undefined) ? args.type : RenderPass.DEFAULT.TYPE;
		// this.target = (args.target !== undefined) ? args.target : RenderPass.DEFAULT.TARGET;
	}


	get colorAttachments() { return this.#colorAttachments; }
	set colorAttachments(colorAttachments) {
		this.#colorAttachments = colorAttachments;

		for (const colorAttachment of this.colorAttachments) {
			const colorAttachmentTextureDescriptor = colorAttachment.textureDescriptor;
			const colorAttachmentViewDescriptor = colorAttachment.viewDescriptor;

			if (colorAttachment.screen) {
				// canvas
				this.canvas.width = colorAttachmentTextureDescriptor.size.width;
				this.canvas.height = colorAttachmentTextureDescriptor.size.height;
			}
		}
	}
	get depthStencilAttachment() { return this.#depthStencilAttachment; }
	set depthStencilAttachment(depthStencilAttachment) { this.#depthStencilAttachment = depthStencilAttachment; }

	get size() {
		return {
			color: this.colorAttachments.map((ca) => {
				return ca.textureDescriptor.size;
			}),
			depthStencil: this.depthStencilAttachment.textureDescriptor.size
		};
	}
	set size(size) {
		const zip = new Array(Math.min(this.colorAttachments.length, size.color.length)).keys().reduce((acc, v, k) => {
			return (acc.push([this.colorAttachments[k], size.color[k]]), acc);
		}, []);


		for (const [colorAttachment, colorAttachmentSize] of zip) {
			if (colorAttachment.screen) {
				// canvas
				this.canvas.width = colorAttachmentSize.width;
				this.canvas.height = colorAttachmentSize.height;
			} else {
				// texture
				colorAttachmentTextureDescriptor.size.copy(colorAttachmentSize);
				colorAttachmentTextureDescriptor.dirty = true;
			}
		}


		const depthStencilAttachment = this.depthStencilAttachment;
		const depthStencilAttachmentTextureDescriptor = depthStencilAttachment.textureDescriptor;
		const depthStencilAttachmentViewDescriptor = depthStencilAttachment.viewDescriptor;

		depthStencilAttachmentTextureDescriptor.size.copy(size.depthStencil);
		depthStencilAttachmentTextureDescriptor.dirty = true;
	}
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
	getDepthtexture() { return this.getDepthStencilAttachment(); }
	clearDepthTexture() { this.clearDepthStencilAttachment(); }
};
