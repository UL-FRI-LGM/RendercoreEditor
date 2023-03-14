import { DescriptorBase } from "../DescriptorBase.js";


export class TextureViewDescriptor extends DescriptorBase {


    #format;
    #dimension;
    #aspect;
    #baseMipLevel;
    #mipLevelCount;
    #baseArrayLayer;
    #formatarrayLayerCount;


    constructor(args = {}) {
        super(args);

        this.format = args.format !== undefined ? args.format : undefined;
        this.dimension = args.dimension !== undefined ? args.dimension : undefined;
        this.aspect = args.aspect !== undefined ? args.aspect : undefined;
        this.baseMipLevel = args.baseMipLevel !== undefined ? args.baseMipLevel : undefined;
        this.mipLevelCount = args.mipLevelCount !== undefined ? args.mipLevelCount : undefined;
        this.baseArrayLayer = args.baseArrayLayer !== undefined ? args.baseArrayLayer : undefined;
        this.formatarrayLayerCount = args.formatarrayLayerCount !== undefined ? args.formatarrayLayerCount : undefined;
    }


    get format() { return this.#format; }
    set format(format) { this.#format = format; }
    get dimension() { return this.#dimension; }
    set dimension(dimension) { this.#dimension = dimension; }
    get aspect() { return this.#aspect; }
    set aspect(aspect) { this.#aspect = aspect; }
    get baseMipLevel() { return this.#baseMipLevel; }
    set baseMipLevel(baseMipLevel) { this.#baseMipLevel = baseMipLevel; }
    get mipLevelCount() { return this.#mipLevelCount; }
    set mipLevelCount(mipLevelCount) { this.#mipLevelCount = mipLevelCount; }
    get baseArrayLayer() { return this.#baseArrayLayer; }
    set baseArrayLayer(baseArrayLayer) { this.#baseArrayLayer = baseArrayLayer; }
    get formatarrayLayerCount() { return this.#formatarrayLayerCount; }
    set formatarrayLayerCount(formatarrayLayerCount) { this.#formatarrayLayerCount = formatarrayLayerCount; }
};