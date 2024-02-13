import { Router } from 'express'
import { validateMovie, validatePartialMovie } from '../schemas/movieSchema.js'
import { MovieModel } from '../models/movie.js'
import { MovieController } from '../controlers/movies.js'

export const moviesRouter = Router()

// ------------- Get all movies ------------- .
moviesRouter.get('/', MovieController.getAll)

// ------------- Get a specific movie ------------- .
moviesRouter.get('/:id', MovieController.getById)

// ------------- Post a new movie ------------- .
moviesRouter.post('/', MovieController.create)

// ------------- Delete a specific movie ------------- .
moviesRouter.delete('/:id', async (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { id } = req.params
  const movieDeleted = await MovieModel.delete({ id })

  if (movieDeleted === true) {
    return res.json({ message: 'Movie deleted' })
  }

  return res.json({ message: 'Cannot find the movie, check the id' })
})

// ------------- Update a specific movie ------------- .
moviesRouter.patch('/:id', async (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const updatedMovie = await MovieModel.update({ id, input: result.data })

  return res.json(updatedMovie)
})

// ------------- Options to solve CORS ------------- .
moviesRouter.options('/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }

  res.send(200)
})
