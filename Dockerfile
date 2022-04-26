#
# Author:   Marcus Cemes
# Date:     2022-04-25
#
# Builds the project and delivers an optimised release image
# based on alpine that serves the web application on
# port 3000. Leverges Docker's multi-stage builds to cache
# unchanged steps and runs with a user ID of 9001.
#


FROM node:18-alpine as base
WORKDIR /app

RUN npm install --global pnpm

COPY package.json pnpm-lock.yaml ./



FROM base as builder
ENV CI=true

RUN pnpm fetch && pnpm install --offline
COPY . .

RUN pnpm build



FROM base as release

RUN deluser --remove-home node && \
    addgroup -S node -g 9001 && \
    adduser -S -G node -u 9001 node

# RUN pnpm fetch --prod && pnpm install --prod --offline
COPY --from=builder /app/build build

EXPOSE 3000/tcp
CMD ["node", "build/index.js"]
