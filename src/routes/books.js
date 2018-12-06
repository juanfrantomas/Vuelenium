const express = require("express");
const router = express.Router();

const Fnac = require("../helpers/booksearchfnac");
const Corte = require("../helpers/booksearchcorte");

router.get("/",async (req, res)=>{
    res.send("API Books Selenium By Juanfran and Sergio with (L) Javascript Code ");
})

router.post("/", async(req, res)=>{
    let books = [];
    
    let titulo = req.body.title;
    let autor = req.body.autor;
    let fnac = req.body.fnac;
    let corte = req.body.corte;

    //Busqueda con o sin autor, con o sin titulo
    let busqueda = '';
    if(titulo && autor) busqueda = titulo+" "+autor;
    else if (titulo && !autor) busqueda = titulo;
    else busqueda = autor;

    if(fnac == true) {
        let auxbooks = await Fnac(busqueda);
        auxbooks = JSON.parse(auxbooks);
        for(book of auxbooks){
            books.push(book);
        }
    }
    if(corte == true) {
        let auxbooks = await Corte(busqueda);
        auxbooks = JSON.parse(auxbooks);
        for(book of auxbooks){
            books.push(book);
        }
    }
    res.json(books);
})

module.exports = router;