import { Router } from 'express'
import { MovieController } from '../controlers/movies.js'

export const moviesRouter = Router()

// ------------- Get all movies ------------- .
moviesRouter.get('/', MovieController.getAll)

// ------------- Get a specific movie ------------- .
moviesRouter.get('/:id', MovieController.getById)

// ------------- Post a new movie ------------- .
moviesRouter.post('/', MovieController.create)

// ------------- Delete a specific movie ------------- .
moviesRouter.delete('/:id', MovieController.delete)

// ------------- Update a specific movie ------------- .
moviesRouter.patch('/:id', MovieController.update)

// ------------- Options to solve CORS ------------- .
moviesRouter.options('/:id', MovieController.corsOptions)
