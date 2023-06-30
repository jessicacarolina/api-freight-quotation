import Connection from "./Connection";
import pgp from "pg-promise";

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD

export default class PgPromiseConnection implements Connection {
	connection: any;
	constructor () {
		this.connection = pgp()(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`);
	}

	query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	close(): Promise<void> {
		return this.connection.$pool.end();
	}
}