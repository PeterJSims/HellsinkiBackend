const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const generateId = () => {
	return Math.floor(Math.random() * 500);
};

let persons = [
	{
		name: 'Arto Hellas',
		number: '040-123456',
		id: 1
	},
	{
		name: 'Ada Lovelace',
		number: '39-44-5323523',
		id: 2
	},
	{
		name: 'Dan Abramov',
		number: '12-43-234345',
		id: 3
	},
	{
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
		id: 4
	}
];

app.use(bodyParser.json());

app.get('/info', (req, res) => {
	res.send(`
    <div>
    Phonebook has info for ${persons.length} people
    </div>
    <br>
    <div>
    ${Date()}
    </div>`);
});

app.get('/api/persons', (req, res) => {
	res.send(persons);
});

app.get('/api/persons/:id', (req, res) => {
	let id = Number(req.params.id);

	const person = persons.find((person) => person.id === id);

	if (person) {
		res.json(person);
	} else {
		res.status(404).send('Entry not found').end();
	}
});

app.post('/api/persons', (req, res) => {
	const body = req.body;
	console.log(body);
	if (!body.name) {
		return res.status(400).json({ error: 'content missing' });
	}

	const person = {
		name: body.name,
		number: body.number,
		// date: new Date(),
		id: generateId()
	};

	persons = persons.concat(person);

	res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
	let id = Number(req.params.id);

	persons = persons.filter((person) => person.id !== id);

	res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
