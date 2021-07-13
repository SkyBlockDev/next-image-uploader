import dbConnect from '../../src/middleware/mongodb';
import Image from '../../src/api/db/ImageUrl';

const GetImage = async (req: any, res: any) => {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const image = await Image.findOne({ alias: id });

				if (!image) {
					return res.status(400).json({ success: false });
				}

				res.status(200).send(image);
			} catch (error) {
				res.status(400).json({ success: false, error: error });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
export default GetImage;
