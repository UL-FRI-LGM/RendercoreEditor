import { TweakpaneSettings } from "./TweakpaneSettings.js";
import { TweakpaneEditor } from "./TweakpaneEditor.js";
import {Control} from '../examples/cube/cubeExample.js';
import {tweakpaneToVector3} from './utils.js';

//main mid layer
export class Midlayer extends EventTarget {

    constructor() {
        super();


        this._handleObjectUpdate = this._handleObjectUpdate.bind(this);
        this._updateTweakpaneEditorObjectList = this._updateTweakpaneEditorObjectList.bind(this);
        this._handleObjectLoad = this._handleObjectLoad.bind(this);
        this._handleTest = this._handleTest.bind(this);
        this._handleAddObject = this._handleAddObject.bind(this);
        this._handleDelete = this._handleDelete.bind(this);
        this._handleloadScene = this._handleloadScene.bind(this);
        this._updateSelectedObjectUI = this._updateSelectedObjectUI.bind(this);
        
        this.TweakpaneSettings = new  TweakpaneSettings;
        this.TweakpaneEditor = new  TweakpaneEditor;
        this.control = new Control;

        this._addEventListeners();
        this._updateTweakpaneEditorObjectList();
    }

    _addEventListeners() {
        this.TweakpaneEditor.addEventListener('updateObject', this._handleObjectUpdate);
        this.TweakpaneEditor.addEventListener('loadObject', this._handleObjectLoad);
        this.TweakpaneEditor.addEventListener('test', this._handleTest);
        this.control.addEventListener("updateObjectList", this._updateTweakpaneEditorObjectList);
        this.control.addEventListener("updateUI", this._updateSelectedObjectUI);
        this.TweakpaneSettings.addEventListener('addObject', this._handleAddObject);
        this.TweakpaneSettings.addEventListener('deleteSelected', this._handleDelete);
        this.TweakpaneSettings.addEventListener('loadScene', this._handleloadScene);
    }


    _handleObjectUpdate(e) {
        //console.log(e.detail.type);
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
            case "N/A":
                console.log("Unhandled case? in Midlayer.js");
                break;
        }
    }

    _handleloadScene(e) {
        console.log(e.detail.type)
        if (e.detail.type == "savescene"){
            //handle saving
            return;
            } else {
                this.control.changeScene(e.detail.type);

            }
    }
    _handleDelete(e) {
        this.control.deleteSelectedObject();
    }
    
    _handleAddObject(e) {
        console.log(e);
        const args = e.detail.type.split("_")
        this.control.addObject(args[1], args[2]);

    }
    _handleTest(e) {
        console.log("Testing")
        this.control.testFunction();
    }

    _handleObjectLoad(e) {
        //TODO: format data?
        const obj = this.control.selectByIndex(e.detail.value);

        this.TweakpaneEditor._selectObject(obj);
    }

    _updateTweakpaneEditorObjectList() {
        const objList = this.control.scene.children;
        this.TweakpaneEditor._updateListOfObjects([...objList]);
    }

    _updateSelectedObjectUI(e) {
        console.log(e.detail.value)
        this.TweakpaneEditor._selectObject(e.detail.value);
    }
}
