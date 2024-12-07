import { Stack } from '@mantine/core'
import { Form } from 'react-router'
import type { Route } from './+types/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

// action example
export async function action({ request }: Route.ActionArgs) {
  console.log(`action`)

  const result = {
    foo: 'bar',
    now: new Date().toISOString(),
  }

  return Response.json(result)
}

export default function Home() {
  return (
    <div>
      <Stack>
        <div>Hello world!</div>
        <Form method="post">
          <button type="submit">Submit</button>
        </Form>
      </Stack>
    </div>
  )
}
