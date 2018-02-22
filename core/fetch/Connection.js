import mysql from 'mysql2/promise'

export default class Connection {

	constructor() {
        mysql.createConnection({host: 'localhost', user: 'root', password: 'butts12', database: 'wollfia'})
                    .then(db => this.db = db)
                    .catch(e => console.error(e))
	}


}
