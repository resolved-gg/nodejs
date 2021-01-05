const axios = require('axios')

module.exports = class Resolved {
    BASE_URL = "https://tasks.resolved.gg/api/v1"

    constructor(company_api_key, user_api_key) {
        this.company_api_key = company_api_key;
        this.user_api_key = user_api_key
        this.taskID = ''
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));

    }
    testMethod() {
        return [1, 2]
    }

    async createTask(site_key, site_url, captcha_type, captcha_version, session_clone, smart_movement, proxy, cookies = [], headers = []) {
        this.site_key = site_key;
        this.site_url = site_url;
        this.captcha_type = captcha_type;
        this.captcha_version = captcha_version;
        this.session_clone = session_clone;
        this.smart_movement = smart_movement;
        this.proxy = proxy;
        this.cookies = cookies;
        this.headers = headers;

        let payload = {};
        if (session_clone == false) {
            payload = {
                "proxy": this.proxy,
                "company_api_key": this.company_api_key,
                "user_api_key": this.user_api_key,
                "site_key": this.site_key,
                "site_url": this.site_url,
                "captcha_type": this.captcha_type,
                "captcha_version": this.captcha_version,
                "session_clone": this.session_clone,
                "smart_movement": this.smart_movement
            }
        } else {
            payload = {
                "proxy": this.proxy,
                "company_api_key": this.company_api_key,
                "user_api_key": this.user_api_key,
                "site_key": this.site_key,
                "site_url": this.site_url,
                "captcha_type": this.captcha_type,
                "captcha_version": this.captcha_version,
                "session_clone": this.session_clone,
                "cookies": this.cookies,
                "headers": this.headers,
                "smart_movement": this.smart_movement
            }
        }

        try {
            const response = await axios.post(`${this.BASE_URL}/recaptcha/new-task`, payload)
            if (response.data.code !== 200) {
                return {
                    "status": "error",
                    "message": "Failed to send task to API",
                    "data": response.data
                }
            } else {
                this.taskID = response.data.data.task_id
                return {
                    "status": "success",
                    "message": "Successfully created and sent to API",
                    "data": {
                        "taskID": response.data.data.task_id
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    async getToken() {
        const payload = {
            "company_api_key": this.company_api_key,
            "user_api_key": this.user_api_key,
            "task_id": this.taskID
        }

        let processed = false;
        while (!processed) {
            var [response,
                code] = await this.getResult(payload)
            if (response && code) {
                processed = true
                return {
                    "status": "success",
                    "message": "Successfully solved reCaptcha",
                    "data": {
                        "token": response
                    }
                }
            } else if (response && code == 500) {
                return {
                    "status": "error",
                    "message": "Failed to send task to API",
                    "data": response.json()
                }, 500
            } else {
                console.log("Waiting to solve reCaptcha...")
            }

            await this.sleep(500)
        }
    }

    async getResult(payload) {
        const response = await axios.post(`${this.BASE_URL}/get-task-by-id`, payload)
        if (response.data.code !== 200) {
            return [{
                "status": "error",
                "message": "Failed to send task to API",
                "data": response.data
            }, 500]
        } else {
            const data = response.data.data.task
            if (data.tokenValue) {
                const token = data.tokenValue
                return [token, 200]
            } else {
                return [null, null]
            }
        }
    }
}