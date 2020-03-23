# couchdb-init

A job to ensure a CouchDB server is properly initialized.

## Actions
* Ensure the `_users` database is created and exists.  From a functional standpoint Couch is still usable without this
database however there are two drawbacks.  First the cluster is not able to use additional users or require the insecure
party mode.  Second generates log spam which appears like errors.
