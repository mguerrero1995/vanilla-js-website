let windowWidth = document.documentElement.clientWidth
let windowHeight = document.documentElement.clientHeight

let viewport = document.getElementsByClassName("user-viewport")[0]
let viewportWidth = viewport.clientWidth;
let viewportHeight = viewport.clientHeight;

let container = document.getElementById("checkbox-container");
let containerWidth = viewportWidth * 2
let containerHeight = viewportHeight * 2

const checkboxWidth = 15; // Width of each checkbox in pixels
const checkboxHeight = 15; // Height of each checkbox in pixels
const gap = 5; // Gap between checkboxes in pixels
let checkboxesPerCol = Math.floor(viewportHeight / (checkboxHeight + gap) * 2);
let checkboxesPerRow = Math.floor(viewportWidth / (checkboxWidth + gap) * 2);

let renderedRowMax = Math.floor(viewportHeight / (checkboxHeight + gap) * 2);
let renderedColMax = Math.floor(viewportWidth / (checkboxWidth + gap) * 2);


document.addEventListener("DOMContentLoaded", function() {
    const checkboxFragment = document.createDocumentFragment();
    
    for (let r = 0; r <= renderedRowMax; r++) {
        for (let c = 0; c <= renderedColMax; c++) {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `checkbox-${r}-${c}`;
            checkbox.style.left = `${c * (checkboxWidth + gap)}px`; // Calculate the horizontal position
            checkbox.style.top = `${r * (checkboxHeight + gap)}px`; // Calculate the vertical position
            checkboxFragment.appendChild(checkbox);
        }
    }

    container.appendChild(checkboxFragment)
    container.style.position = "absolute";
    container.style.left = `${(windowWidth / 2) - (viewportWidth)}px`; 
    container.style.top = `${(windowHeight / 2) - (viewportHeight)}px`;
    
    // console.log(`Left: ${(windowWidth / 2) - (viewportWidth)}`),
    // console.log(`Top: ${(windowHeight / 2) - (viewportHeight)}`)
});


let lastScrollX = window.scrollX;
let lastScrollY = window.scrollY;

document.addEventListener("scroll", function() {
    let currentScrollX = window.scrollX;
    let currentScrollY = window.scrollY;

    // Detect horizontal scroll
    if (currentScrollX !== lastScrollX) {
        const scrollDirectionX = currentScrollX > lastScrollX ? "right" : "left";
        const colsToAdd = Math.floor(Math.abs(currentScrollX - lastScrollX) / (checkboxWidth + gap));

        if (colsToAdd > 0) {
            const checkboxFragment = document.createDocumentFragment();

            if (scrollDirectionX === "right") {
                for (let c = 0; c < colsToAdd; c++) {
                    renderedColMax++;
                    for (let r = 0; r <= renderedRowMax; r++) {
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.id = `checkbox-${r}-${renderedColMax}`;
                        checkbox.style.position = "absolute";
                        checkbox.style.left = `${renderedColMax * (checkboxWidth + gap)}px`;
                        checkbox.style.top = `${r * (checkboxHeight + gap)}px`;
                        checkboxFragment.appendChild(checkbox);
                    }
                }
            } else if (scrollDirectionX === "left") {
                for (let c = 0; c < colsToAdd; c++) {
                    renderedColMax--;
                    for (let r = 0; r <= renderedRowMax; r++) {
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.id = `checkbox-${r}-${renderedColMax}`;
                        checkbox.style.position = "absolute";
                        checkbox.style.left = `${renderedColMax * (checkboxWidth + gap)}px`;
                        checkbox.style.top = `${r * (checkboxHeight + gap)}px`;
                        checkboxFragment.appendChild(checkbox);
                    }
                }
            }

            container.appendChild(checkboxFragment);
            lastScrollX = currentScrollX;
        }
    }

    // Detect vertical scroll
    if (currentScrollY !== lastScrollY) {
        const scrollDirectionY = currentScrollY > lastScrollY ? "down" : "up";
        const rowsToAdd = Math.floor(Math.abs(currentScrollY - lastScrollY) / (checkboxHeight + gap));

        if (rowsToAdd > 0) {
            const checkboxFragment = document.createDocumentFragment();

            if (scrollDirectionY === "down") {
                for (let r = 0; r < rowsToAdd; r++) {
                    renderedRowMax++;
                    for (let c = 0; c <= renderedColMax; c++) {
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.id = `checkbox-${renderedRowMax}-${c}`;
                        checkbox.style.position = "absolute";
                        checkbox.style.left = `${c * (checkboxWidth + gap)}px`;
                        checkbox.style.top = `${renderedRowMax * (checkboxHeight + gap)}px`;
                        checkboxFragment.appendChild(checkbox);
                    }
                }
            } else if (scrollDirectionY === "up") {
                for (let r = 0; r < rowsToAdd; r++) {
                    renderedRowMax--;
                    for (let c = 0; c <= renderedColMax; c++) {
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.id = `checkbox-${renderedRowMax}-${c}`;
                        checkbox.style.position = "absolute";
                        checkbox.style.left = `${c * (checkboxWidth + gap)}px`;
                        checkbox.style.top = `${renderedRowMax * (checkboxHeight + gap)}px`;
                        checkboxFragment.appendChild(checkbox);
                    }
                }
            }

            container.appendChild(checkboxFragment);
            lastScrollY = currentScrollY;
        }
    }
});
