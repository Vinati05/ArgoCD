const express = require('express');
const app = express();
app.use(express.json());

let students = [
    { id: 1, name: 'abc', department: 'CSE'},
    { id: 2, name: 'def', department: 'AIML'}
]
app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

app.get('/students', (req, res) => {
    res.status(200).json(students);
});

app.post('/students', (req, res) => {
    const student = { id: students.length + 1, ...req.body };
    students.push(student);
    res.status(201).json(student);
});

app.put('/students/:id', (req, res) => {
   const index = students.findIndex(s => s.id === Number(req.params.id));
   if (index === -1){
    res.status(404).send('Student not found');
    return;
   }
   students[index] = {id: Number(req.params.id), ...req.body};
   res.send(students[index]);
});

app.delete('/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id === Number(req.params.id));
    if (index === -1){
        res.status(404).send('Student not found');
        return;
    }
    students.splice(index,1);
    res.send('Student deleted');
})

if(require.main === module) {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}

module.exports = app;
