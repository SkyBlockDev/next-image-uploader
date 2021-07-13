import mongoose from 'mongoose';
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const image = new Schema(
	{
		data: {
			type: Buffer,
			required: true,
		},
		alias: {
			type: String,
			required: true,
			unique: true,
		},
		style: {
			type: String,
		},
		name: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.models.Image || mongoose.model('Image', image);
