FROM ubuntu:18.04
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
	apt-get install -y software-properties-common gnupg curl && \
    curl -sL https://deb.nodesource.com/setup_14.x | bash && \

	apt-key adv --keyserver keyserver.ubuntu.com --recv-keys FABAEF95 && \
	add-apt-repository -y ppa:supercollider/ppa && \
	add-apt-repository -y multiverse && \
	apt-get update && \
    apt-get install -y nodejs supercollider make && \
    apt-get clean


COPY ./package.json package.json
COPY ./package-lock.json package-lock.json


RUN npm i

COPY ./src src

COPY ./Makefile Makefile

CMD ["make", "start"]

