import { ProgrammableStage } from "./ProgrammableStage.js";


export class FragmentState extends ProgrammableStage {

    
    static DEFAULT = {
        TARGETS: new Array(),
    };


    #targets;


    constructor(args = {}) {
        super(args);
        
        this.targets = (args.targets !== undefined) ? args.targets : new Array(FragmentState.DEFAULT.TARGETS); //copy
    }


    get targets() { return this.#targets; }
    set targets(targets) { this.#targets = targets; }
}