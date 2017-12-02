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
             rq.open('GET', '../sendmail.php?message='+message, true);
             rq.onreadystatechange = function() {
                 if(this.readyState === 4) {
                     if(this.status < 200 || this.status >= 400) {
                         // The request failed; fall back to e-mail client
                         console.log('failed 1');
                         //window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
                     }
                 }
             }
             rq.send(null);
         } catch(fail) {
             // Failed to open the request; fall back to e-mail client
             console.log('failed 2');
             //window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
         }
     } else {
         // Failed to create the request; fall back to e-mail client
         console.log('failed 3');
         //window.open('mailto:' + to + '?subject=' + encodeURIComponent(subject));
     }
}