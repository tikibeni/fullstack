describe('Blog app index', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({ username: 'tikibeni', name: 'Beni', password: '12344' })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.get('#loginForm')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('tikibeni')
            cy.get('#password').type('12344')
            cy.get('#login-button').click()

            cy.contains('Welcome tikibeni!')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('tikibeni')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
              .should('contain', 'Wrong username or password')
              .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'tikibeni', password: '12344' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('testing cypress')
            cy.get('#author').type('fs-team')
            cy.get('#url').type('https://fullstackopen.com')
            cy.get('#create-button').click()

            cy.get('.success')
              .should('contain', 'created')
        })

        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'testing cypress', author: 'fs-team', url: 'https://fullstackopen.com' })
            })

            it('which can be liked', function() {
                cy.contains('show').click()
                cy.get('.togglableContent')
                  .should('contain', '0')
                cy.get('#like-button').click()
                cy.get('.togglableContent')
                  .should('contain', '1')
            })

            it('which can be deleted by creator', function() {
                cy.contains('show').click()
                cy.get('.togglableContent').get('#remove-button').click()
                cy.get('html')
                  .should('contain', 'Deleted')
            })
        })

        describe('and multiple blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'medium', author: 'tester', url: 'testurl', likes: 25 })
                cy.createBlog({ title: 'low', author: 'yes', url: 'nope', likes: 2 })
                cy.createBlog({ title: 'high', author: 'winnerwinner', url: 'chickendinner', likes: 9001 })
            })

            it.only('blogs are sorted by likes from highest to lowest', function() {
                cy.get('.blogRender').then( titles => {
                    expect(titles[0]).to.contain('winnerwinner')
                    expect(titles[1]).to.contain('medium')
                    expect(titles[2]).to.contain('yes')
                })
            })
        })
    })
})