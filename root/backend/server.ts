import { config } from 'dotenv';
config(); // Configure dotenv
import app from './src/app';

const PORT = process.env.PORT || 5001;

// Connect to MongoDb;

// Start server
const server = app.listen(PORT, () => {
	console.log(
		`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
	);
});



console.log('running server');

export default server;
