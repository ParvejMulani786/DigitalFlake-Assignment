const mongoose = require("mongoose");
const Joi = require("joi");


const categorySchema = new mongoose.Schema({
	categoryName: { type: String, required: true },
	description: { type: String, required: true },
	status: { type: String, required: true },
});


const Category = mongoose.model("category", categorySchema);

const validate = (data) => {
	const schema = Joi.object({
		categoryName: Joi.string().required().label("Category Name"),
		description: Joi.string().required().label("Description"),
		status: Joi.string().required().label("Status"),
	});
	return schema.validate(data);
};

module.exports = { Category, validate };