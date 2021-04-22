
describe('Form app', () =>{
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    });

    it('sanityTest', () => {
        expect(1 + 2).to.equal(3);
    });

    it('types a name and checks if the input contains the typed name', () => {
        cy.get('input[name="name"]')
            .type("hello")
            .should("have.value", "hello");
    });

    it('types an email and password and checks if the input contains the typed email and password', () => {
        cy.get('input[name="email"]')
            .type("hello")
            .should("have.value", "hello")
        
        cy.get('input[name="password"]')
        .type("hello")
        .should("have.value", "hello")
    });

    it('Checks if a user can check ToS box', () => {
        cy.get('input[name="tos"]')
          .should("not.have.checked")
          .click()
          .should("have.checked")
    });

    it('Checks if a user can submit the form data', () => {   
        cy.get('button').should("be.disabled")

        cy.get('input[name="name"]').type("hello")
        cy.get('input[name="email"]').type("hello@hello.com")
        cy.get('input[name="password"]').type("hellohello")
        cy.get('input[name="tos"]').click()

        cy.get('button').click()
        cy.get('button').should("be.enabled")    
    });

    it('Checks if fields must be filled to submit data', () => {   
        cy.get('button').should("be.disabled")
        //checking without name filled
        cy.get('input[name="email"]').type("hello@hello.com")
        cy.get('input[name="password"]').type("hellohello")
        cy.get('input[name="tos"]').click()
        
        cy.get('button').should("be.disabled")
        //checking without tos checked
        cy.get('input[name="name"]').type("hello")
        cy.get('input[name="email"]').type("hello@hello.com")
        cy.get('input[name="password"]').type("hellohello")

        cy.get('button').should("be.disabled")
        //checking without email filled
        cy.get('input[name="name"]').type("hello")
        cy.get('input[name="password"]').type("hellohello")
        cy.get('input[name="tos"]').click()

        cy.get('button').should("be.disabled")
        //checking without password filled
        cy.get('input[name="tos"]').click()
        cy.get('input[name="name"]').type("hello")
        cy.get('input[name="email"]').type("hello@hello.com")

        cy.get('button').should("be.disabled")
    });












})