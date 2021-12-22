const DB = require('./db')

class Masrapt {
	// ------------- Users -----------------------------
	static get_users =  async (id=null) => {
		let sql;
		if(id !==null){
			sql = `select * from users WHERE id=${id}`;
		}
		else{
			sql = `select * from users`;
		}
		
		return await DB.Select(sql)
	}

	static post_user =  async (nome, email, hash_password) => {
		const sql = `INSERT INTO users (email ,nome, hash_password) VALUES ("${email}", "${nome}", "${hash_password}");`		

		const results = await DB.Insert(sql);

		return results
	}

	static edit_user =  async (id, password) => {
		
		const sql = `UPDATE users SET hash_password="${password}"
		 WHERE id=${id};`

		const results = await DB.Update(sql)
		return results
	}

	static delete_user =  async (id) => {
		const sql = `DELETE FROM users WHERE id=${id}`

		const results = await DB.Delete(sql)
		return results
	}
	
}

module.exports = Masrapt
