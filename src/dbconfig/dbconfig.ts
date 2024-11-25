import mongoose from "mongoose";

export async function connect() {
    try {
        console.log('Connecting to database...');
        console.log('MONGO_URL:', process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Database connected');
        } );

        connection.on('error', (err) => {
            console.log('Error connecting to database', err);
            process.exit(1);
        } );
    } catch (error) {
        console.log('Error connecting to database', error);
    }
}