#!/bin/bash
#
# Tear down docker services used for back end tests.

readonly TEST_DB_SERVICE="test_db"

echo "Tearing down test service..."

docker-compose rm -fsv $TEST_DB_SERVICE
