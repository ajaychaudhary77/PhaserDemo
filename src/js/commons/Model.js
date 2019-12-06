export class Model extends Phaser.GameObjects.GameObject{

    //constructor for the Model
    constructor(scene){
        super();
        this.scene = scene;
    }

    //preload all resdources here
    preload(){
        console.log('Please override this method')
    }

    //create all objects for the game here
    create(){
        console.log('Please override this method');
    }

    //add the game logic here
    update(time, delta=0){
        throw new TypeError('You need to implement this method')
    }
}