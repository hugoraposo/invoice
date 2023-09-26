const { getConnection } = require('./database')
const notifier = require('node-notifier');
const { writeFile } = require('fs');
const { shell } = require('electron');
const { app, BrowserWindow, ipcMain } = require('electron');
const aap = require('./app')

let window;

//create product
const creatProduct = async (product) => {

    try {
        const conn = await getConnection()
        const result = await conn.query("INSERT INTO produtos (nome, preco, qtd, descr) VALUES (?, ?, ?, ?)", [product.nome, product.preco, product.qtd, product.descr]);

        const options = {
            title: 'Electron MySQL',
            message: 'New Product Saved Successfully'
        };

        notifier.notify(options);
        return product
    } catch (error) {
        console.log(error)
    }

}

//Get Produts
const getProducts = async () => {
    const conn = await getConnection()
    const results = await conn.query('SELECT * FROM PRODUTOS')
    return results;
}

ipcMain.on('gerar-pdf', (event, { doc }) => {
    // Converte o PDF em Blob
    const pdfBlob = doc.output('blob');
  
    // Define o caminho onde você deseja salvar o arquivo PDF
    const filePath = 'caminho/para/seu/arquivo.pdf';
  
    // Escreve o arquivo no sistema de arquivos
    writeFile(filePath, pdfBlob, (err) => {
      if (err) throw err;
  
      // Abre o arquivo PDF usando o aplicativo padrão
      shell.openPath(filePath);
    });
  });


  
ipcMain.on('render', (event, { doc }) => {
    
    aap.rendererProducts
  });


  

function createWindow() {

    window = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:true

        }
    })
    window.loadFile('./index.html')

}

module.exports = {
    createWindow,
    creatProduct,
    getProducts
}