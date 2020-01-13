var grids = ['de', 'au', 'uk', 'us', 'za'];

$(document).ready(function () {

//    var model = {
//        "traversalPath": [
//            {
//                "from": "MESSAGEACTION",
//                "to": "MESSAGE"
//            },
//            {
//                "from": "MESSAGEACTION",
//                "to": "IP"
//            },
//            {
//                "from": "MESSAGE",
//                "to": "ATTACHMENT"
//            }
//        ],
//        "startNodeIds": [
//            "AV.Rej"
//        ],

//        "where": {},
//        "groupByAggregationType": "COUNT",
//        "groupBy": [
//            "ATTACHMENT.malware_name", "IP.city", "IP.country", "MESSAGE.timestamp"
//        ],
//        "dateInterval": "HOUR"
//    }
//;

//    $.ajax({
//        type: "POST",
//        data: JSON.stringify(model),
//        url: "http://de-jarvis-1.de.mimecast.lan:8080/v1/jarvisgraph/traversalV2?group=GRID&groupKey=de&fromTs=2019-09-05+09%3A00%3A00&toTs=2019-09-05+09%3A01%3A00",
//        contentType: 'application/x-www-form-urlencoded',
//        dataType: 'json',
//        success: function (data) {
//            console.log(data);
//        }
//    })


    //date_time('date-time');

    loadAllData();
    
});

function loadAllData() {

    $.getJSON('/static/json/customer_location.json', function (cData) {

        var allData = [];
        
        loadGridData(0, allData, cData);
    });

  

    
    
}

function loadGridData(position, iData, cData) {
   
    $.getJSON('/static/json/attacks/' + grids[position] + '.json', function (gridData) {

        appendJson(iData, gridData.result);
       

        if ((position + 1) < grids.length) {
            loadGridData(position + 1, iData, cData);
        } else {
           
            loadAttacks(sortByDateTime(iData, "MESSAGE.timestamp"), cData);
        }

    });
}


function appendJson(firstData, secondData) {
   
    for (var i = 0; i < secondData.length; i++) {
       
        firstData.push(secondData[i]);
    }

}

function loadAttacks(aData, cData) {
    // setup default min/max timer range for random draw
    attack_min = 10;
    attack_max = 20;    
   
    // add/change the attack types here
    attack_type = ["any port scan in a storm", "ssh brutish force", "Thought Leader Tweet",
        "SYN FLOOD BA-BY", "Spotty", "Heartbleed Hotel", "Po_ODLE", "Sharknado",
        "CORGI Attack", "Ping of DOOM", "Conficker", "Goldfinger", "SANDPAPER",
        "SNAILshock", "Spaghetti RAT", "Driduplex"];

    // gotta add types here if you add more sounds (or delete them)

    audio_type = ["starwars", "tng", "b5", "wargames", "pew", "galaga", "asteroids", "china", "timallen"]

    // need this to more easily grab URI query parameters
    $.extend({
        getUrlVars: function () {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getUrlVar: function (name) {
            return $.getUrlVars()[name];
        }
    });

    // here is where we deal with parameters
    // try to grab them, see if they exist, make changes to defaults if they do

    var norse_mode = $.getUrlVar('norse_mode');
    var bad_day = $.getUrlVar('bad_day');
    var org_name = $.getUrlVar('org_name');
    var chatt_mode = $.getUrlVar('chatt_mode');
    var china_mode = $.getUrlVar('china_mode');
    var dprk_mode = $.getUrlVar('dprk_mode');
    var employee_mode = $.getUrlVar('employee_mode');
    var employee_fname = $.getUrlVar('employee_fname');
    var employee_lname = $.getUrlVar('employee_lname');
    var origin = $.getUrlVar('origin');
    var random_mode = $.getUrlVar('random_mode');
    var tng = $.getUrlVar('tng');
    var wargames = $.getUrlVar('wargames');
    var b5 = $.getUrlVar('b5');
    var nofx = $.getUrlVar('nofx');
    var pew = $.getUrlVar('pew');
    var allfx = $.getUrlVar('allfx');
    var galaga = $.getUrlVar('galaga');
    var asteroids = $.getUrlVar('asteroids');
    var china = $.getUrlVar('china');
    var timallen = $.getUrlVar('timallen');
    var drill_mode = $.getUrlVar("drill_mode");
    var in_lat = $.getUrlVar("lat");
    var in_lon = $.getUrlVar("lon");
    var destination = $.getUrlVar("destination");
    var greenattacks = $.getUrlVar("greenattacks");
    var redattacks = $.getUrlVar("redattacks");

    var attackTypes = ["CXmail", "Trojan", "Junk", "Others"];

 

    

    snd_id = "starwars";
    if (typeof tng !== 'undefined') { snd_id = "tng"; }
    if (typeof b5 !== 'undefined') { snd_id = "b5"; }
    if (typeof wargames !== 'undefined') { snd_id = "wargames"; }
    if (typeof pew !== 'undefined') { snd_id = "pew"; }
    if (typeof galaga !== 'undefined') { snd_id = "galaga"; }
    if (typeof asteroids !== 'undefined') { snd_id = "asteroids"; }
    if (typeof china !== 'undefined') { snd_id = "china"; }
    if (typeof timallen !== 'undefined') { snd_id = "timallen"; }

    if (typeof bad_day !== 'undefined') {
        attack_min = 200;
        attack_max = 200;
    }

    if (typeof org_name !== 'undefined') { $("#titlediv").text(decodeURI(org_name) + " IPew Attack Map").html() }

    // we maintain a fixed queue of "attacks" via this class
    function FixedQueue(size, initialValues) {
        initialValues = (initialValues || []);
        var queue = Array.apply(null, initialValues);
        queue.fixedSize = size;
        queue.push = FixedQueue.push;
        queue.splice = FixedQueue.splice;
        queue.unshift = FixedQueue.unshift;
        FixedQueue.trimTail.call(queue);
        return (queue);
    }

    FixedQueue.trimHead = function () {
        if (this.length <= this.fixedSize) { return; }
        Array.prototype.splice.call(this, 0, (this.length - this.fixedSize));
    };

    FixedQueue.trimTail = function () {
        if (this.length <= this.fixedSize) { return; }
        Array.prototype.splice.call(this, this.fixedSize, (this.length - this.fixedSize)
        );
    };

    FixedQueue.wrapMethod = function (methodName, trimMethod) {
        var wrapper = function () {
            var method = Array.prototype[methodName];
            var result = method.apply(this, arguments);
            trimMethod.call(this);
            return (result);
        };
        return (wrapper);
    };

    FixedQueue.push = FixedQueue.wrapMethod("push", FixedQueue.trimHead);
    FixedQueue.splice = FixedQueue.wrapMethod("splice", FixedQueue.trimTail);
    FixedQueue.unshift = FixedQueue.wrapMethod("unshift", FixedQueue.trimTail);

    var rand = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    var getRandomCountry = function (countries, weight) {

        var total_weight = weight.reduce(function (prev, cur, i, arr) {
            return prev + cur;
        });

        var random_num = rand(0, total_weight);
        var weight_sum = 0;

        for (var i = 0; i < countries.length; i++) {
            weight_sum += weight[i];
            weight_sum = +weight_sum.toFixed(2);

            if (random_num <= weight_sum) {
                return countries[i];
            }
        }

    };

    // need to make this dynamic since it is approximated from sources

    var countries = [9, 22, 29, 49, 56, 58, 78, 82, 102, 117, 139, 176, 186];
    var weight = [0.000, 0.001, 0.004, 0.008, 0.009, 0.037, 0.181, 0.002, 0.000, 0.415, 0.006, 0.075, 0.088];
    var countriesStats = [];

    var customerStats = [];

    // the fun begins!
    //
    // pretty simple setup ->
    // * make base Datamap
    // * setup timers to add random events to a queue
    // * update the Datamap

    var map = new Datamap({

        scope: 'world',
        element: document.getElementById('container1'),
        projection: 'miller',
        // change the projection to something else only if you have absolutely no cartographic sense

        fills: {
            'red': 'rgb(255, 102, 89)',
            'orange': 'rgb(255, 173, 66)',
            'green': 'rgb(106, 191, 105)',
            'blue': 'rgb(86, 200, 216)',
            defaultFill: '#004BA0'
        }, //url(#pattern-default)

        geographyConfig: {
            dataUrl: null,
            hideAntarctica: true,
            borderWidth: 0.75,
            borderColor: 'transparent',
            popupTemplate: function (geography, data) {
                return '<div class="hoverinfo" style="color:white;background:black">' +
                    geography.properties.name + "<br/>Attack: " + getCountryStats(geography.id) + '</div>';
            },
            popupOnHover: true,
            highlightOnHover: true,
            highlightFillColor: '#eb6025',
            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            highlightBorderWidth: 2
        },
        bubblesConfig: {
            borderWidth: 14,
            borderOpacity: 0.1,
            borderColor: 'rgba(245, 124, 0, 0.1)',
            popupOnHover: true,
            radius: 6,
            fillOpacity: 0.75,
            animate: true,
            highlightOnHover: true,
            highlightFillColor: '#FC8D59',
            highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
            highlightBorderWidth: 2,
            highlightBorderOpacity: 0.1,
            highlightFillOpacity: 0.85,
            exitDelay: 100,
            key: JSON.stringify
        },
        done: function (datamap) {
            //$('svg.datamap').prepend(refs());
            
        }
    })

    // we read in a modified file of all country centers
    var centers = [];
    var countriesCodes = [];
    d3.csv("/static/csv/CountriesCodes.csv", function (data) { countriesCodes = data; });
    d3.csv("/static/csv/samplatlong.csv", function (data) { slatlong = data; });
    d3.tsv("/static/csv/country_centroids_primary.csv", function (data) { centers = data; });   
   //d3.csv("/static/csv/cnlatlong.csv", function (data) { cnlatlong = data; });
    

    // setup structures for the "hits" (arcs)
    // and circle booms

    var hits = FixedQueue(7, []);
    var boom = FixedQueue(7, []);

    

    // we need random numbers and also a way to build random ip addresses
    function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
    function getAttackTypeFillKey(attackType) {
        if (attackType != "" && attackType != undefined) {
            if (attackType.indexOf(attackTypes[0]) >= 0) {
                return "red";
            } else if (attackType.indexOf(attackTypes[1]) >= 0) {
                return "orange";
            } else if (attackType.indexOf(attackTypes[2]) >= 0) {
                return "green";
            }
            else {
                return "blue";
            }
        } else {
            return "blue";
        }
    }

    function getAttackTypeIndex(attackType) {
        var typeIdex = 4;
        if (attackType != undefined && attackType != null) {
            for (var i = 0; i < attackTypes.length; i++) {
                //console.log(attackType.indexOf(attackTypes[i]));
                if (attackType.indexOf(attackTypes[i]) >= 0) {
                    typeIdex = i + 1;
                    break;
                }
            }
        }
        return typeIdex;
    }

    function getAttackTypeColor(attackType) {
        if (attackType != "" && attackType != undefined) {
            if (attackType.indexOf(attackTypes[0]) >= 0) {
                return "rgb(255, 102, 89, 0.4)";
            } else if (attackType.indexOf(attackTypes[1]) >= 0) {
                return "rgb(255, 173, 66, 0.4)";
            } else if (attackType.indexOf(attackTypes[2]) >= 0) {
                return "rgb(106, 191, 105, 0.4)";
            }
            else {
                return "rgb(86, 200, 216, 0.4)";
            }
        } else {
            return "rgb(86, 200, 216, 0.4)";
        }
    }
    function getStroke(attackType, sLong, dLong) {
        //console.log(sLong + ',' + dLong);
        if (attackType != "" && attackType != undefined) {
            if (attackType.indexOf(attackTypes[0]) >= 0) {
                return (dLong < sLong ? "url(#gradient-red-lr)" : "url(#gradient-red-rl)");
            } else if (attackType.indexOf(attackTypes[1]) >= 0) {
                return (dLong < sLong ? "url(#gradient-orange-lr)" : "url(#gradient-orange-rl)");
            } else if (attackType.indexOf(attackTypes[2]) >= 0) {
                return (dLong < sLong ? "url(#gradient-green-lr)" : "url(#gradient-green-rl)");
            }
            else {
                return (dLong < sLong ? "url(#gradient-blue-lr)" : "url(#gradient-blue-rl)");
            }
        } else {
            return (dLong < sLong ? "url(#gradient-green-lr)" : "url(#gradient-green-rl)");
        }
    }
    function getDestination() { return Math.round(Math.random() * 100); }
    function getCenterOfCountry(country) {
        var countryGeo;
        for (var i = 0; i < centers.length; i++) {
            if (centers[i]["ISO3136"] == country) {
                countryGeo = centers[i];
                break;
            }
        }
        return countryGeo;
    }
    function getCountryDetails(countryCode) {
        var countryDetails = "";
        for (var i = 0; i < countriesCodes.length; i++) {
            if (countriesCodes[i]["alpha-3"].toLocaleLowerCase() == countryCode) {
                countryDetails = countriesCodes[i];
                break;
            }
        }
        return countryDetails;
    }

    function getCountryDetailsBy2(countryCode) {
        var countryDetails = "";
        for (var i = 0; i < countriesCodes.length; i++) {
            if (countriesCodes[i]["alpha-2"].toLocaleLowerCase() == countryCode) {
                countryDetails = countriesCodes[i];
                break;
            }
        }
        return countryDetails;
    }

    function getCountryCode(countryName) {
        
        var countryCode = "";
        for (var i = 0; i < countriesCodes.length; i++) {
            //console.log(countriesCodes[i]["name"]);
            if (countriesCodes[i]["name"].toLocaleLowerCase().indexOf(countryName.toLocaleLowerCase()) >= 0) {
                countryCode = countriesCodes[i]["alpha-2"];
                break;
            }
        }
        return countryCode;
    }

    function refs() {
        return '<defs>'
            + '<pattern id="pattern-default" width="4" height="4" patternUnits="userSpaceOnUse"><circle class="vx-pattern-circle" cx="2" cy="2" r="1" fill="#ffffff" stroke="none" stroke-width="0"></circle></pattern>'
            + '<linearGradient id="gradient-green-lr" x1="0%" y1="0%" x2="100%" y2="0%">'
            + '<stop offset="0%" stop-color="rgb(106, 191, 105, 0.2)" />'
            + '<stop offset="100%" stop-color="rgb(106, 191, 105, 0.9)" />'
            + '</linearGradient>'
            + '<linearGradient id="gradient-green-rl" x1="0%" y1="0%" x2="100%" y2="0%">'
            + '<stop offset="0%" stop-color="rgb(106, 191, 105, 0.9)" />'
            + '<stop offset="100%" stop-color="rgb(106, 191, 105, 0.2)" />'
            + '</linearGradient>'
            + '</defs>';
    }
    function getGridCountry(grid) {
        var deGrid = "DEU,NLD,NOR,GRB,ARE,IRL,DNK,ITA,FRA,BEL,CHE,SWE,RUS,POL,ISR,IND,CZE,ROU,FIN,MCO,AUT,UKR,PRT,CYP,SVN,USA";
        var ukGrid = "GRB,ARE,IRL,DNK,ITA,FRA,BEL,CHE,SWE,RUS,POL,ISR,IND,CZE,ROU,FIN,MCO,AUT,UKR,PRT,CYP,SVN";
        var usGrid = "USA,CA,CL,PR,BM,MX,JM,UY";
        var auGrid = "AU,NZL,SGP,FJI,PHL,TWN,JPN,KOR";
        var zaGrid = "ZA,MU,NA,KE,BW,NG,ZM,ZW,GH,MZ,LS,MW";
        var jerGrid = "SA";

        var gridCountries = "";
        var gridGeo = [];


        if (grid == "de") {
            gridCountries = deGrid.toLocaleLowerCase();
        }

        for (var k = 0; k < slatlong.length; k++) {
            if (gridCountries.indexOf(slatlong[k]["country"]) >= 0) {

                gridGeo.splice(gridGeo.length, 0, slatlong[k]);
            }
        }

        //console.log(gridGeo);
        return gridGeo;

    }
    function getCountryStats(countryCode) {  
        var countryStats = "N/A";
        if (countriesStats != null && countriesStats != undefined) {
            for (var k = 0; k < countriesStats.length; k++) {
                //console.log(countriesCode[countriesStats[k][1]] + "," + countryCode);
                if (countriesCode[countriesStats[k][1]] == countryCode) {
                    countryStats = countriesStats[k][0];
                }
            }
        }

        return countryStats;
    }

    function getCustomerLocation(account) {
    
        if (cData != null && cData != undefined) {
            for (var q = 0; q < cData.length; q++) {

                if (cData[q]["Mimecast Code"] == account) {
                    return cData[q];

                }
            }
        }
    }

    function getTotalCountryAttacks() {
        var totalAtt = 0;
        
        var attackTypeStats = [0,0,0,0];
        for (var k = 0; k < aData.length; k++) {

            var countAttack = parseInt(aData[k]["count"]);
            totalAtt += countAttack;
            //var mimecastCode = aData[k]["ACCOUNT.code"];
            //var icustomer = getCustomerLocation(mimecastCode)
            //if (icustomer != undefined && icustomer["Town/City"] == 'Prague') {
            //    console.log(k + "/" +  getCountryCode(icustomer["Country"]) + "/");
            //    console.log(icustomer);
            //}
            
            //country stats
            var existed = false;
            for (var n = 0; n < countriesStats.length; n++) {
                if (countriesStats.length > 0) {
                    if (countriesStats[n][1] == aData[k]["IP.country"]) {
                        countriesStats[n][0] += parseInt(aData[k]["count"]);
                        existed = true;
                        break;
                    }
                }
            }

            if (existed == false) {
                countriesStats.push([parseInt(aData[k]["count"]), aData[k]["IP.country"] ]);
            }     

            //customer stats
            var custom_existed = false;
            var customer = getCustomerLocation(aData[k]["ACCOUNT.code"]);
            
            for (var s = 0; s < customerStats.length; s++) {
                
                if (customerStats.length > 0 && customer != undefined) {
                    if (customerStats[s][1] == customer["Country"]) {
                        customerStats[s][0] += parseInt(aData[k]["count"]);
                        custom_existed = true;
                        break;
                    }
                }
            }

            if (custom_existed == false && customer != undefined) {
                customerStats.push([parseInt(aData[k]["count"]), customer["Country"]]);
            }     



            //attack types
         
            var attackType = aData[k]["ATTACHMENT.malware_name"];
            if (attackType != undefined) {
                if (attackType.indexOf(attackTypes[0]) >= 0) {
                    attackTypeStats[0] += countAttack;
                } else if (attackType.indexOf(attackTypes[1]) >= 0) {
                    attackTypeStats[1] += countAttack;
                } else if (attackType.indexOf(attackTypes[2]) >= 0) {
                    attackTypeStats[2] += countAttack;
                }
                else {
                    attackTypeStats[3] += countAttack;
                }
            } else {
                attackTypeStats[3] += countAttack;
            }
        }

        
        //$('#today-count').html(numberWithCommas(totalAtt));

        var result = countriesStats.sort(compareNumbers);    
        for (var m = 0; m < (result.length > 4 ? 4 : result.length); m++) {
            $('.attack-location ul').append('<li class="country-flag f-' + result[m][1].toLocaleLowerCase() + '">#' + (m + 1) + " " + result[m][1] + '</li>')
           
        }

        var customeResult = customerStats.sort(compareNumbers);
        //console.log(countriesCodes);
        for (var t = 0; t < (customeResult.length > 4 ? 4 : customeResult.length); t++) {
            var countryCode = getCountryCode(customeResult[t][1]);
            $('.threat-location ul').append('<li class="country-flag f-' + countryCode.toLocaleLowerCase() + '">#' + (t + 1) + " " + countryCode  + '</li>');

        }

        
        setAttacksTypesStats(attackTypeStats, totalAtt);  

        var startDate = new Date(aData[0]["MESSAGE.timestamp"]);
        var endDate = new Date(aData[aData.length - 1]["MESSAGE.timestamp"]);
        var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
        if (startDate.getDate() == endDate.getDate() && startDate.getMonth() == endDate.getMonth() && startDate.getFullYear() == endDate.getFullYear()) {
            $('#date-range').html(startDate.getDate() + " " + months[startDate.getMonth()] + " " + startDate.getFullYear());
        }
        else {
            $('#date-range').html(startDate.getDate() + " " + months[startDate.getMonth()] + " and " + endDate.getDate() + " " + months[endDate.getMonth()] + " " + endDate.getFullYear());
        }
        
    }

    function setAttacksTypesStats(attackTypeStats, totalAtt) {
        for (var p = 0; p < attackTypeStats.length; p++) {
            $('.attack-types ul').append('<li class="type-' + (p+1) + '"><h5>' + attackTypes[p] + '</h5><div class=\"attack-pecentage\"> ' + (attackTypeStats[p] * 100 / totalAtt).toFixed(2) + '% </div></li>');

        }
        var ctxpie = document.getElementById('pieChart').getContext('2d');
        var pieChartData = {
            labels: attackTypes,
            datasets: [{
                borderWidth: 0,
                data: attackTypeStats,
                backgroundColor: [
                    "rgb(255, 102, 89)",
                    "rgb(255, 173, 66)",
                    "rgb(106, 191, 105)",
                    "rgb(86, 200, 216)"
                ]
            }]

        };

        var myDoughnutChart = new Chart(ctxpie, {
            type: 'doughnut',
            data: pieChartData,
            options: {
                legend: {
                    position: 'right',

                },
                cutoutPercentage: 70
            }
        });
    }

    function loadTotalAttacks() {
        //console.log(getTotalCountryAttacks());
        getTotalCountryAttacks();
        var MONTHS = [ 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept'];

        var horizontalBarChartData = {
            labels: MONTHS,
            datasets: [{
                borderWidth: 1,
                data: [
                    3333663,
                    3129046,
                    2158066,
                    2944400,
                    2810695,
                    3234583,
                    2998078,
                    3411504
                ],
                backgroundColor: '#E75A0D'
            }]

        };

        var ctx = document.getElementById('barChart').getContext('2d');
        Chart.defaults.global.defaultFontColor = '#fff';
        Chart.defaults.global.defaultFontFamily = 'Open Sans, Arial, sans-serif;';
        window.myHorizontalBar = new Chart(ctx, {
            type: 'horizontalBar',
            data: horizontalBarChartData,
            options: {
                // Elements options apply to all of the options unless overridden in a dataset
                // In this case, we are setting the border of each horizontal bar to be 2px wide
                elements: {
                    rectangle: {
                        borderWidth: 2,
                    }
                },

                responsive: true,
                legend: {
                    position: 'right',
                    display: false
                },
                title: {
                    display: false

                },
                scales: {
                    xAxes: [{
                        ticks: {
                            // Include a dollar sign in the ticks
                            callback: function (value, index, values) {
                                return  value/ 1000000 + 'M';
                            }
                        }
                    }]
                }
            }
        });

        
        
    }

    // doing this a bit fancy for a hack, but it makes it
    // easier to group code functions together and have variables
    // out of global scope
    var attacks = {

        interval: getRandomInt(attack_min, attack_max),
        position: 0,

        init: function () {
            
            setTimeout(
                jQuery.proxy(this.getData, this),
                this.position == 0 ? 5000 : this.interval
            );

            
        },

        getData: function () {
            
            var self = this;

            if (typeof norse_mode !== 'undefined') { return; }

            //if (typeof random_mode !== 'undefined') {Math.floor((Math.random() * slatlong.length)); }

            //random destination country in grid
            var gridGeo = getGridCountry("de");

            dst = Math.floor((Math.random() * gridGeo.length));

            //src = Math.floor((Math.random() * slatlong.length));

            //if ((dst == src)) {
            //    dst = src + 1;
            //    if (dst > slatlong.length - 1) { dst = src - 1 }
            //}

            //if (typeof allfx !== 'undefined') {
            //    snd_id = audio_type[Math.floor((Math.random() * audio_type.length))];
            //}
            //// no guarantee of sound playing w/o the load - stupid browsers
            //if (typeof nofx === 'undefined') {
            //    document.getElementById(snd_id).load();
            //    document.getElementById(snd_id).play();
            //}

            // add hit to the arc queue
            // use strokeColor to set arc line color

            //console.log(countriesCode[aData.result[this.position]["IP.country"]]);

            if (aData[this.position] != undefined) {
                var city = aData[this.position]["IP.city"];
                var country = aData[this.position]["IP.country"];
                var timestamp = aData[this.position]["MESSAGE.timestamp"]; 
                var attackType = aData[this.position]["ATTACHMENT.malware_name"];
                var mimecastCode = aData[this.position]["ACCOUNT.code"];
                var customer = getCustomerLocation(mimecastCode);

                var process = this;
                var apiUrl = "";
                if (strEmpty(city) && strEmpty(country)) {
                    apiUrl = "/api/countrygeo/us";
                } else if (strEmpty(city) && !strEmpty(country)) {
                    apiUrl = "/api/countrygeo/" + country;
                } else if (!strEmpty(city) && strEmpty(country)) {
                    apiUrl = "/api/citygeo/unknow/" + city;
                } else {
                    apiUrl = "/api/citygeo/" + country + "/" + city;
                }

                var customerApiUrl = "";
              
                var customerCity ="";
                var customerCountry =  "";

                if (customer != undefined) {
                    customerCity = customer["Town/City"] != undefined ? customer["Town/City"] : "";
                   
                     customerCountry = getCountryCode(customer["Country"] != undefined ? customer["Country"] : "");
                }
                //console.log(customerCountry);
                if (strEmpty(customerCity) && strEmpty(customerCountry)) {
                    customerApiUrl = "/api/countrygeo/us";
                } else if (strEmpty(customerCity) && !strEmpty(customerCountry)) {
                    customerApiUrl = "/api/countrygeo/" + customerCountry ;
                } else if (!strEmpty(customerCity) && strEmpty(customerCountry)) {
                    customerApiUrl = "/api/citygeo/unknow/" + customerCity ;
                } else {
                    customerApiUrl = "/api/citygeo/" + customerCountry + "/" + customerCity ;
                }

               
                $.ajax({
                    url: apiUrl,
                    success: function (attckResponse) {
                        
                        $.ajax({
                            url: customerApiUrl,
                            success: function (customResponse) {

                                var srclat = attckResponse.latitude;
                                var srclong = attckResponse.longitude;
                                var dstlat = customResponse.latitude;
                                var dstlong = customResponse.longitude;
                                which_attack = attackType; //attack_type[Math.floor((Math.random() * attack_type.length))];
                                var srccountry = country;
                             

                                //console.log(dstlat + "|" + dstlong );

                                attackdiv_slatlong = (customerCity == "" ? "" : (customerCity + ",")) + customerCountry;

                                // Specify attack color
                                if (typeof greenattacks !== 'undefined') {
                                    strokeColor = 'rgb(0,128,0, 0.6)';
                                }
                                else if (typeof redattacks !== 'undefined') {
                                    strokeColor = 'rgba(255, 0, 0, 0.6)';
                                }
                                else {
                                    strokeColor = getStroke(which_attack, parseFloat(srclong), parseFloat(dstlong));
                                }

                                //console.log(strokeColor);

                                if (typeof drill_mode != 'undefined') {

                                    dstlat = in_lat
                                    dstlong = in_lon
                                }

                                hits.push({
                                    origin: { latitude: +srclat, longitude: +srclong },
                                    destination: { latitude: +dstlat, longitude: +dstlong }
                                });
                                map.arc(hits, { strokeWidth: 3, strokeColor: strokeColor});

                                // add boom to the bubbles queue

                                boom.push({
                                    radius: 6, latitude: +dstlat, longitude: +dstlong,
                                    fillOpacity: 1, attk: which_attack, borderColor: getAttackTypeColor(which_attack), fillKey: getAttackTypeFillKey(which_attack),
                                });
                                map.bubbles(boom, {
                                    popupTemplate: function (geo, data) {
                                        return '<div class="hoverinfo">' + data.attk + '</div>';
                                    }
                                });

                                // update the scrolling attack div
                                //console.log(attackdiv_slatlong);
                                $('#attackdiv').append(("<div class=\"attack-row attack-type-" + getAttackTypeIndex(which_attack)  + "\"><div>" + trunckStr(which_attack, 20) + "</div><div>" +
                                    (city == undefined ? "" : (city + ","))) + srccountry +
                                    "</div><div class=\"arrow\"><img src=\"/static/images/arrow.png\" alt=\"arrow\"></div><div>" +
                                    attackdiv_slatlong + "</div><div>" + formatDateTime(timestamp) + "</div>" +

                                    "</div>");
                                $('#attackdiv').animate({ scrollTop: $('#attackdiv').prop("scrollHeight") }, 500);
                                if (process.position == 5) {
                                    $('#attackdiv').css("bottom", "0");
                                }

                                if (process.position == 0) {      
                                   
                                    loadTotalAttacks();
                                    $('.loading').addClass('hide');
                                } else {
                                    
                                    var totalAttacks = parseInt($('#today-count').html().replace(',', '').replace(',', ''));
                                    $('#today-count').html(numberWithCommas(totalAttacks + 1));
                                }

                                if (process.position > 6) {
                                    $('#attackdiv').find('.attack-row:first').remove();
                                }

                                //console.log(parseInt($('#today-count').html().replace(',', '').replace(',', '')));
                            
                                // pick a new random time and start the timer again!
                                process.interval = getRandomInt(attack_min, attack_max);

                                console.log(process.position);
                                if (process.position >= aData.length - 1) {                                   
                                    process.position = 1;
                                } else {
                                    process.position++;
                                }

                                
                                process.init();

                                
                            }
                        });
                    }
                });

                //var srcCountry = aData.result[this.position]["IP.country"]
            }

        },

    };

    // start the ball rolling!
    attacks.init();

    // lazy-dude's responsive window
    //d3.select(window).on('resize', function () { location.reload(); });

    
}



function date_time(id) {
    date = new Date;
    year = date.getFullYear();
    month = date.getMonth();
    months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'Jully', 'August', 'September', 'October', 'November', 'December');
    d = date.getDate();
    day = date.getDay();
    days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    h = date.getHours();
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    result = '<div>' + days[day] + ', ' +  d + ' ' + months[month] + '</div><div>' + ' ' + h + ':' + m + ':' + s + '</div>';
    document.getElementById(id).innerHTML = result;
    setTimeout('date_time("' + id + '");', '1000');
    return true;
}

function formatDateTime(dt) {
    date = new Date(dt);
    year = date.getFullYear();
    month = date.getMonth() + 1;
    d = date.getDate();
    day = date.getDay();
    h = date.getHours();
    if (d < 10) {
        d = "0" + d;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (h < 10) {
        h = "0" + h;
    }
    m = date.getMinutes();
    if (m < 10) {
        m = "0" + m;
    }
    s = date.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    result = d  + '/' + month + '/' + year + ' ' + h + ':' + m + ':' + s ;
    
    return result;
}


function trunckStr(str, length) {
    if (str != undefined && str != null && str != '' && str.length > length) {
        return str.substring(0, length - 1) + "...";
    } else if (str == undefined || str == null && str == '' ) {
        return "Unknown";
    } else {
        return str;
    }
}


function sortByValue(jsObj, key) {
   
    var sortedArray = [];   
    for (var i in jsObj) {
        // Push each JSON Object entry in array by [value, key]
        sortedArray.push([jsObj[i][key], jsObj[i]]);
    }

    sortedArray.sort(compareNumbers);

    return sortedArray;
    
}


function compareNumbers(a, b) {
    return b[0] - a[0];
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sortByDateTime(jsObj, key) {

    var sortedArray = [];
    var sortedJoson = [];
    for (var i in jsObj) {
        // Push each JSON Object entry in array by [value, key]       
        sortedArray.push([jsObj[i][key], jsObj[i]]);
    }

    sortedArray.sort(compareDateTime);

    for (var n = 0; n < sortedArray.length; n++) {
        //console.log(new Date(sortedArray[n][1]["MESSAGE.timestamp"]));
       sortedJoson.push(sortedArray[n][1]);
    }

    return sortedJoson;

}

function compareDateTime(a, b) {
    return new Date(a[0]) - new Date(b[0]);
}

function strEmpty(aStr) {
    return (aStr == undefined || aStr == null || aStr == "");
}