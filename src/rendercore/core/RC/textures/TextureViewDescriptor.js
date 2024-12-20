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


    clone() {
        return new TextureViewDescriptor(
            {
                name: (this.name === Object(this.name)) ? this.name.clone() : this.name,
				type: (this.type === Object(this.type)) ? this.type.clone() : this.type,

				label: (this.label === Object(this.label)) ? this.label.clone() : this.label,
				dirtyCache: (this.dirtyCache === Object(this.dirtyCache)) ? this.dirtyCache.clone() : this.dirtyCache,

                format: (this.format === Object(this.format)) ? this.format.clone() : this.format,
                dimension: (this.dimension === Object(this.dimension)) ? this.dimension.clone() : this.dimension,
				aspect: (this.aspect === Object(this.aspect)) ? this.aspect.clone() : this.aspect,
				baseMipLevel: (this.baseMipLevel === Object(this.baseMipLevel)) ? this.baseMipLevel.clone() : this.baseMipLevel,
				mipLevelCount: (this.mipLevelCount === Object(this.mipLevelCount)) ? this.mipLevelCount.clone() : this.mipLevelCount,
				baseArrayLayer: (this.baseArrayLayer === Object(this.baseArrayLayer)) ? this.baseArrayLayer.clone() : this.baseArrayLayer,
				formatarrayLayerCount: (this.formatarrayLayerCount === Object(this.formatarrayLayerCount)) ? this.formatarrayLayerCount.clone() : this.formatarrayLayerCount,
            }
        );
    }
};