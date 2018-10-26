# @ngxs example application

**A port of [ngrx-example-app](https://github.com/ngrx/platform/tree/master/example-app).**

This app is a book collection manager. The user can authenticate, use the Google Books API to search for
books and add them to their collection.

Built with [@angular/cli](https://github.com/angular/angular-cli)

## TODO

1.  Create unit test for search collection.

### Included

- [ngxs](https://ngxs.gitbook.io/ngxs/) - including storage, router, devtools and router plugins.
- [jest](https://facebook.github.io/jest/)

### Quick start

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

# Start the server with aot enabled
yarn serve:aot
```

Navigate to [http://localhost:4200/](http://localhost:4200/) in your browser
