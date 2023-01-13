export class DescriptorBase {


    #dirtyCache = new Map();


    constructor(args = {}) {
        this.dirtyCache = new Map();
    }

    
	get dirtyCache() { return this.#dirtyCache; }
	set dirtyCache(dirtyCache) { this.#dirtyCache = dirtyCache; }
};