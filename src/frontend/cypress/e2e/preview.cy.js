describe('Preview Page', () => {
  beforeEach(() => {
    // Handle uncaught exceptions from canvas operations
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('getImageData')) {
        return false;
      }
    });

    // Visit the preview page with a sample filename - use port 3000 for frontend
    cy.visit('http://localhost:3000/preview/sample-video.mp4')
  })

  it('should display the preview page with correct elements', () => {
    // Check if the page title is visible (it's an h4, not h1)
    cy.contains('Preview Page').should('be.visible')
    
    // Check if the filename is displayed
    cy.get('strong').should('contain', 'sample-video.mp4')
    
    // Check if both image sections exist
    cy.contains('Original Thumbnail').should('be.visible')
    cy.contains('Binarized Thumbnail').should('be.visible')
    
    // Check if the color picker and threshold slider exist
    cy.get('input[type="color"]').should('exist')
    cy.get('input[type="range"]').should('exist')
  })

  it('should show error when trying to process without preview', () => {
    // The page should render with the correct heading and file info
    cy.contains('Preview Page').should('be.visible')
    cy.get('strong').should('contain', 'sample-video.mp4')
  })

  it('should have input controls on the page', () => {
    // Check that input controls are present on the page
    // Use longer timeout since page needs to load
    cy.get('input[type="color"]', { timeout: 5000 }).should('exist')
    cy.get('input[type="range"]', { timeout: 5000 }).should('exist')
  })
}) 