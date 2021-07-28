const {
  addBooks,
  viewAllBooks,
  viewBooksById,
  editBooksById,
  deleteBooksById
} = require('./handler')

const routes = [
  //   Menyimpan buku
  {
    method: 'POST',
    path: '/books',
    handler: addBooks
  },
  //   Menampilkan semua buku
  {
    method: 'GET',
    path: '/books',
    handler: viewAllBooks
  },
  //   Menampilkan detail buku
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: viewBooksById
  },
  // mengedit buku
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBooksById
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooksById
  }
]

module.exports = routes
