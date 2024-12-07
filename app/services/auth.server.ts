import { User } from '@prisma/client'
import { Authenticator } from 'remix-auth'
import { FormStrategy } from 'remix-auth-form'

export const authenticator = new Authenticator<User>()

// Tell the Authenticator to use the form strategy
authenticator.use(
  new FormStrategy(async ({ form }) => {
    let username = form.get('username')
    let password = form.get('password')
    // the type of this user must match the type you pass to the Authenticator
    // the strategy will automatically inherit the type if you instantiate
    // directly inside the `use` method
    if (!username || !password) {
      throw new Error('Username and password are required')
    }
    return await login(username.toString(), password.toString())
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  'user-pass',
)

async function login(email: string, password: string) {
  // In a real app, you would use a database to fetch the user
  // and check the password
  return {
    id: 1,
    email,
    name: 'Alice',
    imageUrl: 'https://bit.ly/dan-abramov',
  }
}
