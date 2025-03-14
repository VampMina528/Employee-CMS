import inquirer from 'inquirer';
import { closedDb, connectToDb } from './employee.js';

async function employeeTracker() {
  const db = await connectToDb();

  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an action:',
      choices: [
        'View All Departments',
        'Add a Department',
        'View All Employees',
        'View All Roles',
        'Add a Role',
        'Add Employee',
        'Update Employee Role',
        'Exit',
      ],
    },
  ]).then(async (answers) => {
    try {
      if (answers.action === 'View All Departments') {
        await viewDepartments(db);
      } else if (answers.action === 'View All Employees') {
        await viewEmployees(db);
      } else if (answers.action === 'View All Roles') {
        await viewRoles(db);
      } else if (answers.action === 'Add Employee') {
        await addEmployee(db);
      } else if (answers.action === 'Update Employee Role') {
        await updateEmployeeRole(db);
      } else if (answers.action === 'Exit') {
        console.log('Thanks for visiting');
        closedDb();
        return;
      }
    } catch (error) {
      console.error('Error', error);
    }

  });
}

async function viewDepartments(db: any) {
  try {
    const res = await db.query('SELECT * FROM departments');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching departments:', err);
  }
  employeeTracker();
}

async function viewEmployees(db: any) {
  try {
    const res = await db.query('SELECT * FROM employees');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
  employeeTracker();
}

async function viewRoles(db: any) {
  try {
    const res = await db.query('SELECT * FROM roles');
    console.table(res.rows);
  } catch (err) {
    console.error('Error fetching roles:', err);
  }
  employeeTracker();
}

async function addEmployee(db: any) {
  const res = await db.query('SELECT * FROM roles');
  const roles = res.rows.map((r:any) =>{
    return {
      value:r.id,
      name:r.title
    }
  })
  inquirer.prompt([
    { type: 'input', name: 'firstName', message: "Enter employee's first name:" },
    { type: 'input', name: 'lastName', message: "Enter employee's last name:" },
    { type: 'list', name: 'roleId', message: "Enter employee's role ID:", choices: roles},
    { type: 'input', name: 'managerId', message: "Enter manager's ID (or leave blank for none):" },
  ]).then(async (answers) => {
    try {
      await db.query(
        'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [answers.firstName, answers.lastName, answers.roleId, answers.managerId || null]
      );
      console.log('Employee added successfully!');
    } catch (err) {
      console.error('Error adding employee:', err);
    }
    employeeTracker();
  });
}

async function updateEmployeeRole(db: any) {
  try {
    const employees = await db.query('SELECT id, first_name, last_name FROM employees');
    const employeeChoices = employees.rows.map((emp: { first_name: any; last_name: any; id: any; }) => ({
      name: `${emp.first_name} ${emp.last_name}`,
      value: emp.id,
    }));

    const roles = await db.query('SELECT id, title FROM roles');
    const roleChoices = roles.rows.map((role: { title: any; id: any; }) => ({
      name: role.title,
      value: role.id,
    }));

    inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select an employee to update:',
        choices: employeeChoices,
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role:',
        choices: roleChoices,
      },
    ]).then(async (answers) => {
      try {
        await db.query('UPDATE employees SET role_id = $1 WHERE id = $2', [answers.roleId, answers.employeeId]);
        console.log('Employee role updated');
      } catch (err) {
        console.error('Error updating role:', err);
      }
      employeeTracker();
    });
  } catch (err) {
    console.error('Error fetching data:', err);
  }

}

employeeTracker();
