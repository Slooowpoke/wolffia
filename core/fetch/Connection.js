import mysql from 'mysql2/promise'

export default class Connection {

	constructor() {
        mysql.createConnection({host: 'localhost', user: 'root', password: 'butts12', database: 'wollfia'})
                    .then(db => this.db = db)
                    .catch(e => console.error(e))
	}

	async queryForPageMeta(pagename) {
		try {
			const [results, fields] = await this.db.execute('SELECT * FROM `pages` WHERE `name` = ? LIMIT 1', [pagename])
            
			return results[0]
		} catch (error) {
			console.log(error)
			ctx.throw(400, 'INVALID_DATA')
		}
	}

}
