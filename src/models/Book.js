function Book (titulo, autor, precio, precioreducido, descuento, tienda) {
    this.titulo = titulo;
    this.autor = autor;
    this.precio = precio;
    this.precioreducido = precioreducido;
    this.descuento = descuento;
    this.tienda = tienda;
}

module.exports = Book;