const Resolved = require("./main");

resolved = new Resolved(
    "0fdd7a34-16ff-4ab7-a28b-566ff425c12c",
    "264f06d413e71211d66a4ff42b2076"
);
console.log(`[TIME]: ${new Date().toISOString()}  [MESSAGE]: Creating Task`)
resolved
    .createTask(
        "6LeWwRkUAAAAAOBsau7KpuC9AV-6J8mhw4AjC3Xz",
        "https://www.supremenewyork.com/checkout",
        "reCaptcha",
        "v2Invis",
        false,
        false,
        ""
    )
    .then((v) => {
        console.log(`[TIME]: ${new Date().toISOString()}  [MESSAGE]: Task Created`)
        console.log(`[TIME]: ${new Date().toISOString()}  [MESSAGE]: Solving captcha...`)
        resolved.getToken().then((vv) => {
            console.log(`[TIME]: ${new Date().toISOString()}  [MESSAGE]: Captcha Solved!`)
            console.log(vv)
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));