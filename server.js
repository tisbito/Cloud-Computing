const http = require('node:http');
const {findAvailablePort } = require('./free-ports.js');
const {router} = require('./routing.js');

const puertoDeseado = 3000;

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (req.url === '/') {
    res.statusCode = 200;    
    res.end('Página principal\n');  
  };
  if (req.url === '/contacto') {
    res.statusCode = 200;
    res.end('Pagina de Contactos\n');
  }else {
    res.statusCode = 404;
    res.end('Página no encontrada - 404 -\n');
  }
}
const server = http.createServer(processRequest)

findAvailablePort (puertoDeseado).then((puerto => {
    server.listen(puerto, () => {
      console.log(`Server running at http://localhost:${puerto}/`);
    });
  })
).catch((error) => {
  console.error(error);
});
