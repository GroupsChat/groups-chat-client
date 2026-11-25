# Groups Chat Client

Desktop client built with Tauri 2, React, TypeScript and Rust.

## Development

Use Node.js 24, npm 11 and Rust 1.94.1. On Linux, install the [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/) before building the desktop app.

```sh
npm ci
npm run tauri dev
```

Run `npm run validate`, `npm test` and `npm run build` for frontend checks. Run Rust checks from `src-tauri` as described in [CONTRIBUTING.md](CONTRIBUTING.md).

The CI pipeline and branch rules are described in [docs/development/ci.md](docs/development/ci.md).
