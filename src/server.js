const HAPI = require('@hapi/hapi')
const routes = require('./routes')

const init = async () =>{
    const server = HAPI.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    })
    server.route(routes)
    await server.start()
    console.log(`server running on port ${server.info.uri}`)
}

init()
