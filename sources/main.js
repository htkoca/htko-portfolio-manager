// ****************************************
// Modules Init
// ****************************************
// Electron Modules
const electron = require( 'electron' );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const dialog = electron.dialog;
// Node Modules
const path = require( 'path' );
const url = require( 'url' );

// ****************************************
// Variables Init
// ****************************************
// Keep a global reference of the window object so it doesn't get deleted.
let mainWindow;
let rootPath;

// ****************************************
// Active States
// ****************************************
// Create the browser window.
function createWindow() {
  mainWindow = new BrowserWindow( {
    width: 1280,
    height: 800,
    'min-width': 500,
    'min-height': 200,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden'
  } );
  // Load the index.html of the app.
  mainWindow.loadURL( url.format( {
    pathname: path.join( __dirname, 'index.html' ),
    protocol: 'file:',
    slashes: true
  } ) );
  // Emitted when the window is closed.
  mainWindow.on( 'closed', function() {
    // Dereference the window object to delete it from memory
    mainWindow = null;
  } );
}
// Emitted when electron is fully ready.
app.on( 'ready', createWindow );
// Nav Pane
ipc.on( 'rootOpenEvent', function( event ) {
  dialog.showOpenDialog( {
    properties: [ 'openDirectory', 'createDirectory' ]
  }, function( files ) {
    if ( files && files.length === 1 ) {
      rootPath = files[ 0 ];
      // event.sender.send( 'rootTreeEvent', getTree( rootPath ) );
    }
  } );
} );
ipc.on( 'rootRefEvent', function( event ) {
  if ( rootPath !== "" ) {
    // event.sender.send( 'rootTreeEvent', getTree( rootPath ) );
  }
} );



// ****************************************
// Other States
// ****************************************
// Quit when all windows are closed.
app.on( 'window-all-closed', function() {
  // OSX only fully quits when user explicity quits using cmd + Q
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
} );
// Since OSX app may still be active with no window, recreate when activated.
app.on( 'activate', function() {
  if ( mainWindow === null ) {
    createWindow();
  }
} );
