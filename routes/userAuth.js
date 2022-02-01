const express = require('express')
const router = express.Router()
router.use(express.json());


const Masrapt = require('../db/masrapt')


router.get('/', express.json(), async (req, res) => {
	const users = await Masrapt.get_users()

	if (!users) return res.sendStatus(500) // internal error
	return res.json(
	    users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email, 
            password: user.hash_password
		}))
	)
});

router.get('/get_all_users/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const user = await Masrapt.get_users(id)

	if (!user) return res.sendStatus(404) // internal error
	return res.json({
        id: user[0].id,
        name: user[0].name,
        email: user[0].email,
        password: user[0].hash_password,
    })

});

router.post('/create', express.json(), async (req, res) => {
	const { name, email, password } = req.body;
	const new_user = await Masrapt.post_user(name, email, password);
	const all_users = await Masrapt.get_users()
	const last_user = all_users[all_routes.length-1]

	if(!new_user) return res.sendStatus(500);
	
	return res.json(
		{
			id: last_user.id,
			name: last_user.name,
        	email: last_user.email
		}
	)
});

router.post('/auth', express.json(), async (req, res) => {

	// console.log("[  * Making authentication  ]")

	const { email_or_username, password } = req.body;
	const all_users = await Masrapt.get_users();

	if(!all_users) return res.sendStatus(500);


	const authenticated_user = all_users.filter( (user) =>{
        return (user.name === email_or_username || user.email === email_or_username)
		&& user.hash_password === password
    })

	if (authenticated_user.length > 0){
		return res.json(authenticated_user)
	}
	else{
		return res.sendStatus(401);
	}
});

router.put('/edit', express.json(), async (req, res) => {

	const { id, password } = req.body;
	const edited_user = await Masrapt.edit_user(id, password);
	const all_users = await Masrapt.get_users()
	const last_user = all_users[all_routes.length-1]

	if(!edited_user) return res.sendStatus(500);
	if(!new_user) return res.sendStatus(500);
	
	return res.json(
		{
			id: last_user.id,
			name: last_user.name,
        	email: last_user.email
		}
	);
});

router.delete('/delete', express.json(), async (req, res) => {
	const { id } = req.body;
	const deletedClass = await Masrapt.delete_user(id)

	if (!deletedClass) return res.sendStatus(404) // internal error
	return res.sendStatus(200)
});

module.exports = router
