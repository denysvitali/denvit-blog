FROM alpine:latest
RUN apk update
RUN apk add hugo git bash
WORKDIR /data
COPY ./listener.sh /
CMD bash /listener.sh
