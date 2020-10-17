# @ngxs example application


**A port of [ngrx-example-app](https://github.com/ngrx/platform/tree/master/example-app).**

This app is a book collection manager. The user can authenticate, use the Google Books API to search for books and add them to their collection.

To log in, the username and password is `test`.

Live demo could be found [here](https://ngxs-example-app.netlify.app). (ReduxDevTools enabled)

Try on [StackBlitz](https://stackblitz.com/github/eranshmil/ngxs-example-app).

![Screenshot](assets/screenshot.png)

## Included

- [ngxs](https://ngxs.gitbook.io/ngxs/) - including storage, router, devtools and logger plugins.
- [jest](https://facebook.github.io/jest/)

## Quickstart

```bash
# Clone the repo
git clone https://github.com/eranshmil/ngxs-example-app.git

# Use yarn to install the dependencies
yarn

# Start the server
yarn serve

# Running test suites
yarn test

# Build the app
yarn build:prod
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser
