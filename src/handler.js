const { nanoid } = require("nanoid");
const bookArray = require("./book");

const getAllBooks = (request, h) => {
  let arr = bookArray;
  const { name, reading, finished } = request.query;
  if (name !== undefined) {
    arr = bookArray.filter((book) =>
      book.publisher.toLowerCase().includes(name.toLowerCase())
    );
  }
  if (reading !== undefined) {
    if (reading == 1) {
      arr = bookArray.filter((book) => book.reading == true);
    } else if (reading == 0) {
      arr = bookArray.filter((book) => book.reading == false);
    }
  }
  if (finished !== undefined) {
    if (finished == 1) {
      arr = bookArray.filter((book) => book.finished == true);
    } else if (finished == 0) {
      arr = bookArray.filter((book) => book.finished == false);
    }
  }
  const format = {
    status: "success",
    data: {
      books: arr.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  };
  return h.response(format).code(200).type("application/json");
};
const postBooks = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(15);
  const finished = pageCount == readPage ? true : false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  const isSucces = () => {
    return bookArray.length > 0 ? true : false;
  };
  if (isSucces) {
    if (name == undefined) {
      const format = {
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      };
      const res = h.response(format).code(400).type("application/json");
      return res;
    }
    if (readPage > pageCount) {
      const format = {
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      };
      const res = h.response(format).code(400).type("application/json");
      return res;
    }
    bookArray.push(newBook);
    const format = {
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    };
    const res = h.response(format).code(201).type("application/json");
    return res;
  } else {
    const res = h.response({
      status: "fail",
      message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return res;
  }
};
const getBookbyid = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = bookArray.filter((n) => n.id === bookId)[0];

  if (bookIndex !== undefined) {
    const format = {
      status: "success",
      data: {
        book: bookIndex,
      },
    };
    const response = h.response(format).code(200).type("application/json");
    return response;
  } else {
    const format = {
      status: "fail",
      message: "Buku tidak ditemukan",
    };
    const response = h.response(format).code(404).type("application/json");
    return response;
  }
};
const editBookbyid = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const bookIndex = bookArray.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    if (name == undefined) {
      const format = {
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      };
      const response = h.response(format).code(400).type("application/json");
      return response;
    }
    if (readPage > pageCount) {
      const format = {
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      };
      const response = h.response(format).code(400).type("application/json");
      return response;
    }
    bookArray[bookIndex] = {
      ...bookArray[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };
    const format = {
      status: "success",
      message: "Buku berhasil diperbarui",
    };
    const response = h.response(format).code(200).type("application/json");
    return response;
  } else {
    const format = {
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    };
    const response = h.response(format).code(404).type("application/json");
    return response;
  }
};
const deleteBookbyid = (request, h) => {
  const { bookId } = request.params;
  const bookIndex = bookArray.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    bookArray.splice(bookIndex, 1);
    const format = {
      status: "success",
      message: "Buku berhasil dihapus",
    };
    const response = h.response(format).code(200).type("application/json");
    return response;
  } else {
    const format = {
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    };
    const response = h.response(format).code(404).type("application/json");
    return response;
  }
};

module.exports = {
  postBooks,
  getAllBooks,
  getBookbyid,
  editBookbyid,
  deleteBookbyid,
};
