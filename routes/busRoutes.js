const express = require('express')
const router = express.Router()
router.use(express.json());

const Masrapt = require('../db/masrapt')


router.get('/', express.json(), async (req, res) => {
	const all_routes = await Masrapt.get_routes()
	// console.log("okokokokokok")

	if (!all_routes) return res.sendStatus(500) // internal error

	return res.json(
	    {
			routes: all_routes.map((route) => ({
				id: route.id, 
				name: route.name, 
				description: route.description, 
				active_bus: route.active_bus, 
				route_timer: route.route_timer, 
				locations: route.locations
			}))
		}
	)
});

// router.get('/all_routes_info', express.json(), async (req, res) => {
// 	const routes_array = []
// 	const all_routes = await Masrapt.get_routes()

// 	if (!all_routes) return res.sendStatus(500) // internal error

// 	all_routes.forEach(route => {
// 		const coordinates = await Masrapt.get_coordinates(route.id);
// 		coordinates
// 	});

// 	return res.json(
// 	    all_routes.map((route) => (
// 			{
//             id: route.id, 
// 			name: route.name, 
// 			description: route.description, 
// 			active_bus: route.active_bus, 
// 			route_timer: route.route_timer, 
// 			locations: route.locations
// 		}))
// 	)
// });

router.get('/coordinates', express.json(), async (req, res) => {
	const all_coordinates = await Masrapt.get_coordinates()

	if (!all_coordinates) return res.sendStatus(500) // internal error
	return res.json(
	    {
			coordinates: all_coordinates.map((coordinate) => ({
				id_coordinates: coordinate.id_coordinates,
            	sequence_number: coordinate.sequence_number, 
				longitude: coordinate.longitude, 
				latitude: coordinate.latitude, 
				altitude: coordinate.altitude, 
				id_route: coordinate.id_route
			}))
		}
	)
});

router.get('/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const route = await Masrapt.get_routes(id)

	if (route.length < 1){
		return res.sendStatus(404)
	}
	if (!route) return res.sendStatus(404) // internal error
	return res.json({
        id: route[0].id,
		name: route[0].name, 
		description: route[0].description, 
		active_bus: route[0].active_bus, 
		route_timer: route[0].route_timer, 
		locations: route[0].locations
    })
});

router.get('/route_coordinates/:route_id', express.json(), async (req, res) => {

	const { route_id } = req.params;
	const all_coordinates = await Masrapt.get_coordinates(null, route_id)

	if (all_coordinates.length < 1){
		return res.sendStatus(404)
	}
	if (!all_coordinates) return res.sendStatus(404) // internal error
	return res.json(
		{
			coordinates: all_coordinates.map((coordinate) => ({
    		    id_coordinates: coordinate.id_coordinates,
    		    sequence_number: coordinate.sequence_number, 
				longitude: coordinate.longitude, 
				latitude: coordinate.latitude, 
				altitude: coordinate.altitude, 
				id_route: coordinate.id_route
    		}))
		}
	)
});

router.get('/coordinates/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const coordinate = await Masrapt.get_coordinates(id)

	if (coordinate.length < 1){
		return res.sendStatus(404)
	}
	if (!coordinate) return res.sendStatus(404) // internal error
	return res.json({
        id_coordinates: coordinate[0].id_coordinates,
        sequence_number: coordinate[0].sequence_number, 
		longitude: coordinate[0].longitude, 
		latitude: coordinate[0].latitude, 
		altitude: coordinate[0].altitude, 
		id_route: coordinate[0].id_route
    })
});

router.post('/create', express.json(), async (req, res) => {

	const { name, description, active_bus, route_timer, locations } = req.body;
	const new_route = await Masrapt.create_route(name, description, active_bus, route_timer, locations);
	const all_routes = await Masrapt.get_routes()
	const last_route = all_routes[all_routes.length-1]

	if(!new_route) return res.sendStatus(500);
	
	return res.json(last_route)
});

router.post('/coordinates/create', express.json(), async (req, res) => {

	const { sequence_number, longitude, latitude, altitude, id_route  } = req.body;
	const new_coordinate = await Masrapt.create_route_coordinate(sequence_number, longitude, latitude, altitude, id_route);
	const all_coordinate = await Masrapt.get_coordinates()
	const last_coordinate = all_coordinate[all_coordinate.length-1]

	if(!new_coordinate) return res.sendStatus(500);
	
	return res.json(last_coordinate)
});

router.post('/get_bus_position', express.json(), async (req, res) => {

	const { bus_id, id_route, sequence_number  } = req.body;
	const new_coordinate = await Masrapt.create_route_coordinate(sequence_number, longitude, latitude, altitude, id_route);
	const all_coordinate = await Masrapt.get_coordinates()
	const last_coordinate = all_coordinate[all_coordinate.length-1]

	if(!new_coordinate) return res.sendStatus(500);
	
	return res.json(last_coordinate)
});

// router.put('/edit/:id', express.json(), async (req, res) => {

// 	const { id } = req.params;  
// 	const { password } = req.body;
// 	const edited_user = await Masrapt.edit_user(id, password);

// 	if(!edited_user) return res.sendStatus(500);
	
// 	return res.json("Elemento alterado com sucesso.");
// });

router.delete('/delete/:id', express.json(), async (req, res) => {
	const { id } = req.params;
	const deletedClass = await Masrapt.delete_route(id)

	if (!deletedClass) return res.sendStatus(404) //  internal error
	return res.json(res.sendStatus(200))
});

router.delete('/coordinate/delete/:id', express.json(), async (req, res) => {
	const { id } = req.params;
	const coordinate = await Masrapt.delete_coordinate(id)

	if (!coordinate) return res.sendStatus(404) // internal error
	return res.json(res.sendStatus(200))
});

router.delete('/route_coordinates/delete/:route_id', express.json(), async (req, res) => {
	const { route_id } = req.params;
	const coordinate = await Masrapt.delete_coordinate(id_route = route_id)

	if (!coordinate) return res.sendStatus(404) // internal error
	return res.json(res.sendStatus(200))
});

module.exports = router
