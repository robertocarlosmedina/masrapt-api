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

router.get('/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const user = await Masrapt.get_users(id)

	if (!user) return res.sendStatus(404) // internal error
	// return res.json(user.map((usr) => ({
    //     id: usr.id,
    //     nome: usr.nome,
    //     email: usr.email
    // })))
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
	const last_user = await Masrapt.get_users()

	if(!new_user) return res.sendStatus(500);
	
	return res.json(
		last_user.filter((user, i) => {
			if(i === last_user.length-1){
                return {
                    "name": user.name,
                    "email": user.email
                }
			}
		})
	)
});

router.post('/auth', express.json(), async (req, res) => {

	// console.log("[  * Making authentication  ]")

	const { email_or_username, password } = req.body;
	const all_users = await Masrapt.get_users();

	let authenticated_user = null;

	if(!all_users) return res.sendStatus(500);

	all_users.forEach(user => {
		if (user.name === email_or_username || user.email === email_or_username
			|| user.hash_password === password){
				authenticated_user = {
					id: user.id,
					name: user.name,
					email: user.email
				}
		}
	});

	if (authenticated_user){
		return res.json(authenticated_user)
	}
	else{
		return res.sendStatus(401);
	}
});

router.put('/edit/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const { password } = req.body;
	const edited_user = await Masrapt.edit_user(id, password);

	if(!edited_user) return res.sendStatus(500);
	
	return res.json(true);
});

router.delete('/delete/:id', express.json(), async (req, res) => {
	const { id } = req.params;
	const deletedClass = await Masrapt.delete_user(id)

	if (!deletedClass) return res.sendStatus(404) // internal error
	return res.json(true)
});

module.exports = router
