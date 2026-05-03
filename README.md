# ElectraSync

ElectraSync is a high-performance, Cloud Run optimized Election Assistant platform. It provides a Secure Intelligence Dashboard featuring an interactive Election Protocol Timeline, designed to ensure clarity and transparency in electoral processes.

## Architecture Highlights

### Accessibility First Design
- **WCAG Compliance**: All text and background colors are meticulously verified for sufficient contrast ratios.
- **Aria Labels**: Every button, navigation item, and interactive node includes detailed `aria-label` and `aria-hidden` attributes for screen readers.
- **Keyboard Navigation**: The timeline components support logical keyboard focus states and standard interaction models.

### Security Architecture
- **Input Sanitization**: API routes (e.g., `/api/verify`) implement explicit sanitization logic to strip HTML tags and potentially dangerous injection characters before processing.
- **Security Policy**: A standard `security.txt` is provided in the `public` directory, detailing vulnerability disclosure processes.
- **Safe Dependencies**: All libraries are strictly reviewed, and external requests are minimized.

### Google Cloud Run Integration
- **Standalone Build**: The Next.js application is configured to output a `standalone` build, drastically reducing the deployment bundle size.
- **Optimized Dockerfile**: The multi-stage `Dockerfile` leverages standard Alpine images and strips `node_modules` in the final runner stage, aiming for less than a 10MB footprint over the base image.
- **Exposed Port**: Ready for Cloud Run with port `8080` specifically exposed and managed via environment variables.

### Automated Testing & Validation
- **Jest Testing**: A comprehensive unit testing suite using Jest and React Testing Library is implemented to validate all components, state changes, and interactive flows.
- **GitHub Actions**: Continuous Integration pipeline configured via `.github/workflows/test.yml` to automatically execute the Jest test suite and linting on every push.

## Google Ecosystem Integration
To ensure maximum performance, security, and analytics capability, ElectraSync heavily utilizes the Google Cloud and Firebase ecosystem:
- **Google Cloud Run**: The primary hosting environment for our optimized Next.js Docker container, providing automatic scaling and secure HTTPS endpoints.
- **Google Cloud Build**: Employed for compiling the container from source directly within the Google Cloud infrastructure.
- **Google Analytics (gtag)**: Integrated via `@next/third-parties/google` for baseline page views, and explicitly extended with advanced `window.gtag` event tracking for timeline node engagement and simulated resource downloads.
- **Firebase Mock Integration**: Integrated as the core data engine. A live connection fetches real-time updates for the "Live Election News" ticker directly from a Firebase Mock setup.
- **Google Cloud Storage**: Demonstrates secure file retrieval capabilities through the mock download of the Election Guide from a simulated bucket URI (`gs://electrasync-assets/...`).
- **Google Maps API**: Embedded directly within the application to provide intuitive, location-based polling center search functionality on Polling Day.
- **Google Fonts**: Implemented utilizing the optimized `@next/font/google` package to serve the `Geist` typography system with zero layout shift.

## Tech Stack
- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Lucide React

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build and test the Docker container locally:
   ```bash
   docker build -t electrasync .
   docker run -p 8080:8080 electrasync
   ```
