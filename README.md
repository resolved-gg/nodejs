# reSolved nodeJS library

reSolved (a product from dominus labs) is a captcha solving service which is able to solve reCaptcha, geetest, hCaptcha in fraction of seconds.

We are working everyday to make the experience better for everyone i.e., developers and end-users, reSolved is well designed to work in high load times - our infrastructure is made in such a way that it can handle high stress in drop times.

This is a nodejs library which is made by the reSolved team to make the integration easy for all the bot developers out there.


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
        "6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz",
        "https://www.supremenewyork.com/checkout",
        "reCaptcha",
        "v2Invis",
        false,
        false,
        "")
        .then((v) => {
        resolved.getToken().then((res) => {
            token = res.data.token;
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));
```

### using async/await syntax
```javascript
const task = await resolved.createTask(
        "6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz",
        "https://www.supremenewyork.com/checkout",
        "reCaptcha",
        "v2Invis",
        false,
        false,
        "")
   
const res = await resolved.getToken()
const token = res.data.token
```
