import axios from 'axios';
export const apiURL = 'https://isports247.net/api/';
export const appURL = 'https://isports247.net/';


export const apiReq = axios.create({
    baseURL: apiURL,
    timeout: 4000,
    headers: {
      'Content-type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    },
  });



  export const apis = {
    home: 'home',
    matchslide: 'matchslide',
    cricketslide: 'cricketslide',
    footballslide: 'footballslide',
    tennisslide: 'tennisslide',
    livescore: 'livescore',
    scorecard: id => `scorecard/${id}`,
    login: data => `login?${data}`,
    signup: data => `signup?${data}`,
    notification: data => `notification?${data}`,
    notifications: data => `notifications?${data}`,


  };