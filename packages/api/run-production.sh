#!/bin/bash
yarn prisma generate
yarn build
yarn start:prod
exit $?