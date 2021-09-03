const {Service} = require("junk-bucket/couchdb");
const {main} = require("junk-bucket");
const {parallel} = require("junk-bucket/future");

main(async (logger) => {
	const user = process.env["COUCH_USER"];
	const secret = process.env["COUCH_SECRET"];
	const host = process.env["COUCH_HOST"] || "localhost";
	const additionalDatabases = (process.env["DBS"] || "").split(",");

	logger.info("Initializing Couch cluster");

	const cluster = new Service("http://"+user+":"+secret+"@"+host+":5984");
	const initialState = await cluster.client.relax({
		method: "GET",
		path: "/_cluster_setup"
	})
	console.log("Cluster state: ", initialState);

	if( initialState.state === 'cluster_finished' ) {
		console.log("Cluster in finished state, not attempting to configure");
		return;
	}

	//https://docs.couchdb.org/en/stable/api/server/common.html#post--_cluster_setup
	const setupPhase1 = await cluster.client.relax({
		method: "GET",
		path: "/_cluster_setup",
		body: {
			"action": "enable_single_node",
			"bind_address": "0.0.0.0",
			"username": user,
			"password": secret,
			"port": 5984,
			"node_count": 1,
		}
	})
	console.log("Phase 1 setup", setupPhase1);

	const setupPhase2 = await cluster.client.relax({
		method: "GET",
		path: "/_cluster_setup",
		body: {
			"action": "finish_cluster",
			ensure_dbs_exist: ["_users","_replicator"]
		}
	})
	console.log("Phase 2 setup", setupPhase2);

	const requiredDatabases = ["_users","_replicator"];
	const createDatabases = requiredDatabases.concat( additionalDatabases);
	await parallel(createDatabases.map(async dbName => await cluster.ensure_db_exists(dbName)));
});
