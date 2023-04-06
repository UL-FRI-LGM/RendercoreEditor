import { ProgrammableStage } from "./ProgrammableStage.js";


export class ComputeState extends ProgrammableStage {


    static DEFAULT = {
        MODULE: undefined,
        ENTRY_POINT: undefined,
        CONSTANTS: undefined,
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