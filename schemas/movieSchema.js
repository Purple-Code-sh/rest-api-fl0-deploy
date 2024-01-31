import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be an string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1930).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().positive().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Post must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Crime']), {
      invalid_type_error: 'Genre(s) must be an array',
      required_error: 'Movie genre is required'
    }
  )
})

export function validateMovie (object) {
  return movieSchema.safeParse(object)
}

export function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}
