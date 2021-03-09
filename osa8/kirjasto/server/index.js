const config = require('./utils/config')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const { v1: uuid } = require('uuid')

console.log('connecting to: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
      console.log('connected to mongodb')
  })
  .catch((error) => {
      console.log('error connecting to mongodb: ', error.message)
  })

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'The Demon ',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    
    addAuthor(
      name: String!
      born: Int
    ): Author
    
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
  }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args) {
                if (args.author && args.genre) {
                    const author = await Author.findOne({ name: args.author })
                    return Book.find({ author: author, genres: { $in: [args.genre] } }).populate('author')
                }

                if (args.author) {
                    const author = await Author.findOne({ name: args.author })
                    return Book.find({ author: author }).populate('author')
                }

                if (args.genre) {
                    return Book.find({ genres: { $in: [args.genre] } }).populate('author')
                }
            }

            return Book.find({}).populate('author')
        },

        allAuthors: () => Author.find({})
    },
    Author: {
        bookCount: async (root) => {
            const author = await Author.findOne({ name: root.name })
            const books =  await Book.find({ author: author })
            return books.length
        }
    },

    Mutation: {
        addBook: async (root, args) => {
            const book = new Book({ ...args })
            const fetchedAuthor = await Author.findOne({ name: args.author })

            if (!fetchedAuthor) {
                const author = new Author({ name: args.author })
                book.author = author

                try {
                  await author.save()
                } catch (error) {
                  throw new UserInputError(error.message, {
                      invalidArgs: args,
                  })
                }

            } else {
                book.author = fetchedAuthor
            }

            try {
              await book.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return book
        },

        addAuthor: async (root, args) => {
            const author = new Author({ ...args })

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return author
        },

        editAuthor: async (root, args) => {
            const author = await Author.findOne({ name: args.name })

            if (!author) {
                return null
            }

            author.born = args.setBornTo

            try {
                await author.save()
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }

            return author
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
