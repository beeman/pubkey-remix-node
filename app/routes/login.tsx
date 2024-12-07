import { Button, Container, Stack, TextInput } from '@mantine/core'
import { Form, isRouteErrorResponse, redirect } from 'react-router'
import { authenticator } from '~/services/auth.server'
import { commitSession, getSession } from '~/session'

import type { Route } from './+types/login'

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('userId')) {
    return redirect('/app')
  }

  console.log(`!session.has('userId'), showing login page`)
  const data = { error: session.get('error') }

  return Response.json(data, { headers: { 'Set-Cookie': await commitSession(session) } })
}

export async function action({ request }: Route.ActionArgs) {
  console.log(`action`)
  const session = await getSession(request.headers.get('Cookie'))

  console.log(request)
  let user = await authenticator.authenticate('user-pass', request)

  console.log(`user`, user)

  if (user?.id === null) {
    session.flash('error', 'Invalid username/password')

    // Redirect back to the login page with errors.
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }

  session.set('userId', user.id.toString())

  throw redirect('/', {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}

// First we create our UI with the form doing a POST and the inputs with the
// names we are going to use in the strategy
export default function Screen(props: Route.ComponentProps) {
  return (
    <Form method="post">
      <Container my="xl" p="xl" size="sm">
        <Stack>
          {/*<pre>{JSON.stringify(props.actionData, null, 2)}</pre>*/}
          {/*{error ? <Alert color="red">{error}</Alert> : null}*/}
          <TextInput type="text" name="username" label="Username" required defaultValue="alice" />
          <TextInput type="password" name="password" label="Password" required defaultValue="password" />
          <Button type="submit">Sign In</Button>
        </Stack>
      </Container>
    </Form>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <Container my="xl" p="xl" fluid>
      <main>
        <h1>LOGIN ERROR {message}</h1>
        <p>{details}</p>
        {stack && (
          <pre style={{ overflowX: 'auto' }}>
            <code>{stack}</code>
          </pre>
        )}
      </main>
    </Container>
  )
}
