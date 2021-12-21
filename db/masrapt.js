const DB = require('./db')

class Masrapt {
	// ------------- Users -----------------------------
	static GetUsers =  async (id=null) => {
		let sql;
		if(id !==null){
			sql = `select * from user WHERE iduser=${id}`;
		}
		else{
			sql = `select * from user`;
		}
		
		return await DB.Select(sql)
	}
	static PutUser =  async (id,password) => {
		
		const sql = `UPDATE user SET password="${password}"
		 WHERE iduser=${id};`

		const results = await DB.Update(sql)
		return results
	}

	static DeleteUser =  async (id) => {
		const sql = `DELETE FROM users WHERE id=${id}`

		const results = await DB.Delete(sql)
		return results
	}

	static PutRoute =  async (id,conteudo, biblio,presenca, idaula) => {
		
		const sql = `UPDATE sumario SET conteudo="${conteudo}", biblio="${biblio}",presenca=${presenca},aula=${idaula}
		 WHERE idsumario=${id};`

		const results = await DB.Update(sql)
		return results
	}

	static PostSumario =  async (conteudo, biblio,presenca, idaula) => {
		const sql = `INSERT INTO sumario (conteudo, biblio, presenca,aula) VALUES ("${conteudo}", "${biblio}", ${presenca}, ${idaula});`		

		const results = await DB.Insert(sql);

		return results
	}
}

module.exports = Masrapt
