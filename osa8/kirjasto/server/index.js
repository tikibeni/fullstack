const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

console.log('connecting to: ', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
      console.log('connected to mongodb')
  })
  .catch((error) => {
      console.log('error connecting to mongodb: ', error.message)
  })

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
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }
  
  type Subscription {
    bookAdded: Book!
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
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            const author = await Author.findOne({ name: root.name })
            const books =  await Book.find({ author: author })
            return books.length
        }
    },

    Mutation: {
        addBook: async (root, args, context) => {
            const book = new Book({ ...args })
            const fetchedAuthor = await Author.findOne({ name: args.author })
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

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

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

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

        editAuthor: async (root, args, context) => {
            const author = await Author.findOne({ name: args.name })
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

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
        },

        createUser: (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
              .catch(error => {
                  throw new UserInputError(error.message, {
                      invalidArgs: args,
                  })
              })
        },

        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if ( !user || args.password !== 'secret' ) {
                throw new UserInputError("wrong credentials")
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(
              auth.substring(7), JWT_SECRET
            )
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
