
const display = document.getElementById("display");
const darkToggle = document.getElementById("darkToggle");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeIcon.textContent = isDark ? "🌞" : "🌙";
}

themeToggle.addEventListener("click", toggleTheme);
themeIcon.classList.add("bounce");


function calculateScientific(func) {
  let value = parseFloat(display.value);
  if (isNaN(value)) {
    display.value = "Error";
    return;
  }

  switch (func) {
    case "sin":
      display.value = Math.sin(value * Math.PI / 180).toFixed(5);
      break;
    case "cos":
      display.value = Math.cos(value * Math.PI / 180).toFixed(5);
      break;
    case "tan":
      display.value = Math.tan(value * Math.PI / 180).toFixed(5);
      break;
    case "log":
      display.value = Math.log10(value).toFixed(5);
      break;
    case "sqrt":
      display.value = Math.sqrt(value).toFixed(5);
      break;
    case "square":
      display.value = (value * value).toFixed(5);
      break;
    default:
      display.value = "Error";
  }
}

// Toggle dark mode
darkToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
