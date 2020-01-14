# SSR with

## TODOS

### Common

- [x] webpack: dev server & hot reload
- [x] webpack: production & development configs
- [ ] testing jest & enzyme
- [x] add polyfills & support IE9
- [x] docker container

### Clientside

- [x] react-helmet
- [ ] react-loadable
- [x] react-router
- [x] redux (thunk, devtool)
- [x] styled-components (no css)
- [x] pwa - manifest.json & serviceworker.js & offline support
- [x] bundle js in *.js.gz format

### Serverside

- [x] Serverside renderer
- [x] Error handler
- [x] logs
  - [x] error logs - `error.log`
  - [x] access logs - `combined.log`
- [ ] PM2 (process manager)

## Docker (production)

build image

``` shell
docker build -t 7ylee/ssr-react .
```

run image

``` shell
docker run -p ${PORT}:8080 --name ssr-react -d 7ylee/ssr-react
```

### favicons

generate from [here](https://favicon.io/emoji-favicons/package/)
