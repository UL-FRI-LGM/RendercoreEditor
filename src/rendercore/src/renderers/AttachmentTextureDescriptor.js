import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { TextureDescriptor } from "../core/RC/textures/TextureDescriptor.js";
import { ErrorT2 } from "../ErrorT2.js";
import { Extent3D } from "../core/RC/textures/Extent3D.js";
import { TextureDimension } from "../core/RC/textures/TextureDimension.js";
import { TextureFormat } from "../core/RC/textures/TextureFormat.js";
import { TextureUsage } from "../core/RC/textures/TextureUsage.js";


export class AttachmentTextureDescriptor extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "AttachmentTextureDescriptor",
		NAME: "",

		COLOR: new ArrayT2(
			{ name: `C - ${AttachmentTextureDescriptor.name}` },
			new TextureDescriptor(
				{
					label: `${AttachmentTextureDescriptor.name}`,
					size: new Extent3D({ width: 1280, height: 720, depthOrArrayLayers: 1 }),
					mipLevelCount: 1,
					sampleCount: 1,
					dimension: TextureDimension.D2,
					format: TextureFormat.BGRA_8_UNORM,
					usage: TextureUsage.RENDER_ATTACHMENT | TextureUsage.TEXTURE_BINDING,
					viewFormats: new ArrayT2({}),
				}
			)
		),
		DEPTH_STENCIL: new TextureDescriptor(
			{
				label: `${AttachmentTextureDescriptor.name}`,
				size: new Extent3D({ width: 1280, height: 720, depthOrArrayLayers: 1 }),
				mipLevelCount: 1,
				sampleCount: 1,
				dimension: TextureDimension.D2,
				format: TextureFormat.DEPTH_24_PLUS_STENCIL_8,
				usage: TextureUsage.RENDER_ATTACHMENT | TextureUsage.TEXTURE_BINDING,
				viewFormats: new ArrayT2({}),
			}
		),
		DEPTH: null,
		STENCIL: null,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : AttachmentTextureDescriptor.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : AttachmentTextureDescriptor.DEFAULT.NAME,

				color: (args.color !== undefined) ? args.color : AttachmentTextureDescriptor.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : AttachmentTextureDescriptor.DEFAULT.DEPTH_STENCIL,
				depth: (args.depth !== undefined) ? args.depth : AttachmentTextureDescriptor.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : AttachmentTextureDescriptor.DEFAULT.STENCIL,
			}
		);
	}


	copy(attachmentTextureDescriptor) {
		return (attachmentTextureDescriptor instanceof AttachmentTextureDescriptor) ? super.copy(attachmentTextureDescriptor) : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
	}
	clone() {
		return new AttachmentTextureDescriptor(Object.assign(super.clone(), {}));
	}
};
