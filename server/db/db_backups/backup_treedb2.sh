#!/bin/bash
yell() { echo "$0: $*" >&2; }
die() { yell "$*"; exit 111; }
try() { "$@" || die "cannot $*"; }



cd /Users/aa/Desktop/APPS/wtt/wtt_server/server/db/db_backups/

# Login to your postgres user sudo su postgres
pg_dump -w -c -U trees -h localhost -d treedb > "`date +%Y-%m-%d_%H%M`_treedb.sql" 
pg_dump -w -c -U trees -h localhost -d treedb -t treedata  > "`date +%Y-%m-%d_%H%M`_treedata.sql"
pg_dump -w -c -U trees -h localhost -d treedb -t treehistory  > "`date +%Y-%m-%d_%H%M`_treehistory.sql"
pg_dump -w -c -U trees -h localhost -d treedb -t users  > "`date +%Y-%m-%d_%H%M`_users.sql"
pg_dump -w -c -U trees -h localhost -d treedb -t cities  > "`date +%Y-%m-%d_%H%M`_cities.sql"

# remove files older than 10 days
find /Users/aa/Desktop/APPS/wtt/wtt_server/server/db/db_backups/*.sql -mtime +10 -exec rm {} \;
if [ $? -eq 0 ]
then
  echo "`date +%Y-%m-%d_%H:%M:%S`---/Users/aa/Desktop/APPS/wtt/wtt_server/server/db/db_backups/db_backup.sh ran successfully";
  exit 0;
else
  echo "`date +%Y-%m-%d_%H:%M:%S`---/Users/aa/Desktop/APPS/wtt/wtt_server/server/db/db_backups/db_backup.sh failed to run";
  exit 1;
fi
