// Main Code

const connectToMongo = require('./db')
const express = require('express')
connectToMongo();
const cors = require('cors');
const app = express()
const port = 5000
app.use(cors());

// MiddleWare 
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

