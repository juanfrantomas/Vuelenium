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
    let checkCorte = req.body.corte;

    if(fnac == true) {
        let auxbooks = await Fnac(titulo);
        auxbooks = JSON.parse(auxbooks);
        for(book of auxbooks){
            books.push(book);
        }
    }
    res.json(books);
})

module.exports = router;