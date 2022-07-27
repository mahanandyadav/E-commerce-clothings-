#ui build
FROM node:14-slim   AS ui-build
WORKDIR /usr/src
COPY    ui  ./ui/
RUN cd ui && npm install && npm run webpack

#api build
FROM node:14-slim as api-build
WORKDIR /usr/src
COPY api ./api/
RUN cd api && npm install && npm run webpack
RUN ls

# packaginh app
FROM node:14-slim 
WORKDIR /root/
COPY --from=ui-build /usr/src/ui/dist   ./ui/dist
COPY --from=api-build /usr/src/api/dist .
RUN ls

EXPOSE 3001

CMD ["node","api.bundle.js"]