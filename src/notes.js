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
  console.log("clicked");
  if ($("html")[0].className === "light") {
    $("html").toggleClass("light dark");
    $("#themeToggleContainer").toggleClass("light dark");
    $("#themeIcon").attr("src", "/dark-icon.svg");
  } else if ($("html")[0].className === "dark") {
    $("html").toggleClass("dark light");
    $("#themeToggleContainer").toggleClass("dark light");
    $("#themeIcon").attr("src", "/light-icon.svg");
  }
});
