import type { BlogPostsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'


import BlogPost from "src/components/BlogPost";


export const QUERY = gql`
    query BlogPostsQuery {
        posts {
            id
            title
            body
            createdAt
        }
    }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ posts }: CellSuccessProps<BlogPostsQuery>) => <div className="divide-y divide-grey-700">
{posts.map((post) => <BlogPost key={post.id} post={post} />)}
</div>
