const express = require('express');
const morgan = require("morgan");
const app = express();

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares (Funciones para procesar antes de que lleguen las URL)
app.use(morgan("dev")); //Ver las peticiones de los clientes
app.use(express.json()); //Recibir informacion json y poder procesarla


// Routes
app.use("/books", require("./routes/books"));


// Static files
app.use(express.static(__dirname+"/public"));

// Server is listening
app.listen(app.get('port'), ()=>{
    console.log("Server on port", app.get("port"));
})