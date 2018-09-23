const playerMapping = {
    "next": ".next-song",
    "previous": ".prev-song",
    "playPause": ".play-song.playPause",
    "ads": ".add_block"
}
class Player{
    constructor(webContents){
        this.webContents = webContents;
    }
    playPause(){
        this.executeAction("playPause");
    }
    previous(){
        this.executeAction("previous");
    }
    next(){
        this.executeAction("next");
    }
    executeAction(optionType){
        let className = playerMapping[optionType];
        this.webContents.executeJavaScript(`document.querySelector('${className}').click()`)
    }    
    static removeAds(webContents){
       let className =  playerMapping["ads"];
       let adsContainer = `document.querySelector('${className}')`;
       webContents.executeJavaScript(`${adsContainer}.parentNode.removeChild(${adsContainer})`);
    }
}

module.exports = Player;