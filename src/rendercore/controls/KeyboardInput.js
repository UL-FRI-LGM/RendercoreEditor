export class KeyboardInput {

    
    #listeners = new Set();
    #keyboard;


    constructor(source) {
        this.keyboard = new Set();

        source.addEventListener("keydown", (event) => {
            this.keyboard.add(event.key);
        });
        source.addEventListener("keyup", (event) => {
            this.keyboard.delete(event.key)
        });
    }


    get listeners() { return this.#listeners; }
    set listeners(listeners) { 
        this.clearListeners();
        this.#listeners = listeners; 
    }
    get keyboard() { return this.#keyboard; }
    set keyboard(keyboard) { this.#keyboard = keyboard; }


    addListener(listener) {
        this.listeners.add(listener);
    }
    removeListener(listener) {
        this.listeners.delete(listener);
    }
    clearListeners() {
        this.listeners.clear();
    }

    notifyListeners() {
        for (const listener of this.listeners) {
            listener(this.keyboard);
        }
    }

    update() {
        this.notifyListeners();


        // return this.keyboard;
    }
};