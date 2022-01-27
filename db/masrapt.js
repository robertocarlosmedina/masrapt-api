const DB = require('./db')

class Masrapt {
	/* Sql connectors related to the user autentication */ 

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	static get_users =  async (id = null) => {
		let sql;
		if(id !== null){
			sql = `select * from users WHERE id=${id}`;
		}
		else{
			sql = `select * from users`;
		}
		
		return await DB.Select(sql)
	}

	/**
	 * 
	 * @param {*} nome 
	 * @param {*} email 
	 * @param {*} hash_password 
	 * @returns 
	 */
	static post_user =  async (name, email, hash_password) => {
		const sql = `INSERT INTO users (email ,name, hash_password) VALUES ("${email}", "${name}", "${hash_password}");`		

		const results = await DB.Insert(sql);

		return results
	}

	/**
	 * 
	 * @param {*} id 
	 * @param {*} password 
	 * @returns 
	 */
	static edit_user =  async (id, password) => {
		
		const sql = `UPDATE users SET hash_password="${password}"
		 WHERE id=${id};`

		const results = await DB.Update(sql)
		return results
	}

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	static delete_user =  async (id) => {
		const sql = `DELETE FROM users WHERE id=${id}`

		const results = await DB.Delete(sql)
		return results
	}

	/* -------------------------------------------------------------------------- */

	/* Sql connectors related to the user routes */ 

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	static get_routes =  async (id = null) => {
		let sql;
		if(id !== null){
			sql = `select * from routes WHERE id=${id}`;
		}
		else{
			sql = `select * from routes`;
		}
		
		return await DB.Select(sql)
	}
	
	/**
	 * 
	 * @param {*} name 
	 * @param {*} description 
	 * @param {*} active_bus 
	 * @param {*} route_timer 
	 * @param {*} locations 
	 * @returns 
	 */
	static create_route =  async (name, description, active_bus, route_timer, locations) => {
		const sql = `INSERT INTO routes (name, description, active_bus, route_timer, locations) VALUES 
			("${name}", "${description}", "${active_bus}", "${route_timer}", "${locations}");`		

		const results = await DB.Insert(sql);

		return results
	}

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	static delete_route =  async (id) => {
		const sql = `DELETE FROM routes WHERE id=${id}`

		const results = await DB.Delete(sql)
		return results
	}

	/* -------------------------------------------------------------------------- */
	/* Sql connectors related to the user routes coordinates */

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	 static get_coordinates =  async (id = null, id_route = null) => {
		let sql;
		if(id !== null){
			sql = `select * from routes_coordinates WHERE id_coordinates=${id}`;
		}
		else if(id_route !== null){
			sql = `select * from routes_coordinates WHERE id_route=${id_route}`;
		}
		else{
			sql = `select * from routes_coordinates`;
		}
		
		return await DB.Select(sql)
	}

	/**
	 * 
	 * @param {*} sequence_number 
	 * @param {*} longitude 
	 * @param {*} latitude 
	 * @param {*} altitude 
	 * @param {*} id_route 
	 * @returns 
	 */
	static create_route_coordinate =  async (sequence_number, longitude, latitude, altitude, id_route) => {
		const sql = `INSERT INTO routes_coordinates (sequence_number, longitude, latitude, altitude, id_route) VALUES 
			("${sequence_number}", "${longitude}", "${latitude}", "${altitude}", "${id_route}");`		

		const results = await DB.Insert(sql); 

		return results
	}

	/**
	 * 
	 * @param {*} id 
	 * @returns 
	 */
	 static delete_coordinate =  async (id = null, id_route = null) => {
		let sql;

		if(id_route){
			sql = `DELETE FROM routes_coordinates WHERE id_route=${id_route}`
		}

		if(id){
			sql = `DELETE FROM routes_coordinates WHERE id_coordinates=${id}`
		}

		const results = await DB.Delete(sql)
		return results
	}
}

module.exports = Masrapt
