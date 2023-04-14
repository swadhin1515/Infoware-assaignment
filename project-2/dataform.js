import request from 'request';
//import * from "./employee.js";

function createEmployee(name, email, phone, callback) {
    const options = {
        url: 'https://www.formpl.us/form/4888924118974464',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-api-key'
        },
        json: {
            'name': name,
            'email': email,
            'phone': phone
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            callback(error);
        } else {
            console.log(body);
            callback(null, body);
        }
    });
}

function updateEmployee(id, name, email, phone, callback) {
    const options = {
        url: `https://www.formpl.us/form/4888924118974464/${id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer your-api-key'
        },
        json: {
            'name': name,
            'email': email,
            'phone': phone
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            callback(error);
        } else {
            console.log(body);
            callback(null, body);
        }
    });
}

function deleteEmployee(id, callback) {
    const options = {
        url: `https://www.formpl.us/form/4888924118974464/${id}`,
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer your-api-key'
        }
    };

    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            callback(error);
        } else {
            console.log(body);
            callback(null, body);
        }
    });
}
// Create Employee
app.post('/employees', (req, res) => {
    const { name, email, phone } = req.body;
    createEmployee(name, email, phone, (err, result) => {
        if (err) {
            res.status(500).send('Error creating employee');
        } else {
            res.send('Employee created successfully');
        }
    });
});

// Update Employee
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    updateEmployee(id, name, email, phone, (err, result) => {
        if (err) {
            res.status(500).send('Error updating employee');
        } else {
            res.send('Employee updated successfully');
        }
    });
});

// Delete Employee
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    deleteEmployee(id, (err, result) => {
        if (err) {
            res.status(500).send('Error deleting employee');
        } else {
            res.send('Employee deleted successfully');
        }
    });
});

//  List Employee create form
app.get('/employees', (req, res) => {
    const options = {
        url: 'https://www.formpl.us/form/4888924118974464',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer your-api-key'
        }
    };
    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error getting employees');
        } else {
            const employees = JSON.parse(body).responses.map(response => {
                return {
                    id: response.id,
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone
                };
            });
            res.send(employees);
        }
    });
});

// Get Employee
app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    const options = {
        url: `https://www.formpl.us/form/4888924118974464/${id}`,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer your-api-key'
        }
    };
    request(options, (error, response, body) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error getting employee');
        } else {
            const employee = {
                id: JSON.parse(body).id,
                name: JSON.parse(body).data.name,
                email: JSON.parse(body).data.email,
                phone: JSON.parse(body).data.phone
            };
            res.send(employee);
        }
    });
});