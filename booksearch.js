var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
async function main () {
    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();
    
    driver.get('https://www.fnac.es/');
    
    var select_category = driver.findElement(By.className("Header__aisle-list"));
    select_category.click();
    
    var categories = await driver.findElements(By.className("select-option"));

    categories[1].click();

    driver.findElement(By.name('Search')).sendKeys(process.argv[2]);
    
    driver.findElement(By.className('btSubmit')).click();
    
    driver.switchTo()
    driver.wait(mostrartitulo,1000);

}

function mostrartitulo () {
    let promise = driver.getTitle().then((title)=>{
        console.log(title);
    })
    return promise;
}

main();