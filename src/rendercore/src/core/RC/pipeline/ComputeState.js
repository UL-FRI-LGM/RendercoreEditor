import { ProgrammableStage } from "./ProgrammableStage.js";
import { PostprocessInvertMaterial } from "../../../materials/PostprocessInvertMaterial.js";


export class ComputeState extends ProgrammableStage {


    static DEFAULT = {
        MODULE: undefined,
        ENTRY_POINT: undefined,
        CONSTANTS: undefined,
    };

    static CONFIGURATION = {
        INVERT: new ComputeState(
            {
                path: PostprocessInvertMaterial.DEFAULT.SHADER_PATH + PostprocessInvertMaterial.DEFAULT.PROGRAM_NAME + "_comp.wgsl",

                module: null,
                entryPoint: "main",
                constants: undefined,
            }
        ),
    };


    constructor(args = {}) {
        super(
            {
                ...args,

                module: (args.module !== undefined) ? args.module : ComputeState.DEFAULT.MODULE,
                entryPoint: (args.entryPoint !== undefined) ? args.entryPoint : ComputeState.DEFAULT.ENTRY_POINT,
                constants: (args.constants !== undefined) ? args.constants : ComputeState.DEFAULT.CONSTANTS,
            }
        );
    }
};