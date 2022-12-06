export class Time {


	#current = 0.0;
	#previous = 0.0;
	#delta = 0.0;


	constructor() {
		this.current = 0.0;
		this.previous = 0.0;
		this.delta = 0.0;
	}


	get current() { return this.#current; }
	set current(current) { this.#current = current; }
	get previous() { return this.#previous; }
	set previous(previous) { this.#previous = previous; }
	get delta() { return this.#delta; }
	set delta(delta) { this.#delta = delta; }


	update() {
		this.previous = this.current;
        this.current = performance.now();
        this.delta = (this.current - this.previous);
	}
};