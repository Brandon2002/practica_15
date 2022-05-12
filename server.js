const express= require('express') //Inyección de la dependencia
let app = express();
let PORT = process.env.PORT || 3000; //Puerto donde el servidor va a "escuchar" la petición
app.use('/assets', express.static(__dirname + '/public')); //contenido estático

app.use(express.urlencoded({ extended: false })); 

app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.send(`<!DOCTYPE html> <html lang="en"> <head><link rel="stylesheet" href="/assets/style.css">
    <title> Document</title> </head>
    <body> <h1>Hola mundo<h1>
    <p> Este es un párrafo y su contenido debe ser azul</p></body> </html>`)
});

app.get('/person/:id', (req, res) => {
    res.render('person', {ID: req.params.id, Qstr: req.query.qrst});
});

app.get('/student', (req, res) => { //Vista student en donde se muestran los valores, a manera de html, que se enviaron desde el server 
    res.render('index'); //Renderiza index
});

app.post('/student', (req, res) => { //Vista student en donde se obtendrán los valores y se enviarán al index para guardarlos
res.send(`First Name es: ${req.body.fname} <br> Last Name es: ${req.body.lname}`); //Estructura de como se enviarán los valores
});

app.post('/personjson', express.json({type: '*/*'}), (req, res) => { //Al iniciar student en el servidor, en conjunto, en la consola se imprimen los valores.
    console.log('El objeto contiene:', (req.body));
    console.log('Nombre:', (req.body.firstname));   //Lo que se imprimirá en la consola.
    console.log('Apellido:', (req.body.lastname));
    });



app.listen(PORT);