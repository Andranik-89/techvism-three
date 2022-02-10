const express = require('express');
const cors = require('cors');
const router = express.Router();
const app = express();

// constants
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI || 'mongodb+srv://andranik:suka@cluster0.u8utw.mongodb.net/THREE_DB?retryWrites=true&w=majority';

// db
const connectDB = require('./db/connect');

// routes
const index = require('./routes/index');

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(cors());
app.use(express.json());

app.use('/api/v1', index(router));
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(MONGO_URL);
        app.listen(PORT, () => { console.log(`listening on Port ${PORT}`) })
    } catch (error) {
        console.log('error: ', error);
    }
}

start();