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
    let checkAma = req.body.fnac;
    let checkCorte = req.body.corte; 
    
    let books = [
        {
            titulo:"Harry Potter y La pieda filosofal",
            autor: "Pepe piscinas",
            precio: "20",
            tienda: "Amazon"
        },
        {
            titulo:"La vida de Larry Wints",
            autor: "Pepe Casas",
            precio: "40",
            precioreducido: "20",
            descuento: "50",
            tienda: "Fnac"
        }
    ];
    res.json(books);
})

module.exports = router;