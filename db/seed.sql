INSERT INTO departments (name) 
VALUES
    ('Guitar Engineering'),
    ('Rock Finance'),
    ('Metal Resources'),
    ('Rock Stars');

INSERT INTO roles (title, salary, department_id) 
VALUES
    ('Guitar Engineer', 80000, 1),
    ('Senior Rock Engineer', 100000, 1),
    ('Accountant', 75000, 2),
    ('Metal Manager', 90000, 3),
    ('Rock Star Representative', 60000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES
    ('Jimi', 'Hendrix', 1, NULL),
    ('Zakk', 'Wylde', 2, 1),
    ('Eddie', 'VanHalen', 3, NULL),
    ('Randy', 'Rhoads', 4, NULL),
    ('Andy', 'LaRoque', 5, NULL);
