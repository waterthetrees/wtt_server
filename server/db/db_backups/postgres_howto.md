# best practice: linux
nano ~/.pgpass
*:5432:*:username:password
chmod 0600 ~/.pgpass

# best practice: windows
edit %APPDATA%\postgresql\pgpass.conf
*:5432:*:username:password

# linux
PGPASSWORD="password" pg_dump --no-owner -h host -p port -U username database > file.sql

# windows
PGPASSWORD=password&& pg_dump --no-owner -h host -p port -U username database > file.sql

# alternative
pg_dump --no-owner --dbname=postgresql://username:password@host:port/database > file.sql

# restore
psql --set ON_ERROR_STOP=on -U postgres -d database -1 -f file.sql
pg_restore --no-privileges --no-owner -U postgres -d database --clean file.sql # only works for special dumps

# backup exluding table
pg_dump --no-owner -h 127.0.0.1 -p 5432 -U username --exclude-table=foo database > tmp.sql

# backup including table
pg_dump --no-owner -h 127.0.0.1 -p 5432 -U username --table=foo database > tmp.sql

# backup and restore
PGPASSWORD=password && pg_dump --no-owner -h 127.0.0.1 -p 5432 -U username database > tmp.sql
psql -U postgres -d database -c "drop schema public cascade; create schema public;"
psql --set ON_ERROR_STOP=on -U postgres -d database -1 -f tmp.sql
rm tmp.sql

# if you need to remove unintentionally backuped owners afterwards
sed -i.bak '/OWNER TO specialowner/d' input.sql

\COPY (
       id_reference, 
       who,
       address,
       city,
       state, 
       zip,
       country,
       neighborhood, 
       common, 
       scientific,
       lng, 
       lat,   
       dbh,
       height,
       health,
       owner, 
       url, 
       urlimage,
       planting_opt1,
       planting_opt1_com,
       planting_opt2,
       planting_opt3,
       side_type,
       location_tree_count,
       email
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
     FROM '/Users/aa/Desktop/APPS/wtt/wtt_server/server/db/Alameda_street_trees_clean_min.csv' 
     DELIMETER ','
     WITH HEADER TRUE


     FORMAT ALL columns in google sheets then download and use this. 
     Test on 3 lines first
     delete using vim using dG
     \COPY treedata FROM '/Users/aa/Desktop/APPS/wtt/wtt_server/server/db/Alameda_street_trees_clean_min.csv' DELIMITER ',' CSV HEADER;

\COPY treedata [ ( column_name [, ...] ) ]
    FROM { 'filename' | STDIN }
    [ [ WITH ] ( option [, ...] ) ]

COPY { table_name [ ( column_name [, ...] ) ] | ( query ) }
    TO { 'filename' | STDOUT }
    [ [ WITH ] ( option [, ...] ) ]

where option can be one of:

    FORMAT format_name
    OIDS [ boolean ]
    DELIMITER 'delimiter_character'
    NULL 'null_string'
    HEADER [ boolean ]
    QUOTE 'quote_character'
    ESCAPE 'escape_character'
    FORCE_QUOTE { ( column_name [, ...] ) | * }
    FORCE_NOT_NULL ( column_name [, ...] )
    ENCODING 'encoding_name'
