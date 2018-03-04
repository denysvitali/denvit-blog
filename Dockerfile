FROM alpine:latest
RUN apk update
RUN apk add hugo git bash nodejs
RUN npm install -g gulp
WORKDIR /data
COPY ./listener.sh /
CMD bash /listener.sh
