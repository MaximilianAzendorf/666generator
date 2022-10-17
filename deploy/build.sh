#!/usr/bin/env bash

# This script is ONLY to be used for CD purposes.
#
# This script automatically builds a Docker image of the project as well as a CouchDB Docker image preconfigured to be
# used alongside the project image, where the JWT token signing key and the CouchDB admin user password are randomly
# generated.

TOKEN_KEY_LENGTH=512
ADMIN_PASSWORD_LENGTH=32

CHARS="A-Za-z0-9"

DB_TOKEN_KEY=$(head /dev/urandom | tr -dc "$CHARS" | head -c$TOKEN_KEY_LENGTH)
DB_ADMIN_PASSWORD=$(head /dev/urandom | tr -dc "$CHARS" | head -c$ADMIN_PASSWORD_LENGTH)

export DB_TOKEN_KEY
export DB_ADMIN_PASSWORD

docker-compose build --build-arg DB_TOKEN_KEY --build-arg DB_ADMIN_PASSWORD

echo "The DB admin password is $DB_ADMIN_PASSWORD"
