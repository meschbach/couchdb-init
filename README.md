# couchdb-init

A job to ensure a CouchDB server is properly initialized.

## Usage

* Docker *
* Image: meschbach/couchdb-init:latest
* Environment variables
  * COUCH_USER - User to connect to the cluster as
  * COUCH_SECRET - Authorizing password or secret to access the cluster with
  * COUCH_HOST - CouchDB host
  * DBS - Comma separated list of additional databases to be created in addition to the required builtins.
