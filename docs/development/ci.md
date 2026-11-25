# Continuous integration

The client uses npm for React and TypeScript and Cargo for Rust. Commit `package-lock.json`, `.github/tools/commitlint/package-lock.json` and `src-tauri/Cargo.lock`. CI installs JavaScript packages with `npm ci` and runs Cargo with `--locked`.

| Workflow        | Trigger             | Checks                                                                             |
| --------------- | ------------------- | ---------------------------------------------------------------------------------- |
| Branch CI       | Push outside `main` | Conventional Commits, frontend quality, Rust quality                               |
| Pull Request CI | PR to `main`        | Commit and PR title, quality, tests, coverage, frontend and native builds, CI Gate |
| Main CI         | Push to `main`      | Quality, tests, coverage and builds after merge                                    |

The required `CI Gate` succeeds only when all PR jobs succeed. Native tests and builds run on Ubuntu 24.04 x64, Windows 2025 x64 and macOS 15 ARM64. The build uses `--no-bundle`; it does not create installers. Rust coverage runs on Linux only. Frontend and Rust reports are separate, retained for 14 days, and have no minimum percentage yet.

`npm run validate` runs Prettier, ESLint and TypeScript checks. Run `cargo fmt --all -- --check`, `cargo clippy --locked --all-targets -- -D warnings` and `cargo test --locked` from `src-tauri`.

Workflows use read-only repository permissions, immutable action SHAs and GitHub-hosted runners. Dependency updates are proposed by Dependabot on Mondays at 06:00 America/Sao_Paulo. Rust caches are written by `main`; other refs restore caches only.

The `main-protection` ruleset requires a PR, an up-to-date passing `CI Gate`, linear history and resolved conversations. It blocks deletion and force pushes. Squash is the only merge method. Activate the required status check after the first successful PR run has registered it in GitHub.
