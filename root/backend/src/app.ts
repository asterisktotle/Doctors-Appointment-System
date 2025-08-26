import express from 'express'
import cors from 'cors'
import corsConfig from './config/cors';
import helmet from 'helmet';
import UserRouter from './router/user.router';
import PatientRouter from './router/patient.router';


const app = express();



app.get('/', (req, res) => {
    res.send('Server is running')
})

// Middleware
app.use(express.json())
app.use(helmet())
app.use(cors(corsConfig))




// Import routes
app.use('/api/user', UserRouter) 
app.use('/api/patient',PatientRouter)

// Import middlewares error handler

// import 





export default app;