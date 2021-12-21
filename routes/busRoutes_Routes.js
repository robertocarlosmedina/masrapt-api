const express = require('express')
const router = express.Router()
router.use(express.json());

const Masrapt = require('../db/masrapt')


router.get('/', express.json(), async (req, res) => {
	const classes = await Masrapt.GetClass()

	if (!classes) return res.sendStatus(500) // internal error
	return res.json(
		classes.map((classInfo) => ({
            id: classInfo.idaula,
            numero:classInfo.numero,
            diaSemana:classInfo.diaSemana, 
            hora:classInfo.hora, 
			tipo:classInfo.tipo,
            local:classInfo.local, 
            duracao:classInfo.duracao, 
            data:classInfo.data, 
            disciplina:classInfo.disciplina,
		}))
	)
});

router.post('/create', express.json(), async (req, res) => {

	const { numero,tipo,diaSemana, local, duracao,disciplina } = req.body;
	const newClass = await Masrapt.PostClass(numero,tipo,diaSemana, local, duracao,disciplina);
	const lastClass = await Masrapt.GetClass()

	if(!newClass) return res.sendStatus(500);
	
	return res.json(
		lastClass.filter((classInfo, i) => {
			if(i === lastClass.length-1){
				return classInfo
			}
		})
	)
});

router.get('/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const sumario = await Masrapt.GetClass(id)

	if (!sumario) return res.sendStatus(404) // internal error
	return res.json(sumario)

});

router.put('/edit/:id', express.json(), async (req, res) => {

	const { id } = req.params;
	const { numero,tipo,diaSemana, local, duracao,disciplina } = req.body;
	const putClass = await Masrapt.PutClass(id,numero,tipo,diaSemana, local, duracao,disciplina);

	if(!putClass) return res.sendStatus(500);
	
	return res.json("Elemento alterado com sucesso.");
});

router.delete('/delete/:id', express.json(), async (req, res) => {
	const { id } = req.params;
	const deletedClass = await Masrapt.DeleteClass(id)

	if (!deletedClass) return res.sendStatus(404) // internal error
	return res.json("Elemento deletado com sucesso.")
});

module.exports = router
