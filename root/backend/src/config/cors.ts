import { CorsOptions } from "cors";
import { env } from "./env";

const corsConfig: CorsOptions = {
    origin: (origin, callback) => {

        // Allow request with no origin
        if(!origin) return callback(null, true);

        // Check if request's origin is in the whitelist
        if(env.ALLOWED_ORIGINS.includes(origin)){
            return callback(null, true)
        }

        // Log blocked origins for debugging 
        console.warn(`CORS blocked origin: ${origin}`);

        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Accept'
    ],
    maxAge: 3600*24,
    optionsSuccessStatus: 200,

}

export default corsConfig;