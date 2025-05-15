const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const RedisClient = require('ioredis');

const client = new RedisClient({
    host : '127.0.0.1',
    port : 6379
});


client.on('err',(err)=>{
    console.log('Unable to connect redis',err);
})

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 5, 
	standardHeaders: true, 
	legacyHeaders: false,	
	store: new RedisStore({
		sendCommand: (...args) => client.call(...args),
	}),
    message: {
        msg : 'Too many request at time'
    }
})


module.exports = limiter;