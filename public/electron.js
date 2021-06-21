const { app, BrowserWindow, ipcMain } = require("electron")
const path = require("path")

const isDev = true

let mainWindow
function createMainWindow() {
   mainWindow = new BrowserWindow({
      width: 1100,
      minWidth: 750,
      height: 1000,
      minHeight: 600,
      center: true,
      show: false,
      frame: true,
      webPreferences: {
         preload: path.join(__dirname, "preload.js"),
         nodeIntegration: false,
         contextIsolation: true,
         enableRemoteModule: false,
      },
   })

   mainWindow.loadURL(
      isDev
         ? "http://localhost:3000"
         : `file://${path.join(__dirname, "../build/index.html")}`
   )
   // mainWindow.removeMenu()
   mainWindow.webContents.openDevTools()
}

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
   app.quit()
} else {
   app.on("second-instance", (event, commandLine, workingDirectory) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
         if (mainWindow.isMinimized()) mainWindow.restore()
         mainWindow.focus()
      }
   })
}

app.on("ready", () => {
   let loading = new BrowserWindow({
      show: false,
      frame: false,
      transparent: true,
      center: true,
      minimizable: false,
      width: 350,
      height: 350,
      opacity: 0.85,
   })
   loading.once("show", async () => {
      createMainWindow()
      mainWindow.webContents.once("dom-ready", () => {
         mainWindow.show()
         loading.hide()
         loading.close()
      })
   })
   loading.loadFile(path.join(__dirname, "loading.html"))
   loading.show()
})

ipcMain.on("close", () => {
   app.quit()
})

ipcMain.on("minimize", () => {
   mainWindow.minimize()
})

app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
      app.quit()
   }
})
