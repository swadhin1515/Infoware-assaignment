import { createConnection } from 'mysql';

// create a connection
const connection = createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'my-db'
});

// connect to the database
connection.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('Connected to the database!');
});

// execute a query
connection.query('SELECT * FROM employees', (error, results, fields) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log(results);
});

// close the connection
connection.end();