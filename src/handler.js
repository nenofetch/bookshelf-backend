const { nanoid } = require('nanoid')
const Books = require('./books')

// fungsi untuk menambahkan buku (kriteria 1)
const addBooks = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt
  const finished = pageCount === readPage

  const newBooks = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }
  Books.push(newBooks)

  const checkBooks = Books.filter((book) => book.id === id).length > 0
  if (checkBooks) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })
  response.code(500)
  return response
}

// menampilkan seluruh buku (Kriteria 2)
const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query

  if (name !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        books:
        Books
          .filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
          .map(book => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher
          }))
      }
    })
    response.code(200)
    return response
  }

  if (reading !== undefined) {
    if (reading === '0') {
      return {
        status: 'success',
        data: {
          books:
          Books
            .filter(filtering => filtering.reading === false)
            .map(book => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher
            }))
        }
      }
    }
    if (reading === '1') {
      return {
        status: 'success',
        data: {
          books:
          Books
            .filter(filtering => filtering.reading === true)
            .map(book => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher
            }))
        }
      }
    }
  }

  if (finished !== undefined) {
    if (finished === '0') {
      return {
        status: 'success',
        data: {
          books:
          Books
            .filter(filtering => filtering.finished === false)
            .map(book => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher
            }))
        }
      }
    }
    if (finished === '1') {
      return {
        status: 'success',
        data: {
          books:
          Books
            .filter(filtering => filtering.finished === true)
            .map(book => ({
              id: book.id,
              name: book.name,
              publisher: book.publisher
            }))
        }
      }
    }
  }

  const response = h.response({
    status: 'success',
    data: {
      books: Books.map(book => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher
      }))
    }
  })
  response.code(200)
  return response
}

// Menampilkan buku berdasarkan id (Kriteria 3)
const getBooksById = (request, h) => {
  const { bookId } = request.params
  const book = Books.filter((b) => b.id === bookId)[0]

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

// fungsi untuk edit buku (kriteria 4)
const editBooksById = (request, h) => {
  const { bookId } = request.params
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const updatedAt = new Date().toISOString()
  const finished = pageCount === readPage
  const index = Books.findIndex((book) => book.id === bookId)

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
    response.code(400)
    return response
  }

  if (index !== -1) {
    Books[index] = {
      ...Books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })
  response.code(404)
  return response
}

// fungsi untuk menghapus buku (kriteria 5)
const deleteBooksById = (request, h) => {
  const { bookId } = request.params

  const index = Books.findIndex((book) => book.id === bookId)
  if (index !== -1) {
    Books.splice(index, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })
  response.code(404)
  return response
}
module.exports = {
  addBooks,
  getAllBooks,
  getBooksById,
  editBooksById,
  deleteBooksById
}
