const {app, BrowserWindow} = require("electron");

function createWindow(){
    let window  = new BrowserWindow({height: 600, width: 800, webPreferences: {
        nodeIntegration: false
    }});
    window.eval = function(){
        console.log("not supported");
    }
    window.loadURL("https://www.gaana.com/");
    window.webContents.openDevTools();
    window.webContents.on('new-window', (event, url) => {
        event.preventDefault()
        const win = new BrowserWindow({show: false})
        win.once('ready-to-show', () => win.show())
        win.loadURL(url)
        event.newGuest = win
      })    
}

app.on("ready", ()=>{
    createWindow();
});