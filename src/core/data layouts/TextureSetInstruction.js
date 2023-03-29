import { SetInstruction } from "./SetInstruction.js";
import { GPUTextureAspect } from "../ENUM/GPUTextureAspect.js";
import { ResourceBinding } from "./ResourceBinding.js";


export class TextureSetInstruction extends SetInstruction {


	static DEFAULT = {
		NAME: "",
		TYPE: "TextureSetInstruction",

		LABEL: "TEXTURE UPDATE",

		NUMBER: null,
		TARGET: ResourceBinding.TARGET.EXTERNAL,

		SOURCE: {
			arrayBuffer: null,
			layout: {
				offset: 0,
				width: 0,
				height: 0,
			}
		},
		DESTINATION: {
			texture: null,
			layout: {
				mipLevel: 0,
                origin: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                aspect: GPUTextureAspect.ALL,
			}
		},
		SIZE: {
			width: 0,
            height: 0,
            depthOrArrayLayers: 1
		},
	};


	constructor(args = {}) {
        super(
			{
				...args,
				
                name: (args.name !== undefined) ? args.name : TextureSetInstruction.DEFAULT.NAME,
				type: (args.type !== undefined) ? args.type : TextureSetInstruction.DEFAULT.TYPE,
            
				label: (args.label !== undefined) ? args.label : TextureSetInstruction.DEFAULT.LABEL,
			
				number: (args.number !== undefined) ? args.number : TextureSetInstruction.DEFAULT.NUMBER,
				target: (args.target !== undefined) ? args.target : TextureSetInstruction.DEFAULT.TARGET,
				
				source: (args.source !== undefined) ? args.source : TextureSetInstruction.DEFAULT.SOURCE,
				destination: (args.destination !== undefined) ? args.destination : TextureSetInstruction.DEFAULT.DESTINATION,
				size: (args.size !== undefined) ? args.size : TextureSetInstruction.DEFAULT.SIZE,
			}
		);
	}
};