# SICP in TypeScript

This folder contains the TypeScript implementation of examples and exercises from the book "Structure and Interpretation of Computer Programs" (SICP).

## Attribution

The code in this directory is based on the Scheme implementations provided by [Ivan Jovanović](https://github.com/ivanjovanovic/sicp).

## Project Structure

The code is organized by chapters and sections corresponding to the book:

- `1.x`: Building Abstractions with Procedures
- `2.x`: Building Abstractions with Data
- `3.x`: Modularity, Objects, and State
- `4.x`: Metalinguistic Abstraction
- `5.x`: Computing with Register Machines

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Installation

```bash
cd typescript
npm install
```

### Running Tests

We use [Vitest](https://vitest.dev/) for testing. To run all tests:

```bash
npm test
```

## Implementation Notes

While Scheme is a functional Lisp dialect, this port attempts to capture the core concepts of SICP using TypeScript's features, including:
- First-class functions and closures
- Higher-order procedures
- Data abstraction using types and classes
- Streams and lazy evaluation (simulated using closures)
- Concurrency primitives (simulated using Promises)
