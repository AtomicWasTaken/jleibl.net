# jleibl.net - Personal Portfolio Website

<div align="center">
  <img src="public/profile-image.jpg" alt="Jan-Marlon Leibl" width="150" style="border-radius: 50%;" />
  <h3>Jan-Marlon Leibl</h3>
  <p>Fullstack Software Developer | PHP & TypeScript Expert</p>
  <a href="https://jleibl.net" target="_blank">Live Website</a>
</div>

## 🚀 About

This is the personal portfolio website for Jan-Marlon Leibl, showcasing professional experience, skills, and projects. Built with modern web technologies for optimal performance and user experience.

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build) - The web framework for content-driven websites
- **UI Libraries**: [React](https://react.dev) - For interactive components
- **Styling**: [TailwindCSS](https://tailwindcss.com) - Utility-first CSS framework
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - For smooth animations
- **Fonts**: DM Sans, Instrument Sans
- **Icons**: Astro Icon, React Icons
- **Runtime**: [Bun](https://bun.sh) - Fast JavaScript runtime & package manager
- **Deployment**: Docker containerization

## 🏗️ Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── components/  # UI components
│   ├── pages/       # Page routes and templates
│   └── styles/      # Global styles
├── astro.config.mjs # Astro configuration
└── package.json     # Project dependencies
```

## 🧞 Development

All commands use [Bun](https://bun.sh) as the package manager and runtime:

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Preview production build locally
bun preview
```

## 🐳 Docker Deployment

The project includes a Dockerfile for containerized deployment:

```bash
# Build the Docker image
docker build -t jleibl-website .

# Run the container
docker run -p 4321:4321 jleibl-website
```

## 📝 License

© 2025 Jan-Marlon Leibl. All rights reserved.

## 🔗 Connect

- Website: [jleibl.net](https://jleibl.net)
