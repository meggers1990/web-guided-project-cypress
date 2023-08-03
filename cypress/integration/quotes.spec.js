// write tests here
describe('Quotes App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5500') 
    })
  
    const textInput = () => cy.get('input[name=text]')
    const authorInput = () => cy.get('input[name=author]')
    const foobarInput = () => cy.get('input[name=foobar]')
    const submitBtn = () => cy.get(`button[id="submitBtn"]`)
    const cancelBtn = () => cy.get(`button[id="cancelBtn"]`)
  
    it('sanity check to make sure tests work', () => {
      expect(1 + 2).to.equal(3)
      expect(2 + 2).not.to.equal(5) // strict ===
      expect({}).not.to.equal({})   // strict ===
      expect({}).to.eql({})         // not strict
    })
  
    it('the proper elements are showing', () => {
      textInput().should('exist')
      foobarInput().should('not.exist')
      authorInput().should('exist')
      submitBtn().should('exist')
      cancelBtn().should('exist')
     
      cy.contains('Submit Quote').should('exist')
      cy.contains(/submit quote/i).should('exist')
    })
  
    describe('Filling out the inputs and cancelling', () => {
  
      it('can navigate to the site', () => {
        cy.url().should('include', 'localhost')
      })
  
      it('submit button starts out disabled', () => {
        submitBtn().should('be.disabled')
      })
  
      it('can type in the inputs', () => {
        textInput()
          .should('have.value', '')
          .type('Be nice to the CSS expert')
          .should('have.value', 'Be nice to the CSS expert')
  
        authorInput()
          .should('have.value', '')
          .type('Gabe!')
          .should('have.value', 'Gabe!')
      })
  
      it('the submit button enables when both inputs are filled out', () => {
        authorInput().type('Gabe')
        textInput().type('Have fun!')
        submitBtn().should('not.be.disabled')
      })
  
      it('the cancel button can reset the inputs and disable the submit button', () => {
        authorInput().type('Gabe')
        textInput().type('Have fun!')
        cancelBtn().click()
        textInput().should('have.value', '')
        authorInput().should('have.value', '')
        submitBtn().should('be.disabled')
      })
    })
  
    describe('Adding a new quote', () => {
      it('can submit and delete a new quote', () => {
        textInput().type('Have fun!')
        authorInput().type('Gabe')
        submitBtn().click()
    
        cy.contains('Have fun!').siblings('button:nth-of-type(2)').click()
        cy.contains('Have fun!').should('not.exist')
      })
  
      it('variation of can submit a new quote', () => {
        cy.contains(/have fun/).should('not.exist')
        textInput().type('have fun')
        authorInput().type('Gabe')
        submitBtn().click()
        cy.contains(/have fun/).should('exist')
        cy.contains(/have fun/).next().next().click()
        cy.contains(/have fun/).should('not.exist')
      })
    })
  
    describe('Editing an existing quote', () => {
      it('can edit a quote', () => {
        
        textInput().type('Use Postman')
        authorInput().type('Gabriel')
        submitBtn().click()
      
        cy.contains('Use Postman').siblings('button:nth-of-type(1)').click()
        textInput().should('have.value', 'Use Postman')
        authorInput().should('have.value', 'Gabriel')
       
        textInput().type(' for realz')
        authorInput().type(' Cabrejas')
        submitBtn().click()
       
        cy.contains('Use Postman for realz (Gabriel Cabrejas)')
       
        cy.contains('Use Postman for realz (Gabriel Cabrejas)').next().next().click()
        cy.contains('Use Postman for realz (Gabriel Cabrejas)').should('not.exist')
      })
    })
  })