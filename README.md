# Blog Frontend

A React-based frontend application for my personal blog platform.

## Overview

This frontend interfaces with the [Blog API backend](https://github.com/frrst-ian/forrest-blog-backend) to provide a responsive web experience for reading and browsing blog content.

**Live Demo:** [https://ianforrest.netlify.app/posts](https://ianforrest.netlify.app/posts)

## Tech Stack

- React
- CSS3
- React Router (navigation)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/frrst-ian/forrest-blog-frontend.git
   ```

2. Navigate to project directory:
   ```bash
   cd forrest-blog-frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your API endpoint.

5. Start development server:
   ```bash
   npm start
   ```

6. Build for production:
   ```bash
   npm run build
   ```

## API Integration

This frontend connects to the Blog API backend. Ensure the backend is running and accessible at the configured endpoint.

Backend repository: [forrest-blog-backend](https://github.com/frrst-ian/forrest-blog-backend)

## License

MIT License