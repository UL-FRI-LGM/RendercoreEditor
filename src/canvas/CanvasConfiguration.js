import { GPUCanvasAlphaMode } from "../core/ENUM/GPUCanvasAlphaMode.js";
import { PredefinedColorSpace } from "../core/ENUM/PredefinedColorSpace.js";
import { GPUTextureUsage } from "../core/NAMESPACE/GPUTextureUsage.js";
import { DescriptorBase } from "../core/RC/DescriptorBase.js";


export class CanvasConfiguration extends DescriptorBase { //RC Canvas configuration descriptor


    // required GPUDevice device;
    // required GPUTextureFormat format;
    // GPUTextureUsageFlags usage = 0x10;  // GPUTextureUsage.RENDER_ATTACHMENT
    // sequence<GPUTextureFormat> viewFormats = [];
    // PredefinedColorSpace colorSpace = "srgb";
    // GPUCanvasAlphaMode alphaMode = "opaque";


    #device;
    #format;
    #usage = GPUTextureUsage.RENDER_ATTACHMENT;
    #viewFormats = new Array();
    #colorSpace = PredefinedColorSpace.SRGB;
    #alphaMode = GPUCanvasAlphaMode.OPAQUE;


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
