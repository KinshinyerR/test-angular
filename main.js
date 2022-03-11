const { app, BrowserWindow } = require('electron');
let appWin;

createWindow = () => {
    appWin = new BrowserWindow({
        width: 550,
        height: 900,
        x: 815,
        y: 0,
        title: 'BitcoinPrice',
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

