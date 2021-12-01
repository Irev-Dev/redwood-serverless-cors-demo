Redwood project to demonstrate CORs issue that only appears when deploying the api to aws via serverless and only for the current user query (other graphQL queries are fine)

# Replicating Cor issue

go to https://main--jolly-lewin-4fa104.netlify.app/
hit the login button and sign in with

```
k.hutten@protonmail.ch
abc123
```

Open the network tab in dev tools and refresh the page, there should be two graphQL requests (not including pre-flight), the posts query is successful however the current user query fails from CORS even though it's using the same graphQL endpoint

See also this forum post: https://community.redwoodjs.com/t/cors-issue-specific-to-auth-request/2575
# Project setup

This project was created with the following steps

```
yarn run build:test-project ~/rw3 --typescript

yarn rw setup auth netlify
yarn rw setup auth netlify
```

- Changing the db to use postgres and then running `yarn rw prisma migrate dev`
- Setting up a new db on railway
- Setting up the site on netlify
- Setting up netlify's identity service.

```
yarn rw setup deploy aws-serverless
```

add DATABASE_URL_PROD env var and te serverless.yml

```
yarn rw deploy aws
```
Update the `apiUrl` in `redwood.toml` to the newly deployed url (in this case: https://mr1b728oh9.execute-api.us-east-2.amazonaws.com/.netlify/functions)

redeploy to netlify.

see replication steps
