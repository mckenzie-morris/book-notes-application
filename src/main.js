import "./styles.css";
import lightModeIcon from "./assets/light-icon.svg";
import darkModeIcon from "./assets/dark-icon.svg";
import $ from "jquery";

// on document ready
$(() => {
  // initialize the html to dark theme
  $("html").addClass("light");
  $("#themeToggleContainer").addClass("light");
});

$("#themeToggle").on("click", () => {
  $("html").toggleClass("light dark");
  $("#themeToggleContainer").toggleClass("light dark");
  if ($("#themeIcon").attr("src") === "light-icon.svg") {
    $("#themeIcon").attr("src", "dark-icon.svg");
  } else {
    $("#themeIcon").attr("src", "light-icon.svg");
  }
});

$("#search").on('submit', () => {
  console.log('submitted!')
})


$("#user_input").on("input", () => {
  console.log($("#user_input").val());
  $("#search").trigger('submit');
})
