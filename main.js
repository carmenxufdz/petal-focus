const {app, BrowserWindow, ipcMain} = require("electron");

let win 

function createWindow(){
    win = new BrowserWindow({
        width: 320,
        height: 480,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
    if(proccess.platform !== "darwin") app.quit();
});


// Cerrar la app
ipcMain.on('close-app', () => {
  app.quit();
});

// Minimizar la ventana
ipcMain.on('minimize-app', () => {
  win.minimize();
});