FROM node:16-alpine as development

WORKDIR src/

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-engines

COPY . .

RUN yarn build

FROM node:16-alpine as production

WORKDIR /var/www/localhost/htdocs

COPY package*.json ./

RUN apk update && apk add lighttpd && rm -rf /var/cache/apk/*
RUN yarn install --production=true --frozen-lockfile --ignore-engines && yarn cache clean --all

COPY --from=development /src/* ./


CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]
