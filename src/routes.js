const {getAllBooks, postBooks, getBookbyid, editBookbyid, deleteBookbyid } = require("./handler")

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler : postBooks
        // handler: (request, h) => {
        //     const res = {
        //         status : "succses test json"
        //     }
        //     const resret = h.response(res).code(200).type('application/json')
        //     return resret
        // }

    },
    {
        method: 'GET',
        path: '/books',
        handler : getAllBooks
        // handler: (request, h) => {
        //     const res = {
        //         status : "succses test json"
        //     }
        //     const resret = h.response(res).code(200).type('application/json')
        //     return resret
        // }

    },
    {
        method : 'GET',
        path : '/books/{bookId}',
        handler : getBookbyid
    },
    {
        method : 'PUT',
        path : '/books/{bookId}',
        handler : editBookbyid
    },
    {
        method : 'DELETE',
        path : '/books/{bookId}',
        handler : deleteBookbyid
    },
    
]
module.exports = routes