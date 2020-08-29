use employee;
INSERT INTO department
(name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');
INSERT INTO role
(title, salary, department_id)
VALUES
("Accountant", 80000, 2),
("Eningeer", 95000, 1),
("Lawyer", 120000, 3),
("Sales Representitive", 60000, 4);
INSERT INTO employee
(first_name, last_name, role_id, manager_id)