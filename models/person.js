const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URI;

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('connected to MongoDB');
	})
	.catch((err) => {
		console.log('error connecting to MongoDB: ', err.message);
	});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		unique: true
	},
	number: {
		type: String,
		minlength: 7,
		required: true
	}
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Person', personSchema);
