import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import {MainRoutes} from './routes.js';

// const mainRouter = require('./routes.js');
const app = express();
const PORT = process.env.PORT || 3000;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+"."+file.mimetype.split('/')[1];
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })
// const upload = multer({ storage: storage })

// Use CORS middleware
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || ['http://localhost:3000', 'http://localhost:5500'].includes(origin)) {
            callback(null, true);
        } else {
            console.log(chalk.bgRed(`Request from origin ${origin} blocked by CORS`));
            // Continue processing the request without setting headers
            callback(null, false);
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type',
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());


// Middleware for logging request time
app.use((req, res, next) => {
    console.log(chalk.red("Request [" + req.method + "] :"), chalk.yellow(new Date()));
    console.log(chalk.red('User Agent:'), chalk.yellow(req.get('user-agent')));
    next();
});


app.use(express.static('public'));
app.get('/', function (req, res) {
    res.send("Well come to library mangement Sytem");
});

app.use("/",MainRoutes);

// app.post('/upload', upload.single('video'), async (req, res) => {
//     try {
//         const file = req.file;

//         if (!file) {
//             return res.status(400).json({ error: 'No file uploaded' });
//         }
//         console.log(file)
//         // // Use the original filename
//         // const newPath = path.join("", 'uploads', file.originalname);

//         // // Move the file to the new path
//         // await fs.promises.rename(file.path, newPath);

//         res.status(200).json({ message: 'File uploaded successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Error uploading file' });
//     }
// })

// Start the server
app.listen(PORT, () => {
    console.log(chalk.green('Server listening on PORT'), chalk.cyan(PORT));
});
