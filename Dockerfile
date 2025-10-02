FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM deps AS test
WORKDIR /app
COPY src ./src
COPY test ./test

# Etapa 3: imagem de produção minimal
FROM node:20-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
# Remove devDependencies para reduzir a imagem
RUN npm prune --production
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]