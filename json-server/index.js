/* eslint @typescript-eslint/no-var-requires: "off" */
/* eslint no-console: "off" */

const fs = require('fs')
// eslint-disable-next-line import/order
const jsonServer = require('json-server')
const path = require('path')

const https = require(`https`)
const http = require('http')

const options = {
    key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
}

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Endpoint for users
// eslint-disable-next-line consistent-return
server.use(async (req, res, next) => {
    try {
        if (req.path === '/users') {
            const { username } = req.body

            console.log(req.query, req.body, req.headers, 'users endpoint')
            const db = JSON.parse(
                fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
            )

            const { users = [] } = db

            const userFromBd = users.find((user) => user.username === username)

            if (userFromBd) {
                return res.status(409).json('User already exists')
            }
        }

        await new Promise((res) => {
            res()
        })
    } catch (e) {
        console.log(e, 'users endpoint error')
    }

    next()
})

// Endpoint for login
server.post('/login', (req, res) => {
    try {
        const { username, password } = req.body
        const db = JSON.parse(
            fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'),
        )
        const { users = [] } = db

        const userFromBd = users.find(
            (user) => user.username === username && user.password === password,
        )

        if (userFromBd) {
            return res.json(userFromBd)
        }

        return res.status(403).json('User not found')
    } catch (e) {
        console.log(e, 'login endpoint error')
        return res.status(500).json({ message: e.message })
    }
})

// Check is user authorized
// eslint-disable-next-line
// server.use((req, res, next) => {
//     try {
//         if (!req.headers.authorization) {
//             return res.status(403).json({ message: 'AUTH ERROR' })
//         }
//     } catch (e) {
//         console.log(e, 'auth endpoint error')
//     }
//
//     next()
// })

server.use(router)

// Start server
const PORT = 8443
const HTTP_PORT = 8000

const httpsServer = https.createServer(options, server)
const httpServer = http.createServer(server)

httpsServer.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
})

httpServer.listen(HTTP_PORT, () => {
    console.log(`server is running on ${HTTP_PORT} port`)
})
