const {Service} = require("junk-bucket/couchdb");
const {main} = require("junk-bucket");

main(async (logger) => {
	const user = process.env["COUCH_USER"];
	const secret = process.env["COUCH_SECRET"];

	logger.info("Initializing Couch cluster");

	const cluster = new Service("http://"+user+":"+secret+"@localhost:5984");
	await cluster.ensure_db_exists("_users");
});
