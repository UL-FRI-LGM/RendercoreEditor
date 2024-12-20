import { GPUCanvasAlphaMode } from "../ENUM/GPUCanvasAlphaMode.js";
import { PredefinedColorSpace } from "../ENUM/PredefinedColorSpace.js";
import { GPUTextureUsage } from "../NAMESPACE/GPUTextureUsage.js";


export class GPUCanvasConfiguration {


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


    constructor(args = {}) {
        this.device = (args.device !== undefined) ? args.device : undefined;
        this.format = (args.format !== undefined) ? args.format : undefined;
        this.usage = (args.usage !== undefined) ? args.usage : undefined;
        this.viewFormats = (args.viewFormats !== undefined) ? args.viewFormats : undefined;
        this.colorSpace = (args.colorSpace !== undefined) ? args.colorSpace : undefined;
        this.alphaMode = (args.alphaMode !== undefined) ? args.alphaMode : undefined;
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