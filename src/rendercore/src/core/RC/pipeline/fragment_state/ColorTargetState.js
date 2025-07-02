import { BlendState } from "./BlendState.js";
import { BlendComponent } from "./BlendComponent.js";
import { BlendOperation } from "./BlendOperation.js";
import { BlendFactor } from "./BlendFactor.js";
import { ColorWrite } from "./ColorWrite.js";
import { TextureFormat } from "../../textures/TextureFormat.js";


export class ColorTargetState {


	static DEFAULT = {
		FORMAT: undefined,
		
		BLEND: undefined,
		WRITE_MASK: ColorWrite.ALL,
	};

	static CONFIGURATION = {
		F_RGBA_8_UNORM: {
			B_AOZAOZ: new ColorTargetState(
				{
					format: TextureFormat.RGBA_8_UNORM,

					blend: new BlendState(
						{
							color: new BlendComponent(
								{
									operation: BlendOperation.ADD,
									srcFactor: BlendFactor.ONE,
									dstFactor: BlendFactor.ZERO
								}
							),
							alpha: new BlendComponent(
								{
									operation: BlendOperation.ADD,
									srcFactor: BlendFactor.ONE,
									dstFactor: BlendFactor.ZERO
								}
							),
						}
					),
					writeMask: ColorWrite.ALL,
				}
			),
			B_ASOAOO: new ColorTargetState(
				{
					format: TextureFormat.RGBA_8_UNORM,

					blend: new BlendState(
						{
							color: new BlendComponent(
								{
									operation: BlendOperation.ADD,
									srcFactor: BlendFactor.SRC_ALPHA,
									dstFactor: BlendFactor.ONE_MINUS_SRC_ALPHA
								}
							),
							alpha: new BlendComponent(
								{
									operation: BlendOperation.ADD,
									srcFactor: BlendFactor.ONE,
									dstFactor: BlendFactor.ONE_MINUS_SRC_ALPHA
								}
							),
						}
					),
					writeMask: ColorWrite.ALL,
				}
			)
		},
		F_BGRA_8_UNORM: {
			B_AOZAOZ: new ColorTargetState(
				{
					format: TextureFormat.BGRA_8_UNORM,

					blend: new BlendState(
						{
							color: new BlendComponent(
								{
									operation: BlendOperation.ADD,
									srcFactor: BlendFactor.ONE,
									dstFactor: BlendFactor.ZERO
								}
							),
							alpha: new BlendComponent(
								{
									operation: BlendOperation.ADD,
									srcFactor: BlendFactor.ONE,
									dstFactor: BlendFactor.ZERO
								}
							),
						}
					),
					writeMask: ColorWrite.ALL,
				}
			),
			B_ASOAOO: new ColorTargetState(
				{
					format: TextureFormat.BGRA_8_UNORM,

					blend: new BlendState(
						{
							color: new BlendComponent(
								{
									operation: BlendOperation.ADD,
									srcFactor: BlendFactor.SRC_ALPHA,
									dstFactor: BlendFactor.ONE_MINUS_SRC_ALPHA
								}
							),
							alpha: new BlendComponent(
								{
									operation: BlendOperation.ADD,
									srcFactor: BlendFactor.ONE,
									dstFactor: BlendFactor.ONE_MINUS_SRC_ALPHA
								}
							),
						}
					),
					writeMask: ColorWrite.ALL,
				}
			)
		}
	};


	#format;

	#blend;
	#writeMask;


	constructor(args = {}) {
		this.format = (args.format !== undefined) ? args.format : ColorTargetState.DEFAULT.FORMAT;

		this.blend = (args.blend !== undefined) ? args.blend : ColorTargetState.DEFAULT.BLEND;
		this.writeMask = (args.writeMask !== undefined) ? args.writeMask : ColorTargetState.DEFAULT.WRITE_MASK;
	}


	get format() { return this.#format; }
	set format(format) { this.#format = format; }
	
	get blend() { return this.#blend; }
	set blend(blend) { this.#blend = blend; }
	get writeMask() { return this.#writeMask; }
	set writeMask(writeMask) { this.#writeMask = writeMask; }
};
