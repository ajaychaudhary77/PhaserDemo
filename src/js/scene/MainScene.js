import { config } from "../index";
import { Scene } from "phaser";
import { Levels } from "../constants/levels";

export class MainScene extends Phaser.Scene {

    //constructor for the scene
    constructor() {
        super();
    }

    //preload for the scene
    preload() {
    
    }

    //create lifecycle method for the scene
    create() {
        
    }
   
    //update lifecycle method for the Phaser Game
    update(time, delta) {
        if(delta%100 == 0){
            console.log('Time : ', time, 'Delta : ', delta);
        }
    }
}