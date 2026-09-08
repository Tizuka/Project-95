const express = require('express');
const app = express();

const machineRoutes = require('./1-routes/machine.routes');
const experimentRoutes = require('./1-routes/experiment.routes')
const experimentRunRoutes = require('./1-routes/experiment.run.routes')
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
}));

mongoose.connect('mongodb://127.0.0.1:27017/classified')
    .then(() => console.log('MongoDBConnected!'));
app.use(express.json());
app.use('/machines', machineRoutes);
app.use('/experiments', experimentRoutes);

app.use('/experimentRun', experimentRunRoutes);

app.listen(3000, () => {
    console.log('Example app listening on port http://localhost:3000');
});