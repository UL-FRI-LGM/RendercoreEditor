import { ProgrammableStage } from "./ProgrammableStage.js";
import { MeshBasicMaterial } from "../../../RenderCore.js";
import { MeshLambertMaterial } from "../../../materials/MeshLambertMaterial.js";
import { ColorTargetState } from "./fragment_state/ColorTargetState.js";
import { PostprocessToneMappingMaterial } from "../../../materials/PostprocessToneMappingMaterial.js";
import { SpriteBasicMaterial } from "../../../materials/SpriteBasicMaterial.js";
import { VertexNormalBasicMaterial } from "../../../materials/helpers/VertexNormalBasicMaterial.js";


export class FragmentState extends ProgrammableStage {

    
    static DEFAULT = {
        MODULE: undefined,
        ENTRY_POINT: undefined,
        CONSTANTS: undefined,

        TARGETS: new Array(),
    };

    static CONFIGURATION = {
        SPRITE_BASIC_Tx1_T: new FragmentState(
            {
                path: SpriteBasicMaterial.DEFAULT.SHADER_PATH + SpriteBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FRGBA_8_UNORM_BASOAOO,
                ],
            }
        ),
        SPRITE_BASIC_Tx1_T_FBGRA: new FragmentState(
            {
                path: SpriteBasicMaterial.DEFAULT.SHADER_PATH + SpriteBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FBGRA_8_UNORM_BASOAOO,
                ],
            }
        ),
        VN_BASIC_Tx1_T_FBGRA: new FragmentState(
            {
                path: VertexNormalBasicMaterial.DEFAULT.SHADER_PATH + VertexNormalBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FBGRA_8_UNORM_BASOAOO,
                ],
            }
        ),
        BASIC_Tx1_O: new FragmentState(
            {
                path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FRGBA_8_UNORM_BAOZAOZ,
                ],
            }
        ),
        LAMBERT_Tx1_O: new FragmentState(
            {
                path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FRGBA_8_UNORM_BAOZAOZ,
                ],
            }
        ),
        BASIC_Tx1_O_FBGRA: new FragmentState(
            {
                path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FBGRA_8_UNORM_BAOZAOZ,
                ],
            }
        ),
        BASIC_Tx1_T: new FragmentState(
            {
                path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FRGBA_8_UNORM_BASOAOO,
                ],
            }
        ),
        LAMBERT_Tx1_O_FBGRA: new FragmentState(
            {
                path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FBGRA_8_UNORM_BAOZAOZ,
                ],
            }
        ),
        LAMBERT_Tx1_T: new FragmentState(
            {
                path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FRGBA_8_UNORM_BASOAOO,
                ],
            }
        ),
        BASIC_Tx1_T_FBGRA: new FragmentState(
            {
                path: MeshBasicMaterial.DEFAULT.SHADER_PATH + MeshBasicMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FBGRA_8_UNORM_BASOAOO,
                ],
            }
        ),
        LAMBERT_Tx1_T_FBGRA: new FragmentState(
            {
                path: MeshLambertMaterial.DEFAULT.SHADER_PATH + MeshLambertMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FBGRA_8_UNORM_BASOAOO,
                ],
            }
        ),
        TONE_MAPPING_Tx1: new FragmentState(
            {
                path: PostprocessToneMappingMaterial.DEFAULT.SHADER_PATH + PostprocessToneMappingMaterial.DEFAULT.PROGRAM_NAME + "_frag.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,

                targets: [
                    ColorTargetState.CONFIGURATION.FRGBA_8_UNORM_BAOZAOZ,
                ],
            }
        ),
    };


    #targets;


    constructor(args = {}) {
        super(
            {
                ...args,

                module: (args.module !== undefined) ? args.module : FragmentState.DEFAULT.MODULE,
                entryPoint: (args.entryPoint !== undefined) ? args.entryPoint : FragmentState.DEFAULT.ENTRY_POINT,
                constants: (args.constants !== undefined) ? args.constants : FragmentState.DEFAULT.CONSTANTS,
            }
        );
        
        this.targets = (args.targets !== undefined) ? args.targets : new Array(...FragmentState.DEFAULT.TARGETS); //copy
    }


    get targets() { return this.#targets; }
    set targets(targets) { this.#targets = targets; }
}