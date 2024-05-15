/*
* Author: DC-Nam
* Desc: upload (image,video) to imgur.com
*/

require('express')().use(async(req, res, next)=> {
    let {url} = req.query;

    if (!url)return next();

    let d = new FormData();
    d.append(/(\.|)mp4/.test(url)?'video': 'image', new Buffer(await fetch(url).then(f=>f.arrayBuffer()).catch(()=>'')).toString('base64'));
    d.append('type', 'base64');

    fetch('https://api.imgur.com/3/upload', {
        method: 'post',
        headers: {
            Authorization: 'Client-ID 0beb6e44d5c89f3',
        },
        body: d,
    }).then(f=>f.json()).catch(f=>f.json()).then(json=>res.send(json?.data?.link || json));
}).listen(1002);