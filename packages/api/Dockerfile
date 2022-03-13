FROM node:latest
COPY ./packages/api/package.json .
COPY .yarnrc.yml .
COPY .yarn/releases .yarn/releases
COPY ./packages/api/run-production.sh .
RUN yarn
CMD ./run-production.sh