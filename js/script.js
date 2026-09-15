//  DARK MODE
const botaoTema = document.querySelector('#btnModo');
const body = document.querySelector('body');
// ALTERAR ÍCONE DO BOTÃO 'ALTERAR TEMA'
const iconeTema = document.querySelector('#btnModo i');
//PEGANDO O VALOR DO LOCALSTORAGE
const temaSalvo = localStorage.getItem('tema');

if(temaSalvo === 'escuro'){
    body.classList.add('dark-mode');

    iconeTema.classList.remove('bi-moon');
    iconeTema.classList.add('bi-sun');
}

// EVENTO PARA ALTERAR O TEMA
botaoTema.addEventListener('click', function(){
    const modoEscuroAtivo = body.classList.toggle('dark-mode');

    //CONDICIONAL PARA ALTERAR O ÍCONE
    if(modoEscuroAtivo){
        iconeTema.classList.add('bi-sun');
        iconeTema.classList.remove('bi-moon');

        //GUARDANDO A INFORMAÇÃO DO TEMA: ESCURO
        localStorage.setItem('tema' , 'escuro');
    }else{
        iconeTema.classList.remove('bi-sun');
        iconeTema.classList.add('bi-moon');

        //GUARDANDO A INFORMAÇÃO DO TEMA: CLARO
        localStorage.setItem('tema', 'claro');
    }
});

//  RESPONSIVIDADE -- BOTÃO MENU MOBILE --
const btnMenu = document.querySelector('#btnMenu');
const menu = document.querySelector('.menu');

btnMenu.addEventListener('click', function(){
    menu.classList.toggle('ativo');
});

const linksMenu = document.querySelectorAll('.menu a');
linksMenu.forEach(function(link){
    link.addEventListener('click', function(){
        menu.classList.remove('ativo');
    });
});

const cards = document.querySelectorAll('.criatura-card');

cards.forEach(card => {
    card.addEventListener('click', ()=>{
        const conteudo = card.querySelector('.criatura-conteudo');
        conteudo.classList.toggle('aberto');
    });
});

const cardsPerson = document.querySelectorAll('.personagem-card');

cardsPerson.forEach(card => {
    card.addEventListener('click', ()=> {
        const conteudo = card.querySelector('.personagem-conteudo');
        conteudo.classList.toggle('aberto');
    });
});

const cardsDeuses = document.querySelectorAll('.deuses-card');
cardsDeuses.forEach(card => {
    card.addEventListener('click', ()=>{
        const conteudo = card.querySelector('.deuses-conteudo');
        conteudo.classList.toggle('aberto');
    })
});