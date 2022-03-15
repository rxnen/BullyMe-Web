function animateValue(id, start, end, duration) {
    if (start === end) return;
    var range = end - start;
    var current = start;
    var increment = end > start? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var obj = document.getElementById(id);
    var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current.toLocaleString('en-US');
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

fetch('https://bullymeapi.pythonanywhere.com',
{
    method: "GET",
    redirect: 'follow'
})
.then(response => response.json()) 
.then(json => animateValue("stats-info", 0, json['bullyme_servers'], 2000))
.catch(err => console.log(err));

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://bullymeapi.pythonanywhere.com", requestOptions)
    .then(response => response.json())
    .then(json => postStats(json["messages_sent"], json['active_users'], json['bullyme_channels']))
    .catch(error => console.log('error', error));