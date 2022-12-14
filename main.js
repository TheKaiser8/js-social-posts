"use strict";

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Descrizione
// Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

// BONUS
// 1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo gi?? cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

const postsLiked = [];

/*------------------
    FUNCTIONS
--------------------*/
// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
function onClickLikeButton(event) {
    // per eliminare il comportamento di default del re-indirizzamento al click del pulsante "Mi piace"
    event.preventDefault();
    // creo variabile per ricavare ID del post
    const postID = this.getAttribute('data-postid');
    console.log(postID);
    // creo variabile dei like al post utilizzando l'ID del post su cui effettuo l'evento click
    const postLikes = document.querySelector(`#like-counter-${postID}`);
    if( !this.classList.contains('like-button--liked') ) {
        this.classList.add('like-button--liked');
        postLikes.innerHTML = Number(postLikes.innerHTML) + 1;
        postsLiked.push(postID);
    } else {
        this.classList.remove('like-button--liked');
        postLikes.innerHTML = Number(postLikes.innerHTML) - 1;
    }
    console.log(postsLiked);
};

// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.
// seleziono il container dei posts creando una variabile
const postsContainer = document.querySelector('.posts-list');

// creo un ciclo FOR per ciclare tutti gli OBJECTS dell'ARRAY
for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(post);
    const postItem = document.getElementById('template-post').content.cloneNode(true);
    // stampo immagine profilo (author.image)
    if( post.author.image) {
        postItem.querySelector('.profile-pic').setAttribute("src", post.author.image);
        postItem.querySelector('.profile-pic').setAttribute("alt", post.author.name);
    } else {
        postItem.querySelector('.profile-pic').remove();
    }
    // stampo nome autore (author.name)
    postItem.querySelector('.post-meta__author').innerHTML = post.author.name;
    // stampo data post (created)
    postItem.querySelector('.post-meta__time').innerHTML = post.created;
    // stampa contenuto post (content) anche se sono tutti uguali perch?? in futuro potrebbero cambiare
    postItem.querySelector('.post__text').innerHTML = post.content;
    // stampo immagine post (media)
    postItem.querySelector('.post__image img').setAttribute("src", post.media);
    // imposto pulsante "Mi piace"
    postItem.querySelector('.js-like-button').addEventListener('click', onClickLikeButton);
    postItem.querySelector('.js-like-button').setAttribute('data-postid', post.id);
    // stampo numero di like (likes)
    postItem.querySelector('.js-likes-counter').innerHTML = post.likes;
    postItem.querySelector('.js-likes-counter').id = `like-counter-${post.id}`;
    // appendo tutti i post in HTML
    postsContainer.append(postItem);
};