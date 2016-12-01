FROM  node:6.9

RUN npm install -g pm2

COPY dist/ application/
COPY config/ application/config
COPY node_modules/ application/node_modules
COPY start.sh application/

EXPOSE 3000

CMD ["/application/start.sh"]
