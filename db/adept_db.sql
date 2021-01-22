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
    salary DECIMAL (10,4),
    department INT REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT NOT NULL REFERENCES role(id),
    manager_id INT REFERENCES role(id),
    PRIMARY KEY(id)
);