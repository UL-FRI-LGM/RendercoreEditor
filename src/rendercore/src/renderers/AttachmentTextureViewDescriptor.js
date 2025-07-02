import { AttachmentApplicator } from "./AttachmentApplicator.js";
import { ArrayT2 } from "../core/ArrayT2.js";
import { TextureViewDescriptor } from "../core/RC/textures/TextureViewDescriptor.js";
import { ErrorT2 } from "../ErrorT2.js";
import { TextureFormat } from "../core/RC/textures/TextureFormat.js";
import { TextureView } from "../core/RC/textures/TextureView.js";


export class AttachmentTextureViewDescriptor extends AttachmentApplicator {


	static DEFAULT = {
		TYPE: "AttachmentTextureViewDescriptor",
		NAME: "",

		COLOR: new ArrayT2(
			{ name: `C - ${AttachmentTextureViewDescriptor.name}` },
			new TextureViewDescriptor(
				{
					label: `${AttachmentTextureViewDescriptor.name}`,
					format: TextureFormat.BGRA_8_UNORM,
					dimension: TextureView.DIMENSION.D2,
					aspect: TextureView.ASPECT.ALL,
					baseMipLevel: 0,
					mipLevelCount: 1,
					baseArrayLayer: 0,
					arrayLayerCount: 1,
				}
			)
		),
		DEPTH_STENCIL: new TextureViewDescriptor(
			{
				label: `${AttachmentTextureViewDescriptor.name}`,
				format: TextureView.FORMAT.DEPTH_24_PLUS_STENCIL_8,
				dimension: TextureView.DIMENSION.D2,
				aspect: TextureView.ASPECT.ALL,
				baseMipLevel: 0,
				mipLevelCount: 1,
				baseArrayLayer: 0,
				arrayLayerCount: 1,
			}
		),
		DEPTH: null,
		STENCIL: null,
	};


	constructor(args = {}) {
		super(
			{
				...args,

				type: (args.type !== undefined) ? args.type : AttachmentTextureViewDescriptor.DEFAULT.TYPE,
				name: (args.name !== undefined) ? args.name : AttachmentTextureViewDescriptor.DEFAULT.NAME,

				color: (args.color !== undefined) ? args.color : AttachmentTextureViewDescriptor.DEFAULT.COLOR.clone(true),
				depthStencil: (args.depthStencil !== undefined) ? args.depthStencil : AttachmentTextureViewDescriptor.DEFAULT.DEPTH_STENCIL,
				depth: (args.depth !== undefined) ? args.depth : AttachmentTextureViewDescriptor.DEFAULT.DEPTH,
				stencil: (args.stencil !== undefined) ? args.stencil : AttachmentTextureViewDescriptor.DEFAULT.STENCIL,
			}
		);
	}


	copy(attachmentTextureViewDescriptor) {
		return (attachmentTextureViewDescriptor instanceof AttachmentTextureViewDescriptor) ? super.copy(attachmentTextureViewDescriptor) : ErrorT2.throw(ErrorT2.MESSAGE.WRONG_INSTANCE, { cause: this.type });
	}
	clone() {
		return new AttachmentTextureViewDescriptor(Object.assign(super.clone(), {}));
	}
};
