import * as TweakpaneFileImportPlugin from 'https://unpkg.com/tweakpane-plugin-file-import@1.0.1/dist/tweakpane-plugin-file-import.js';
import { Pane } from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.0/dist/tweakpane.min.js';
import * as TweakpaneTablePlugin from "../lib/tweakpane-table/dist/table-row-plugin.js";
import * as TweakpaneCascadePlugin from "../lib/cascade/dist/tweakpane_cascade.js";
//console.log(TweakpaneTablePlugin);


export class TweakpaneSettings extends EventTarget {

    constructor () {
        super()

        this.settingsPaneContainer = document.getElementById('SettingsPane');

        


        this.settings = {
            fruit: "",
        }
        this._initSettingsPane();
        

    }

    _returnSettings() {
        return this.settings;
    }

    _changeTheme(theme) {
        // to add a theme, add a new .css file and add option to list.
        document.getElementById("tweakpaneThemeLink").href = theme;
    }

    _loadExample() {
        //TODO: Add dropdown list for examples, import example, load it.
    }

    _initSettingsPane() {
        
        this.settingsPane = new Pane({
            container: this.settingsPaneContainer,
            //title: 'Settings',
        })
        this.settingsPane.registerPlugin(TweakpaneFileImportPlugin);
        this.settingsPane.registerPlugin(TweakpaneTablePlugin);

        this.horizontalPane = this.settingsPane.addBlade({
            view: 'tableRow',
            cells: [],
        }).getPane();

        this.horizontalPane.registerPlugin(TweakpaneCascadePlugin);


		this.fileSettings = this.horizontalPane.addBlade({
			view: 'cascadeMenu',
			root: 'File',
            options: [
			
				{
					text: 'New', 
					value: 'New',
                    children: ['empty', 'cube', 'test'],
				},
				{
                    text: "Empty",
                    value: "empty",
                },
                {
                    text: "Test",
                    value: "test",
                },
                {
                    text: "Cube",
                    value: 'cube',  
                },
                {
                    text: "Save as",
                    value: "savescene",
                },
                {
                    text: "Load",
                    value: "loadscene",
                }
			],
            value: '',
            top: "29px",
			
		}).on('change', (e) => {this._eventDispatcher(e.value, null, "loadScene")})

        this.fileSettings = this.horizontalPane.addBlade({
			view: 'cascadeMenu',
			root: 'Edit',
            options: [
			
/* 				{
					text: 'Undo', 
					value: 'undo_action',
				},
				{
                    text: "Redo",
                    value: "redo_action",
                }, */
                {
                    text: "Delete",
                    value: "delete_object",
                }
			],
            value: '',
            top: "29px",
			
		}).on('change', (e) => {this._eventDispatcher("delete", null, "deleteSelected")})

        
        this.fileSettings = this.horizontalPane.addBlade({
			view: 'cascadeMenu',
			root: 'Add',
            options: [
                    //IMPORTANT: names must match backend renderer names, format:
                    //  add_TYPE_NAME -> add_mesh_cube
				{
					text: 'Mesh', 
                     //functionality of button? last spawned mesh ?
					value: 'last_mesh',
                    children: ["add_mesh_cube", "add_mesh_box", "add_mesh_line", "add_mesh_sphere"]
				},
				{
                    text: "Light",
                    //functionality of button? last spawned light ?
                    value: "last_light",
                    children: ["add_light_spot", "add_light_point", "add_light_ambient", "add_light_directional"]
                },
                {
                    text: "Camera",
                    //functionality of button? last spawned light ?
                    value: "last_camera",
                    children: ["add_camera_orthographic","add_camera_perspective"],
                },
                {
                    text: "Orthographic",
                    //functionality of button? last spawned light ?
                    value: "add_camera_orthographic",
                },
                {
                    text: "Perspective",
                    //functionality of button? last spawned light ?
                    value: "add_camera_perspective",
                },
                {
                    text: "Box",
                    value: "add_mesh_box",
                },
                {
                    text: "Cube",
                    value: "add_mesh_cube",
                },
                {
                    text: "Line",
                    value: "add_mesh_line",
                },
                {
                    text: "Sphere",
                    value: "add_mesh_sphere",
                },
                {
                    text: "GridTest",
                    value: "add_mesh_grid",
                },
                
                {
                    text: "Ambient",
                    value: "add_light_ambient",
                },
                {
                    text: "Directional",
                    value: "add_light_directional",
                },
                {
                    text: "Point",
                    value: "add_light_point",
                },
                {
                    text: "Spot",
                    value: "add_light_spot",
                },
			],
            value: '',
            top: "29px",
			
		}).on('change', (e) => {
            this._eventDispatcher(e.value, null, "addObject")
        })

        this.fileSettings = this.horizontalPane.addBlade({
			view: 'cascadeMenu',
			root: 'View',
            options: [
				{
					text: 'Theme', 
					value: 'ignore',
                    children: ["theme_light", "theme_dark", "theme_iceberg"],
				},
				{text: "Toggle Axes", value: "coordinateLines",},
                {text: "Toggle Grid",   value: "grid",},
                {text: "Light", value: "theme_light"},
                {text: "Dark",  value: "theme_dark" },
                {text: "Iceberg",  value: "theme_iceberg" },
                {text: "Lock Camera",  value: "lock_camera" },
			],
            value: '',
            top: "29px",
			
		}).on('change', (e) => {
            const args = e.value.split("_")
            if (args[0] == "theme") {
                const themePath = "css/tweakpane"+ args[1] +".css";
                this._changeTheme(themePath);
            } else if (args[0] == "lock") {
                this._eventDispatcher(e.value, e.value, "lockCamera")

            }
            else 
            {
                this._eventDispatcher(e.value, e.value, "toggle_secrets")
            }
        })
/*         this.folderFile = this.horizontalPane.addFolder({title: "File", expanded: false}); 
        this.folderEdit = this.horizontalPane.addFolder({title: "Edit", expanded: false}); 
        this.folderAdd  = this.horizontalPane.addFolder({title: "Add" , expanded: false}); 
        this.folderView = this.horizontalPane.addFolder({title: "View", expanded: false}); 
        this.folderHelp = this.horizontalPane.addFolder({title: "Help", expanded: false}); 
 */
/*         
        const themeSelect = this.horizontalPane.addBlade({
            view: 'list',
            label: 'Theme',
            options: [
                {text: "Light", value: "css/tweakpaneLight.css"},
                {text: "Dark",  value: "css/tweakpaneDark.css" },
                {text: "Iceberg",  value: "css/tweakpaneIceberg.css" },
            ],
            value: "css/tweakpaneIceberg.css",
        })
        themeSelect.on('change', (e) => {
            this._changeTheme(e.value);
        })



      */

       

    }

    _eventDispatcher(type = 'N/A', param = null, eventName = 'N/A') {
        this.dispatchEvent(new CustomEvent(eventName, {
            detail: {
                type  : type,
                value : param,
            }
        }));
    }


    
}
