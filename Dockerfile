FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
RUN npm run prisma-generate
RUN npm run build
RUN npm prune --production

FROM node:20 AS run

ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/entrypoint.sh ./entrypoint.sh
COPY --from=build /app/prisma ./prisma
RUN ulimit -c unlimited

RUN chmod +x entrypoint.sh
CMD ["sh", "entrypoint.sh"]
