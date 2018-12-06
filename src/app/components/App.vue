<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand mx-auto"><img src="img/logo.png" width="100px"/></a>
        </nav>
        <div class="row m-5">
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
                                <button class="btn btn-green" type="submit">Buscar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Titulo</th>
                    <th scope="col">Autor</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Oferta</th>
                    <th scope="col">Descuento</th>
                    <th scope="col">Tienda</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(libro,key) in this.books" :key=key>
                        <th class="font-weight-bold text-truncate">{{libro.titulo}}</th>
                        <th class="font-italic">{{libro.autor}}</th>
                        <th v-bind:class="[(libro.precioreducido) ? 'tachado' : '']">{{libro.precio}}€</th>
                        <th class="green-text font-weight-bold large">{{(libro.precioreducido)?libro.precioreducido+"€":""}}</th>
                        <th><small>{{(libro.descuento)?"-"+libro.descuento+"%":""}}</small></th>
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
                    corte: ''
                },
                validation: [],
                books: []
            }
        },
        methods:{
            searchBook() {
                this.validation = [];
                if(!this.search.title && !this.search.autor){
                    this.validation.push("Introduce un titulo o un autor");
                }
                if(!this.search.fnac && !this.search.corte){
                    this.validation.push("Selecciona una o dos tiendas");
                }
                if(this.validation.length == 0){
                    console.log(this.search);
                    fetch("/books", {
                        method: "POST",
                        body: JSON.stringify(this.search),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json()) //Lo recibimos y lo convertimos a json
                    .then(data => this.books = data); //Una vez convertido lo mostramos por pantalla
                }
            },
            created() {
                //Ejecutar una vez creado el componente
            }
        }
    }
</script>



