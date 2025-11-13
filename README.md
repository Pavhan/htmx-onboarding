# Express Nunjucks TailwindCSS 

> A starter project with Express, Nunjucks and TailwindCSS

## Setup

Pre-requisites:

- Node.js (LTS version recommended)
- Yarn (or npm)

### Installation

Install dependencies:

```bash
yarn install
```

### Development

Run the application in development mode (with auto-reload):

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

### Production

Build and start the application:

```bash
yarn start
```

This will build Tailwind CSS and start the server.


## Express setup

The Express "page" resources are located in [./src/pages](./src/pages).

Their corresponding Nunjucks templates are in [./src/views](./src/views).

Applications routes for pages are defined in [./src/router.js](./src/router.js).

Global concerns like security, cookie parsing, body parsing and request logging are handled in [./server.js](./server.js).

This application loosely follows the [Presentation Domain Data Layering](https://www.martinfowler.com/bliki/PresentationDomainDataLayering.html):

- Data Presentation is dealt with in the `./src/pages` folder
- Domain is dealt with in the `./src/modules` folder.
