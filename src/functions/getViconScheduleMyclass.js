const axios = require('axios');
require('dotenv').config();

const formattedResponse = require('./utils/formattedResponse');

exports.handler = async (event) => {
    if (event.httpMethod != 'GET') {
        return formattedResponse(405, { error: 'Invalid request method' });
    }
    const { Cookie } = event.queryStringParameters;
    const body = {};
    try {
        const response = await axios({
            url: `${process.env.MYCLASS_URL}/Home/GetViconSchedule`,
            method: 'GET',
            headers: {
                'Host': 'myclass.apps.binus.ac.id',
                'Referer': 'https://myclass.apps.binus.ac.id/Home/Index',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36',
                'Cookie': Cookie,
            },
            data: body,
        });
        if (response.status != 200 || response.statusText != 'OK') {
            console.error(errors);
            throw new Error('An error occured');
        }

        return formattedResponse(200, { data: response.data });
        // return sample:
        // {
        // "data":
        // [
        // {
        //     "StartDate": "/Date(1600621200000)/",
        //     "DisplayStartDate": "21 Sep 2020",
        //     "StartTime": "09:20:00",
        //     "EndTime": "11:00:00",
        //     "SsrComponentDescription": "Lecture",
        //     "ClassCode": "LA01",
        //     "Room": "-",
        //     "Campus": "-",
        //     "DeliveryMode": "GSLC",
        //     "CourseCode": "COMP6140",
        //     "CourseTitleEn": "Data Mining",
        //     "ClassType": "-",
        //     "WeekSession": 2,
        //     "CourseSessionNumber": 2,
        //     "MeetingId": "-",
        //     "MeetingPassword": "-",
        //     "MeetingUrl": "-",
        //     "UserFlag": "Student",
        //     "BinusianId": "BN001468062",
        //     "PersonCode": "2201731106",
        //     "FullName": "JEREMY LEONARDO",
        //     "AcademicCareer": "RS1",
        //     "ClassMeetingId": "20100000028466",
        //     "Location": "-",
        //     "MeetingStartDate": "/Date(-62135596800000)/",
        //     "Id": null
        // },...
        // ]
        // }

    } catch (err) {
        console.error(err);
        return formattedResponse(500, { error: 'An error occured' });
    }
};