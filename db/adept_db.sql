DROP DATABASE IF EXISTS adept_db;

CREATE DATABASE adept_db;

USE adept_db;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    -- INT referance to each employee role
    -- INT referances the manager ID of this employee, can be NULL
    PRIMARY KEY(id)
);


--   - **role_id** - INT to hold reference to role employee has
--   - **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager


CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL (10,4),
    -- referance to the department each role belongs to
    PRIMARY KEY(id)
);


--   - **department_id** - INT to hold reference to department role belongs to