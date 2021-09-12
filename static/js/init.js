function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  var showSelected = d3.select("#selShow").property("value");
  
  console.log(showSelected);

  // Use the list of sample names to populate the select options
  d3.json("static/samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts(firstSample,showSelected);
  });
}

// Initialize the dashboard
init();


function optionChanged() {
  var sampleSelected = d3.select("#selDataset").property("value");
  var showSelected = d3.select("#selShow").property("value");
  // Fetch new data each time a new sample is selected
  buildMetadata(sampleSelected);
  buildCharts(sampleSelected, showSelected);
  
}