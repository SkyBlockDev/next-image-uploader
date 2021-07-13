import dbConnect from '../../src/middleware/mongodb';
import Image from '../../src/api/db/ImageUrl';
import initMiddleware from '../../src/middleware/init-middleware';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
const upload = multer();
export const config = {
	api: {
		bodyParser: false,
	},
};
const multerAny = initMiddleware(upload.any());

export default async function handler(req: any, res: any) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'POST':
			try {
				await multerAny(req, res);

				if (!req.files?.length || req.files.length > 1) {
					return res.status(405).json({ message: 'No formdata' });
				}
				const blob = req.files[0];
				if (!blob.buffer)
					return res.status(405).json({ message: 'No formdata' });

				const makeId = async function (): Promise<string> {
					const uuid = uuidv4().split('').slice(0, 5).join('');
					const found = await Image.findOne({ alias: uuid });
					if (found && found._id) {
						return makeId();
					}
					return uuid;
				};

				const image = await Image.create({
					data: blob.buffer,
					alias: await makeId(),
					style: req.headers?.style?.toString()?.slice(0, 5),
					name: req.headers?.name?.toString()?.slice(0, 10),
				});

				res.status(201).json({
					success: true,
					url: `${process.env.URL || 'http://localhost:3000'}/${image.alias}`,
					delete: `${process.env.URL || 'http://localhost:3000'}/api/delete/${
						image._id
					}`,
				});
			} catch (error) {
				res.status(400).json({ success: false, error });
			}
			break;
		default:
			res.status(400).json({ success: false, message: 'Only post requests' });
			break;
	}
}
