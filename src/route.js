const {
	addNoteHandler,
	getAllNotesHandler,
	getNoteByIdHandler,
	changeNoteHandler,
	deletNoteHandler,
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/notes',
		handler: addNoteHandler,
	},
	{
		method: 'GET',
		path: '/notes',
		handler: getAllNotesHandler,
	},
	{
		method: 'GET',
		path: '/notes/{id}',
		handler: getNoteByIdHandler,
	},
	{
		method: 'PUT',
		path: '/notes/{id}',
		handler: changeNoteHandler,
	},
	{
		method: 'DELETE',
		path: '/notes/{id}',
		handler: deletNoteHandler,
	},
];

module.exports = routes;
