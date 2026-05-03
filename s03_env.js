import http from 'k6/http'
import { sleep } from 'k6'

const BASE_URL = __ENV.BASEURL || 'http://test.k6.io';
//In the code __ENV.BASE_URL || 'http://test.k6.io', what is the purpose of the string after the || operator?
//It serves as a default fallback value if the environment variable is not provided


export const options = {
    vus: 5,
    duration: '10s'
}


export default function () {
    http.get(BASE_URL);
    sleep(1);
}

/*
Q. Which command line flag is used to pass an environment variable to k6?
A. -e
Example: k6 run .\03_env.js -e BASE_URL='https://www.google.com' 
*/