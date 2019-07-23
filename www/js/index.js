/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

        networking.bluetooth.getDevices(function (devices) {
            for (var i = 0; i < devices.length; i++) {
                // The deviceInfo object has the following properties:
                // address: String --> The address of the device, in the format 'XX:XX:XX:XX:XX:XX'.
                // name: String --> The human-readable name of the device.
                // paired: Boolean --> Indicates whether or not the device is paired with the system.
                // uuids: Array of String --> UUIDs of protocols, profiles and services advertised by the device.
                console.log(devices[i].address);
            }

            alert(JSON.stringify(devices[0]));

            alert(devices[0].address);
            alert(devices[0].uuids[0]);

            alllert=$('#alert');
            networking.bluetooth.connect(devices[0].address, devices[0].uuids[0], function (socketId) {

//                var arr_bytes = [];
                var arr_bytes = [65, 66, 67, 68];

                networking.bluetooth.send(socketId, arr_bytes, function (bytes_sent) {
//                    alert('Sent ' + bytes_sent + ' bytes');
                    var deff=alllert.val();
                    alllert.val( deff  + "," + bytes_sent );
                }, function (errorMessage) {
                    alert('Send failed: ' + errorMessage);
                });



            }, function (errorMessage) {
                alert('Connection failed: ' + errorMessage);
            });
        });


    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
