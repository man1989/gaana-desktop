const MediaService = require("electron-media-service");
const Player = require("./util/Player");
const { app, BrowserWindow, globalShortcut } = require("electron");
const mediaService = new MediaService();
function createWindow() {
    let window = new BrowserWindow({
        height: 600, width: 1000, webPreferences: {
            nodeIntegration: false
        }
    });
    window.eval = function () {
        console.log("not supported");
    }
    window.loadURL("https://www.gaana.com/");
    // window.webContents.openDevTools();
    window.webContents.on("dom-ready", ()=>{
        Player.removeAds(window.webContents);
    });
    return window;
}

app.on("ready", () => {
    let window = createWindow();
    let player = new Player(window.webContents);
    mediaService.startService();
    mediaService.on("play", ()=>{
        player.playPause();
    });
    mediaService.on("pause", ()=>{
        player.playPause();
    });
    mediaService.on("playPause", ()=>{
        player.playPause();
    });
    mediaService.on("previous", ()=>{
        player.previous();
    });
    mediaService.on("next", ()=>{
        player.next();
    });
});

process.on("uncaughtException", (err)=>{
    console.error("uncaught exception: ", err);
    process.exit(0);
})

