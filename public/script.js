function animateValue(id, start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

function postStats(messages, users, channels) {
    document.getElementById("messages_sent").innerHTML = messages.toLocaleString('en-US');
    document.getElementById("active_users").innerHTML = users.toLocaleString('en-US');
    document.getElementById('bullyme_channels').innerHTML = channels.toLocaleString('en-US');
}

fetch('https://top.gg/api/bots/926262398854250526/stats',
{
    method: "GET",
    headers: {"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkyNjI2MjM5ODg1NDI1MDUyNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjQyMjE4NzQxfQ.9jqBAWfjkpodSPRdNvxRFk1WaVkkoX2W1B5RC8yq9Yw"}
})
.then(response => response.json()) 
.then(json => animateValue("stats-info", 0, json['server_count'], 2500))
.catch(err => console.log(err));

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://bullymeapi.pythonanywhere.com", requestOptions)
    .then(response => response.json())
    .then(json => postStats(json["messages_sent"], json['active_users'], json['bullyme_channels']))
    .catch(error => console.log('error', error));