exports.discountPrice = function (oldprecio,precio){
    return (100-((precio*100)/oldprecio)).toFixed(2);
}

exports.cleanPrice = function (precio){
    precio = precio.trim();
    precio = precio.replace("€","");
    precio = precio.replace(",",".")
    precio = parseFloat(precio);
    return precio;
}
