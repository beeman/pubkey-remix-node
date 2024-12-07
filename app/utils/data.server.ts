import { prisma } from '~/utils/prisma.server'

export class Data {
  static post = {
    findMany: async () => prisma.post.findMany(),
  }
}
