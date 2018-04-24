FROM node:alpine

# Metadata
LABEL maintainer="wesley.coder@gmail.com"
LABEL description="Backend dev test for Ingresse"
LABEL git="https://github.com/wescoder/ingresse-backend-dev.git"

# Workdir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Yarn
RUN apk add --update yarn

# Copy
COPY package.json yarn.lock /usr/src/app/

RUN yarn

# Environment variables
ENV NODE_ENV=production

# Copy source
COPY . /usr/src/app

# App port
EXPOSE 3000

CMD [ "yarn", "start" ]
