FROM node:14-alpine
LABEL maintainer="Emma NWAMAIFE <emadimabua@gmail.com>"

# docker build -t {DOCKER-REPO-NAME-IN-LOWERCASE}/country-search-desk:latest .
# docker run -dp 3502:3502/tcp --name country-look-0 --env-file .env.local {DOCKER-REPO-NAME-IN-LOWERCASE}/country-search-desk:latest --build-arg env=dev [--bind 127.0.0.1]
ARG env=production

WORKDIR /usr/src/app
ENV NODE_ENV $env
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "tsconfig.json", "./"]

# RUN npm config set unsafe-perm true
RUN npm install -g typescript
RUN npm install --production=false --silent && mv node_modules ./
COPY . .

RUN npm run build
RUN rm -rf ./src
EXPOSE 3502

# RUN chown -R node /usr/src/app
# USER node

# start
CMD ["npm", "start"]
# CMD ["node", "src/index.js"]
