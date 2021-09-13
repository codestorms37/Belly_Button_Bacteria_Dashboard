// 1. Create the buildCharts function.

function buildCharts(sample, show_str) {
  let show_int = parseInt(show_str);
  // 2. Use d3.json to load and retrieve the samples.json file
  d3.json("static/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    let samples_array = data.samples;
    // console.log(samples_array);
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let filtered_sample = samples_array.filter(
      (sampleElem) => sampleElem.id == sample
    );
    //  5. Create a variable that holds the first sample in the array.
    let firstSample = filtered_sample[0];
    // console.log("firstSample:", firstSample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = firstSample.otu_ids;
    let otu_labels = firstSample.otu_labels;
    let sample_values = firstSample.sample_values;

    // Bar Chart ------------------------------------------------------------------------

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    //  so the otu_ids with the most bacteria are last.
    var yticks = otu_ids.map((tick) => `OTU_${tick}`);
    // console.log(yticks);

    // 8. Create the trace for the bar chart.
    var barData = [
      {
        type: "bar",
        orientation: "h",
        x: sample_values.slice(0, show_int).reverse(),
        y: yticks.slice(0, show_int).reverse(),
        text: otu_labels.slice(0, show_int).reverse(),
      },
    ];
    // 9. Create the layout for the bar chart.
    var barLayout = {
      title: `Top ${show_str} Bacteria Cultures Found`,
      xaxis: { title: "Count" },
    };
    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", barData, barLayout);

    // Bubble Chart ------------------------------------------------------------------------
    // 1. Create the trace for the bubble chart.
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorscale: "Portland",
        },
      },
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU id" },
      yaxis: { title: "Count values" },
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // Gauge Chart ------------------------------------------------------------------

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    let metadata_array = data.metadata;

    let filtered_metadata = metadata_array.filter(
      (metadataElem) => metadataElem.id == sample
    );
    // 2. Create a variable that holds the first sample in the metadata array.
    let first_metadata = filtered_metadata[0];

    // 3. Create a variable that holds the washing frequency.
    let wfreq = parseFloat(first_metadata.wfreq);

    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: { text: '<h1>Belly Button Washing Frequency</h1>' },
        type: "indicator",
        // mode: "gauge+number+delta",
        mode: "gauge+number",
        // delta: { reference: 300 },
        gauge: {
          axis: { range: [null, 10] },
          bar: { color: "black"},
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "yellowgreen" },
            { range: [8, 10], color: "green" },
          ],
          /*
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 490,
          },
          */
        },
        barcolor: "black"
      },
    ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 600, height: 450, margin: { t: 0, b: 0 } 
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
