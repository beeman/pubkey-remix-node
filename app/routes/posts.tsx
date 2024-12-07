import type { Route } from './+types/posts'

export async function loader({ context }: Route.LoaderArgs) {
  const posts = await context.prisma.post.findMany({
    include: { author: true },
  })
  return { posts }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Posts({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      Posts
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  )
}
