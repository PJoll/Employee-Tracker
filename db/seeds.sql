INSERT INTO department_db.department
    (department_name)
VALUES
    ('Legal'),
    ('Finance'),
    ('Sales'),
    ('Socials');

INSERT INTO department_db.roles (department_id, title, salary )
VALUES
    (1, " Head Lawyer", 150000),
    (1, 'junior Lawyer', 100000),
    (2, 'Finance Manager', 130000),
    (2, 'Accountant', 100000),
    (3, 'Sales manager', 90000),
    (3, ' Sales team member', 65000),
    (4, 'Socials manager', 85000),
    (4, 'Socials team member', 60000);


INSERT INTO department_db.employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Deer', 1, 10),
    ('Chantelle', 'Hampton', 2, 5),
    ('Korey', 'Bentley', 3, 10),
    ('Dani', 'Bannister', 4, 6),
    ('Brian', 'Gough', 5, 10),
    ('Yasir', 'Richardson', 6, 7),
    ('Zahara ', 'Chadwick', 7, 10),
    ('Hunter', 'Lake', 8, 8);
