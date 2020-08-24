const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const connection = require('./database');
const app = express();

const PORT = 3002;

app.use(cors());
app.use(bodyParser());

app.get('/', (req, res) => {
  res.send('Server is running!!');
})

app.get('/generateToken', (req, res) => {

  const payload = { useId: 2312, email: 'test@gmail.com' };

  const token = jwt.sign(payload, '9eUoSpQLFUmzodqXAu5o+Q==', { expiresIn: '1M' });


  res.send(`Token generated: ${token}`);
})

app.get('/verifyToken', (req, res) => {
  const token = '';

  const result = jwt.verify(token, '9eUoSpQLFUmzodqXAu5o+Q==');

  console.log("result...", result);
  res.send('Result...' + result);
})

app.get('/course.json', (req, res) => {

  connection.pool.query('SELECT * FROM course', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);

    res.send(results)
  });

  // axios.get(`https://react-hook-lms.firebaseio.com/course.json?auth=key`)
  //   .then(response => {
  //     res.send(response.data);
  //   })
  //   .catch(err => {
  //     throw err;
  //   });
})

app.post('/course.json', (req, res) => {

  console.log("Data....", req.body);
  const course = req.body.course;

  const VALUES = [[course.courseName, course.category, course.subCategory, course.fees]]
  connection.pool.query('INSERT INTO COURSE (name, category_id, subCategory_id, price) VALUES ?', [VALUES], function (error, results, fields) {
    if (error) throw error;

    res.send("Query executed Successfully");
  })
})

app.get('/testMySql', (req, res) => {

  connection.pool.query('SELECT * FROM course', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);

    res.send('Executed MySql Statement')
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})