function range(start, count) {
        return Array.apply(0, Array(count))
                    .map(function (element, index) { 
                             return index + start;  
                         });
    };

$.getJSON('/histogram', function(response) {
		var ctx = document.getElementById("myChart").getContext("2d");

		var data = {
		    labels: range(0,57),
		    datasets: [
		        {
		            label: "Histograma",
		            fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
		            data: response.histogram
		        }
		    ]
		};

		var myNewChart = new Chart(ctx).Line(data);
    });
