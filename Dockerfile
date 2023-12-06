FROM node:16.18.0
ADD . /home/backends/api-gateway
WORKDIR /home/backends/api-gateway

RUN npm i
RUN npm run build
CMD npm run start:prod