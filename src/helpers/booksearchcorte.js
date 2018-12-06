var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var {discountPrice, cleanPrice} = require('./cleanDiscount');

const Book = require("../models/Book");

let books = [];

async function Corte (searching) {
    let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

    try {
        driver.get('https://www.elcorteingles.es/libros/libros-de-texto/');
    
        var search = await driver.findElement(By.id('search-box'));
    
        await search.sendKeys(searching);
        
        var btsubmit = await driver.findElement(By.id('site-search-form'));
    
        await btsubmit.submit();
    
        var articulos = await driver.findElements(By.className("product-preview"));
    
        for(let articulo of articulos) {
            let productname = await articulo.findElement(By.className("product-name"));

            let atitulo = await articulo.findElement(By.className("js-product-click"));
            let hautor = await productname.findElement(By.className("c12"));

            let productprice = await articulo.findElement(By.className("product-price"));

            let aprecio = await productprice.findElement(By.className("current"));
            let ifaoldprecio;
            try{
                ifaoldprecio = await articulo.findElements(By.className("stroked"));
            }catch (NoSuchElementException){
                ifaoldprecio = false;
            }
            let oldprecio;
            let descount;
            let precio = await aprecio.getText();
            let titulo = await atitulo.getText();
            let autor = await hautor.getText();
            if(ifaoldprecio.length>0) {
                oldprecio = await ifaoldprecio[0].getText();
                descount = (100-((parseFloat(precio)*100)/parseFloat(oldprecio))).toFixed(2);;
                //console.log(titulo + " " + autor+" "+precio+" oldprice "+ oldprecio + " con un descuento de "+descount+"%");
                let book = new Book(titulo, autor, oldprecio, precio, descount, "El Corte Ingles");
                books.push(book);
            } else {
                //console.log(titulo + " " + autor+" "+precio);
                let book = new Book(titulo, autor, precio, null, null, "El Corte Ingles");
                books.push(book);

            }
        }
    } finally {
        await driver.quit();
    }    

    return books;
}

module.exports = Corte;