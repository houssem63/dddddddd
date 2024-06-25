// Import the Express module
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const cors = require("cors")
const pool = require('./db');
const helmet=require("helmet")
const userrouter = require("./routes/users")
const filerouter = require("./routes/files")
const authrouter = require("./routes/auth")
const file_typerouter = require("./routes/file_type")
const http = require('http');
require('dotenv').config()
const {handleSocketConnections}=require('./socket')
const app = express();
const server = http.createServer(app);
handleSocketConnections(server)
// Define the port number
const port = 3000;


app.use(express());
app.use(cors({ origin:'*' }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(express.json());

app.use(morgan('dev'));
app.use(express.static('public'));

// create application/x-www-form-urlencoded parser
app.use("/images", express.static(__dirname + '/' + 'images'))


// Define a route handler for the root path

app.use('/api/user', userrouter)
app.use('/api/file', filerouter)
app.use('/api/auth', authrouter)
app.use('/api/file_type', file_typerouter)


app.get('/',(req,res)=>{
  res.send('hi')
})





app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server and listen on the defined port
server.listen(port,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);   
});
