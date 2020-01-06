const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const generateId = () => {
	return Math.floor(Math.random() * 100000);
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
	},
	{
		name: 'Peter Sims',
		number: '555-5555',
		id: 5
	}
];

app.get('/', (req, res) => {
	res.send('<h1>Hello world!</h1>');
});

app.get('/persons', (req, res) => {
	res.json(persons);
});

app.get('/info', (req, res) => {
	res.send(`<div><p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p></div>`);
});

app.get('/persons/:id', (req, res) => {
	let id = Number(req.params.id);
	const person = persons.find((person) => person.id === id);
	res.json(person);
});

app.post('/persons', (req, res) => {
	if (!req.body.name || !req.body.number) {
		return res.status(400).json({ error: 'content missing' });
	}

	if (persons.some((person) => person.name === req.body.name)) {
		return res.status(400).json({ error: 'entry already exists' });
	}

	const person = {
		name: req.body.name,
		number: req.body.number,
		id: generateId()
	};

	persons = persons.concat(person);
	res.json(person);
});

app.delete('/persons/:id', (req, res) => {
	let id = Number(req.params.id);
	persons = persons.filter((person) => person.id !== id);

	res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
