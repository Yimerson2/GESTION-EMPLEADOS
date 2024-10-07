const express = require('express')
const morgan = require('morgan');
const cors = require('cors');
const app = express(); // la constante app tendra ahora todo el funcionamiento del servidor
const { mongoose } = require('./database'); // no se requiere todo el archivo sino la conexion 
/** * Se crea una API REST, es la manera de decirle al servidor que reciba y envie datos*/
//Configuraciones
app.set('port',process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json()); // metodo que ayuda a convertir el codigo para que el servidor pueda entender lo que viene del cliente.
app.use(cors({origin:'http://localhost:4200'})) // metodo para comunicarr con el cliente.
// Rutas de nuestro servidor
try {
    const empleadosRoutes = require('./routes/empleados.routes');
    console.log("Módulo empleados.routes cargado correctamente");
    app.use('/api/empleados', empleadosRoutes);
} catch (error) {
    console.error("Error cargando el módulo empleados.routes:", error);
}
// iniciando el servidor
app.listen(app.get('port'), () => {// esta es una manera de configurar el puerto
    console.log('server activo en el puerto', app.get('port'));
});