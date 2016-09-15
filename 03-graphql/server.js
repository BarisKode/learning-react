var graphql = require('graphql').graphql;
var express = require('express');
var graphQLHTTP = require('express-graphql');
//var Schema = require('./bundle');
var Schema = require('./schema');
var query = 'query { todos { id, title, completed } }';

graphql(Schema, query).then(function (result) {
    console.log(JSON.stringify(result));
    // Prints
    // {
    //   "data":{
    //     "todos":[
    //       {
    //         "id":1446412739542,
    //         "title":"Read emails",
    //         "completed":false
    //       },
    //       {
    //         "id":1446412740883,
    //         "title":"Buy orange",
    //         "completed":true
    //       }
    //     ]
    //   }
    // }
});

var app = express()
    .use('/', graphQLHTTP({schema: Schema, pretty: true}))
    .listen(8080, function (err) {
        console.log('GraphQL Server is now running on localhost:8080');
    });