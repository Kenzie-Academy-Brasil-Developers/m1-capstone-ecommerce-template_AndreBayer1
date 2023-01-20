
// ----------- Estrutura cabeçalho ----------- //

let body = document.querySelector(".body");
let header = document.createElement('header');
header.innerHTML =
    `<nav>
<h1 class="logoNome">WearTake</h1>
<ul>
    <li class="botaoNav">
        <button class="botaoTodos" id="todos">Todos</button>
    </li>
    <li class="botaoNav">
        <button class="botaoAcessorios" id="acessorios">Acessórios</button>
    </li>
    <li class="botaoNav">
        <button class="botaoCalcados" id="calcados">Calçados</button>
    </li>
    <li class="botaoNav">
        <button class="botaoCamisetas" id="camisetas">Camisetas</button>
    </li>
</ul>
</nav>`

body.insertAdjacentElement("afterbegin", header);

// ----------- Estrutura Main ----------- //

let main = document.querySelector(".alinhamento");
let divVitrine = document.createElement('div');
divVitrine.innerHTML =
    `<div>
<ul class="vitrineProdutos">
</ul>
</div>`


let divCarrinho = document.createElement('div');
divCarrinho.innerHTML =
    `
    <div class="productCart">
<div class="searchBar">
    <input class="boxPesquisa" id="searchInput" placeholder="O que deseja pesquisar?" type="text">
    <button class="search">Pesquisar</button>
</div>
<span>Carrinho de compras</span>
<ul class="cart">
    <div class="emptyCart">
        <h1>Carrinho vazio</h1>
        <p>Adicione itens</p>
    </div>
</ul>
<div class="contadorESomaTotal">
    <div class="contador">
        <p>Quantidade:</p>
        <p class="qtdProdutos">0</p>
    </div>
    <div class="somaTotal">
        <p>Valor total:</p>
        <p class="somaTotalProdutos">R$ 0.00</p>
    </div>
</div>
</div>`;

main.appendChild(divVitrine);
main.appendChild(divCarrinho);

// ----------- Funcao Render => cria vitrine com produtos ----------- //

let vitrineProdutos = document.querySelector(".vitrineProdutos")

function listaVitrine(arr, parent) {
    for (let i = 0; i < arr.length; i++) {
        let produto = arr[i];
        let card = criaCard(produto);
        parent.appendChild(card);
    }
}
listaVitrine(data, vitrineProdutos);

// ----------- Funcao busca produto por id ----------- //

function procuraProduto(id) {
    for (let i = 0; i < data.length; i++) {
        let produto = data[i];
        if (produto.id === id) {
            return produto;
        }
    }
}

// ----------- Config btn adicionar ao carrinho  ----------- //

let quantidadeItens = 0;
let valorTotal = 0;
let qtd = document.querySelector(".qtdProdutos");
let total = document.querySelector(".somaTotalProdutos");
let divCounterESoma = document.querySelector(".contadorESomaTotal");
let cart = document.querySelector(".cart");
let productCart = document.querySelector(".productCart");
let carrinhoVazio = document.querySelector(".emptyCart");

function botaoAddCart(btn) {

    btn.addEventListener("click", function (e) {

        let elemento = e.target;
        let idElemento = elemento.id;
        let id = parseInt(idElemento);
        let produto = procuraProduto(id);
        let card = produtosNoCart(produto);
        cart.appendChild(card);

        quantidadeItens++;
        qtd.innerText = quantidadeItens;

        let cartProducts = cart.children

        if (cartProducts.length >= 1) {
            cart.appendChild(carrinhoVazio);
            divCounterESoma.remove(productCart);
            carrinhoVazio.remove();
            divCounterESoma.style.visibility = 'visible';
            productCart.appendChild(divCounterESoma);
        }
    })
}

// ----------- Funcao cria card produtos ----------- //

function criaCard(data) {
    let li = document.createElement("li");
    li.classList.add("produto");
    li.id = data.id

    let figure = document.createElement('figure');

    let img = document.createElement('img');
    img.src = `${data.img}`;
    img.alt = `${data.nameItem}`

    let section = document.createElement('section');
    section.classList.add('infoProduto');

    let h4 = document.createElement('h4');
    h4.classList.add('categoria');
    h4.innerText = data.tag

    let h3 = document.createElement('h3');
    h3.innerText = data.nameItem

    let p = document.createElement('p');
    p.innerText = data.description;

    let valor = document.createElement('h4');
    valor.classList.add('valor');
    valor.innerText = `R$ ${data.value}`;

    let btn = document.createElement('button');
    btn.classList.add('addToCart');
    btn.id = data.id
    btn.innerText = `Adicionar ao carrinho`

    botaoAddCart(btn)

    li.appendChild(figure);
    figure.appendChild(img);
    li.appendChild(section);

    section.appendChild(h4)
    section.appendChild(h3)
    section.appendChild(p)
    section.appendChild(valor)
    section.appendChild(btn)

    return li;
}

// ----------- Itens no carrinho + Btn remover ----------- //


function produtosNoCart(data) {
    let li = document.createElement("li");
    li.classList.add("inCartProduct");
    li.id = 'f_' + data.id

    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.classList.add("inCartImg");
    img.src = data.img;
    img.alt = data.nameItem;

    let section = document.createElement("section");
    section.classList.add("infoItem");

    let carrinhoNome = document.createElement("h4");
    carrinhoNome.innerText = data.nameItem;

    let carrinhoPreco = document.createElement("p");
    carrinhoPreco.innerText = `R$ ${data.value}`;

    let btn = document.createElement("button");
    btn.classList.add("removerDoCarrinho");
    btn.innerText = "Remover do carrinho";
    btn.id = 'cart_' + data.id

    btn.addEventListener("click", function (e) {
        li.remove();

        quantidadeItens--;
        //valorTotal -= data.value;
        qtd.innerText = quantidadeItens;
        //total.innerText = `R$ ${valorTotal.toFixed(2)}`;

        let cartProducts = cart.children

        if (cartProducts.length === 0) {
            cart.appendChild(carrinhoVazio);
            divCounterESoma.remove(productCart);
        }
    })

    li.appendChild(figure);
    li.appendChild(section);
    figure.appendChild(img);

    section.appendChild(carrinhoNome);
    section.appendChild(carrinhoPreco);
    section.appendChild(btn);

    return li;

};

// ----------- Filtro Search ----------- //

let searchButton = document.querySelector('.search');
searchButton.addEventListener('click', searchProducts);

function searchProducts() {
    let searchInput = document.querySelector('#searchInput').value;
    let filteredProducts = data.filter(product => product.nameItem.toLowerCase().includes(searchInput.toLowerCase()));
    vitrineProdutos.innerHTML = '';
    listaVitrine(filteredProducts, vitrineProdutos);
}


// ----------- Filtro Botoes de Navegacao ----------- //

let camisetas = [];
let acessorios = [];
let calcados = [];

for (let i = 0; i < data.length; i++) {
    if (data[i].tag[0].toLowerCase() == "camisetas") {
        camisetas.push(data[i]);
    } else if (data[i].tag[0].toLowerCase() == "acessórios") {
        acessorios.push(data[i]);
    } else if (data[i].tag[0].toLowerCase() == "calçados") {
        calcados.push(data[i]);
    }
}

console.log(camisetas);
console.log(acessorios);

let botaoCamisetas = document.querySelector("#camisetas");
botaoCamisetas.addEventListener("click", function () {

    vitrineProdutos.innerHTML = ""; listaVitrine(camisetas, vitrineProdutos);
})

let botaoAcessorios = document.querySelector("#acessorios");
botaoAcessorios.addEventListener("click", function () {

    vitrineProdutos.innerHTML = "", listaVitrine(acessorios, vitrineProdutos);
})

let botaoCalcados = document.querySelector("#calcados");
botaoCalcados.addEventListener("click", function () {

    vitrineProdutos.innerHTML = ""; listaVitrine(calcados, vitrineProdutos);
})

let botaoTodos = document.querySelector("#todos");
botaoTodos.addEventListener("click", function () {

    vitrineProdutos.innerHTML = ""; listaVitrine(data, vitrineProdutos);
})

