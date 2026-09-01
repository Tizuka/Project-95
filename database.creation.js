import mongoose from 'mongoose';
import Machine from './4-models/machine.model.js';

async function seedMachines() {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/classified'
        );

        await Machine.deleteMany({});

        const machines = [
            {
                name: 'LAB-01',
                status: 'IDLE',
                experimentId: null
            },
            {
                name: 'LAB-02',
                status: 'IDLE',
                experimentId: null
            },
            {
                name: 'LAB-03',
                status: 'IDLE',
                experimentId: null
            },
            {
                name: 'LAB-04',
                status: 'IDLE',
                experimentId: null
            }
        ];

        await Machine.insertMany(machines);

        console.log('Machines recreated successfully!');

        await mongoose.connection.close();

    } catch (error) {
        console.error('Error:', error);
    }
}

seedMachines();