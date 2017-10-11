({
		onInit: function(cmp, evt, hlpr) {
			if (cmp.get("v.container") === "") {
				console.warn("CP_Cmp_Link: An id of the element you wish to print is required. ex. container='awesome-container'");
			}
		},
		printWindow: function(cmp, evt, hlpr) {

			var divToPrint = document.getElementById(cmp.get("v.container")),
			igcpCSS = $A.get('$Resource.cppatternlib') + '/cp-patternlib/styles/igcp.css';

			var newWin = window.open('', 'Print-Window');
			newWin.document.open();
			newWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="' + igcpCSS + '"/> </head><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
				newWin.document.close();
				setTimeout(function() { newWin.close(); }, 10);
			}
		})