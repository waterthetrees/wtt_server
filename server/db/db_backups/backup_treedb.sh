#!/bin/bash
yell() { echo "$0: $*" >&2; }
die() { yell "$*"; exit 111; }
try() { "$@" || die "cannot $*"; }


echo "`date +%Y-%m-%d_%H:%M:%S`---get_tb_db.sh";

cd /var/www/db

# Login to your postgres user sudo su postgres
pg_dump -d dbname > "`date +%Y-%m-%d_%H:%M:%S`---treedb.sql"
pg_dump -d treedb -t treedata > "`date +%Y-%m-%d_%H:%M:%S`---treedata.sql"
pg_dump -d treedb -t treehistory > "`date +%Y-%m-%d_%H:%M:%S`---treehistory.sql"

if [ $? -eq 0 ]
then
  echo "Successfully got db";
  exit 0;
else
  echo "Could not get db" >&2;
  exit 1;
fi