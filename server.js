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

app.post('/api/shows', (req, res) => {
	debugger;
	const _res = req.body.items.map(artist =>
		fetch(
			`https://rest.bandsintown.com/artists/${artist.name
				.replace(/\s+/g, '')
				.replace(/\./g, '')
				.toLowerCase()}/events?app_id=5edfb100a7e4e77bd4658d1184623cbf`
		)
	);
	console.log(req.body);
	res.send(_res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
