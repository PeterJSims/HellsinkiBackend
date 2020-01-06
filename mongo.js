const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://Peter123:${password}@cluster0-3npsp.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = {
	name: String,
	number: String
};

const Person = mongoose.model('Person', personSchema);

const person = new Person({
	name: process.argv[3],
	number: process.argv[4]
});

// person.save().then((result) => {
// 	console.log('saved');
// 	mongoose.connection.close();
// });

Person.find({}).then((result) => {
	result.forEach((person) => {
		console.log(person);
	});
	mongoose.connection.close();
});
