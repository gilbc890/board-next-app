const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })
// humor url
  server.get('/humor/:id', (req, res) => {
    if(!req.params.slug){
        return app.render(req, res, `/error`)
    } else {
        return app.render(req, res, `/humor/${req.params.id}`)
    }
  })
  server.get('/humor/:slug', (req, res) => {
    return app.render(req, res, `/error`)
  })

  server.get('/humor/:id/:slug', async (req, res) => {    
    return app.render(req, res, `/humor/${req.params.id}`)
  })
// products url
  server.get('/products/:id', (req, res) => {
    if(!req.params.slug){
        return app.render(req, res, `/error`)
    } else {
        return app.render(req, res, `/products/${req.params.id}`)
    }
  })
  server.get('/products/:slug', (req, res) => {
    return app.render(req, res, `/error`)
  })

  server.get('/products/:id/:slug', async (req, res) => {    
    return app.render(req, res, `/products/${req.params.id}`)
  })
  
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
