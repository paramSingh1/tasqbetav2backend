import express from "express";
import config from 'config';
import cors from 'cors';
import './dbConnect.js';
//Import UserRouter
import userRouter from './controllers/user/index.js';
import loginRouter from './controllers/auth/index.js';
import todosRouter from './controllers/todos/index.js';
import profileRouter from './controllers/profile/index.js';
import adminRouter from "./controllers/admin/index.js";
const app = express();
const PORT = process.env.PORT || config.get("port").localhost;

app.use(express.json()); //bodyParser
app.use(cors()); //CORS

// console.log(process.argv); //To acceept command line arguments
// console.log(process.env); To access environment variables

app.get('/', (req, res) => {
    res.send("<h1>TasQForce Beta Channel</h1>");
});
app.use('/api/user', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/user/todos', todosRouter);
app.use("/api/user/profile", profileRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

