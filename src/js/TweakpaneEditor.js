import * as TweakpaneFileImportPlugin from 'https://unpkg.com/tweakpane-plugin-file-import@1.0.1/dist/tweakpane-plugin-file-import.js';
import {Pane} from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.3/dist/tweakpane.min.js';
import * as TreeViewPlugin from '../lib/treeview/dist/tweakpane_treeview.js'
import * as TweakpaneEssentialsPlugin from '../lib/plugin-essentials/tweakpane-plugin-essentials-0.2.1.js';

import  {
    color3ToTweakpaneParam as color3Convert, 
    color4ToTweakpaneParam as color4Convert, 
    vector3ToTweakpaneParam as vector3Convert} from './utils.js';
import  {tweakpaneToVector3 as tweakToV3} from './utils.js';

export class TweakpaneEditor extends EventTarget {

    constructor () {
        super()

        this.settingsPaneContainer = document.getElementById('EditorPane');

        this.treeViewValue = -1;

        this.settings = {
            fruit: "",
        }
        this._initEditorPane();
    }

    _updateListOfObjects(objects) {
        const options = objects.map((item, index) => ({
            text: item.name == "" ? item.type : item.name,
            value: index,
            children: Array.from(item.children)
        }));

        this.objectSelect.dispose();
        this.objectSelect = this.treeViewFolder.addBlade({
                view: 'treeview',
                options: options,
                value: -1,
                disable: false,
                index: 0,
                height: "150px",
        }); 
        this.objectSelect.on('change', (e) => {
            if (e.value != undefined) {
                if (this.treeViewValue != e.value) {
                    //Value has changed, select has occured.
                    this.treeViewValue = e.value;
                    this.dispatchEvent(new CustomEvent('loadObject', {
                        detail: 
                        {
                            value : e.value,
                        } 
                    }));
                } else {
                //Value has not changed, tree has updated.
                    this.dispatchEvent(new CustomEvent('updateHierarchy', {
                        detail: 
                        {
                            value : this.objectSelect.options,
                        } 
                    }));
                }   

            }
            
        });
        
       
        this.editorPane.refresh();

    }

    _selectObject(object) {
        //console.log(object)
        this.mainObjectFolder.hidden = false;
        this.selectedObject = object;
        this.isSelected = true;
        const name = object.name == "" ? object.type : object.name;
        this.mainObjectFolder.title = name;
        //makes the treeview unresopnsive?????
        //this.settings['objName'] = name;
        //
        const translation = vector3Convert(object.position);
        const scale = vector3Convert(object.scaling)
        //update UI to match object
        this.settings["translation"] = translation;
        this.settings["scale"] = scale;
        this.settings["visibility"] = object.visible;
        if(object.geometry && object.geometry.baseGeometry && object.geometry.baseGeometry.dimensions) {
            console.log("OBject has dimensions")
            this.editors.minDimensions.hidden = false;
            this.editors.maxDimensions.hidden = false;
            this.separators.dimensions.hidden = false;
        } else {
            this.editors.maxDimensions.hidden = true;
            this.editors.minDimensions.hidden = true;
            this.separators.dimensions.hidden = true;
        }
        

        //Toggle camera specific visibility
        if(object.type == "PerspectiveCamera" || object.type == "OrthographicCamera") {
            this.editors.selectCamera.hidden = false;
            this.editors.cameraAspect.hidden = false;
            this.cameraFolder.hidden = false;

     /*     this.editors.cameraBottom.hidden = false;
            this.editors.cameraLeft.hidden = false;
            this.editors.cameraRight.hidden = false;
            this.editors.cameraTop.hidden = false; */
            this.editors.cameraFar.hidden = false;
            this.editors.cameraNear.hidden = false;

            this.settings["aspectRatio"] = object.aspect
            this.settings["cameraNear"] = object.near
            this.settings["cameraFar"] = object.far
            this.settings["cameraTop"] = object.top
            this.settings["cameraBottom"] = object.bottom
            this.settings["cameraLeft"] = object.left
            this.settings["cameraRight"] = object.right

        } else {
            this.editors.selectCamera.hidden = true; 
            this.editors.cameraAspect.hidden = true;
            this.cameraFolder.hidden = true;
    /*         this.editors.cameraBottom.hidden = true;
            this.editors.cameraLeft.hidden = true;
            this.editors.cameraRight.hidden = true;
            this.editors.cameraTop.hidden = true; */
            this.editors.cameraFar.hidden = true;
            this.editors.cameraNear.hidden = true;
        }

        //Colors
        if(object.color) { 
            const color4 = color4Convert(object.colorIntensity);
            this.settings["color3"] = color4
            this.editors.color3Editor.hidden = false;
        } else {
            this.editors.color3Editor.hidden = true;
        }

        this.editors.visibleToggle.value = object.visible;
        this.editors.nameEditor = name;


        //Show object's material if it has one
        //TODO: separate completely, allow saving a material, apply it to any object.
        if(!object.material) {
            this.materialTab.disabled = true;
        } else {
            this.materialTab.disabled = false;
            this._selectObjectMaterial(object.material);
        }

        this.editorPane.refresh();

    }

    _selectObjectMaterial(material) {
        //console.log(material);
        if (material.diffuse) {
            this.editors.diffuse.hidden = false;
            this.settings["diffuse"] = color4Convert(material.diffuse);        
        } else {
            this.editors.diffuse.hidden = true;
        }
        if (material.emissive) {
            this.editors.emissive.hidden = false;
            this.settings["emissive"] = color4Convert(material.emissive);        
        } else {
            this.editors.emissive.hidden = true;
        }
    }

    _initObjectList() {

        this.objectSelect = this.treeViewFolder.addBlade({
            view: 'list',
            label: 'Objects',
            options: {

            },
            value: 0,
        });

        

    }

    _initEditorPane() {        
        this.editorPane = new Pane({
            container: this.settingsPaneContainer,
       //
        });

        this.editorPane.registerPlugin(TreeViewPlugin);
        this.editorPane.registerPlugin(TweakpaneEssentialsPlugin);

        this.treeViewFolder = this.editorPane.addFolder({title: "Scene", expanded: true}); 
        this.mainObjectFolder = this.editorPane.addFolder({title: "Object", expanded: true, hidden: true }); 
        //this.materialFolder = this.editorPane.addFolder({title: "Material", expanded: true, hidden: true}); 

        this.mainObjectTabs= this.mainObjectFolder.addTab({
            pages:[
            {title: "Object"},
            {title: "Material"}]
        }); 

        this.objectTab = this.mainObjectTabs.pages[0]
        this.materialTab = this.mainObjectTabs.pages[1];
        this._initObjectList()
      
        this.testButton = this.editorPane.addButton({
            title: 'Test',
            index: 0,
        }).on('click', (e) => {
            this.dispatchEvent(new CustomEvent('test', {
                detail: 
                {
                    value : e.value,
                } 
            }));
        });  

        this.editors = new Object;
        this.separators = new Object;
        this.settings['objName'] = "";

        this.editors.nameEditor = this.objectTab.addBinding(this.settings, 'objName', {
            view: 'text',
            label : "Name",
            parse: (v) => String(v),
            value: "name",
        }).on('change', (e) => {
            if (e.final = true) {
                this._eventDispatcher('name', this.settings['objName']);
            }
        })
  
        this.settings['visibility'] = true;
        this.editors.visibleToggle = this.objectTab.addBinding(this.settings, 'visibility', {
            label: 'Visible'
        }).on('change', (e) => { 
            this._eventDispatcher('visibility',this.settings['visibility']);
        });

        this.objectTab.addBlade({view: 'separator'})
        this.settings['translation'] = {x: 0, y: 0, z: 0};
        this.editors.translationEditor = this.objectTab.addBinding(this.settings, 'translation', {
            label :  "Translation"
        }).on('change', (e) => {
            this._eventDispatcher('translation',this.settings['translation']);
        });
        
        this.settings['rotation'] = {x: 0, y: 0, z: 0};
        this.editors.rotationEditor = this.objectTab.addBinding(this.settings, 'rotation', {
            label :  "Rotation",
            step: 0.05
        }).on('change', (e) => { 
            this._eventDispatcher('rotation',this.settings['rotation']);
        });

        this.settings['scale'] = {x: 1, y: 1, z: 1};
        this.editors.scaleEditor = this.objectTab.addBinding(this.settings, 'scale', {
            label :  "Scale"
        }).on('change', (e) => {
            this._eventDispatcher('scale',this.settings['scale']);
        });

       
        this.separators.dimensions = this.objectTab.addBlade({view: 'separator'})

        this.settings['minDimensions'] = {x: 0, y: 0, z: 0};
        this.editors.minDimensions = this.objectTab.addBinding(this.settings, 'minDimensions', {
            label :  "Dimensions min",
            hidden: true,
        }).on('change', (e) => {
            this._eventDispatcher('dimensions',this.settings['minDimensions'], "min");
        });

        this.settings['maxDimensions'] = {x: 0, y: 0, z: 0};
        this.editors.maxDimensions = this.objectTab.addBinding(this.settings, 'maxDimensions', {
            label :  "Dimensions max",
            hidden : true,
        }).on('change', (e) => {
            this._eventDispatcher('dimensions',this.settings['maxDimensions'], "max");
        });
        
        this.settings['color3'] = {r: 1.0, g: 1.0, b: 1.0, a: 1.0};
        this.editors.color3Editor = this.objectTab.addBinding(this.settings, 'color3', {
            color: {type: 'float'},
            label: "Color Intensity",
            picker: 'inline',

        }).on('change', (e) => {
            this._eventDispatcher('color', this.settings['color3'])
        })

        

        
      
       /*  this.settings["aspectToggle"] = "auto",
        this.editors.cameraAspectToggle = this.mainObjectFolder.addBinding(this.settings, 'aspectToggle', {
            view: 'radiogrid',
            groupName: 'scale',
            size: [2, 1],
            cells: (x) => ({
              title: `${scales[x]}`,
              value: scales[x],
            }),
            hidden: true,
            label: 'Aspect ratio',
            index: 7,
        }).on('change', (e) => {

            this._eventDispatcher('camera', this.settings["aspectToggle"], "toggleAspect");
        });
 */
        this._initMaterialTab()
        this._initCameraParams()

    }
    _initCameraParams() {
        this.mainObjectFolder.addBlade({view: 'separator'})

        this.editors.selectCamera = this.objectTab.addButton({
            title: 'Switch view',
            label: "Viewport",
            hidden: true,
        }).on('click', (e) => {
            this._eventDispatcher('viewport');
        });
        //const scales = ["custom", "auto"];
        this.settings['aspectRatio'] = 16/9;
        this.editors.cameraAspect = this.objectTab.addBinding(this.settings, 'aspectRatio', {
            label: "Aspect Ratio",
            min: 0,
            step: 0.0001,
            hidden: true,

        }).on('change', (e) => {
            this._eventDispatcher('camera', this.settings['aspectRatio'], "aspect")
        })



        this.settings['cameraFar'] = 128;
        this.editors.cameraFar = this.objectTab.addBinding(this.settings, 'cameraFar', {
            label: "Far",
            min: 0,
            step: 0.001,
            hidden: true,

        }).on('change', (e) => {
            this._eventDispatcher('camera', this.settings['cameraFar'], "far")
        })

        
        this.settings['cameraNear'] = 0.125;
        this.editors.cameraNear = this.objectTab.addBinding(this.settings, 'cameraNear', {
            label: "Near",
            min: 0,
            step: 0.001,
            hidden: true,

        }).on('change', (e) => {
            this._eventDispatcher('camera', this.settings['cameraNear'], "near")
        })

        this.cameraFolder = this.objectTab.addFolder({title: "Advanced", expanded: true, hidden: false })

        this.settings['cameraTop'] = 1;
        this.editors.cameraTop = this.cameraFolder.addBinding(this.settings, 'cameraTop', {
            label: "Top",
            step: 0.001,
            //hidden: true,

        }).on('change', (e) => {
            this._eventDispatcher('camera', this.settings['cameraTop'], "top")
        })

        this.settings['cameraRight'] = -1;
        this.editors.cameraRight = this.cameraFolder.addBinding(this.settings, 'cameraRight', {
            label: "Right",
            step: 0.001,
            //hidden: true,

        }).on('change', (e) => {
            this._eventDispatcher('camera', this.settings['cameraRight'], "right")
        })

        this.settings['cameraBottom'] = -1;
        this.editors.cameraBottom = this.cameraFolder.addBinding(this.settings, 'cameraBottom', {
            label: "Bottom",
            step: 0.001,
            //hidden: true,

        }).on('change', (e) => {
            this._eventDispatcher('camera', this.settings['cameraBottom'], "bottom")
        })

        this.settings['cameraLeft'] = -1;
        this.editors.cameraLeft = this.cameraFolder.addBinding(this.settings, 'cameraLeft', {
            label: "Left",
            step: 0.001,
            //hidden: true,

        }).on('change', (e) => {
            this._eventDispatcher('camera', this.settings['cameraLeft'], "left")
        })

    }

    _initMaterialTab() {
        this.settings['diffuse'] = {r: 1.0, g: 1.0, b: 1.0, a: 1.0};
        this.editors.diffuse = this.materialTab.addBinding(this.settings, 'diffuse', {
            color: {type: 'float'},
            label: "Diffuse",
            picker: 'inline',
        }).on('change', (e) => {
            this._eventDispatcher('material', this.settings['diffuse'], "diffuse")
        })

        this.settings['emissive'] = {r: 1.0, g: 1.0, b: 1.0, a: 1.0};
        this.editors.emissive = this.materialTab.addBinding(this.settings, 'emissive', {
            color: {type: 'float'},
            label: "Emissive",
            picker: 'inline',

        }).on('change', (e) => {
            this._eventDispatcher('material', this.settings['emissive'], "emissive")
        })

    }

    _eventDispatcher(type = 'N/A', param = null, subtype = "N/A") {
        //console.log("Received type: ", type, " data is: ", param, "parameterName is: ", subtype);
        this.dispatchEvent(new CustomEvent("updateObject", {
            detail: {
                type  : type,
                value : param,
                subtype : subtype,
            }
        }));
    }




}