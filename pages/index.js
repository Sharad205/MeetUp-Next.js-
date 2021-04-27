import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				<title>Yr Meetups</title>
				<meta
					name="description"
					content="Browse a huge list of highly active React meetups!"
				/>
			</Head>
			<MeetupList meetups={props.meetups} />;
		</Fragment>
	);
}

export async function getStaticProps() {
	// fetch data from an API
	const client = await MongoClient.connect(
		"mongodb+srv://SharadVala205:Sharad291@cluster0.p4ad3.mongodb.net/meetups?retryWrites=true&w=majority"
	);
	const db = client.db();

	const meetupsCollection = db.collection("meet");

	const meets = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meets.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
