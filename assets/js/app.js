var events = [];
var pageNo = 1;
var pageCount;
//All available categories from Eventbrite's API.
var categories = {
    101: "Business & Professional",
    102: "Science & Technology",
    103: "Music",
    104: "Film, Media & Entertainment",
    105: "Performing & Visual Arts",
    106: "Fashion & Beauty",
    107: "Health & Wellness",
    108: "Sports & Fitness",
    109: "Travel & Outdoor",
    110: "Food & Drink",
    111: "Charity & Causes",
    112: "Government & Politics",
    113: "Community & Culture",
    114: "Religion & Spirituality",
    115: "Family & Education",
    116: "Seasonal & Holiday",
    117: "Home & Lifestyle",
    118: "Auto, Boat & Air",
    119: "Hobbies & Special Interest",
    120: "School Activities",
    199: "Other",
    null: "None"
};
var airports = ["BHM", "DHN", "HSV", "MOB", "MGM", "ANC", "FAI", "JNU", "FLG", "PHX", "TUS", "YUM", "FYV", "LIT", "XNA", "BUR", "FAT", "LGB", "LAX", "OAK", "ONT", "PSP", "SMF", "SAN", "SFO", "SJC", "SNA", "ASE", "COS", "DEN", "GJT", "PUB", "BDL", "HVN", "IAD", "DAB", "FLL", "RSW", "JAX", "EYW", "MIA", "MCO", "PNS", "PIE", "SRQ", "TPA", "PBI", "PFN", "ATL", "AGS", "SAV", "ITO", "HNL", "OGG", "KOA", "LIH", "BOI", "ORD", "MLI", "PIA", "EVV", "FWA", "IND", "SBN", "CID", "DSM", "ICT", "LEX", "SDF", "BTR", "MSY", "SHV", "AUG", "BGR", "PWM", "BWI", "BOS", "HYA", "ACK", "ORH", "BTL", "DET", "FNT", "GRR", "AZO", "LAN", "MBS", "DLH", "MSP", "RST", "GPT", "JAN", "MCI", "STL", "SGF", "BIL", "LNK", "OMA", "LAS", "RNO", "MHT", "ACY", "EWR", "TTN", "ABQ", "ALM", "ALB", "BUF", "ISP", "JFK", "SWF", "ROC", "SYR", "HPN", "AVL", "CLT", "FAY", "GSO", "RDU", "INT", "BIS", "FAR", "CAK", "CVG", "CLE", "CMH", "DAY", "TOL", "OKC", "TUL", "EUG", "PDX", "SLE", "ABE", "ERI", "MDT", "PHL", "PIT", "AVP", "PVD", "CHS", "CAE", "GSP", "MYR", "PIR", "RAP", "FSD", "TRI", "CHA", "TYS", "MEM", "BNA", "AMA", "AUS", "CRP", "DAL", "ELP", "HOU", "LBB", "MAF", "SAT", "SLC", "BTV", "MPV", "RUT", "IAD", "PHF", "ORF", "RIC", "ROA", "PSC", "SEA", "GEG", "CRW", "CKB", "HTS", "GRB", "MSN", "MKE", "CPR", "CYS", "JAC"];
var cities = ["Birmingham", "Dothan", "Huntsville", "Mobile", "Montgomery", "Anchorage", "Fairbanks", "Juneau", "Flagstaff", "Phoenix", "Tucson", "Yuma", "Fayetteville", "Little Rock", "Northwest Arkansas", "Burbank", "Fresno", "Long Beach", "Los Angeles", "Oakland", "Ontario", "Palm Springs", "Sacramento", "San Diego", "San Francisco", "San Jose", "Santa Ana", "Aspen", "Colorado Springs", "Denver", "Grand Junction", "Pueblo", "Hartford", "Tweed New Haven", "Washington", "Daytona Beach", "Fort Lauderdale-Hollywood", "Fort Meyers", "Jacksonville", "Key West", "Miami", "Orlando", "Pensacola", "St. Petersburg", "Sarasota", "Tampa", "West Palm Beach", "Panama City", "Atlanta", "Augusta", "Savannah", "Hilo", "Honolulu", "Kahului", "Kailua", "Lihue", "Boise", "Chicago", "Moline", "Peoria", "Evansville", "Fort Wayne", "Indianapolis", "South Bend", "Cedar Rapids", "Des Moines", "Wichita", "Lexington", "Louisville", "Baton Rouge", "New Orleans", "Shreveport", "Augusta (Maine)", "Bangor", "Portland", "Baltimore", "Boston", "Hyannis", "Nantucket", "Worcester", "Battlecreek", "Detroit", "Flint", "Grand Rapids", "Kalamazoo", "Lansing", "Saginaw", "Duluth", "Minneapolis", "Rochester", "Gulfport", "Jackson", "Kansas City", "St Louis", "Springfield", "Billings", "Lincoln", "Omaha", "Las Vegas", "Reno-Tahoe", "Manchester", "Atlantic City", "Newark", "Trenton", "Albuquerque", "Alamogordo", "Albany", "Buffalo", "Islip", "New York", "Newburgh", "Rochester", "Syracuse", "Westchester", "Asheville", "Charlotte", "Fayetteville", "Greensboro", "Raleigh", "Winston-Salem", "Bismark", "Fargo", "Akron", "Cincinnati", "Cleveland", "Columbus", "Dayton", "Toledo", "Oklahoma City", "Tulsa", "Eugene", "Portland", "Salem", "Allentown", "Erie", "Harrisburg", "Philadelphia", "Pittsburgh", "Scranton", "Providence", "Charleston", "Columbia", "Greenville", "Myrtle Beach", "Pierre", "Rapid City", "Sioux Falls", "Bristol", "Chattanooga", "Knoxville", "Memphis", "Nashville", "Amarillo", "Austin Bergstrom", "Corpus Christi", "Dallas", "El Paso", "Houston", "Lubbock", "Midland", "San Antonio", "Salt Lake City", "Burlington", "Montpelier", "Rutland", "Dulles", "Newport News", "Norfolk", "Richmond", "Roanoke", "Pasco", "Seattle", "Spokane", "Charleston WV", "Clarksburg", "Huntington", "Green Bay", "Madison", "Milwaukee", "Casper", "Cheyenne", "Jackson Hole"];


//Dynamically add filter categories to Filter Dropdown.
$("#filter").empty();
for (x in categories) {
    var newOpt = $("<option>");
    newOpt.val(x)
        .text(categories[x])
    $("#filter").append(newOpt);
}

//On Selection of Filters, hide all rows, then only show rows containing the selected categories.
$("#filter").on("change", function () {
    var categoryFilters = $(this).val();
    if (categoryFilters.length === 0) {
        $("#events").find("tr").show();
        return false;
    } else {
        $("#events").find("tr").hide();
        for (x in categoryFilters) {
            $("#events").find(`tr[data-category='${categoryFilters[x]}']`).show();
        }
    }
});

// api call function 
function eventbriteAPI(destination, startDate, endDate) {

    if (destination) {
        console.log(destination);
    };
    if (startDate) {
        startDate = moment(startDate).format("YYYY-MM-DDThh:mm:ss");
    };
    if (endDate) {
        endDate = moment(endDate).format("YYYY-MM-DDThh:mm:ss");
    }

    var queryURL = `https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search?start_date.range_start=${startDate}&start_date.range_end=${endDate}&location.address=${destination}&page=${pageNo}`;

    $.ajax({
        url: queryURL,
        method: "GET",
        beforeSend: function (request) {
            request.withCredentials = true;
            request.setRequestHeader("Authorization", "Bearer QPEWGCGG3AMHB3TDR5S2");
        },
    }).then(function (response) {
        for (i = 0; i < response.events.length; i++) {
            events.push(response.events[i]);
        }
        pageCount = response.pagination.page_count;
        console.log("pass: " + pageNo);
        if (pageCount > 1 && pageCount !== pageNo) {
            for (i = 2; i <= pageCount; i++) {
                pageNo = i;
                eventbriteAPI(destination, startDate, endDate)
            }
        }
    }).then(function () { //Additional Then for after the events array is complete.
        $("#events").empty(); //Empty the Events table.
        for (x in events) { //For each element in events array.
            var data = events[x]; //Set data to current element interval.
            if (data.summary === null) //If event does not have a summary, skip it.
                continue;
            var newTR = $(`<tr data-category='${data.category_id}'>`);
            newTR.append(`<td>${data.name.text}</td>`)
                // .append(`<td>${data.summary}</td>`) //Event Summary, Shorter than the description
                .append(`<td >${(data.category_id === null) ? 'None' : categories[data.category_id]}`)
                .append(`<td>${moment(data.start.local).format("MM/DD/YYYY<br>h:mm a")}</td>`) //Formats date/time
                .append(`<td>${data.is_free ? 'Free!' : 'Not Free!'}</td>`) //Terniary operator, outputs based on is_free boolean.
                .append(`<td><a href='${data.url}'>More Info</a>`); //URL to the eventbrite page.
            $("#events").append(newTR);
        }
    });
}

function skyscannerAPI(from, to, date) {
    var date1 = moment(date).format("YYYY-MM-DD");
    console.log(date1);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/" + from + "-sky/" + to + "-sky/" + date1,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
            "x-rapidapi-key": "15873b5e23mshf948e6e3feda7b2p1db4fajsn89e6f75dccf9"
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        for (i = 0; i < response.Carriers.length; i++) {
            if (response.Quotes[0].OutboundLeg.CarrierIds[0] == response.Carriers[i].CarrierId) {
                var row2 = `
                <tr>
                <td>${from}</td>
                <td>${response.Carriers[i].Name}</td>
                <td>${date}</td>
                <td>${response.Quotes[0].MinPrice}</td>
                </tr>
                `
                $(".flight").append(row2);
            }
        }
    });

}

// eventbriteAPI("Charlotte", "2019-09-02", "2019-09-03");

$(document).ready(function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var destination = $("#destination-input").val().trim();
        var origin = $("#origin-input").val().trim();
        var startDate = $("#start-date").val().trim();
        var endDate = $("#end-date").val().trim();
        console.log(`${destination} ${startDate} ${endDate}`);
        var origin1;
        var destination1;
        $(".flight").empty();

        for (i = 0; i < cities.length; i++) {
            if (origin === cities[i]) {
                origin1 = airports[i];
            }
        }
        for (i = 0; i < cities.length; i++) {
            if (destination === cities[i]) {
                destination1 = airports[i];
            }
        }

        eventbriteAPI(destination, startDate, endDate);
        skyscannerAPI(origin1, destination1, startDate);
        skyscannerAPI(destination1, origin1, endDate);

    });


});




// $(document).ready(function(){
//   for ( i = 0; i < events.length;i++){
//     var event = events[i];
//     var free = event.is_free;
//     var name = event.name;
//     var url = event.url;
//     // var tableEntry = 
//   }
// });


$(document).ready(function () {
    $('select').formSelect();
});

$(document).ready(function () {
    $('input.autocomplete').autocomplete({
        data: {
            "New York": null,
            "Apple": null,
            "Microsoft": null,
            "Google": 'https://placehold.it/250x250'
        },
    });
});

$(document).ready(function () {
    $('.datepicker').datepicker();
});