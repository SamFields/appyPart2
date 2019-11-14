/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START gae_node_request_example]
const express = require('express');

const app = express();

let median = 0;
let mean = 0;
let max = 0;
let min = 0;
let total = 0;

let rates = [];

app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello, you have reached the LubDub Assignment')
    .end();
});

app.get('/addData', (req, res) => {
  let data = parseInt(req.query.heartRate)
  res
    .status(200)
    .send('Heart rate = ' + req.query.heartRate)
    .end();
  rates.push(data);
});

app.get('/statistics', (req, res) => {
  let i = 0
  let size = rates.length
  max = Math.max(...rates);
  min = Math.min(...rates);
  if (size == 0)
    mean = 0;
  else{
    for(i=0; i<size; i++)
      total += rates[i];
    mean = total/size;
  }
  median = med(rates);
  res
    .status(200)
    .send('Max is ' + max + " Min is " + min + " Median is " + median + " Mean is " + mean)
    .end();
});

function med(values){
  if(values.length ===0) return 0;

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_node_request_example]

module.exports = app;