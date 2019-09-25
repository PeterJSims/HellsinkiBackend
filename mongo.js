const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://Peter123:${password}@cluster0-3npsp.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
	name: String,
	number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length <= 3) {
	Person.find({}).then((res) => {
		res.forEach((person) => {
			console.log(person);
			mongoose.connection.close();
		});
	});
} else {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4]
	});
	person.save().then(() => {
		mongoose.connection.close();
	});
}
