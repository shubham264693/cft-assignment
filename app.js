const express = require('express');
const app = express();
const db = require('./config/dbConnection');
const User = require('./models/users');
const indexRouter = require('./routes/index');
const http = require('http');
const rateLimiter = require('./middleware/rateLimit');
const { initSocket } = require('./socket');

app.use(express.json());
app.use('/api', indexRouter);

app.get('/healthCheck',(req,res)=>{
    return res.status(200).json({ message : 'Health Check Ok!'})
})

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 4000;

db.sync({ force : false }).then(()=>{
    console.log('Database Connected Successfully');
    server.listen(PORT,()=>{
        console.log(`Server listening on port ${PORT}`);
    });
}).catch((err)=>{
    console.log('Database Connection Failed', err);
});