describe('Проверяем доступность переходов на страницы', () => {
	beforeEach(() => {
		cy.visit('/');
        cy.get('a').should('have.length', 6)
	})
	it('Переходим на страницу recursion', () => {
		cy.visit('recursion')
	})
	it('Переходим на страницу fibonacci', () => {
		cy.visit('fibonacci')
	})
	it('Переходим на страницу sorting', () => {
		cy.visit('sorting')
	})
	it('Переходим на страницу stack', () => {
		cy.visit('stack')
	})
	it('Переходим на страницу queue', () => {
		cy.visit('queue')
	})
	it('Переходим на страницу list', () => {
		cy.visit('list')
	})
})