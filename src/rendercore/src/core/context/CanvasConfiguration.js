import { PredefinedColorSpace } from "../../canvas/PredefinedColorSpace.js";
import { TextureUsage } from "../RC/textures/TextureUsage.js";
import { DescriptorBase } from "../RC/DescriptorBase.js";
import { CanvasAlphaMode } from "../../canvas/CanvasAlphaMode.js";


export class CanvasConfiguration extends DescriptorBase { //RC Canvas configuration descriptor


    // required GPUDevice device;
    // required TextureFormat format;
    // GPUTextureUsageFlags usage = 0x10;  // TextureUsage.RENDER_ATTACHMENT
    // sequence<TextureFormat> viewFormats = [];
    // PredefinedColorSpace colorSpace = "srgb";
    // CanvasAlphaMode alphaMode = "opaque";


    #device;
    #format;
    #usage = TextureUsage.RENDER_ATTACHMENT;
    #viewFormats = new Array();
    #colorSpace = PredefinedColorSpace.SRGB;
    #alphaMode = CanvasAlphaMode.OPAQUE;


    constructor(device, args = {}) {
        super(args);

        this.device = (device !== undefined) ? device : this.device;
        this.format = (args.format !== undefined) ? args.format : this.format;
        this.usage = (args.usage !== undefined) ? args.usage : this.usage;
        this.viewFormats = (args.viewFormats !== undefined) ? args.viewFormats : this.viewFormats;
        this.colorSpace = (args.colorSpace !== undefined) ? args.colorSpace : this.colorSpace;
        this.alphaMode = (args.alphaMode !== undefined) ? args.alphaMode : this.alphaMode;
    }


    get device() { return this.#device; }
    set device(device) { this.#device = device; }
    get format() { return this.#format; }
    set format(format) { this.#format = format; }
    get usage() { return this.#usage; }
    set usage(usage) { this.#usage = usage; }
    get viewFormats() { return this.#viewFormats; }
    set viewFormats(viewFormats) { this.#viewFormats = viewFormats; }
    get colorSpace() { return this.#colorSpace; }
    set colorSpace(colorSpace) { this.#colorSpace = colorSpace; }
    get alphaMode() { return this.#alphaMode; }
    set alphaMode(alphaMode) { this.#alphaMode = alphaMode; }
};
