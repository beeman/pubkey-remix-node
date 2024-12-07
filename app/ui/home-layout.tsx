import { Box, Button, Container, Flex, Group, Text } from '@mantine/core'
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  Outlet,
  redirect,
  useLoaderData,
  useLocation,
} from 'react-router'
import { commitSession, getSession } from '~/session'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('userId')) {
    return { userId: session.get('userId') }
  }

  return { userId: null }
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  session.unset('userId')

  return redirect('/', {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}

export default function HomeLayout() {
  const { userId } = useLoaderData()
  const { pathname } = useLocation()
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Posts', to: '/posts' },
    { label: 'About', to: '/about' },
    { label: 'App', to: '/app' },
  ]
  return (
    <Flex direction="column" h="100%">
      <Box component="header" p="md">
        <Group justify="space-between">
          <Group>
            <Text component={Link} to="/" size="lg" fw="bold">
              Placeholder
            </Text>
            {links.map((link) => (
              <Button
                size="xs"
                variant={pathname === link.to ? 'filled' : 'light'}
                component={Link}
                to={link.to}
                key={link.label}
              >
                {link.label}
              </Button>
            ))}
          </Group>
          {userId ? (
            <Form method="post">
              <Button type="submit">Logout</Button>
            </Form>
          ) : (
            <Button component={Link} to="/login">
              Login
            </Button>
          )}
        </Group>
      </Box>
      <main style={{ flexGrow: 1 }}>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Box component="footer" p="xs" ta="center" fz="sm" c="dimmed">
        Footer
      </Box>
    </Flex>
  )
}
