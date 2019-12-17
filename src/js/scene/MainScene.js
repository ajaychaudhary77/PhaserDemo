import { config } from "../index";
import { Scene } from "phaser";
import { Levels } from "../constants/levels";

export class MainScene extends Phaser.Scene {

    //constructor for the scene
    constructor() {
        super();
        this.score = 0;
    }

    //preload for the scene
    preload() {
        this.load.image('sky', './img/sky.png');
        this.load.image('ground', './img/platform.png');
        this.load.image('star', './img/star.png');
        this.load.image('bomb', './img/bomb.png');
        this.load.spritesheet('dude', './img/dude.png', {frameWidth:32, frameHeight:48});
    }

    //create lifecycle method for the scene
    create() {
        this.add.image(0,0,'sky').setOrigin(0);

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100,450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        // this.player.setGravityY(300);

        this.physics.add.collider(this.player, this.platforms);

        this.anims.create({
            key:'left',
            frames:this.anims.generateFrameNames('dude', {start:0, end:3}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create({
            key:'right',
            frames:this.anims.generateFrameNumbers('dude',{start:5, end:8}),
            frameRate:10,
            repeat:-1
        });

        this.anims.create({
            key:'turn',
            frames:[{key:'dude',frame:4}],
            frameRate:20
        });

        this.stars = this.physics.add.group({
            key:'star',
            repeat:11,
            setXY:{x:12, y:20, stepX:70}
        });

        this.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        })

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.bombs, this.hitBombs, null, this);

        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    }
   
    //update lifecycle method for the Phaser Game
    update(time, delta) {
        //console.log('Time : ', time, 'Delta : ', delta);
        let cursors = this.input.keyboard.createCursorKeys();

        this.updateDirection(cursors);
    }

    updateDirection(cursors){
        if (cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }

    collectStar(player, star){
        star.disableBody(true, true);

        this.score += 10;

        this.scoreText.setText('Score: ' + this.score);


        if (this.stars.countActive(true) === 0)
        {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    hitBombs(player, bomb){

        console.log('bomb hit');
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        this.gameOver = true;
    }
}