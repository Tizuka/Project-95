const express = require('express');
const app = express();

const machineRoutes = require('./1-routes/machine.routes');
const experimentRoutes = require('./1-routes/experiment.routes')
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

mongoose.connect('mongodb://127.0.0.1:27017/classified')
    .then(() => console.log('MongoDBConnected!'));

app.use('/machines', machineRoutes);
app.use('/experiments', experimentRoutes);

app.listen(3000, () => {
    console.log('Example app listening on port http://localhost:3000');
});