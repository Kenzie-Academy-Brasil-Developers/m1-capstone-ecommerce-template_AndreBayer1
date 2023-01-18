
// ----------- Estrutura cabeçalho ----------- //


let body = document.querySelector(".body");
let header = document.createElement('header');
header.innerHTML =
    `<nav>
<h1 class="logoNome">WearTake</h1>
<ul>
    <li class="botaoNav">
        <button class="botaoTodos" href="#">Todos</button>
    </li>
    <li class="botaoNav">
        <button class="botaoAcessorios" href="#">Acessórios</button>
    </li>
    <li class="botaoNav">
        <button class="botaoCalcados" href="#">Calçados</button>
    </li>
    <li class="botaoNav">
        <button class="botaoCamisetas" href="#">Camisetas</button>
    </li>
</ul>
</nav>`

body.insertAdjacentElement("afterbegin", header);


// ----------- Estrutura Main ----------- //



let main = document.querySelector(".alinhamento");
let div1 = document.createElement('div');
div1.innerHTML =
    `<div>
<ul class="vitrineProdutos">
</ul>
</div>`


let div2 = document.createElement('div');
div2.innerHTML =
    `
    <div class="productCart">
<div class="searchBar">
    <input class="boxPesquisa" placeholder="O que deseja pesquisar?" type="text">
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

main.appendChild(div1);
main.appendChild(div2);



// ----------- funcao cria card produtos  ----------- //


function criaCard(data) {

    let li = document.createElement("li");
    li.classList.add("produto");

    li.innerHTML =
        `<figure>
        <img src="${data.img}" alt="${data.nameItem}">
        </figure>
    <section class="infoProduto">
        <h4 class="categoria">${data.tag}</h4>
        <h3>${data.nameItem}</h3>
        <p>${data.description}</p>
        <h4 class="valor">R$ ${data.value}</h4>
        <button class="addToCart" id=${data.id}>Adicionar ao carrinho</button>
    </section>`;

    return li;
}


// ----------- funcao cria vitrine com produtos ----------- //


let vitrineProdutos = document.querySelector(".vitrineProdutos")

function listaVitrine(arr, parent) {
    for (let i = 0; i < arr.length; i++) {
        let produto = arr[i];

        let card = criaCard(produto);
        parent.appendChild(card);
    }
}
listaVitrine(data, vitrineProdutos);



// ----------- funcao busca produto por id ----------- //


function procuraProduto(id) {
    for (let i = 0; i < data.length; i++) {
        let produto = data[i];
        if (produto.id === id) {
            return produto;
        }
    }
}


let cart = document.querySelector(".cart");
let carrinhoVazio = document.querySelector(".emptyCart");
let divCounterESoma = document.querySelector(".contadorESomaTotal");
let productCart = document.querySelector(".productCart");

let addToCartButton = document.querySelectorAll(".addToCart");
let qtd = document.querySelector(".qtdProdutos");
let total = document.querySelector(".somaTotalProdutos");



// ----------- config botao adicionar ao carrinho  ----------- //

let quantidadeItens = 0;
let valorTotal = 0;

for (let i = 0; i < addToCartButton.length; i++) {

    let btn = addToCartButton[i];
    btn.addEventListener("click", function (e) {

        let elemento = e.target;
        let idElemento = elemento.id;
        let id = parseInt(idElemento);
        let produto = procuraProduto(id);

        produtosNoCart(produto);

        carrinhoVazio.remove();

        quantidadeItens++
        qtd.innerText = quantidadeItens

        valorTotal += data[i].value;
        total.innerText = `R$ ${valorTotal.toFixed(2)}`;

        if (cart.children.length === 1) {
            divCounterESoma.style.visibility = 'visible';
            productCart.appendChild(divCounterESoma);
        }
    })
}


// ----------- config dos itens no carrinho + config botao remover do carrinho ----------- //


function produtosNoCart(data) {

    let li = document.createElement("li");
    li.classList.add("inCartProduct");

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

    let removerProduto = document.createElement("button");
    removerProduto.classList.add("removerDoCarrinho");
    removerProduto.innerText = "Remover do carrinho";


    li.appendChild(figure);
    li.appendChild(section);
    figure.appendChild(img);

    section.appendChild(carrinhoNome);
    section.appendChild(carrinhoPreco);
    section.appendChild(removerProduto);

    cart.appendChild(li);

    removerProduto.addEventListener("click", function (e) {

        let li = document.querySelector("body > main > div:nth-child(2) > div > ul > li");
        e.li
        console.log(li);

        quantidadeItens--;
        valorTotal -= data.value;

        qtd.innerText = quantidadeItens;
        total.innerText = `R$ ${valorTotal.toFixed(2)}`;

        li.remove();

        if (cart.children.length === 0) {
            cart.appendChild(carrinhoVazio);
            divCounterESoma.remove(productCart);
        }
    })
}


