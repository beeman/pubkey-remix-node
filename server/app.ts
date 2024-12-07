import 'react-router'
import { createRequestHandler } from '@react-router/express'
import express from 'express'
import { prisma } from '~/utils/prisma.server'

declare module 'react-router' {
  interface AppLoadContext {
    prisma: typeof prisma
  }
}

export const app = express()

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import('virtual:react-router/server-build'),
    getLoadContext() {
      return {
        prisma,
      }
    },
  }),
)
