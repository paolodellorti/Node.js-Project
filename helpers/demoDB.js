const { Report } = require('../models');

const createDemoDB = async () => {
    
    await Report.create({
        place: "Via di Torrenova, 60, 00133 Roma RM, Italia",
        pollution: "Waste",
        description: `Domestic waste are abandoned along the street,
                      very close to a natural park.`,
        user: "Marco",
        image: "1638146218464.jpeg",
    });

    await Report.create({
        place: "Molo Giano, 154-153, 16128 Genova GE, Italia",
        pollution: "Air",
        description: `Air Pollution coming from a big ferry
                      docked in Genova's port.`,
        user: "Paolo",
        image: "1638146232575.jpg",
    });
    
    await Report.create({
        place: "Via Porto Mercantile, 2, 74123 Taranto TA, Italia",
        pollution: "Water",
        description: `An oil leak from an industry causes 
                      an environmental disaster in Taranto's port.`,
        user: "Matteo",
        image: "1638144964476.jpg",
    });
    
    await Report.create({
        place: "Via Monte Napoleone, 20, 20121 Milano MI, Italia",
        pollution: "Air",
        description: `Air quality in Milano is getting worse 
                      due to smog and domestic heating.`,
        user: "Paolo",
        image: "1638146100241.jpg",
    });

    await Report.create({
        place: "Barberino Val D'elsa, 50021 Barberino Tavarnelle FI, Italia",
        pollution: "Chemicals",
        description: `Chemicals used in agriculture have led to a 
                      10% malformation rate in this small town.`,
        user: "Paolo"
    });
}

createDemoDB();