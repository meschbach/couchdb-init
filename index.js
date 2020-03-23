const {Service} = require("junk-bucket/couchdb");
const {main} = require("junk-bucket");

main(async (logger) => {
	const user = process.env["COUCH_USER"];
	const secret = process.env["COUCH_SECRET"];
	const host = process.env["COUCH_HOST"] || "localhost";

	logger.info("Initializing Couch cluster");

	const cluster = new Service("http://"+user+":"+secret+"@"+host+":5984");
	await cluster.ensure_db_exists("_users");
});
