import { Vector2 } from "../math/Vector2.js";


export class MouseInput {


    #currPosition = new Vector2(0, 0);
    #wheelDeltaY = 0;

    #mouse;


    constructor(source) {
        this.mouse = {
            prevPosition: new Vector2(0, 0),
            currPosition: new Vector2(0, 0),
            buttons: { left: false, middle: false, right: false },
            wheel: {
                deltaY: 0
            }
        };

        source.addEventListener("mousedown", (event) => {
            if (event.button === 0) {
                this.mouse.buttons.left = true;
            } else if (event.button === 1) {
                this.mouse.buttons.middle = true;
            } else if (event.button === 2) {
                this.mouse.buttons.right = true;
            }
        });
        source.addEventListener("mouseup", (event) => {
            if (event.button === 0) {
                this.mouse.buttons.left = false;
            } else if (event.button === 1) {
                this.mouse.buttons.middle = false;
            } else if (event.button === 2) {
                this.mouse.buttons.right = false;
            }
        });
        source.addEventListener("mousemove", (event) => {
            this.#currPosition.x = (event.clientX / source.width) * 2 - 1;
            this.#currPosition.y = -(event.clientY / source.height) * 2 + 1;
        });
        source.addEventListener("mouseleave", (event) => {
            this.mouse.buttons.left = false;
            this.mouse.buttons.middle = false;
            this.mouse.buttons.right = false;
        });
        source.addEventListener("wheel", (event) => {
            this.#wheelDeltaY = event.deltaY;
        });
        source.addEventListener("contextmenu", (event) => {
            event.preventDefault();
        });
    }


    get mouse() { return this.#mouse; }
    set mouse(mouse) { this.#mouse = mouse; }


    update() {
        this.mouse.prevPosition.copy(this.mouse.currPosition);
        this.mouse.currPosition.copy(this.#currPosition);

        this.mouse.wheel.deltaY = this.#wheelDeltaY;
        this.#wheelDeltaY = 0;


        // return this.mouse;
    }
};