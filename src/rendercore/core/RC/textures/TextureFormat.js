export class TextureFormat {


    // 8-bit formats
    static R_8_UNORM = "r8unorm";
    static R_8_SNORM = "r8snorm";
    static R_8_UINT = "r8uint";
    static R_8_SINT = "r8sint";

    // 16-bit formats
    static R_16_UINT = "r16uint";
    static R_16_SINT = "r16sint";
    static R_16_FLOAT = "r16float";
    static RG_8_UNORM = "rg8unorm";
    static RG_8_SNORM = "rg8snorm";
    static RG_8_UINT = "rg8uint";
    static RG_8_SINT = "rg8sint";

    // 32-bit formats
    static R_32_UINT = "r32uint";
    static R_32_SINT = "r32sint";
    static R_32_FLOAT = "r32float";
    static RG_16_UINT = "rg16uint";
    static RG_16_SINT = "rg16sint";
    static RG_16_FLOAT = "rg16float";
    static RGBA_8_UNORM = "rgba8unorm";
    static RGBA_8_UNORM_SRGB = "rgba8unorm-srgb";
    static RGBA_8_SNORM = "rgba8snorm";
    static RGBA_8_UINT = "rgba8uint";
    static RGBA_8_SINT = "rgba8sint";
    static BGRA_8_UNORM = "bgra8unorm";
    static BGRA_8_UNORM_SRGB = "bgra8unorm-srgb";
    // Packed 32-bit formats
    static RGB_9_E_5_UFLOAT = "rgb9e5ufloat";
    static RGB_10_A_2_UNORM = "rgb10a2unorm";
    static RG_11_B_10_UFLOAT = "rg11b10ufloat";

    // 64-bit formats
    static RG_32_UINT = "rg32uint";
    static RG_32_SINT = "rg32sint";
    static RG_32_FLOAT = "rg32float";
    static RGBA_16_UINT = "rgba16uint";
    static RGBA_16_SINT = "rgba16sint";
    static RGBA_16_FLOAT = "rgba16float";

    // 128-bit formats
    static RGBA_32_UINT = "rgba32uint";
    static RGBA_32_SINT = "rgba32sint";
    static RGBA_32_FLOAT = "rgba32float";

    // Depth/stencil formats
    static STENCIL_8 = "stencil8";
    static DEPTH_16_UNORM = "depth16unorm";
    static DEPTH_24_PLUS = "depth24plus";
    static DEPTH_24_PLUS_STENCIL_8 = "depth24plus-stencil8";
    static DEPTH_32_FLOAT = "depth32float";

    // "depth32float-stencil8" feature
    static DEPTH_32_FLOAT_STENCIL_8 = "depth32float-stencil8";

    // BC compressed formats usable if "texture-compression-bc" is both
    // supported by the device/user agent and enabled in requestDevice.
    static BC_1_RGBA_UNDORM = "bc1-rgba-unorm";
    static BC_1_RGBA_UNDORM_SRGB = "bc1-rgba-unorm-srgb";
    static BC_2_RGBA_UNDORM = "bc2-rgba-unorm";
    static BC_2_RGBA_UNDORM_SRGB = "bc2-rgba-unorm-srgb";
    static BC_3_RGBA_UNDORM = "bc3-rgba-unorm";
    static BC_3_RGBA_UNDORM_SRGB = "bc3-rgba-unorm-srgb";
    static BC_4_R_UNDORM = "bc4-r-unorm";
    static BC_4_R_SNDORM = "bc4-r-snorm";
    static BC_5_RG_UNDORM = "bc5-rg-unorm";
    static BC_5_RG_SNDORM = "bc5-rg-snorm";
    static BC_6_H_RGB_UFLOAT = "bc6h-rgb-ufloat";
    static BC_6_H_RGB_FLOAT = "bc6h-rgb-float";
    static BC_7_RGBA_UNDORM = "bc7-rgba-unorm";
    static BC_7_RGBA_UNDORM_SRGB = "bc7-rgba-unorm-srgb";

    // ETC2 compressed formats usable if "texture-compression-etc2" is both
    // supported by the device/user agent and enabled in requestDevice.
    static ETC_2_RGB_8_UNORM = "etc2-rgb8unorm";
    static ETC_2_RGB_8_UNORM_SRGB = "etc2-rgb8unorm-srgb";
    static ETC_2_RGB_8_A_1_UNORM = "etc2-rgb8a1unorm";
    static ETC_2_RGB_8_A_1_UNORM_SRGB = "etc2-rgb8a1unorm-srgb";
    static ETC_2_RGBA_8_UNORM = "etc2-rgba8unorm";
    static ETC_2_RGBA_8_UNORM_SRGB = "etc2-rgba8unorm-srgb";
    static EAC_R_11_UNORM = "eac-r11unorm";
    static EAC_R_11_SNORM = "eac-r11snorm";
    static EAC_RG_11_UNORM = "eac-rg11unorm";
    static EAC_RG_11_SNORM = "eac-rg11snorm";

    // ASTC compressed formats usable if "texture-compression-astc" is both
    // supported by the device/user agent and enabled in requestDevice.
    static ASTC_4X4_UNORM = "astc-4x4-unorm";
    static ASTC_4X4_UNORM_SRGB = "astc-4x4-unorm-srgb";
    static ASTC_5X4_UNORM = "astc-5x4-unorm";
    static ASTC_5X4_UNORM_SRGB = "astc-5x4-unorm-srgb";
    static ASTC_5X5_UNORM = "astc-5x5-unorm";
    static ASTC_5X5_UNORM_SRGB = "astc-5x5-unorm-srgb";
    static ASTC_6X5_UNORM = "astc-6x5-unorm";
    static ASTC_6X5_UNORM_SRGB = "astc-6x5-unorm-srgb";
    static ASTC_6X6_UNORM = "astc-6x6-unorm";
    static ASTC_6X6_UNORM_SRGB = "astc-6x6-unorm-srgb";
    static ASTC_8X5_UNORM = "astc-8x5-unorm";
    static ASTC_8X5_UNORM_SRGB = "astc-8x5-unorm-srgb";
    static ASTC_8X6_UNORM = "astc-8x6-unorm";
    static ASTC_8X6_UNORM_SRGB = "astc-8x6-unorm-srgb";
    static ASTC_8X8_UNORM = "astc-8x8-unorm";
    static ASTC_8X8_UNORM_SRGB = "astc-8x8-unorm-srgb";
    static ASTC_10X5_UNORM = "astc-10x5-unorm";
    static ASTC_10X5_UNORM_SRGB = "astc-10x5-unorm-srgb";
    static ASTC_10X6_UNORM = "astc-10x6-unorm";
    static ASTC_10X6_UNORM_SRGB = "astc-10x6-unorm-srgb";
    static ASTC_10X8_UNORM = "astc-10x8-unorm";
    static ASTC_10X8_UNORM_SRGB = "astc-10x8-unorm-srgb";
    static ASTC_10X10_UNORM = "astc-10x10-unorm";
    static ASTC_10X10_UNORM_SRGB = "astc-10x10-unorm-srgb";
    static ASTC_12X10_UNORM = "astc-12x10-unorm";
    static ASTC_12X10_UNORM_SRGB = "astc-12x10-unorm-srgb";
    static ASTC_12X12_UNORM = "astc-12x12-unorm";
    static ASTC_12X12_UNORM_SRGB = "astc-12x12-unorm-srgb";


    constructor(args = {}) {}
};
