if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const express = require('express')
const { SERVER_PORT, API_VERSION, HOST_FRONTEND } = require('./utils/constants')

const doubtRouter = require('./routes/doubt')
const userRouter = require('./routes/user')
const navigationRouter = require('./routes/navigation')
const newsRouter = require('./routes/news')
const trailRouter = require('./routes/trail')
const loginRouter = require('./routes/login')
const mentorshipRouter = require('./routes/mentorship')

const PORT = SERVER_PORT

const app = express()

app.get('/', (req, res) => {
  res.send(`Api Alpha Edtech Monitoria 10, versão: ${API_VERSION}!`)
})

app.use(cors({
  origin: '*'
  //origin: [HOST_FRONTEND],
  //credentials: true
}))
app.use(express.json({ limit: '10MB' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/doubts', doubtRouter)
app.use('/users', userRouter)
app.use('/navigations', navigationRouter)
app.use('/news', newsRouter)
app.use('/trails', trailRouter)
app.use('/logins', loginRouter)
app.use('/mentorships', mentorshipRouter)

app.listen(PORT, () => {
  console.log(`Server listen in port: ${PORT}`)
})
