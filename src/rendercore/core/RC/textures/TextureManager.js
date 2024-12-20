import { ObjectBase } from "../../ObjectBase.js";


export class TextureManager extends ObjectBase { //RC texture manager
    
    
    static DEFAULT = {
        NAME: "",
		TYPE: "TextureManager",
    };


	#context;

    #descriptors = new Set();
    #textures = new Map();


	constructor(context, args = {}) {
        super(
			{
				...args,
                
				name: (args.name !== undefined) ? args.name : TextureManager.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : TextureManager.DEFAULT.TYPE,
			}
		);

        this.context = (context !== undefined) ? context : undefined;

        this.descriptors = (args.descriptors !== undefined) ? args.descriptors : new Set();
        this.textures = (args.textures !== undefined) ? args.textures : new Map();
	}


	get context() { return this.#context; }
    set context(context) { this.#context = context; }

    get descriptors() { return this.#descriptors; }
    set descriptors(descriptors) { this.#descriptors = descriptors; }
    get textures() { return this.#textures; }
    set textures(textures) { this.#textures = textures; }


    #createTexture(descriptor) {
        const texture = this.context.createTexture(descriptor);
        this.textures.set(descriptor, texture);

        descriptor.dirty = false;


        return texture;
    }
    createTexture(descriptor) {
        if (this.textures.has(descriptor)) this.#deleteTexture(descriptor);
        const texture = this.#createTexture(descriptor);


        return texture;
    }
    #updateTexture(descriptor) {
        return this.createTexture(descriptor);
    }
    getTexture(descriptor) {
        return (this.textures.has(descriptor)) ? ((descriptor.dirty) ? this.#updateTexture(descriptor) : this.textures.get(descriptor)) : this.createTexture(descriptor);
    }
    #deleteTexture(descriptor) {
        this.textures.get(descriptor).destroy();
        const deleted = this.textures.delete(descriptor);


        return deleted;
    }
    deleteTexture(descriptor) {
        return (this.textures.has(descriptor)) ? this.#deleteTexture(descriptor) : false;
    }
};