import { MongoClient } from "mongodb";

async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;

		const client = await MongoClient.connect(
			"mongodb+srv://SharadVala205:Sharad291@cluster0.p4ad3.mongodb.net/meetups?retryWrites=true&w=majority"
		);
		const db = client.db();

		const meetupsCollection = db.collection("meet");

		const result = await meetupsCollection.insertOne(data);

		client.close();

		res.status(201).json({ message: "Meetup inserted!" });
	}
}

export default handler;
