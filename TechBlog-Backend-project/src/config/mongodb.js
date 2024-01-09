import mongoose from 'mongoose';
const uri = "mongodb+srv://hieptv:bhQXxPVI47CSWLG5@cluster0.oxwca.mongodb.net/?retryWrites=true&w=majority";

const mongodb_client = mongoose.connect(uri, { keepAlive: true, useNewUrlParser: true, useUnifiedTopology: true});

export default mongodb_client;