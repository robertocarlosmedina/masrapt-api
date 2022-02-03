const express = require('express');
const { delete_busInfo } = require('../db/masrapt');
const router = express.Router()
router.use(express.json());


const Masrapt = require('../db/masrapt')


/**
 * Arrow Function that filter all routes and retunr the route name
 *  @param username
 *  @param user_email
 * 	@param all_users
 *  @return The route name
 * */ 
 const checkIfUserAlreadyExist = (username, user_email, all_users) => {
    const related_user = all_users.filter( (user) =>{
        return user.name === username || user.email === user_email
    })
	if(related_user.length > 0){
		return true;
	}
    return false
}

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
	const all_users = await Masrapt.get_users()
	const userAlredyExit = checkIfUserAlreadyExist(name, email, all_users)

	if(userAlredyExit){
		return res.sendStatus(401)
	}

	const new_user = await Masrapt.post_user(name, email, password);
	const updated_all_users = await Masrapt.get_users()

	const last_user = updated_all_users[updated_all_users.length-1]

	if(!new_user) return res.sendStatus(500);
	
	return res.json(last_user)
});

router.post('/auth', express.json(), async (req, res) => {

	const { email_or_username, password } = req.body;
	const all_users = await Masrapt.get_users();

	if(!all_users) return res.sendStatus(500);


	const authenticated_user = all_users.filter( (user) =>{
        return (user.name === email_or_username || user.email === email_or_username)
		&& user.hash_password === password
    })

	if (authenticated_user.length > 0){
		return res.json(authenticated_user[0])
	}
	else{
		return res.sendStatus(401);
	}
});

router.put('/edit', express.json(), async (req, res) => {

	const { id, password } = req.body;
	const edited_user = await Masrapt.edit_user(id, password);
	const user_data = await Masrapt.get_users(id)

	if(!edited_user) return res.sendStatus(500);
	if(!user_data) return res.sendStatus(500);
	
	return res.json(user_data[0]);
});

router.post('/delete', express.json(), async (req, res) => {
	const { id } = req.body;
	const deletedClass = await Masrapt.delete_user(id)

	console.log(deletedClass)

	if (!deletedClass) return res.sendStatus(404) // internal error
	return res.sendStatus(200)
});

module.exports = router
