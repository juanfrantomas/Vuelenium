function Book (nombre, autor, precio, precioreducido, descuento, tienda) {
    this.nombre = nombre;
    this.autor = autor;
    this.precio = precio;
    this.precioreducido = precioreducido;
    this.descuento = descuento;
    this.tienda = tienda;
}

module.exports = Book;