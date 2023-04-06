import { ProgrammableStage } from "./ProgrammableStage.js";


export class FragmentState extends ProgrammableStage {

    
    static DEFAULT = {
        MODULE: undefined,
        ENTRY_POINT: undefined,
        CONSTANTS: undefined,

        TARGETS: new Array(),
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