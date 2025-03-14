# Employee Tracker

## Description
The Employee Tracker is a command-line application designed to help businesses manage their employee database efficiently. Built using Node.js, Inquirer, and PostgreSQL, this tool allows users to view and manage departments, roles, and employees within a company.

## Features
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

## Technologies Used
- Node.js
- PostgreSQL
- Inquirer (v8.2.4)
- pg (PostgreSQL package)
- dotenv

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd employee-tracker
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up the database:
   - Ensure you have PostgreSQL installed and running.
   - Create a database and import the schema using:
     ```sh
     psql -U <your-username> -d <your-database-name> -f schema.sql
     ```
5. Configure environment variables:
   - Create a `.env` file in the root directory and add your PostgreSQL credentials:
     ```sh
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_NAME=your_database_name
     DB_HOST=localhost
     DB_PORT=5432
     ```
6. Start the application:
   ```sh
   npm start
   ```

## Usage
1. Run the application using:
   ```sh
   npm start
   ```
2. Use the interactive menu to view, add, or update departments, roles, and employees.

## Database Schema
The database includes the following tables:
- **department**: Contains department names and their unique IDs.
- **role**: Contains job titles, salaries, and associated department IDs.
- **employee**: Contains employee names, roles, and managers.

## Walkthrough Video
A walkthrough video demonstrating the functionality of the application can be found here:
[Walkthrough Video](<video-url>)

## Contribution
Contributions are welcome! If you'd like to improve the project, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out via GitHub: [GitHub Repository](https://github.com/VampMina528/Employee-Tracker)