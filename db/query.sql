SELECT department.department_name AS departmewnt, roles.salary
FROM roles
LEFT JOIN department
ON roles.department_id = department.id
ORDER BY department.department_name