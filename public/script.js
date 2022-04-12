function animateValue(value) {
    document.getElementById('stats-info').innerHTML = value.toLocaleString('en-US');
}

function postStats(messages, users, channels) {
    document.getElementById("messages_sent").innerHTML = messages.toLocaleString('en-US');
    document.getElementById("active_users").innerHTML = users.toLocaleString('en-US');
    document.getElementById('bullyme_channels').innerHTML = channels.toLocaleString('en-US');
}

fetch('https://bullymeapi.pythonanywhere.com',
{
    method: "GET",
    redirect: 'follow'
})
.then(response => response.json()) 
.then(json => animateValue(json['bullyme_servers']))
.catch(err => console.log(err));

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://bullymeapi.pythonanywhere.com", requestOptions)
    .then(response => response.json())
    .then(json => postStats(json["messages_sent"], json['active_users'], json['bullyme_channels']))
    .catch(error => console.log('error', error));
