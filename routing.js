const http = require('node:http');

const PoterJSON = require('./JSON/harryPotter.json')
const PokemonJSON = require('./JSON/pokemonDitto.json');
const datosJSON = { "name": "John", "age": 31, "city": "New York"};

const processRequest = (req, res) => {
    const {method, url} = req;
    
    switch(method){
        case 'GET':
            switch(url){
                case '/harryPotter':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    res.end(JSON.stringify(PoterJSON));
                    break;

                case '/pokemon':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    res.end(JSON.stringify(PokemonJSON));                
                    break;
   
                case '/datos':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');                    
                    res.end(JSON.stringify(datosJSON));
                    break;

                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end('<h1>Not Found</h1>');
            }
            break; // 🚀 SOLUCIÓN: Evita que siga ejecutando código del 'POST'

        case 'POST':
            switch(url){
                case '/datos': {
                    let body = '';
                    
                    req.on('data', chunk => {
                        body += chunk.toString();
                    });

                    req.on('end', () => {
                        const data = JSON.parse(body);
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});   
                        data.timestamp = Date.now();                     
                        res.end(JSON.stringify(data));
                    });
                    break;
                }
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end('404 Not Found');        
            }
            break; // 🚀 SOLUCIÓN: Evita que continúe ejecutando más código
    }   
}

const server = http.createServer(processRequest);

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
