// now we are writing "hello_world" from the index.html by running it on the server via node app.js


const http = require('http')
const fs = require('fs')
const port = 3000

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('index.html', function(error, data) {
        if(error) {
            res.writeHead(404)
            res.write('Error: File not found')
        } else {
            res.write(data)
        }
        res.end()
    })

    // res.write("Hello World! This is my first assignment in the course.")
    // res.end()
})

server.listen(port, function (error) {
    if(error) {
        console.log('Something went wrong', error)
    } else {
        console.log("server is listening on port " + port)
    }
})