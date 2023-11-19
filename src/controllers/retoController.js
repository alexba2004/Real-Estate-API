import Property from "../models/property.js";
import User from "../models/user.js";

const findAll = async (req, res) => {
    const properties = await Property.findAll({ where: {} });
    res.json(properties);
    console.log("Obteniendo todos los registros en la bd de la tabla de propiedades");
};

const insertOne = async (req, res) => {
    const { title, description, rooms, parkingLot, wc, userID } = req.body;
    console.log(`El título es ${title}`);
    console.log(`La descripción es ${description}`);
    console.log(`El número de habitaciones es ${rooms}`);
    console.log(`El número de plazas de aparcamiento es ${parkingLot}`);
    console.log(`El número de baños es ${wc}`);
    console.log(`El ID del usuario es ${userID}`);

    try {
        let newProperty = await Property.create({
            title,
            description,
            rooms,
            parkingLot,
            wc,
            userID,
        });
    } catch (error) {
        console.log(error);
    }

    res.json("Guardado correctamente");
    console.log("Creando una nueva propiedad");
};

const findOneById = async (req, res) => {
    const id = req.params.id;
    const property = await Property.findOne({
        where: { id },
    });
    res.json({
        property,
    });
    console.log(`Obteniendo los datos relacionados con el id: ${id}`);
};

const findOneByUserId = async (req, res) => {
    const userID = req.params.userID;
    const property = await Property.findOne({ where: { userID } });
    console.log(`Busquedas de las propiedades por el id del usuario: ${userID} la primer propiedad tiene el nombre de: ${property.title}`);
    res.json({
        property,
    });
};

const updateOne = async (req, res) => {
    const { title, description, rooms, parkingLot, wc, userID } = req.body;
    const id = req.params.id;

    let newData = { title, description, rooms, parkingLot, wc };

    try {
        const result = await Property.update(newData, {
            where: {
                id,
            },
        });

        if (result[0] === 1) {
            res.status(200).json({ message: "Actualizado correctamente" });
        } else {
            res.status(404).json({ error: "Registro no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor", details: error.message });
    }
};

const deleteOne = async (req, res) => {
    const id = req.params.id;
    await Property.destroy({
        where: { id },
    });
    console.log(`Los datos con el id: ${id} fueron eliminados`);
    res.json("Eliminado correctamente");
};

export { findAll, insertOne, findOneById, findOneByUserId, updateOne, deleteOne };
