import { TextureAspect } from "../RC/textures/TextureAspect.js";


export class ImageCopyTexture {


	#texture;
	#mipLevel = 0;
	#origin = {};
	#aspect = TextureAspect.ALL;


	constructor(args = {}) {
		this.texture = (args.texture !== undefined) ? args.texture : undefined;
		this.mipLevel = (args.mipLevel !== undefined) ? args.mipLevel : undefined;
		this.origin = (args.origin !== undefined) ? args.origin : undefined;
		this.aspect = (args.aspect !== undefined) ? args.aspect : undefined;
	}


	get texture() { return this.#texture; }
	set texture(texture) { this.#texture = texture; }
	get mipLevel() { return this.#mipLevel; }
	set mipLevel(mipLevel) { this.#mipLevel = mipLevel; }
	get origin() { return this.#origin; }
	set origin(origin) { this.#origin = origin; }
	get aspect() { return this.#aspect; }
	set aspect(aspect) { this.#aspect = aspect; }
};
