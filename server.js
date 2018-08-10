const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

app.post('/api/shows', async (req, res) => {
	try {
		const response = await fetch(
			`https://rest.bandsintown.com/artists/${req.body.items[0].name
				.replace(/\s+/g, '')
				.replace(/\./g, '')
				.toLowerCase()}/events?app_id=5edfb100a7e4e77bd4658d1184623cbf`
		);
		const show = await show.json();
		return show;
	} catch (err) {
		res.send(err);
	}

	// const _res = req.body.items.forEach(artist =>
	// fetch(
	// 	`https://rest.bandsintown.com/artists/${req.body.items[0].name
	// 		.replace(/\s+/g, '')
	// 		.replace(/\./g, '')
	// 		.toLowerCase()}/events?app_id=5edfb100a7e4e77bd4658d1184623cbf`
	// ).then(__res => {
	// 	// arr.push
	// 	res.send(__res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
