#!/bin/bash
#
# Run all back end tests.

readonly BACKEND_CONTAINER="wtt_server"
readonly RUN_BACKEND_TESTS="npm run jest"

echo "Running tests..."

docker exec -it $BACKEND_CONTAINER $RUN_BACKEND_TESTS
