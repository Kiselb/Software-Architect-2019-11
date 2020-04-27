FROM node:12
ARG APP_DIR=APP_DIR
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3800
CMD ["npm", "start"]
