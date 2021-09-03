FROM node:16-alpine

WORKDIR /app
RUN chown -R node /app
ADD package.json /app
ADD package-lock.json /app
ENV NODE_ENV production
RUN npm install --production
ADD *.js /app

USER 1000
CMD ["node","index.js"]
