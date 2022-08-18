#
# Author:   Marcus Cemes
# Date:     2022-08-13
#
# Builds the project and delivers an optimised release image
# that can serve static requests on port 3000. Leverges Docker's
# multi-stage builds to cache unchanges steps.
#


FROM node:18-alpine as base
WORKDIR /app

RUN npm install --global pnpm

COPY pnpm-lock.yaml ./


FROM base as builder
ENV CI=true

RUN pnpm fetch

COPY package.json ./
RUN pnpm install --offline

COPY ./ ./

RUN pnpm build



FROM base as release

RUN deluser --remove-home node && \
    addgroup -S node -g 9001 && \
    adduser -S -G node -u 9001 node

RUN pnpm fetch --prod

COPY package.json ./
RUN pnpm install --prod --offline

COPY --from=builder /app/build build

EXPOSE 3000/tcp
ENTRYPOINT node build/index.js
