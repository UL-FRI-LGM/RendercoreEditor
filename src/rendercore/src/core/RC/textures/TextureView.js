import { TextureAspect } from "./TextureAspect.js";
import { TextureFormat } from "./TextureFormat.js";
import { TextureViewDescriptor } from "./TextureViewDescriptor.js";
import { TextureViewDimension } from "./TextureViewDimension.js";


export class TextureView { //RC descriptor


	static FORMAT = TextureFormat;
	static DIMENSION = TextureViewDimension;
	static ASPECT = TextureAspect;


	static DESCRIPTOR = {
		DEFAULT: new TextureViewDescriptor(
			{
				format: TextureView.FORMAT.RGBA_8_UNORM,
				dimension: TextureView.DIMENSION.D2,
				aspect: TextureView.ASPECT.ALL,
				baseMipLevel: 0,
				mipLevelCount: 1,
				baseArrayLayer: 0,
				arrayLayerCount: 1,
			}
		),
	};


	#texture;
	#descriptor;
	#textureView;


	constructor(texture, descriptor = undefined) {
		this.texture = texture;
		this.descriptor = descriptor;
		this.textureView = texture.createView(descriptor);
	}

	
	get texture() { return this.#texture; }
	set texture(texture) { this.#texture = texture; }
	get descriptor() { return this.#descriptor}
	set descriptor(descriptor) { this.#descriptor = descriptor; }


	get textureView() { return this.#textureView; }
	set textureView(textureView) { this.#textureView = textureView; }
};
