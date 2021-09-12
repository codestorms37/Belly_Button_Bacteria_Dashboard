// 1. Create the buildCharts function.

function buildCharts(sample, show_str) {
  let show_int = parseInt(show_str);
  // 2. Use d3.json to load and retrieve the samples.json file
  d3.json("static/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    let samples_array = data.samples;
    console.log(samples_array);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    let filtered_sample = samples_array.filter(
      (sampleElem) => sampleElem.id == sample
    );
    //  5. Create a variable that holds the first sample in the array.
    let firstSample = filtered_sample[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = firstSample.otu_ids;
    let otu_labels = firstSample.otu_labels;
    let sample_values = firstSample.sample_values;

    // Bar Chart ------------------------------------------------------------------------

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    //  so the otu_ids with the most bacteria are last.
    var yticks = otu_ids.map((tick) => `OTU_${tick}`);
    console.log(yticks);

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
          colorscale: 'Portland'
        }
      }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: "OTU id" },
      yaxis: { title: "Count values" }
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble",bubbleData,bubbleLayout);
  });
}
