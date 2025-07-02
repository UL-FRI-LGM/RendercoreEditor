import { ProgrammableStage } from "./ProgrammableStage.js";
import { VertexBufferLayout } from "./vertex_state/VertexBufferLayout.js";
import { MeshBasicMaterial } from "../../../RenderCore.js";
import { MeshLambertMaterial } from "../../../materials/MeshLambertMaterial.js";
import { PostprocessToneMappingMaterial } from "../../../materials/PostprocessToneMappingMaterial.js";
import { SpriteBasicMaterial } from "../../../materials/SpriteBasicMaterial.js";
import { VertexNormalBasicMaterial } from "../../../materials/helpers/VertexNormalBasicMaterial.js";
import { PostprocessDilationMaterial } from "../../../materials/PostprocessDilationMaterial.js";
import { PostprocessPixelizationMaterial } from "../../../materials/PostprocessPixelizationMaterial.js";
import { PostprocessCopyTextureMaterial } from "../../../materials/PostprocessCopyTextureMaterial.js";
import { MeshPhongMaterial } from "../../../materials/MeshPhongMaterial.js";
import { MeshBlinnMaterial } from "../../../materials/MeshBlinnMaterial.js";


export class VertexState extends ProgrammableStage {

    
    static DEFAULT = {
        MODULE: undefined,
        ENTRY_POINT: undefined,
        CONSTANTS: undefined,

        BUFFERS: new Array(),
    };

    static CONFIGURATION = {
        BASIC: new VertexState(
            {
                path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                ],
            }
        ),
        LAMBERT: new VertexState(
            {
                path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                ],
            }
        ),
        PHONG: new VertexState(
            {
                path: MeshPhongMaterial.DEFAULT.SHADER_PATH + MeshPhongMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                ],
            }
        ),
        BLINN: new VertexState(
            {
                path: MeshBlinnMaterial.DEFAULT.SHADER_PATH + MeshBlinnMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                ],
            }
        ),
        SPRITE_BASIC: new VertexState(
            {
                path: SpriteBasicMaterial.DEFAULT.SHADER_PATH + SpriteBasicMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L03_S2_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L04_S1_SMV_A1xF32,
                ],
            }
        ),
        VN: new VertexState(
            {
                path: VertexNormalBasicMaterial.DEFAULT.SHADER_PATH + VertexNormalBasicMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L03_S1_SMV_A1xF32,
                ],
            }
        ),
        TONE_MAPPING: new VertexState(
            {
                path: PostprocessToneMappingMaterial.DEFAULT.SHADER_PATH + PostprocessToneMappingMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                ],
            }
        ),
        DILATION: new VertexState(
            {
                path: PostprocessDilationMaterial.DEFAULT.SHADER_PATH + PostprocessDilationMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                ],
            }
        ),
        PIXELIZATION: new VertexState(
            {
                path: PostprocessPixelizationMaterial.DEFAULT.SHADER_PATH + PostprocessPixelizationMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                ],
            }
        ),
        COPY_TEXTURE: new VertexState(
            {
                path: PostprocessCopyTextureMaterial.DEFAULT.SHADER_PATH + PostprocessCopyTextureMaterial.DEFAULT.PROGRAM_NAME + "_vert.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                buffers: [
                    VertexBufferLayout.CONFIGURATION.L00_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L01_S3_SMV_A1xF32,
                    VertexBufferLayout.CONFIGURATION.L02_S2_SMV_A1xF32,
                ],
            }
        )
    };


    #buffers;


    constructor(args = {}) {
        super(
            {
                ...args,

                module: (args.module !== undefined) ? args.module : VertexState.DEFAULT.MODULE,
                entryPoint: (args.entryPoint !== undefined) ? args.entryPoint : VertexState.DEFAULT.ENTRY_POINT,
                constants: (args.constants !== undefined) ? args.constants : VertexState.DEFAULT.CONSTANTS,
            }
        );
        
        this.buffers = (args.buffers !== undefined) ? args.buffers : new Array(...VertexState.DEFAULT.BUFFERS); //copy
    }


    get buffers() { return this.#buffers; }
    set buffers(buffers) { this.#buffers = buffers; }
};