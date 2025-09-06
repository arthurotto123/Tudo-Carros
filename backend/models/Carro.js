import mongoose from 'mongoose';

const CarroSchema = mongoose.Schema({
    vin: { type: String, unique: true},
    make: String,
    model: String,
    year: Number,
    engine: String,
    transmission: String,
    fuel_type: String,
    horsepower: Number,
    torque: String,
    engine_code: String,
    image: String
    
});

export default mongoose.models.Carro || mongoose.model("Carro", CarroSchema);