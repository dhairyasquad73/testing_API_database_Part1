const { count } = require('console');
const express = require('express');
const { resolve } = require('path');

const students = require('./data.json')
const app = express();
const port = 3010;

app.use(express.json());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/students/threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number') {
    return res.status(400).json({
      error: "Please provide a valid number."
    });
  }

  const filteredStudents = students.filter(student => student.total > threshold);

  const response = {
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({
      name: student.name,
      total: student.total
    }))
  };
  
  res.json(response);
}); 


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


