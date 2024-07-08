# CircleTechTest

## Quick start
Run `docker compose up -d` to run REDIS

then run `yarn build` to convert typescript into JS

then run `node ./dist/index.js`

## End points
Send multipart form with file in field `toConvert` field

the console will then output your next URL, you are to assume this was received via email

go to the new URL and you should see that REDIS is now empty, and that you are redirected to your new file (stubbe don personal server for now)