<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand mx-auto"><img src="img/logo.png" width="100px"/></a>
        </nav>
        <div class="row m-4">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Busqueda de libros</h4>
                        <div v-if="this.validation.length>0" class="alert alert-danger" role="alert">
                            <ul>
                                <li v-for="(vali, key) in this.validation" :key=key>{{vali}}</li>
                            </ul>
                        </div>
                        <form action="/books" @submit.prevent="searchBook">
                            <div class="md-form">
                                <i class="fa fa-book prefix grey-text"></i>
                                <input type="text" v-model="search.title" id="tituloInput" class="form-control" name="titulo">
                                <label for="tituloInput" class="font-weight-light">Titulo del libro</label>
                            </div>
                            <div class="md-form mt-3">
                                <i class="fa fa-user prefix grey-text"></i>
                                <input type="text" v-model="search.autor" id="autorInput" class="form-control" name="autor">
                                <label for="autorInput" class="font-weight-light">Autor del libro</label>
                            </div>
                            <div class="md-for">
                                <i class="fas fa-store prefix grey-text"></i>
                                <h6 class="ml-2 grey-text d-inline">Seleccione tiendas</h6>
                            </div>
                            <div class="md-for mt-3">
                                <div class="funkyradio-default">
                                    <input type="checkbox" v-model="search.fnac" name="checkbox" id="fnac"/>
                                    <label for="fnac"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Fnac_Logo.svg/499px-Fnac_Logo.svg.png" width="100px" /></label>
                                </div>
                                <div class="funkyradio-primary">
                                    <input type="checkbox" v-model="search.corte" name="checkbox" id="corte"/>
                                    <label for="corte"><img src="https://upload.wikimedia.org/wikipedia/commons/0/02/Logo_Corte_Ingl%C3%A9s.svg" width="100px" /></label>
                                </div>
                            </div>
                            <div class="text-center py-4 mt-3">
                                <button v-if="!this.spinner" class="btn btn-green" type="submit">Buscar</button>
                                <div v-if="this.spinner" class="loader border-top-success mx-auto"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col" class="filtros" v-on:click="filter('titulo')">Titulo <i class="fas fa-arrows-alt-v grey-text"></i></th>
                    <th scope="col" class="filtros" v-on:click="filter('autor')">Autor <i class="fas fa-arrows-alt-v grey-text"></i></th>
                    <th scope="col" class="filtros" v-on:click="filter('precio')">Precio <i class="fas fa-arrows-alt-v grey-text"></i></th>
                    <th scope="col" class="filtros" v-on:click="filter('precioreducido')">Oferta <i class="fas fa-arrows-alt-v grey-text"></i></th>
                    <th scope="col" class="filtros" v-on:click="filter('descuento')">Descuento <i class="fas fa-arrows-alt-v grey-text"></i></th>
                    <th scope="col" class="filtros" v-on:click="filter('tienda')">Tienda <i class="fas fa-arrows-alt-v grey-text"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(libro,key) in this.books" :key=key>
                        <th class="font-weight-bold text-truncate">{{libro.titulo}}</th>
                        <th class="font-italic">{{libro.autor}}</th>
                        <th v-bind:class="[(libro.precioreducido) ? 'tachado' : '']">{{libro.precio}}€</th>
                        <th class="green-text font-weight-bold large">{{(libro.precioreducido)?libro.precioreducido+"€":""}}</th>
                        <th><small>{{(libro.descuento && libro.descuento.toString() != "NaN")?"-"+libro.descuento+"%":""}}</small></th>
                        <th>{{libro.tienda}}</th>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                search: {
                    title: '',
                    autor: '',
                    fnac: '',
                    corte: '',
                    sortOrder: -1
                },
                validation: [],
                books: [],
                spinner: false
            }
        },
        methods:{
            searchBook() {
                this.validation = [];
                this.books = [];
                if(!this.search.title && !this.search.autor){
                    this.validation.push("Introduce un titulo o un autor");
                }
                if(!this.search.fnac && !this.search.corte){
                    this.validation.push("Selecciona una o dos tiendas");
                }
                if(this.validation.length == 0){
                    this.spinner = true;
                    fetch("/books", {
                        method: "POST",
                        body: JSON.stringify(this.search),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res=>res.json()) //Lo recibimos y lo convertimos a json
                    .then(data =>{
                        if(data.length > 0){
                            this.books = data;
                        }else{
                            this.validation.push("No se han encontrado libros");
                        }
                        this.spinner = false;
                    })
                    .catch(err => {
                        this.validation.push(err);
                    }); //Una vez convertido lo mostramos por pantalla
                }
            },
            filter(filtro){
                (this.sortOrder == 1)? this.sortOrder = -1 : this.sortOrder = 1;
                return this.books.sort((a,b)=>{
                    if (!a[filtro]) a[filtro] = 0;
                    if (!b[filtro]) b[filtro] = 0;
                    
                    (isNaN(parseFloat(a[filtro].toString().replace(",","."))))? a[filtro]=a[filtro] :a[filtro]=parseFloat(a[filtro].toString().replace(",","."));        
                    (isNaN(parseFloat(b[filtro].toString().replace(",","."))))? b[filtro]=b[filtro] :b[filtro]=parseFloat(b[filtro].toString().replace(",","."));
                    var result = (a[filtro] < b[filtro]) ? -1 : (a[filtro] > b[filtro]) ? 1 : 0;
                    return result * this.sortOrder;
                });
            }
        },
        mounted() {
            //Ejecutar una vez creado el componente TEST Books Front-end
/*             let book = {
                titulo: "Libro de Juanfra",
                autor: "Juanfran",
                precio: "20",
                precioreducido: "18",
                descuento: "20",
                tienda: "Fnac"
            }
            this.books.push(book);

            book = {
                titulo: "Libro de Jorge",
                autor: "Jorge",
                precio: "50",
                precioreducido: "30",
                descuento: "12",
                tienda: "Amazon"
            }
            this.books.push(book);
        
            book = {
                titulo: "Libro de Jorge",
                autor: "Jorge",
                precio: "5",
                precioreducido: "30",
                descuento: "12",
                tienda: "Amazon"
            }
            this.books.push(book);
                        book = {
                titulo: "Libro de petete",
                autor: "petete",
                precio: "510000",
                precioreducido: "30",
                descuento: "12",
                tienda: "Amazon"
            }
            this.books.push(book);
 */
        
        }
    }
</script>



