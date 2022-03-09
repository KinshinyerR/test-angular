const { app, BrowserWindow } = require('electron');
let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Test Tekus',
        resizable: false,
        webPreferences: {
            preload: `${app.getAppPath()}/preload.js`
        }
    });

    appWin.loadURL(`file://${__dirname}/dist/index.html`);

    appWin.setMenu(null);

    appWin.on('closed', () => {
        appWin = null;
    })
}

app.on('ready', () => createWindow());

app.on('window-all-closed', () => app.quit());

