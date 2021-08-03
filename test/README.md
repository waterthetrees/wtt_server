# Testing

## Table of Contents
- [Preface](#preface)
- [Running the Tests](#running-the-tests)

## Preface

The back end uses [Jest](https://jestjs.io) as the testing framework of choice.
After running the test command, we deploy a Postgres database on a
new, temporary [Docker](https://www.docker.com) container. On tests completion,
this test database is shut down and removed. This ensures that
the development database is never manipulated and testing is done in a
consistent and isolated environment.

## Running the Tests

Make sure you are in the correct working directory.
```bash
$ pwd
~/waterthetrees/wtt_server
```

Then run the command:
```bash
npm test
```
