const { nanoid } = require('nanoid');

const notes = require('./notes');

const addNoteHandler = (request, h) => {
	const { title, tags, body } = request.payload;
	const id = nanoid(16);
	const createdAt = new Date().toISOString();
	const updateAt = createdAt;

	const newNote = {
		title,
		tags,
		body,
		id,
		createdAt,
		updateAt,
	};

	notes.push(newNote);

	const succes = notes.filter((note) => note).length > 0;

	if (succes) {
		const response = h.response({
			status: 'success',
			message: 'Note Berhasil Ditambahkan',
			data: {
				noteid: id,
			},
		});
		response.code(201);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'Catatan gagal untuk ditambahkan',
	});
	response.code(500);
	return response;
};

const getAllNotesHandler = () => ({
	status: 'succes',
	data: {
		notes,
	},
});

const getNoteByIdHandler = (request, h) => {
	const { id } = request.params;
	const note = notes.filter((n) => n.id === id)[0];

	if (note !== undefined) {
		return {
			status: 'success',
			data: {
				note,
			},
		};
	}

	const response = h.response({
		status: 'fail',
		message: 'Catatan tidak ditemukan',
	});
	response.code(404);
	return response;
};

const changeNoteHandler = (request, h) => {
	const { id } = request.params;
	const { title, tags, body } = request.payload;
	const updateAt = new Date().toISOString();

	const index = notes.findIndex((note) => note.id === id);

	if (index !== -1) {
		notes[index] = {
			...notes[index],
			title,
			tags,
			body,
			updateAt,
		};
		const response = h.response({
			status: 'Success',
			message: 'Catatan Berhasil diubah',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'catatan gagal diubah',
	});
	response.code(404);
	return response;
};

const deletNoteHandler = (request, h) => {
	const { id } = request.params;
	const index = notes.findIndex((note) => note.id === id);
	if (index !== -1) {
		notes.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'catatan berhasil di hapus',
		});
		response.code(200);
		return response;
	}
	const response = h.response({
		status: 'fail',
		message: 'catatan gagal dihapus',
	});
	response.code(404);
	return response;
};

module.exports = {
	addNoteHandler,
	getAllNotesHandler,
	getNoteByIdHandler,
	changeNoteHandler,
	deletNoteHandler,
};
