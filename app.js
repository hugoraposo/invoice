//const main = require('./main'); // Importe o módulo main.js no mesmo diretório

const productForm = document.querySelector('#clienteForm');
const productsList = document.querySelector('#cliente-lista');

const productNome = document.querySelector('#nome');
const productPreco = document.querySelector('#preco');
const productQtd = document.querySelector('#qtd');
const productDesc = document.querySelector('#desc');

productForm.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        const product = {
            nome: productNome.value,
            preco: productPreco.value,
            qtd: productQtd.value,
            descr: productDesc.value
        };

        // Chame a função 'creatProduct' diretamente
        const saveProduct = await main.creatProduct(product);
        console.log(saveProduct);
        productForm.reset();
        productNome.focus();
        
        // Após a inserção bem-sucedida, atualize a lista de produtos
        await updateProductList();
    } catch (err) {
        console.log(err);
    }
});

function rendererProducts(produtos){
    productsList.innerHTML = ""
    produtos.forEach(product =>{
        productsList.innerHTML += `
        <option value="opcao1">${product.nome}</option>
        `;
    });
    ipcRenderer.send('render', { doc });

}

const getProducts = async () => {
    try {
        const produtos = await main.getProducts();
        return produtos;
    } catch (err) {
        console.log(err);
        return []; // Retorne um array vazio em caso de erro
    }
}

async function updateProductList() {
    const produtos = await getProducts();
    rendererProducts(produtos);
}

async function init() {
    await updateProductList(); // Atualize a lista de produtos ao iniciar
}

init();

module.exports ={
    rendererProducts
}