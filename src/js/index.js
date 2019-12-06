import { MainScene } from "./scene/MainScene";

export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {}
    },
    scene: [MainScene],
    parent: 'game'
};

window.addEventListener('DOMContentLoaded',() => {
    game = new Phaser.Game(config);
});