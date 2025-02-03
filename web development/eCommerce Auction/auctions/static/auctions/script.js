document.addEventListener("DOMContentLoaded", function() {
    var elements = document.querySelectorAll('.timestamp');
    elements.forEach(function(element) {
        var timestamp = element.getAttribute('data-timestamp');
        var localTime = new Date(timestamp);
        var formattedDate = localTime.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
        element.innerHTML = formattedDate;
    });
});