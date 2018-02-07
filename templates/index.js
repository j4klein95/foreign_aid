function updateData(data) {
  //create a reference to the html panel
  var pnl = document.getElementById("foreign-metadata");
  //clear existing data
  pnl.innerHTML = '';
  // follow the BB Dash template, loop through json and create metadata tags
  for (var key in data) {
    h6tag = document.createElement('h6');
    h6Text = document.createTextNode(`${key}: ${data[key]}`);
    h6tag.append(h6Text);

    pnl.appendChild(h6tag);
  }
};

Plotly.d3.json('/sector_spending', function(error, data) {
  if (error) return console.warn(error);
  console.log(data)
});
//add options to the dropdown
function addOptions() {
  var selector = document.getElementById('selDataset');
  Plotly.d3.json('/sector_spending', function(error, data) {
    for (var i = 0; i < data.length; i++) {
      var currentOption = document.createElement('option');
      currentOption.text = data[i].year;
      currentOption.value = data[i].year
      selector.appendChild(currentOption);

    }
  })
};

//function to build charts
function buildPie(data) {
  Plotly.d3.json('/sector_spending', function(error, response) {
    if (error) return console.warn(error);

  //grab values
  var biz = response[data].business;
  var econ = response[data].economic;
  var edu = response[data].education;
  var gov = response[data].government;
  var hp = response[data].health;
  var multi = response[data].multi_sector;
  var yr = response[data].year;

  var labels = ["business", "economy", "education", "government", "health", "multiple sectors"]

  var data = [{
    values: [biz, econ, edu, gov, hp, multi],
    labels: labels,
    type: 'pie'
  }];
  var layout = {
    margin: { t: 0, l: 0 }
  };
  var PIE = document.getElementById('pie');
  Plotly.plot(PIE, data, layout);
});
};
function updatePanel(data) {
Plotly.d3.json('/sector_spending', function(error, response) {
  if (error) return console.warn(error);
  updateData(response);
})
}


//Initialize the plots
function init() {
buildPie();
updatePanel();
addOptions();
}

init();



// second try
var allYears = unpack(response.year),
var allBusiness = unpack(response.business),
var allEconomic = unpack(response.economic),
var allEducation = unpack(response.education),
var allGovernment = unpack(response.government),
var allHealth = unpack(response.health),
var allMultiSector = unpack(response.multi_sector)



Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function (err, data) {
  // Create a lookup table to sort and regroup the columns of data,
  // first by year, then by continent:
  var lookup = {};
  function getData(year, continent) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {;
      byYear = lookup[year] = {};
    }
	 // If a container for this year + continent doesn't exist yet,
	 // then create one:
    if (!(trace = byYear[continent])) {
      trace = byYear[continent] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }



/////////////////////////////////
var lookup = {};
function getData(year) {
  var byYear, trace;
  if (!(byYear = lookup[year])) {
    byYear = lookup[year] = {};
    trace = {
      x: [],
      y: [],
      id: [],
      text: [],
      marker: {size: []}
    };
  }
  return trace;
}
for (var i = 0; i < data.length; i++) {
  var datum = data[i];
  var trace = getData(datum.year);
  trace.text.push(datum.country);
  trace.id.push(datum.country);
  trace.x.push(datum.net_aid_received);
  trace.y.push(datum.gdp_per_capita);
  trace.marker.size.push(datum.literacy_rate + 10);
}
var years = Object.keys(lookup);
var firstYear = lookup[years[0]];
console.log(years);

//create main traces
var traces = [];



//////////////////


var layout = {
  xaxis: {
    title: 'Net Aid Received',
  },
  yaxis: {
    title: 'GDP per Capita',
    type: 'log'
  },
  hovermode: 'closest',
  updatemenus: [{
    x: 0,
    y: 0,
    yanchor: 'top',
    xanchor: 'left',
    showactive: false,
    direction: 'left',
    type: 'buttons',
    pad: {t: 87, r: 10},
    buttons: [{
      method: 'animate',
      args: [null, {
        mode: 'immediate',
        fromcurrent: true,
        transition: {duration: 300},
        frame: {duration: 500, redraw: false}
      }],
      label: 'Play'
    }, {
      method: 'animate',
      args: [[null], {
        mode: 'immediate',
        transition: {duration: 0},
        frame: {duration: 0, redraw: false}
      }],
      label: 'Pause'
      }]
    }],
    sliders: [{
      pad: {l: 130, t:55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size:20, color: '#66'}
      },
      steps: sliderSteps
    }]
  }
  Plotly.plot('bubble', {data: traces, layout: layout, frames: frames,});
});
