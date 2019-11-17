const http = require('http')

const url =  require('url')

function handler(req, res) {
    // true => also pass the query string
    const parsedUrl =  url.parse(req.url, true);
    console.log(parsedUrl.pathname);
    
    res.setHeader('x-server-date', new Date());
    console.log(res.getHeaders())

    // defining routes 
    if (parsedUrl.pathname === '/') {
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write('Hello, this is from pure server of Node.js');
        return res.end();
    } 
    else if (parsedUrl.pathname === '/time') {
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write(new Date().toString())
        return res.end();
    }
    else if (parsedUrl.pathname === '/hello') {
        const name = parsedUrl.query.name;
        if (!name) {
            res.writeHead(400, {'Content-type': 'text/plain'});
            return res.end('Bad request');
        }
        res.writeHead(200, {'Content-type': 'text/plain'});
        res.write(`Hello ${name}`)
        return res.end();
    }
    else if (parsedUrl.pathname.startsWith('/user/')) {
        const regex = new RegExp('\/user\/(.+)');
        const matches = regex.exec(parsedUrl.pathname)
        if (!matches || !matches[1]) {
            res.writeHead(400, {'Content-type': 'text/plain'});
            return res.end('Bad request');
        }
        res.writeHead(200, {'Content-type': 'text/plain'});
        // matches = [ {/user/<username>}, {<username>}]
        res.write(`User profile of ${matches[1]}`)
        return res.end();
    }
    else {
        res.writeHead(404);
        return res.end('Not Found');
    }

}

const server = http.createServer(handler);

server.listen(3000);