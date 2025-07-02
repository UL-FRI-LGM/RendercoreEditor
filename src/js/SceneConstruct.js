import  {
    color3ToTweakpaneParam as color3Convert, 
    color4ToTweakpaneParam as color4Convert, 
    vector3ToTweakpaneParam as vector3Convert} from './utils.js';

//Creates a lightweight copy (image) of each object in a scene for purposes of UI usage.
export class SceneConstruct {
    #images
    #secrets

    constructor() {
        this.#images = []
        this.#secrets = []
	}

    createImageFromObject(object, parentIsConcealed =  false) {
        //choose which properties to expose
        let conceal = false;
        if (object.label == "DONOTPARSE" || parentIsConcealed) {
            conceal = true;
        }
        let image = {
            //UI only:
            "isAnimated" : false,  //  prevent input during animation?
            "isConcealed": conceal, // hide it in scene tree?
            //uuid
            "uuid": object.uuid.value? object.uuid.value : null,
            //base
            "type": object.type,
            "name": object.name != null? object.name : "",
            "visible": object.visible,
            "children":  [],
            //camera
            "far": object.far,
            "near": object.near,
            "fov": object.fov,
            "top": object.top,
            "right": object.right,
            "bottom": object.bottom,
            "left": object.left,
            "aspect": object.aspect,
            //trs
            "translation": object.position != null? vector3Convert(object.position) :  null,
            "rotation": object.rotation != null? vector3Convert(object.rotation) : null,
            "scale": object.scale != null? vector3Convert(object.scaling) : null,
            //materials and colors
            "color4": object.colorIntensity != null ? color4Convert(object.colorIntensity) : undefined,
            "diffuse": object.material != null ? color4Convert(object.material.diffuse) : undefined,
            "emissive": object.material != null ? color4Convert(object.material.emissive) : undefined,
            
            
        };
        return image;
    }


    createFromScene(scene) {
        let children = [...scene.children]
        for(let i = 0; i < children.length; i++) {
            let child = children[i];
            let image = this.createImageFromObject(child);
            if (child.children.size > 0) {
                let subchildren = [...child.children]
                for (let j = 0; j<subchildren.length; j++) {
                    let subchild = subchildren[j];
                    let subimage = this.createImageFromObject(subchild, image.isConcealed);
                    image.children.push(subimage.uuid)
                    if(image.isConcealed) {
                        //this.#secrets.push(subimage)
                    } else {
                        this.#images.push(subimage)
                    }
                    
                }
            }
            if(image.isConcealed) {
                this.#secrets.push(image)
            } else {
                this.#images.push(image)
            }
        };           
        //console.log(this.#secrets,this.#images)

    }

    addObjectToScene(object, conceal = false) {
        const image = this.createImageFromObject(object, null, conceal);
        this.#images.push(image)
    }

    updateImageOfObject(object) {
        let i = this.getIndexByUUID(object.uuid.value);
        const imageNew = this.createImageFromObject(object);
        //preserve hidden status
        imageNew.isConcealed = this.#images[i].isConcealed;
        this.#images[i] = imageNew;
        return this.#images[i];
    }

/*     concealImageAndChildrenByUUID(uuid, conceal = true) {
        console.log("concealing", uuid)
        let j = this.getIndexByUUID(uuid);
        if (this.#images[j] == null) {
            return;
        }
        this.#images[j].isConcealed = conceal
        if (this.#images[j].children == null) {
            return;
        }
        for(let i = 0; i < this.#images[j].children.length; i++) {
            console.log(this.#images[j].children[i])
            this.concealImageAndChildrenByUUID(this.#images[j].children[i], conceal);
        }
        console.log(this.#images)
    }
 */
    deleteImageByUUID(uuid) {
        for (let i = 0; i < this.#images.length; i++) {
            if(this.#images[i].uuid.localeCompare(uuid) == 0) {
                this.#images.splice(i, 1);
            } 
        }
    }

    changeVariable(uuid, variable, value) {

        for (let i = 0; i < this.#images.length; i++) {
            if(this.#images[i].uuid.localeCompare(uuid) == 0) {
                this.#images[i][variable] = value;
            } 
        }
    }


    get images() {return this.#images;}
    set images(e) {return this.#images = e;}

    get secrets() {return this.#secrets;}
    set secrets(e) {return this.#secrets = e;}

    getImageByUUID(uuid) {

        for (let i = 0; i < this.#images.length; i++) {
            if(this.#images[i].uuid.localeCompare(uuid) == 0) {
                return this.#images[i];
                
            } 
        }
    }

    getIndexByUUID(uuid) {
        for (let i = 0; i < this.#images.length; i++) {
            if(this.#images[i].uuid.localeCompare(uuid) == 0) {
                return i;
                
            } 
        }
    }

    getCoordUUIDByName(name) {
        for (let i = 0; i < this.#secrets.length; i++) {
            if(this.#secrets[i].name.localeCompare(name) == 0) {
                return this.#secrets[i].uuid;
            } 
        }
    }

    

}
