// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [],
    datasets: [{
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, data) {
          var label = data.labels[tooltipItem.index];
          var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return label + ': $' + value;
        }
      }
    },
    legend: {
      display: false
    },
    cutoutPercentage: 0,
  },
});

fetch('https://localhost:7234/api/Top3')
  .then(response => response.json())
  .then(data => {
    // Actualizar los datos del gráfico
    myPieChart.data.labels = data.map(item => "ID" + item.id);
    myPieChart.data.datasets[0].data = data.map(item => item.cantidad);

    myPieChart.update();
  })
  .catch(error => {
    console.error('Error:', error);
  });
