import 'dotenv/config'


import app from './src/app';
import { env } from '@/config/env';
import { connectDB } from '@/config/db';



// Connect to MongoDb;
connectDB();

// Start server
const server = app.listen(env.PORT, () => {
	console.log(
		`Server is running in ${env.NODE_ENV} mode on port ${env.PORT}`
	);
});




export default server;
