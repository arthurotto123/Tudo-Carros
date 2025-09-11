import mongoose from 'mongoose';

const CarroSchema = mongoose.Schema({
    vin: { type: String, unique: true },

    // geral 
    image1: String,
    image2: String,
    image3: String,
    image4: String,
    make: String,
    model: String,
    version: String,
    year: Number,
    price: String,
    insurance: String,
    maintenance: String,
    body_work: String,
    impost: String,
    origin: String,

    // Power train


    // enginer 

    engine: String,
    fuel_type: String,
    horsepower: Number,
    torque: String,
    engine_code: String,
    engine_install: String,
    engine_aspiration: String,
    cilinder: Number,

    //transmition 

     transmission: Number,
     traction: String,
     trasmission_type: String,


     // Suspencion

     front_susp: String,
     back_susp: String,


     // Brecks

     front_breck: String,
     back_breck: String,

     // Tires

     front_tires: String,
     back_tires: String,


     // Dimensions

     length: Number,
     with: Number,
     heigth: Number,
     weigth: Number,


     // Performance

     aceleration: String,
     max_speed: String,
    
   
    


    
});

export default mongoose.models.Carro || mongoose.model("Carro", CarroSchema);