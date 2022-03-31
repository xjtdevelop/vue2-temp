# This Dockerfile uses the nginx image
# VERSION 1
FROM nginx
MAINTAINER wei.li
ADD dist/ /usr/share/nginx/html
