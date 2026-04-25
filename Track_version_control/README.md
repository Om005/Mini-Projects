# Rust VCS

A minimal version control system implementation written in Rust — work in progress.

## About

This repository is a learning project to implement major Git-like functionality from the ground up in Rust. The goal is to explore how real-world VCS primitives work (objects, refs, index, commit graph, branching, merging, networking) by building them step by step.

## Current status

Work in progress — actively implementing core pieces. High-level status:

- [x] Project scaffold, track init
- [~] Object database (blob/tree/commit serialization) — in development
- [~] simple commit creation — in development
- [~] Index / staging area
- [ ] Branch and refs management
- [ ] Merging and conflict resolution
- [ ] Packfile support and performance optimizations


(Items marked ~ are actively being worked on.)

## Goals / Planned features

- Implement on-disk object store compatible with canonical concepts (blobs, trees, commits, tags)
- Support a simple index (staging) and commit workflow
- Manage refs and branches, create and checkout commits
- Implement merge strategies and basic conflict handling
- Provide reflog and basic history manipulation tools (rebase, cherry-pick)
- Implement packfiles for storage efficiency
- Provide clear documentation and learning-oriented examples

## Getting Started

Prerequisites

- Rust (stable)
- Cargo

Build and run

```bash
git clone https://github.com/yourusername/Rust_VCS.git
cd Rust_VCS
cargo build
cargo run -- --help
```

Note: CLI commands are experimental and evolving; expect breaking changes while the project is under active development.

## Project Structure

```
Rust_VCS/
├── src/         # implementation and CLI
├── Cargo.toml
└── README.md
```

## Development roadmap

- Stabilize object storage and ensure correct serialization/deserialization
- Implement a robust index format and path handling
- Add branch/ref commands and a checkout mechanism
- Implement merge algorithm and conflict markers
- Add packfile creation and ingestion

## Contributing

Contributions, ideas, and issues are welcome. If you'd like to help, open an issue to discuss what you want to work on, or submit a pull request. Please follow Rust formatting and add tests where appropriate.

## License

MIT License — see LICENSE file for details.