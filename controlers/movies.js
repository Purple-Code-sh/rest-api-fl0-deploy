import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movieSchema.js'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:1234',
  'http://127.0.0.1:5500'
]

export class MovieController {
  static async getAll (req, res) {
    const origin = req.header('origin')

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }

    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validateMovie(req.body)

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async delete (req, res) {
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
  }

  static async update (req, res) {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const updatedMovie = await MovieModel.update({ id, input: result.data })

    return res.json(updatedMovie)
  }

  static async corsOptions (req, res) {
    const origin = req.header('origin')

    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
      res.header('Access-Control-Allow-Origin', origin)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }

    res.send(200)
  }
}
