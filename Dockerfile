FROM node:16-bullseye-slim as deps

WORKDIR /myapp

ADD package.json yarn.lock .npmrc ./
RUN yarn install

# Build the app
FROM node:16-bullseye-slim as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD . .
RUN yarn build

# Finally, build the production image with minimal footprint
FROM node:16-bullseye-slim

ENV PORT="8080"
ENV NODE_ENV="production"

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json

ENTRYPOINT [ "yarn", "start" ]
