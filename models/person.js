const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

console.log('connecting to', url);

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => console.log('error connecting', error));

const personSchema = {
	name: String,
	number: String
};

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Person', personSchema);
