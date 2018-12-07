var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const Book = require("../models/Book");
var cleanDiscount = require("./cleanDiscount");

let books = [];
let result = [];

let driver; 
async function Fnac (searching) {
        
    
    try {
        driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

        driver.get('https://www.fnac.es/');
        
        var select_category = await driver.findElement(By.className("Header__aisle-list"));
        await select_category.click();
        
        var categories = await driver.findElements(By.className("select-option"));
    
        await categories[1].click();
    
        var search = await driver.findElement(By.name('Search'));
    
        await search.sendKeys(searching);
        
        var btsubmit = await driver.findElement(By.id('QuickSearchForm'));
    
        await btsubmit.submit();
    
        var articulos = await driver.findElements(By.className("Article-item"));
    
        for(let articulo of articulos) {
            let atitulo = await articulo.findElement(By.className("js-minifa-title"));
            let aautor = await articulo.findElement(By.className("Article-descSub"));
            let hautor = await aautor.findElements(By.tagName("a"));
            (hautor.length>0) ? hautor = await aautor.findElement(By.tagName("a")) : hautor = '';
            let aprecio = await articulo.findElement(By.className("userPrice"));
            let ifaoldprecio;
            try{
                ifaoldprecio = await articulo.findElements(By.className("oldPrice"));
            }catch (NoSuchElementException){
                ifaoldprecio = false;
            }
            let oldprecio;
            let descount;
            let precio = await aprecio.getText();
            let titulo = await atitulo.getText();
            let autor;
            (!hautor)? autor = "Sin autor asignado": autor = await hautor.getText();
            if(ifaoldprecio.length>0) {
                let aoldprecio = await articulo.findElements(By.className("oldPrice"));    
                oldprecio = await aoldprecio[0].getText();
                precio = await cleanDiscount.cleanPrice(precio);
                oldprecio = await cleanDiscount.cleanPrice(oldprecio);
                descount = await cleanDiscount.discountPrice(oldprecio,precio);
                //console.log(titulo + " " + autor+" "+precio+" oldprice "+ oldprecio + " con un descuento de "+descount+"%");
                let book = new Book(titulo, autor, oldprecio, precio, descount, "Fnac");
                books.push(book);
            } else {
                //console.log(titulo + " " + autor+" "+precio);
                precio = await cleanDiscount.cleanPrice(precio);
                let book = new Book(titulo, autor, precio, null, null,"Fnac");
                books.push(book);
            }
        }
    } finally {
        await driver.quit();
    }
    result = books;
    books = [];
    return JSON.stringify(result);    
}

module.exports = Fnac;