const express = require('express');
const router = express.Router()
router.use(express.json());

const Masrapt = require('../db/masrapt')


router.get('/', express.json(), async (req, res) => {
	const all_bus = await Masrapt.get_busInfo()
	// console.log("okokokokokok")

	if (!all_bus) return res.sendStatus(500) // internal error

	return res.json(
	    {
			busInfo: all_bus.map((bus) => ({
                id: bus.id,
				registration_plate: bus.registration_plate, 
                current_sequence_number: bus.sequence_number, 
                state: bus.state, 
                id_route: bus.id_route
			}))
		}
	)
});

router.get('/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const busInfo = await Masrapt.get_busInfo(id)

	if (busInfo.length < 1){
		return res.sendStatus(404)
	}
	if (!busInfo) return res.sendStatus(404) // internal error
	return res.json(
	    {
            id: busInfo[0].id,
			registration_plate: busInfo[0].registration_plate, 
            current_sequence_number: busInfo[0].current_sequence_number, 
            state: busInfo[0].state, 
            id_route: busInfo[0].id_route
		}
	)
});

router.post('/create', express.json(), async (req, res) => {

	const { registration_plate, current_sequence_number, state, id_route  } = req.body;
	const new_bus = await Masrapt.create_busInfo(registration_plate, current_sequence_number, state, id_route);
	const all_bus = await Masrapt.get_busInfo()
	const last_bus = all_bus[all_bus.length-1]

	if(!new_bus) return res.sendStatus(500);
	
	return res.json(last_bus)
});


router.post('/get_bus_position', express.json(), async (req, res) => {

	const { bus_id, id_route  } = req.body;
	const bus_info = await Masrapt.get_busInfo(bus_id);
    const all_coordenates = await Masrapt.get_coordinates(null, id_route)
    const last_sequence_number = all_coordenates[all_coordenates.length-1].sequence_number
    let current_sequence_number = bus_info[0].current_sequence_number

    // To restart the route
    if (current_sequence_number >= last_sequence_number){
        current_sequence_number = 1
    }
    else{
        current_sequence_number += 1
    }
	const coordinates_info = await Masrapt.get_coordinates(
        null, 
        id_route, 
        current_sequence_number
    )
    const updateBusSequenceNumber = await Masrapt.updateBusSequenceNumber(
        bus_id, coordinates_info[0].sequence_number)

	if((!updateBusSequenceNumber) || (!bus_info) || (!coordinates_info)) return res.sendStatus(500);
	
	return res.json({
        id_route: coordinates_info[0].id_route,
        longitude: coordinates_info[0].longitude,
        latitude: coordinates_info[0].latitude
    })
});

router.delete('/delete/:id', express.json(), async (req, res) => {
	const { id } = req.params;
	const busInfo = await Masrapt.delete_busInfo(id)

	if (!busInfo) return res.sendStatus(404) //  internal error
	return res.json(res.sendStatus(200))
});

module.exports = router
