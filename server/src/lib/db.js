import mongoose from 'mongoose'

const connect_DB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log(`MongoDB Connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connect_DB;