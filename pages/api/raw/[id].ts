import dbConnect from '../../../src/middleware/mongodb';
import Image from '../../../src/api/db/ImageUrl';

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
				let contentType;
				switch (Buffer.from(image.data).toString('base64').charAt(0)) {
					case '/':
						contentType = 'image/jpeg';
						break;
					case 'i':
						contentType = 'image/png';
						break;
					case 'R':
						contentType = 'image/gif';
						break;
					case 'U':
						contentType = 'image/webp';
						break;
				}
				res.setHeader('Content-Type', contentType);
				res.status(200, { 'Content-Type': contentType }).send(image.data);
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
