## Dependencies

- [valtio](https://github.com/pmndrs/valtio)

## Introduction

In the first stage, we hope to use the core dependency [valtio](https://github.com/pmndrs/valtio), and replace it with our own library in later stages.

During the first stage, we have imposed some restrictions on the usage of [valtio](https://github.com/pmndrs/valtio) API in order to facilitate the migration in the future.

The essential APIs that we want to use in the core during the first stage are:

- 🚀 Required
  - [proxy](https://valtio.pmnd.rs/docs/api/basic/proxy)
  - [useSnapshot](https://valtio.pmnd.rs/docs/api/basic/useSnapshot)
  - [devtools](https://valtio.pmnd.rs/docs/api/utils/devtools)
- 😺 Optional
  - [snapshot](https://valtio.pmnd.rs/docs/api/advanced/snapshot)
  - [proxySet](https://valtio.pmnd.rs/docs/api/utils/proxySet)
  - [proxyMap](https://valtio.pmnd.rs/docs/api/utils/proxyMap)

## Goals

- Provide a more concise and semantic API.
- Solve the inelegant problem of Context type mapping.
- Package most of the common business logic scenarios for mainstream hooks libraries.

## References

- [ahooks](https://ahooks.gitee.io/zh-CN)
- [vueuse](https://vueuse.org/)
- [valtio-signal](https://github.com/dai-shi/valtio-signal)
- [valtio-factory](https://github.com/mfellner/valtio-factory)
