const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session')
const {createClient} = require("redis")
const RedisStore = require("connect-redis").default;

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const app = express();
const postRouter = require("./routes/postRoutes")
const userRouter = require("./routes/userRoutes")


const redisClient = createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
});
// Error handling for Redis client
redisClient.on('error', (err) => console.log('Redis Client Error', err));

// Connect to Redis
redisClient.connect().catch(console.error);


let redisStore = new RedisStore({
    client: redisClient
});

app.enable('trust proxy');
app.use(cors({}));
app.use(session({
    store: redisStore,
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30000
    }
}));

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
})

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

mongoose
    .connect(mongoUrl)
    .then(() => console.log('Connected to MongoDB'))
    .catch((e) => console.log(e))

app.get('/api/v1', (req, res) => {
    res.send("<h2>Hello World</h2>")
    console.log("Hello World")
})

app.use('/api/v1/post', postRouter)
app.use('/api/v1/user', userRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})