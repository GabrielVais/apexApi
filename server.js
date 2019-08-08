const express = require('express');

const morgan = require('morgan');

const dotenv = require('dotenv');


//Load env
dotenv.config({

	path: './config.env'

});

const app = express();


//Dev loging

if(process.env.NODE_ENV === 'development'){

	app.use(morgan('dev'));

}


//HANDLE PRODUCTION
if(process.env.NODE_ENV === 'production'){


	//SET STATIC FOLDER
	app.use(express.static(__dirname + '/public/'));

	//HANDLE SPA

	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

}


//Profile routes
app.use('/api/v1/profile', require('./routes/profile'));

const port = process.env.PORT || 6000;


app.listen(5000, () => {

	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);

});
