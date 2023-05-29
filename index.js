const express = require("express");
const app = express();
const port = 1094;
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const user = 'santiavalo1';
const password = 'm17NEu5GXhfXtmFN';
const dbname = 'Albumes';
const uri = `mongodb+srv://${user}:${password}@cluster0.xxicmdg.mongodb.net/${dbname}?retryWrites=true&w=majority`;

const Album = require('./models/album');
const album = require("./models/album");

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Conectado');
    return(Album.findOne({nombreAlbum: {$regex: /Post\s*Mortem/i}}));
})
.then((album) => {
    app.get('/', (req, res) => {
        res.render('index', { album1: album });
    });
    console.log(album);
})

    .catch(err => console.log(err));

app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port);
});

let new_album = new album({
    artistas: ['Artista 1', 'Artista 2'],
    cantidadCanciones: '10',
    genero: 'Pop',
    duracion: '45 minutos',
    fechaLanzamiento: '2022-12-09',
    nombreAlbum: 'Mi álbum'
});

new_album.save();

res.render('index', {album1: new_album})