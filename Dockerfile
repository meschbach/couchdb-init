FROM node:13

WORKDIR /app
RUN chown -R node /app
USER node
ADD package.json /app
ADD package-lock.json /app
ENV NODE_ENV production
RUN npm install --production
ADD *.js /app

CMD ["node","index.js"]
