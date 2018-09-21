const {app, BrowserWindow, globalShortcut, webContents} = require("electron");

function createWindow(){
    let window  = new BrowserWindow({height: 600, width: 1000, webPreferences: {
        nodeIntegration: false
    }});
    window.eval = function(){
        console.log("not supported");
    }
    window.loadURL("https://www.gaana.com/");
    // window.webContents.openDevTools();
    window.webContents.on('new-window', (event, url) => {
        event.preventDefault()
        const win = new BrowserWindow({show: false})
        win.once('ready-to-show', () => win.show())
        win.loadURL(url)
        event.newGuest = win
      });
    return window;
}

app.on("ready", ()=>{
    let window = createWindow();
    globalShortcut.register('MediaNextTrack', () => {
        window.webContents.executeJavaScript(`document.querySelector('.next-song').click()`); 
    });
    globalShortcut.register('MediaPreviousTrack', () => {
        window.webContents.executeJavaScript(`document.querySelector('.prev-song').click()`); 
    });
    globalShortcut.register('MediaPlayPause', () => {
        window.webContents.executeJavaScript(`document.querySelector('.play-song.playPause').click()`); 
    });
});
