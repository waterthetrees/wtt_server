// Schema created by Wes Warren, Ajay Anand, Victoria Tan, Rose Meyers, Steve


const env = process.argv[2] || 'dev';
const { Pool, Client } = require('pg');
const util = require('util');
const { configTreeDB } = require("./config_treedb.js");

const pool = new Pool(configTreeDB);
// planted, ref, who, lng, lat, common, scientific, owner, 
//       address, city, state, zip, neighborhood, health, notes, status

const queryStrings = [
  `CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL NOT NULL PRIMARY KEY,
    volunteer VARCHAR(255),
    nickname VARCHAR(255),
    name VARCHAR(255),
    picture VARCHAR(255),
    email VARCHAR(255),
    zipcode VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,
  //   ALTER TABLE treedata RENAME planted TO date_planted;
  //   ALTER TABLE treedata RENAME planted_by_email TO email;
  // ALTER TABLE treedata ADD COLUMN planted_by_email VARCHAR(255) REFERENCES users(email);
  // ALTER TABLE treedata ADD FOREIGN KEY(planted_by_email) REFERENCES users(email);
  // ALTER TABLE treedata ADD FOREIGN KEY(playted_by_id_user) REFERENCES users(id_user);
  // ALTER TABLE treedata ADD FOREIGN KEY(planted_by_nickname) REFERENCES users(nickname);
  // ALTER TABLE treedata ADD FOREIGN KEY(planted_by_name) REFERENCES users(name);
  // CONSTRAINT fk_treedata FOREIGN KEY(id_tree) REFERENCES treedata(id_tree)

  // ALTER TABLE treedata ADD COLUMN planted_by_email VARCHAR(255)
  `ALTER TABLE users ADD COLUMN private BOOLEAN NOT NULL DEFAULT FALSE;`,
  // CONSTRAINT planted_by_email_fk REFERENCES users(email)
  // ON UPDATE CASCADE ON DELETE CASCADE;
  // ALTER TABLE treedata DROP COLUMN planted_by_email;
  // ALTER TABLE users ADD CONSTRAINT users unique(email);
  // ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
  // ALTER TABLE users ALTER COLUMN email SET NOT NULL;

  // ALTER TABLE treedata ADD COLUMN planted_by_email VARCHAR(255) REFERENCES users(email);
  // ALTER TABLE treedata ADD COLUMN planted_by_nickname VARCHAR(255) REFERENCES users(nickname);
  // ALTER TABLE users ADD COLUMN email VARCHAR(255) REFERENCES users(email);
  // ALTER TABLE treedata ADD FOREIGN KEY (planted_by_nickname) REFERENCES users(nickname);

  // ALTER TABLE treedata ADD COLUMN id_tree bigint GENERATED BY DEFAULT AS IDENTITY;
  // ALTER TABLE treedata 
  //     ALTER id_tree SET NOT NULL,
  //     ALTER id_tree ADD GENERATED ALWAYS AS IDENTITY 
  //         (START WITH 3000);

  //         ALTER TABLE treehistory 
  //         ALTER id_treehistory SET NOT NULL,
  //         ALTER id_treehistory ADD GENERATED ALWAYS AS IDENTITY 
  //             (START WITH 3000);

  //             ALTER TABLE users 
  //         ALTER id_user SET NOT NULL,
  //         ALTER id_user ADD GENERATED ALWAYS AS IDENTITY 
  //             (START WITH 350);

  //             alter table users alter column id_users drop default;

  // ALTER TABLE users ADD COLUMN updated_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;

  // CREATE TRIGGER users_moddatetime
  //   BEFORE UPDATE ON users
  //   FOR EACH ROW
  //   EXECUTE PROCEDURE moddatetime (updated_at);

  //   CREATE OR REPLACE FUNCTION update_modified_column()   
  //   RETURNS TRIGGER AS $$
  //   BEGIN
  //       NEW.modified = now();
  //       RETURN NEW;   
  //   END;

  //   $$ language 'plpgsql';

  //   CREATE TRIGGER update_users_modtime BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE  update_modified_column();

  //   CREATE TRIGGER update_treedata_modtime BEFORE UPDATE ON treedata FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
  //   CREATE TRIGGER update_treehistory_modtime BEFORE UPDATE ON treehistory FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

  // id_treehistory integer REFERENCES treehistory(id_treehistory),
  // id_tree integer REFERENCES treehistory(id_tree)


  // `CREATE TABLE IF NOT EXISTS volunteers(
  //   id_volunteer SERIAL NOT NULL PRIMARY KEY,
  //   name VARCHAR(255),
  //   email VARCHAR(255),
  //   zipcode VARCHAR(255),
  //   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  // );`,

  // `CREATE TABLE IF NOT EXISTS treehistory_comment(
  //   id_treehistory_comment SERIAL NOT NULL PRIMARY KEY,
  //   treeaction_comment VARCHAR(255),
  //   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  // );`,

  // `CREATE TABLE IF NOT EXISTS treehistory_action(
  //   id_treehistory_action SERIAL NOT NULL PRIMARY KEY,
  //   treehistory_action_name VARCHAR(255),
  //   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  // );`,

  // `CREATE TABLE IF NOT EXISTS treehistory(
  //   id_treehistory SERIAL NOT NULL PRIMARY KEY,
  //   id_treehistory_action integer REFERENCES treehistory_action(id_treehistory_action),
  //   id_treehistory_comment integer REFERENCES treehistory_comment(id_treehistory_comment),
  //   id_volunteer integer REFERENCES volunteers(id_volunteer),
  //   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  // );`,



  // {
  //   description: "Creating treedata table",
  //   apply: true,
  //   queryString: `CREATE TABLE IF NOT EXISTS treedata (
  //   id_tree INT GENERATED BY DEFAULT AS IDENTITY,
  //   id_wtt VARCHAR(255),
  //   ref VARCHAR(255),
  //   who VARCHAR(255),
  //   common VARCHAR(255),
  //   scientific VARCHAR(255),
  //   genus VARCHAR(255),
  //   lng FLOAT8,
  //   lat FLOAT8,
  //   planted TIMESTAMP,
  //   address VARCHAR(255),
  //   city VARCHAR(255),
  //   state VARCHAR(255),
  //   zip VARCHAR(255),
  //   country VARCHAR(255),
  //   side_type VARCHAR(255),
  //   neighborhood VARCHAR(255),
  //   health VARCHAR(255),
  //   dbh VARCHAR(255),
  //   height VARCHAR(255),
  //   owner VARCHAR(255),
  //   url VARCHAR(255),
  //   urlimage VARCHAR(255),
  //   status VARCHAR(255),
  //   notes TEXT,
  //   planting_opt1_common VARCHAR(255),
  //   planting_opt1 VARCHAR(255),
  //   planting_opt2 VARCHAR(255),
  //   planting_opt3 VARCHAR(255),
  //   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  //   PRIMARY KEY(id_tree),
  //   UNIQUE (who, ref, lng, lat, common) -- TODO: victoria: there seem to be actual duplicates that violate this constraint. is this constraint false?
  // );`,
  // },
  // {
  //   description: "Creating treehistory table",
  //   apply: true,
  //   queryString: `CREATE TABLE IF NOT EXISTS treehistory(
  //   id_treehistory INT GENERATED BY DEFAULT AS IDENTITY,
  //   id_tree integer,
  //   watered VARCHAR(255),
  //   mulched VARCHAR(255),
  //   pruned VARCHAR(255),
  //   staked VARCHAR(255),
  //   braced VARCHAR(255),
  //   weeded VARCHAR(255),
  //   comment TEXT,
  //   volunteer VARCHAR(255),
  //   date_visit TIMESTAMP, -- equal to created_at for non-seed entries
  //   created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- For manual debugging use only
  //   PRIMARY KEY(id_treehistory),
  //   CONSTRAINT fk_treedata FOREIGN KEY(id_tree) REFERENCES treedata(id_tree)
  // );`,
  // },

];

const queried = queryStrings.map(queryString => {
  pool.query(queryString, (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);

  });
})
pool.end();
console.log(queried);

// SELECT * FROM volunteer.columns
// WHERE table_schema = 'volunteer'
// AND TABLE_NAME = 'volunteer';

// SELECT * FROM trees.treedata WHERE schemaname == 'treedata';

// To check table was created
// psql trees
// \dt


// SELECT d.objid:: regclass
// FROM pg_depend AS d
// JOIN pg_attribute AS a ON d.refobjid = a.attrelid AND
// d.refobjsubid = a.attnum
// WHERE d.classid = 'pg_class':: regclass
// AND d.refclassid = 'pg_class':: regclass
// AND d.deptype <> 'i'
// AND a.attname = 'id_treehistory'
// AND d.refobjid = 'treehistory':: regclass;

// alter TABLE users alter column id_user drop default ;
// alter TABLE users alter column id_user add generated by default as identity;

// ALTER TABLE users ALTER COLUMN id_user RESTART WITH 351;
// ALTER TABLE users ALTER id_user ADD GENERATED ALWAYS AS IDENTITY(START WITH 350);