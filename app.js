const MediaService = require("electron-media-service");
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
        let adsContainer = `document.querySelector('.add_block')`;
        window.webContents.executeJavaScript(`console.log(${adsContainer})`)
        window.webContents.executeJavaScript(`${adsContainer}.parentNode.removeChild(${adsContainer})`);
    });
    window.on("keypress", (a, b, c)=>{
        console.log(a, b,c);
    });
    // window.webContents.on('new-window', (event, url) => {
    //     event.preventDefault()
    //     const win = new BrowserWindow({ show: false })
    //     win.once('ready-to-show', () => win.show())
    //     win.loadURL(url)
    //     event.newGuest = win
    // });
    return window;
}

app.on("ready", () => {
    let window = createWindow();
    mediaService.startService();
    mediaService.on("play", ()=>{
        window.webContents.executeJavaScript(`document.querySelector('.play-song.playPause').click()`);
    });
    mediaService.on("pause", ()=>{
        window.webContents.executeJavaScript(`document.querySelector('.play-song.playPause').click()`);
    });
    mediaService.on("playPause", ()=>{
        window.webContents.executeJavaScript(`document.querySelector('.play-song.playPause').click()`);
    });
    mediaService.on("previous", ()=>{
        window.webContents.executeJavaScript(`document.querySelector('.prev-song').click()`);
    });
    mediaService.on("next", ()=>{
        window.webContents.executeJavaScript(`document.querySelector('.next-song').click()`);
    });
});
