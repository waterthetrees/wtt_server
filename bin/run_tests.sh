#!/bin/bash
#
# Run all back end tests.

readonly TEST_DB_SERVICE="test_db"
readonly DOKKU_WAIT_SERVICE="wait"
readonly BACKEND_CONTAINER="wtt_server"
readonly JEST="./node_modules/.bin/jest"
readonly RUN_BACKEND_TESTS="$JEST --verbose --runInBand"

# Run only the test db service and it's dependencies
# by implicitly enabling docker profile 'test'
docker-compose up -d $TEST_DB_SERVICE

# Run only the dokku/wait service. It ensures that the test db is up
# and accepting connections before running the tests.
# 5432 is the default postgres port.
# The service is removed after use.
docker-compose run --rm $DOKKU_WAIT_SERVICE -c $TEST_DB_SERVICE:5432

echo "Running tests..."
docker exec -it $BACKEND_CONTAINER $RUN_BACKEND_TESTS

echo "Tearing down test service..."
docker-compose rm -fsv $TEST_DB_SERVICE
