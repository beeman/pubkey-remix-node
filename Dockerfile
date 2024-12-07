FROM node:20-alpine AS base
RUN npm i -g pnpm
COPY . /app

FROM base AS development-base
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm i --frozen-lockfile

FROM base AS final-base
COPY ./package.json pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm i --prod --frozen-lockfile

FROM base AS builder
COPY ./package.json pnpm-lock.yaml /app/
COPY --from=development-base /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm build

FROM base AS final
COPY ./package.json pnpm-lock.yaml server.js /app/
COPY --from=final-base /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
WORKDIR /app
CMD ["pnpm", "start"]