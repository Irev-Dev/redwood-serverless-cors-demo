Redwood project to demonstrate CORs issue that only appears when deploying the api to aws via serverless and only for the current user query (other graphQL queries are fine)

# Replicating Cors issue

go to https://main--jolly-lewin-4fa104.netlify.app/
hit the login button and sign in with

```
k.hutten@protonmail.ch
abc123
```

Open the network tab in dev tools and refresh the page, there should be two graphQL requests (not including pre-flight), the posts query is successful however the current user query fails from CORS even though it's using the same graphQL endpoint
![image](https://user-images.githubusercontent.com/29681384/144209595-4688721f-ee39-4dae-9c0c-f46e60b83cba.png)

To dig into the problem a little more, these two queries can be done with curl using the verbose flag, and this shows that the current user query does not have the correct CORS headers

posts query:

```
curl 'https://mr1b728oh9.execute-api.us-east-2.amazonaws.com/.netlify/functions/graphql' \
  -H 'authority: mr1b728oh9.execute-api.us-east-2.amazonaws.com' \
  -H 'pragma: no-cache' \
  -H 'cache-control: no-cache' \
  -H 'accept: */*' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36' \
  -H 'content-type: application/json' \
  -H 'sec-gpc: 1' \
  -H 'origin: https://main--jolly-lewin-4fa104.netlify.app' \
  -H 'sec-fetch-site: cross-site' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://main--jolly-lewin-4fa104.netlify.app/' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
  --data-raw '{"operationName":"BlogPostsQuery","variables":{},"query":"query BlogPostsQuery {\n  posts {\n    id\n    title\n    body\n    createdAt\n    __typename\n  }\n}"}' \
  --compressed -v
```

current user query:

```
curl 'https://mr1b728oh9.execute-api.us-east-2.amazonaws.com/.netlify/functions/graphql' \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzgzNTQxOTEsInN1YiI6IjI2MWYxNWQ3LTlkNmYtNGU3OC1iM2MyLTEzMTkyMjhjYTI5YyIsImVtYWlsIjoiay5odXR0ZW5AcHJvdG9ubWFpbC5jaCIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIn0sInVzZXJfbWV0YWRhdGEiOnt9fQ.oRinz5AnrOvoxA7X7uPGm-EVk5UEXQvrVZEHsJGwexA' \
  -H 'Referer: https://main--jolly-lewin-4fa104.netlify.app/' \
  -H 'auth-provider: netlify' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36' \
  -H 'content-type: application/json' \
  --data-raw '{"query":"query __REDWOOD__AUTH_GET_CURRENT_USER { redwood { currentUser } }"}' \
  --compressed -v
```

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

add the following to the `createGraphQLHandler` in `app/api/src/functions/graphql.ts` (For thoroughness even though the posts query still works without this step)

```
  cors: {
    origin: '*',
    credentials: true,
  },
```

redeploy to netlify.

see replication steps
