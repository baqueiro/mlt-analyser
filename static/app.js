function range(start, count) {
        return Array.apply(0, Array(count))
                    .map(function (element, index) { 
                             return (index + start).toString();  
                         });
    };

$.getJSON('/histogram', function(response) {
		var ctx = document.getElementById("myChart").getContext("2d");

		var data = {
		    labels: range(1,56),
		    datasets: [
		        {
		            label: "Histograma",
		            fillColor: "rgba(151,187,205,0.5)",
		            strokeColor: "rgba(151,187,205,0.8)",
		            highlightFill: "rgba(151,187,205,0.75)",
		            highlightStroke: "rgba(151,187,205,1)",
		            data: response.histogram
		        }
		    ],
		    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
		};

		var myNewChart = new Chart(ctx).Bar(data);
    });

function MelateViewModel(){
	var self = this;
	self.mostFrecuency = ko.observableArray([]);

	$.getJSON('/histogram/order', function (response) {
		var dictionary = response.mostFrecuency;
		var result = [];
		for (var key in dictionary) {
	        if (dictionary.hasOwnProperty(key)) {
	            result.push({ key: dictionary[key][0], value: dictionary[key][1] }); 
	        }  
	    }

        self.mostFrecuency(result);

    }).error(function (e) {
        console.log(e.responseText);
        alert(e.responseText);
    });
};


ko.applyBindings(new MelateViewModel());

