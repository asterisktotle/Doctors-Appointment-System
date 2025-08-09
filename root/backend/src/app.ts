import express from 'express'
import cors from 'cors'
import corsConfig from './config/cors';
import helmet from 'helmet';


const app = express();



app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(helmet())
app.use(cors(corsConfig))




// Import routes
// app.use('/api/v1', routes ) 

// Import middlewares error handler

// import 





export default app;