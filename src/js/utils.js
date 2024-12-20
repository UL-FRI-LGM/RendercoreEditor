import {Vector3} from '../rendercore/math/Vector3.js';

export function randomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
export function color3ToTweakpaneParam(input) {
    return {r: input.r, g: input.g, b: input.b};
}
export function color4ToTweakpaneParam(input) {
    return {r: input.r, g: input.g, b: input.b, a: input.a};
}

export function vector3ToTweakpaneParam(input) {
    return {x: input.x, y: input.y, z: input.z};
}

export function tweakpaneToVector3(input) {
    return new Vector3(input.x, input.y, input.z);
}

export function roundToDecimal(num, decimals) {
    return Math.round(num * (decimals * 10)) / (10*decimals);
}

