import express from 'express'
import cors from 'cors'
import corsConfig from './config/cors';
import helmet from 'helmet';
import UserRouter from './router/user.router';


const app = express();



app.get('/', (req, res) => {
    res.send('Server is running')
})

// Middleware
app.use(helmet())
app.use(cors(corsConfig))
app.use(express.json())




// Import routes
app.use('/api/v1', UserRouter) 

// Import middlewares error handler

// import 





export default app;