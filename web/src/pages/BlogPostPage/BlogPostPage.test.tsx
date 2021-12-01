import { render } from '@redwoodjs/testing/web'

import BlogPostPage from './BlogPostPage'

describe('BlogPostPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BlogPostPage id={42} />)
    }).not.toThrow()
  })
})
