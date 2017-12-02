jQuery(document).ready(function($) {

	var quotes;

    $.getJSON('js/quotes.json', function(json) {
        quotes = json.quotes;
        //$(document).trigger('JSONreceived');
    });




	function Ajax() {
	    try {
	        if(window.XMLHttpRequest) {
	            return new XMLHttpRequest();
	        } else if(window.ActiveXObject) {
	            try {
	                return new ActiveXObject('Msxml2.XMLHTTP');
	            } catch(try_again) {
	                return new ActiveXObject('Microsoft.XMLHTTP');
	            }
	        }
	    } catch(fail) {
	        return null;
	    }
	}

	function sendMail(message) {
	     var rq;
	     if(rq = new Ajax()) {
	         // Success; attempt to use an Ajax request to a PHP script to send the e-mail
	         try {
	             rq.open('GET', '../sendmil.php?message=' + encodeURIComponent(message), true);
	             rq.onreadystatechange = function() {
	                 if(this.readyState === 4) {
	                     if(this.status < 200 || this.status >= 400) {
	                         // The request failed; fall back to e-mail client
	                         console.log('failed 1');
	                         window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
	                     }
	                 }
	             }
	             rq.send(null);
	         } catch(fail) {
	             // Failed to open the request; fall back to e-mail client
	             console.log('failed 2');
	             window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
	         }
	     } else {
	         // Failed to create the request; fall back to e-mail client
	         console.log('failed 3');
	         window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
	     }
	}    




	function setCookie(c_name,value,exdays) {
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

	function getCookie(c_name) {
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + c_name + "=");
		if (c_start == -1)
		  {
		  c_start = c_value.indexOf(c_name + "=");
		  }
		if (c_start == -1)
		  {
		  c_value = null;
		  }
		else
		  {
		  c_start = c_value.indexOf("=", c_start) + 1;
		  var c_end = c_value.indexOf(";", c_start);
		  if (c_end == -1)
		  {
		c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
		}
		return c_value;
	}	

	function capitaliseFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function makeSentence() {
    	var phrase;
    	var key;
    	var last_key;
    	var last_key2;
    	var content = "";		
		numWords = Math.floor( Math.random() * (10 - 5) + 5 );

    	for (var i=0;i<numWords;i++) {
    		key = Math.floor( Math.random() * (quotes.length));
			if (key != last_key && quotes[key] != quotes[last_key] && quotes[key] != quotes[last_key2]) {
				var word = quotes[key];
				
				if (i == 0) {
					word =  capitaliseFirstLetter(word);
				} 

				if (i < numWords-1) {
					word = word + " ";
				}
				content += word;
				last_key2 = last_key;
				last_key = key;
			}
    	}

    	return content + ".  ";

	}

    function printParagraph( numPhrases ) {
    	var phrase;
    	var key;
    	var last_key;

    	var content = "";


    	for (var i=0;i<numPhrases;i++) {
			content += makeSentence();
    	}

    	$('#output').prepend('<p>'+content+'</p>');
    }


	function printBody( numParagraphs ) {
		var n = numParagraphs;
		var numPhrases;
		$('#output').text("");
		$('.filler').hide();
		//$('#copy-btn').show();
		for (var i=0;i<n;i++){
			numPhrases = Math.floor( Math.random() * (10 - 4) + 4 ); // random number between 10-40
			printParagraph(numPhrases);
		}
	}


	function formSubmitted() {
		$('.submit-form').hide();
		$('.submit-title').text("Thanks for your submission!");
		$('.submit-title').css('margin-bottom', '50px');
		$('#submit-btn').hide();
	}

	$('#generate').click(function(e) {
		e.preventDefault();

		var paragraphs = parseInt( $('#num-paragraphs').val() );
		if (paragraphs < 1) paragraphs = 1;

		printBody( paragraphs );  
	});

	if (getCookie('crazyclientipsum') == 1) {
		formSubmitted();
	}

	$('#submit-btn').click(function() {
		var text = $('.submit-quotes').val();
		if (getCookie('crazyclientipsum') != 1) {

			if ( text && text.length > 11 ) {
				$.ajax({
				  type: "GET",
				  url: "submit.php",
				  data: { message: text }
				}).done(function() {
				    formSubmitted();
				    setCookie('crazyclientipsum', 1, 7);
				 });	

			} else {
				alert("Your submission must be at least 12 characters long.");
			}

		} else {
			alert("You've already submitted a quote once in the past week. Come back later :)");
		}


	});




});