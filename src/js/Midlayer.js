import { TweakpaneSettings } from "./TweakpaneSettings.js";
import { TweakpaneEditor } from "./TweakpaneEditor.js";
//import {Control} from './Control.js';
import {tweakpaneToVector3} from './utils.js';
import { SceneConstruct } from "./SceneConstruct.js";
import {Control} from "./Control.js"
//import {Control} from "../examples/rotating_cube/main.js"
//import { main } from "../examples/rotating_cube/main.js"

//main mid layer
export class Midlayer extends EventTarget {

    constructor() {
        super();


        this._handleObjectUpdate = this._handleObjectUpdate.bind(this);
        this._updateTweakpaneEditorObjectList = this._updateTweakpaneEditorObjectList.bind(this);
        this._handleObjectLoad = this._handleObjectLoad.bind(this);
        this.handleTest = this.handleTest.bind(this);
        this._handleAddObject = this._handleAddObject.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleloadScene = this._handleloadScene.bind(this);
        this._updateSelectedObjectUI = this._updateSelectedObjectUI.bind(this);
        this._toggleSecret = this._toggleSecret.bind(this);
        this._lockCamera = this._lockCamera.bind(this);
        
        this.TweakpaneSettings = new  TweakpaneSettings;
        this.TweakpaneEditor = new  TweakpaneEditor;
        this.control = new Control();

        this.sceneImage = new SceneConstruct();
        //this.sceneImage.createFromScene(this.control.scene)  */


        this._addEventListeners();
        this._updateTweakpaneEditorObjectList();  
    } 

    _addEventListeners() {
        this.TweakpaneEditor.addEventListener('updateObject', this._handleObjectUpdate);
        this.TweakpaneEditor.addEventListener('loadObject', this._handleObjectLoad);
        this.TweakpaneEditor.addEventListener('test', this.handleTest);
        this.control.addEventListener("updateObjectList", this._updateTweakpaneEditorObjectList);
        this.control.addEventListener("updateUI", this._updateSelectedObjectUI);
        this.TweakpaneSettings.addEventListener('addObject', this._handleAddObject);
        this.TweakpaneSettings.addEventListener('deleteSelected', this._handleDelete);
        this.TweakpaneSettings.addEventListener('loadScene', this._handleloadScene);
        this.TweakpaneSettings.addEventListener('toggle_secrets', this._toggleSecret);
        this.TweakpaneSettings.addEventListener('lockCamera', this._lockCamera);
    }


    //Call functions to manage scene
    _handleObjectUpdate(e) {
        //console.log(e.detail)
        switch (e.detail.type) {
            case "translation":
                this.control.updateObjectTranslation(e.detail.value);
                break;
            case "rotation":
                this.control.updateObjectRotation(e.detail.value);
                break;
            case "scale":
                this.control.updateObjectScale(e.detail.value);
                break;
            case "name":
                this.control.updateObjectName(e.detail.value);
                break;
            case "color":
                this.control.updateObjectColor(e.detail.value)
                break;
            case "visibility":
                this.control.updateObjectVisibility(e.detail.value);
                break;
            case "material":
                this.control.updateMaterial(e.detail.value, e.detail.subtype);
                break;
            case "viewport":
                this.control.switchViewport();
                break;
            case "camera":
                this.control.updateCamera(e.detail.value, e.detail.subtype);
                break;
            case "dimensions":
                this.control.updateObjectDimensions(e.detail.value, e.detail.subtype);
                break;
            case "delete": 
                this.control.deleteSelectedObject(e.detail.value)
                break;
            default:
                console.warn("Unhandled case? in Midlayer.js");
        }
    }

    //load a scene
    _handleloadScene(e) {
        if (e.detail.type == "savescene"){
            //handle saving
            return;
            } else {
                this.control.changeScene(e.detail.type);
                this.sceneImage.createFromScene(this.control.scene)

            }
    }
    _handleDelete(e) {
        this.control.deleteSelectedObject();
    }
    
    _handleAddObject(e) {
        const args = e.detail.type.split("_")
        this.control.addObject(args[1], args[2]);

    }
    handleTest(e) {
        //console.log(this.control)
        this.control.testFunction();
    }

    _handleObjectLoad(e) {
        let object = this.control.selectByUUID(e.detail.value);
        let image = this.sceneImage.updateImageOfObject(object)
        this.TweakpaneEditor._selectObject(image);
    }

    _updateTweakpaneEditorObjectList(e) {
        if(e) {
            switch (e.detail.type) {
                case "add":
                    this.sceneImage.addObjectToScene(e.detail.object)
                    break;
                case "delete":
                    this.sceneImage.deleteImageByUUID(e.detail.uuid)
                    break;
                case "namechange":
                    this.sceneImage.changeVariable(e.detail.uuid, e.detail.variable, e.detail.value)
                    break;
                case "changeScene":
                    this.sceneImage.images = [];
                    this.sceneImage.createFromScene(e.detail.scene)
            }
        }
        const images = this.sceneImage.images
        this.TweakpaneEditor._updateListOfObjects(images);
    }

    _updateSelectedObjectUI(e) {
        let image = this.sceneImage.getImageByUUID(e.detail.value)
        this.TweakpaneEditor._selectObject(image);
    }

    _toggleSecret(e) {
        const uuid = this.sceneImage.getCoordUUIDByName(e.detail.value);
        this.control.updateObjectVisibility(true, this.control.findByUUID(uuid));
    }

    _lockCamera(e) {
        this.control.lockCamera();
    }
}
