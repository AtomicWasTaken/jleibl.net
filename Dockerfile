# Step 1: Use Bun as the base image
FROM oven/bun:latest AS build

# Set the working directory inside the container
WORKDIR /app

ENV NODE_ENV=production

# Step 2: Install dependencies and build the project
COPY . .

# Install dependencies
RUN bun install

# Step 3: Build the Astro application
RUN bun run build

# Step 5: Set up the production image
FROM oven/bun:latest AS production

WORKDIR /app

# Copy necessary files from the build stage
COPY --from=build /app /app

# Install only production dependencies
RUN bun install --prod
RUN bun astro build

# Expose the application port
EXPOSE 4321

ENV ASTRO_TELEMENTRY_DISABLED=1
ENV __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS=jleibl.net
ENV __VITE_ADDITIONAL_PREVIEW_ALLOWED_HOSTS=jleibl.net

# Start the Astro application
CMD ["bun", "preview", "--host"]
