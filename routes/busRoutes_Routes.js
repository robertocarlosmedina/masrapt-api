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
            nome: user.nome,
            email: user.email, 
            // password: user.hash_password
		}))
	)
});

router.get('/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const user = await Masrapt.get_users(id)

	if (!user) return res.sendStatus(404) // internal error
	return res.json(user.map((usr) => ({
        id: usr.id,
        nome: usr.nome,
        email: usr.email
    })))

});

router.post('/create', express.json(), async (req, res) => {

	const { nome, email, password } = req.body;
	const new_user = await Masrapt.post_user(nome, email, password);
	const last_user = await Masrapt.get_users()

	if(!new_user) return res.sendStatus(500);
	
	return res.json(
		last_user.filter((user, i) => {
			if(i === last_user.length-1){
                return {
                    "nome": user.nome,
                    "email": user.email
                }
			}
		})
	)
});

router.put('/edit/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const { password } = req.body;
	const edited_user = await Masrapt.edit_user(id, password);

	if(!edited_user) return res.sendStatus(500);
	
	return res.json("Elemento alterado com sucesso.");
});

router.delete('/delete/:id', express.json(), async (req, res) => {
	const { id } = req.params;
	const deletedClass = await Masrapt.delete_user(id)

	if (!deletedClass) return res.sendStatus(404) // internal error
	return res.json("Elemento deletado com sucesso.")
});

module.exports = router
