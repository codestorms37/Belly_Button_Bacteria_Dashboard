function optionChanged(newSample) {
  // console.log(newSample);
  buildMetadata(newSample);
  //buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("static/samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter((sampleObj) => sampleObj.id == sample);
    var result = resultArray[0];
    console.log(result);
    var PANEL = d3.select("#sample-metadata");
    // clear panel
    PANEL.html("");

    // insert values
    for (const [key, value] of Object.entries(result)) {
      console.log(`${key.toUpperCase()}: ${value}`);
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    }
  });
}
