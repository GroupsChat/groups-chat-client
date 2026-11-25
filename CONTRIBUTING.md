# Contributing

Create a branch from `main`, use Conventional Commits and open a pull request targeting `main`. PR titles also use Conventional Commits syntax, for example `feat(client): add instance selection`.

The optional local commit hook can be enabled with:

```sh
npm ci --prefix .github/tools/commitlint
git config core.hooksPath .githooks
```

Run the same checks used in CI before opening a PR:

```sh
npm ci
npm run validate
npm test
npm run test:coverage
npm run build
cd src-tauri
cargo fmt --all -- --check
cargo clippy --locked --all-targets -- -D warnings
cargo test --locked
```

The desktop build can be checked with `npm run tauri build -- --debug --no-bundle -- --locked` from the repository root. Native builds need platform prerequisites. CI builds Linux, Windows and macOS on hosted runners.

Use squash merge after CI passes. See [CI documentation](docs/development/ci.md) for checks and reports.
