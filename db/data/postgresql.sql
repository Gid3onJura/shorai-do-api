CREATE table if not Exists dojos (
   id SERIAL PRIMARY KEY,
   dojo_name VARCHAR(100) NOT NULL
);

--
-- Table structure for table  ranks 
--

CREATE table if not Exists ranks (
   rank smallint(3) NOT NULL,
   category varchar(10) NOT NULL,
   color varchar(10) NOT NULL,
   user smallint(5) NOT NULL,
   createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
   graduatedOn timestamp NOT NULL,
  PRIMARY KEY ( rank , category , user )
);

--
-- Table structure for table  users 
--

CREATE table if not Exists users  (
   id SERIAL PRIMARY KEY,
   nickname varchar(100) NOT NULL,
   email varchar(100) DEFAULT NULL,
   dojo smallint(3) NOT NULL DEFAULT 1,
   password varchar(255) NOT NULL,
   createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(),
   activated smallint(1) NOT NULL DEFAULT 0,
   updatedAt timestamp DEFAULT NULL,
  UNIQUE KEY nickname  ( nickname ),
  KEY  user_FK ( dojo ),
  FULLTEXT KEY user_nickname_IDX  ( nickname ),
  CONSTRAINT user_FK  FOREIGN KEY ( dojo ) REFERENCES  dojos ( id )
);

