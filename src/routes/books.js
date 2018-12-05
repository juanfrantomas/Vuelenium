const express = require("express");
const router = express.Router();

//const Amazon = require("../helpers/booksearchamazon");
//const Corte = require("../helpers/booksearchcorte");

router.get("/",async (req, res)=>{
    res.send("API Books Selenium By Juanfran and Sergio with (L) Javascript Code ");
})

router.post("/", async(req, res)=>{
    let titulo = req.body.title;
    let autor = req.body.autor;
    let checkAma = req.body.checkAma;
    let checkCorte = req.body.checkCorte;
    
    let books = [
        {
            title:"Harry Potter y La pieda filosofal",
            autor: "Pepe piscinas",
            precio: "20",
            tienda: "Amazon"
        },
        {
            title:"La vida de Larry Wints",
            autor: "Pepe Casas",
            precio: "40",
            tienda: "Fnac"
        }
    ];
    res.json(books);
})

module.exports = router;