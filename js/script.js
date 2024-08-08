document.getElementById("greetButton").addEventListener("click", function() {
    document.getElementById("greetingText").innerText = "Hello World";
    document.getElementById("greetingText").style.fontStyle = "italic";
   // Logic to make the font italicized 
});

document.getElementById("greetButton2").addEventListener("click", function() {
    document.getElementById("greetingText").innerText = "Goodbye World";
    document.getElementById("greetingText").style.fontStyle = "normal";
    // Logic to make the font not italicized
});

