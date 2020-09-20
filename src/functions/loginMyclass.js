const axios = require('axios');
require('dotenv').config();

const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {
    if (event.httpMethod != 'POST') {
        return formattedResponse(405, { error: 'Invalid request method' });
    }
    const { Username, Password } = JSON.parse(event.body);
    const body = { Username, Password };
    try {
        const response = await axios({
            url: `${process.env.MYCLASS_URL}/Auth/Login`,
            method: 'POST',
            headers: {
                'Host': 'myclass.apps.binus.ac.id',
                'Referer': 'https://myclass.apps.binus.ac.id/Home/Index',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
            },
            data: body,
        });
        if (response.status != 200 || response.statusText != 'OK') {
            console.error(errors);
            throw new Error('An error occured');
        }
        
        return formattedResponse(200, { cookies: response.headers['set-cookie'], data: response.data });
        // return sample:
        // {
        // "cookies":
        // [
        //   'ASP.NET_SessionId=dgasdasdsuumnxpvuls; path=/; HttpOnly; SameSite=Lax',
        //   'ARRAffinity=7254a15345354ad76076415670ca9c4cf4a65f1d2870as634a8;Path=/;HttpOnly;Domain=myclass.apps.binus.ac.id'
        // ],
        // "data": { Status: true, Message: 'Login Success', URL: '/Home/Index' }
        // }

    } catch (err) {
        console.error(err);
        return formattedResponse(500, { error: 'An error occured' });
    }
};