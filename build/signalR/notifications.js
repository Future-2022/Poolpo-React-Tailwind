// "use strict";
var localhost = false;
var url = "https://v2.poolpo.in"
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  localhost = true;
console.log(localhost)

if (localhost) {
  url = "https://localhost:44352";
} else {
  url = "https://v2.poolpo.in";
}
var connection = new signalR.HubConnectionBuilder()
  .withUrl(url + "/NotificationHub", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .withAutomaticReconnect()
  .build();
let leadID = localStorage.getItem('LeadID')
// console.log("La lead de localstorage es:", leadID)
connection.on("ReceiveMessage", function (hash, action, text) {
  console.log('receive message')
  //if (localhost) {
    console.log('hash======', hash)
    console.log('action======', action)
    console.log('text======', text)
  //}
  leadID = localStorage.getItem('LeadID')
  if (hash === leadID) {
    switch (action) {
      case "showMessage":
        // console.log("showMessage", action, text)
        document.getElementById('modal-message').innerHTML = text
        break
      case "redirect":
        // console.log("redirect", action, text)
        window.location.href = text
        break
      case "notification":
        console.log("notification=======", text)
        toastr.success(text)
    }
  } else {
    if (action === "setHash") {
      hash = text;
      // console.log("La lead ya existe, su hash es: "+hash)
      localStorage.setItem('LeadID', hash);
    } else {
      //if (localhost) 
      console.log("ws", hash, leadID, action, text)
      //else 
      console.log("leadID is not matched.")
    }

  }
});

async function start() {
  try {
    await connection.start().then(function () {
      console.log("Connection started");
      leadID = localStorage.getItem('LeadID')
    }).catch(function (err) {
      console.error(err.toString());
      setTimeout(start, 10000);
    });
  } catch (err) {
    console.error(err.toString());
  }
};
connection.onclose(start);
start();
leadID = localStorage.getItem('LeadID')