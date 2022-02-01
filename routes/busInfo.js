const express = require('express');
const router = express.Router()
router.use(express.json());

const Masrapt = require('../db/masrapt');
const { all } = require('./busRoutes');


const getRouteName = (all_routes, id_route) => {
    const related_route = all_routes.filter( (route) =>{
        return route.id === id_route
    })
    return related_route[0].name
}

router.get('/', express.json(), async (req, res) => {
	const all_bus = await Masrapt.get_busInfo()
    const all_routes = await Masrapt.get_routes()

	if (!all_bus) return res.sendStatus(500) // internal error

	return res.json(
	    {
			bus: all_bus.map((bus) => ({
                id: bus.id,
				registration_plate: bus.registration_plate, 
                current_sequence_number: bus.current_sequence_number,
                longitude: bus.longitude,
                latitude: bus.latitude,
                state: bus.state, 
                id_route: bus.id_route,
                route_color: bus.route_color,
                passengers_number: bus.passengers_number,
                in_a_bus_stop: bus.in_a_bus_stop,
                total_seats: bus.total_seats,
                route_name: getRouteName(all_routes, bus.id_route)
			}))
		}
	)
});


router.get('/get_a_busInfo/:id', express.json(), async (req, res) => {

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
            longitude: busInfo[0].longitude,
            latitude: busInfo[0].latitude,
            state: busInfo[0].state, 
            id_route: busInfo[0].id_route,
            route_color: busInfo[0].route_color,
            passengers_number: busInfo[0].passengers_number,
            in_a_bus_stop: busInfo[0].in_a_bus_stop,
            total_seats: busInfo[0].total_seats
		}
	)
});

router.post('/update_passenger_number', express.json(), async (req, res) => {

	const { id_bus, passengers_number } = req.body;
    const bus_update = await Masrapt.updateBusPassengerNumber(id_bus, passengers_number)
	if(!bus_update) return res.sendStatus(500);
	
	return res.sendStatus(200)
});

router.post('/create', express.json(), async (req, res) => {

	const { registration_plate, current_sequence_number, state, id_route } = req.body;
    const route_info = await Masrapt.get_routes(id_route)
    const coordinates_info = await Masrapt.get_coordinates(null, id_route)
	const new_bus = await Masrapt.create_busInfo(
        registration_plate, 
        current_sequence_number, 
        coordinates_info[0].longitude,
        coordinates_info[0].latitude,
        state, 
        id_route,
        route_info[0].route_color
    );
	const all_bus = await Masrapt.get_busInfo()
	const last_bus = all_bus[all_bus.length-1]

	if(!new_bus) return res.sendStatus(500);
	
	return res.json(last_bus)
});

const get_coordinates_info = async (id_bus, id_route, current_sequence_number) => {
    const coordinates_info = await Masrapt.get_coordinates(
        null, 
        id_route, 
        current_sequence_number
    )
    if (!coordinates_info) return res.sendStatus(500) // internal error
    const updateBusSequenceNumber = get_updateBus_info(
        id_bus, coordinates_info[0].sequence_number,
        coordinates_info[0].longitude, coordinates_info[0].latitude,
        coordinates_info[0].is_a_bus_stop
    )
    if(!updateBusSequenceNumber) return res.sendStatus(500);
    return coordinates_info
}

const get_updateBus_info = async (bus_id, current_sequence_number, longitude, latitude, in_a_bus_stop) => {
    const updateBusSequenceNumber = await Masrapt.updateBusSequenceNumber(
        bus_id, current_sequence_number,
        longitude, latitude, in_a_bus_stop
    )
    if (!updateBusSequenceNumber) return res.sendStatus(500) // internal error
    return updateBusSequenceNumber
}

router.post('/update_all_bus_position', express.json(), async (req, res) => {
	// const { bus_id, id_route  } = req.body;
	const all_bus_info = await Masrapt.get_busInfo();
    const all_coordenates = await Masrapt.get_coordinates()
    let filtered_coordinates = []
    if(!all_bus_info) return res.sendStatus(500);

    let last_sequence_number, current_sequence_number, coordinates_info;

    all_bus_info.forEach(bus => {
        filtered_coordinates = all_coordenates.filter( function(coordinates){
            return coordinates.id_route == bus.id_route
        })
        // console.log(filtered_coordinates)
        last_sequence_number = filtered_coordinates[filtered_coordinates.length-1].sequence_number
        current_sequence_number = bus.current_sequence_number

        // To restart the route
        if (current_sequence_number >= last_sequence_number){
            current_sequence_number = 1
        }
        else{
            current_sequence_number += 1
        }
	    coordinates_info = get_coordinates_info(bus.id, bus.id_route, current_sequence_number)
        if(!coordinates_info) return res.sendStatus(500);
        
    });
    
    return res.sendStatus(200)
});

router.post('/update_a_bus_position', express.json(), async (req, res) => {

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
        bus_id, coordinates_info[0].sequence_number,
        coordinates_info[0].longitude, coordinates_info[0].latitude,
        coordinates_info[0].is_a_bus_stop
        )

	if((!updateBusSequenceNumber) || (!bus_info) || (!coordinates_info)) return res.sendStatus(500);
	
	return res.sendStatus(200)
});

router.delete('/delete/:id', express.json(), async (req, res) => {
	const { id } = req.params;
	const busInfo = await Masrapt.delete_busInfo(id)

	if (!busInfo) return res.sendStatus(404) //  internal error
	return res.json(res.sendStatus(200))
});

module.exports = router
