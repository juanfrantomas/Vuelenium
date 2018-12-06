exports.discountPrice = function (oldprecio,precio){
    return (100-((precio*100)/oldprecio)).toFixed(2);
}

exports.cleanPrice = function (precio){
    precio = precio.toString().replace(" ","");
    precio = precio.toString().replace("€","");
    precio = precio.toString().replace(",",".")
    precio = parseFloat(precio);
    return precio;
}
