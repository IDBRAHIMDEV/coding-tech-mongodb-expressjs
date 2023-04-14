const server = require('./app')
require("./config/db");

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`App running on ${port} Port ...`)
})