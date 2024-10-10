import "./styles.css";
import lightModeIcon from "./assets/light-icon.svg";
import darkModeIcon from "./assets/dark-icon.svg";
import lightChevron from "./assets/chevron-light.svg"
import darkChevron from "./assets/chevron-dark.svg"
import lightEdit from "./assets/edit-light.svg"
import darkEdit from "./assets/edit-dark.svg"
import lightDelete from "./assets/delete-light.svg"
import darkDelete from "./assets/delete-dark.svg"
import $ from "jquery";

// on document ready
$(() => {
  // initialize the html to dark theme
  $("html").addClass("light");
  $("#themeToggleContainer").addClass("light");
});

$("#themeToggle").on("click", () => {
  if ($("html")[0].className === "light") {
    $("html").toggleClass("light dark");
    $("#themeToggleContainer").toggleClass("light dark");
    $("#themeIcon").attr("src", "/dark-icon.svg");
    $('.accordionChevron').attr("src", "/chevron-dark.svg")
    $('.editButtons').attr("src", "/edit-dark.svg")
    $('.deleteButtons').attr("src", "/delete-dark.svg")
    $(".emptyMugs").attr("src", "empty-mugs-dark.svg");
  } else if ($("html")[0].className === "dark") {
    $("html").toggleClass("dark light");
    $("#themeToggleContainer").toggleClass("dark light");
    $("#themeIcon").attr("src", "/light-icon.svg");
    $('.accordionChevron').attr("src", "/chevron-light.svg")
    $('.editButtons').attr("src", "/edit-light.svg")
    $('.deleteButtons').attr("src", "/delete-light.svg")
    $(".emptyMugs").attr("src", "empty-mugs-light.svg");
  }
});
