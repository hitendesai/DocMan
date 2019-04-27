import 'idempotent-babel-polyfill'
import http from 'http'
import api from './api'
import config from './config'
import { ErrorHandlerService, EsProxy, StorageService } from './services'
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const app = express();
const cors = require('cors');


const createLogRecord = (type, message) => ({
	type: type,
	source_id: 'webapi',
	message: message
})

app.server = http.createServer(app)

app.use(cors({
	credentials: true,
	methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
	origin: true
}))

// Bodyparser middleware
app.use(
	bodyParser.urlencoded({
	extended: false
	})
  );
app.use(bodyParser.json());

  // DB Config
  const db = require("./config/keys").mongoURI;

  // Connect to MongoDB
mongoose
	.connect(
	db,
	{ useNewUrlParser: true }
	)
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());

  // Passport config
require("./config/passport")(passport);

  // Routes
app.use("/api/users", users);

// connect to storage
StorageService.initializeStorage()
	.then((storage) => {
		app.use('/api', api({ config, storage }))
		app.use(ErrorHandlerService(storage.elasticSearch))
		app.server.listen(process.env.PORT || config.localPort)

		//eslint-disable-next-line no-console
		console.log(`Started on ${app.server.address().address}:${app.server.address().port}`)

		EsProxy.indexLogItem(
			storage.elasticSearch,
			createLogRecord('info', `Started on ${app.server.address().address}:${app.server.address().port}`)
		)
	})
	.catch((err) => {
		//eslint-disable-next-line no-console
		console.log('Catastrophic failure!', err)
		process.exit(1)
	})

export default app