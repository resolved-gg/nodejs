# reSolved nodeJS library

reSolved is an upcoming captcha solving service, capable of solving reCaptcha, hCaptcha, GeeTest as fast as sub 5 seconds. reSolved is designed to handle heavy workloads, unlike other captcha solving services. 

We strive to improve the reSolved experience every single day - which is why we are releasing libraries that make an already simple integration process completely seamless.


# Getting Started
### Installation
```
yarn add node-resolved
```
or
```
npm i node-resolved
```


### Import the library
```javascript
const Resolved = require('node-resolved')
```
or
```javascript
import resolved from 'node-resolved'
```


### Initialize an object
```javascript
resolved = new Resolved(
    COMPANY_API_KEY,
    USER_API_KEY
);
```


### Create a task and get the solved captcha token
```javascript
resolved.createTask(
        SITE_KEY",              // string
        SITE_URL,               // string
        CAPTCHA_SERVICE",       // string - e.g., reCaptcha, hCaptcha etc
        CAPTCHA_TYPE,           // string - e.g, v2Invis
        SESSION_CLONE,          // boolean
        SMART_MOVEMENT,         // boolean
        PROXY)                  // string - e.g., ip:port:username:password
        .then((v) => {
        resolved.getToken().then((res) => {
            token = res.data.token;
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
```

### using async/await syntax
```javascript
const task = await resolved.createTask(
        SITE_KEY",              // string
        SITE_URL,               // string
        CAPTCHA_SERVICE",       // string - e.g., reCaptcha, hCaptcha etc
        CAPTCHA_TYPE,           // string - e.g, v2Invis
        SESSION_CLONE,          // boolean
        SMART_MOVEMENT,         // boolean
        PROXY)                  // string - e.g., ip:port:username:password
   
const res = await resolved.getToken()
const token = res.data.token
```


# Full code example (then/catch)
```javascript
const Resolved = require("./main");

resolved = new Resolved(
    COMPANY_API_KEY,
    USER_API_KEY
);

resolved.createTask(
        SITE_KEY,
        SITE_URL,
        CAPTCHA_SERVICE,
        CAPTCHA_TYPE,
        SESSION_CLONE,
        SMART_MOVEMENT,
        PROXY)
    .then((v) => {
        resolved.getToken().then((vv) => {
            token = vv.data.token;
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
```

# Full code example (async/await)
```javascript
const Resolved = require("./main");

async main(){
resolved = new Resolved(
    COMPANY_API_KEY,
    USER_API_KEY
);

await resolved.createTask(
        SITE_KEY,
        SITE_URL,
        CAPTCHA_SERVICE,
        CAPTCHA_TYPE,
        SESSION_CLONE,
        SMART_MOVEMENT,
        PROXY)
    
const res = await resolved.getToken()
const token = vv.data.token
}

main()
```
