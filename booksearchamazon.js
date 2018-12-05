var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

    let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

async function main () {

    try {
        driver.get('https://www.fnac.es/');
        
        var select_category = await driver.findElement(By.className("Header__aisle-list"));
        await select_category.click();
        
        var categories = await driver.findElements(By.className("select-option"));
    
        await categories[1].click();
    
        var search = await driver.findElement(By.name('Search'));
    
        await search.sendKeys(process.argv[2]);
        
        var btsubmit = await driver.findElement(By.id('QuickSearchForm'));
    
        await btsubmit.submit();
    
        var articulos = await driver.findElements(By.className("Article-item"));
    
        for(let articulo of articulos) {
            let atitulo = await articulo.findElement(By.className("js-minifa-title"));
            let aautor = await articulo.findElement(By.className("Article-descSub"));
            let hautor = await aautor.findElement(By.tagName("a"));
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
            let autor = await hautor.getText();
            if(ifaoldprecio.length>0) {
                let aoldprecio = await articulo.findElements(By.className("oldPrice"));    
                oldprecio = await aoldprecio[0].getText();
                descount = (100-((parseFloat(precio)*100)/parseFloat(oldprecio))).toFixed(2);;
                console.log(titulo + " " + autor+" "+precio+" oldprice "+ oldprecio + " con un descuento de "+descount+"%");
            } else {
                console.log(titulo + " " + autor+" "+precio);
            }
        }
    } finally {
        await driver.quit();
    }    
}

main();