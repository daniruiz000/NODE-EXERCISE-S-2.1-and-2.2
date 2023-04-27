// Importamos express
const express = require("express");

// Importamos el bookRouter
const { bookRouter } = require("./routes/book.routes"); //  LO IMPORTAMOS COMO UN OBJETO
// Conexión a la base de datos
const { connect } = require("./db.js"); // Importamos el archivo de conexión a la BBDD
connect(); //  Conectamos con la BBDD

//  Configuración del server
const PORT = 3000; //  Definimos el puerto
const server = express();
server.use(express.json()); // Sepa interpretar los JSON
server.use(express.urlencoded({ extended: false })); //  Sepa interpretar bien los parametros de las rutas

//  Rutas
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Esta es la Home de nuestra API");
});
// Para que todas las peticiones que no se correspondan con nuestras rutas den un codigo 404 y manden un mensaje de error.
router.get("*", (req, res) => {
  res.status(404).send("Lo sentimos :( No hemos encontrado la página requerida.");
});

//  Usamos las rutas (el orden es importante más restrictivos a menos)
server.use("/book", bookRouter); //  Le decimos al server que utilice el bookRouter importado para gestionar las rutas que tengan "/book"
server.use("/", router); //  Decimos al server que utilice el router en la raíz

//  Levantamos el server en el puerto indicado
server.listen(PORT, () => {
  console.log(`Server levantado en puerto ${PORT}`);
});