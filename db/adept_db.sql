DROP DATABASE IF EXISTS adept_db;

CREATE DATABASE adept_db;

USE adept_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL (10,2),
    department INT REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT REFERENCES role(id),
    manager_id INT REFERENCES role(id),
    PRIMARY KEY(id)
);

INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Harry", "Potter", 1 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Sansa", "Stark", 2 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Samwise", "Gamgee", 3 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Winston", "Churchill", 4 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Lord", "Buckethead", 5 );
INSERT INTO employee ( first_name, last_name, role_id)
VALUES ( "Darn", "Tootin", 5 );

INSERT INTO role ( title, salary )
VALUES ( "Wizard", "25000.00" );
INSERT INTO role ( title, salary )
VALUES ( "Queen", "120000.00" );
INSERT INTO role ( title, salary )
VALUES ( "Hero", "50000.00" );
INSERT INTO role ( title, salary )
VALUES ( "Prime Minister", "80000.00" );
INSERT INTO role ( title, salary )
VALUES ( "Weirdo", "95000.00" );

INSERT INTO department ( name )
VALUES ( "Those Who Run on the Wind" );
INSERT INTO department ( name )
VALUES ( "They Who See without Knowing" );
INSERT INTO department ( name )
VALUES ( "Many Who Walk without Standing" );
INSERT INTO department ( name )
VALUES ( "Cellection of Those Who Sing without Speaking" );
INSERT INTO department ( name )
VALUES ( "Strange People" );