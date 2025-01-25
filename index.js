const http = require('http');
const fs = require('fs');
const path = require('path');
const riddles = require('./riddles');
let usedRiddles = [];
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (req.url === '/script.js') {
        fs.readFile(path.join(__dirname, 'script.js'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading script.js');
            }
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(data);
        });
    } else if (req.url === '/styles.css') {
        fs.readFile(path.join(__dirname, 'styles.css'), (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading styles.css');
            }
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.end(data);
        });
    } else if (req.url === '/riddle') {
        if (usedRiddles.length === riddles.length) {
            usedRiddles = [];
        }
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * riddles.length);
        } while (usedRiddles.includes(randomIndex));
        usedRiddles.push(randomIndex);

        const selectedRiddle = riddles[randomIndex];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(selectedRiddle));
    } else if (req.url.startsWith('/images/')) {
        fs.readFile(path.join(__dirname, req.url), (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('Image not found');
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        });
    } else {
        res.writeHead(404);
        res.end('Not found');
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
