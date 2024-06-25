## Step-by-Step Instructions and Checklist

- [ ] Run `yarn plop`, and follow prompts to generate server or client components for your library
- [ ] 🌟 Enable [private vulnerability reporting](https://github.com/react18-tools/react-mouse-trail/security)
- [ ] Set up `CodeCov`
  - Visit Codecov and set up your repo
  - Create [repository secret](<(https://github.com/react18-tools/react-mouse-trail/settings/secrets/actions)>) for `CODECOV_TOKEN`
- [ ] Set up `CodeClimate`
  - Visit CodeClimate and set up your repo
  - Create [repository secret] for `CC_TEST_REPORTER_ID`
  - Add `*.test.*` to ignore patterns on the website
  - Update Code Climate badge
- [ ] Add `NPM_AUTH_TOKEN` to repository secrets to automate package publishing
  - Log in to your [`npm` account](https://www.npmjs.com/login) and create an automation token
  - Create a new repository secret `NPM_AUTH_TOKEN`
- [ ] Update description in `lib/package.json`
- [ ] (Optional) Add Repo Stats by visiting and setting up [repobeats](https://repobeats.axiom.co/)
- [ ] Create your library and update examples
- [ ] Update README as required
- [ ] Set up GitHub pages to deploy docs
  - Go to [repo settings](https://github.com/react18-tools/react-mouse-trail/settings/pages) -> pages (On the left panel); Select deploy from a branch; Then Select `main` and `/docs`
- [ ] (Optional) Set up [Deepsource](https://app.deepsource.com/login) for static code analysis
- [ ] Push your changes/Create PR and see your library being automatically tested and published
- [ ] Optionally deploy your examples to Vercel.
- [ ] Feel free to star this template, contribute, and/or sponsor the [`terborepo-template`](https://github.com/react18-tools/turborepo-template) project or my [other open-source work](https://github.com/sponsors/mayank1513)
- [ ] You can also fork the [`terborepo-template`](https://github.com/react18-tools/turborepo-template/fork) and add your package to `scripts/featured.json`
  - If approved, your package will be automatically added to FEATURED.md and also published on the home page of this repo.

## Recommended Repository Settings

Go to [repository settings] and configure the following:

- [ ] Enable Discussions
- [ ] Enable `Always suggest updating pull request branches`
- [ ] Enable `Automatically delete head branches`

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
