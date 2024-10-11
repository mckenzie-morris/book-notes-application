import "./styles.css";
import lightModeIcon from "./assets/light-icon.svg";
import darkModeIcon from "./assets/dark-icon.svg";
import lightChevron from "./assets/chevron-light.svg";
import darkChevron from "./assets/chevron-dark.svg";
import lightEdit from "./assets/edit-light.svg";
import darkEdit from "./assets/edit-dark.svg";
import lightDelete from "./assets/delete-light.svg";
import darkDelete from "./assets/delete-dark.svg";
import $ from "jquery";

//////////////////////////////////// On Document Ready ////////////////////////////////////
$(() => {
  // render 'index' page at root endpoint when 'returnHomeButton' is clicked
  $("#returnHomeButton").on("click", () => {
    window.location.href = "/";
  });

  const theme = localStorage.getItem("theme");

  if (theme && theme === "dark") {
    $("#themeToggle").prop("checked", true);
    $("html").toggleClass("light dark");
    $("#themeToggleContainer").toggleClass("light dark");
    darkTheme();
  }
});

//////////////////////////////////// Theme Control ////////////////////////////////////
const lightTheme = () => {
  $("#themeIcon").attr("src", "/light-icon.svg");
  $(".accordionChevron").attr("src", "/chevron-light.svg");
  $(".editButtons").attr("src", "/edit-light.svg");
  $(".deleteButtons").attr("src", "/delete-light.svg");
  $(".emptyMugs").attr("src", "empty-mugs-light.svg");
};

const darkTheme = () => {
  $("#themeIcon").attr("src", "/dark-icon.svg");
  $(".accordionChevron").attr("src", "/chevron-dark.svg");
  $(".editButtons").attr("src", "/edit-dark.svg");
  $(".deleteButtons").attr("src", "/delete-dark.svg");
  $(".emptyMugs").attr("src", "empty-mugs-dark.svg");
};

/* if the '#themeToggle' button is clicked, swap theme 
from 'light' to 'dark', or 'dark' to 'light' */
$("#themeToggle").on("click", () => {
  if ($("html")[0].className === "light") {
    $("html").toggleClass("light dark");
    $("#themeToggleContainer").toggleClass("light dark");
    darkTheme();
    localStorage.setItem("theme", "dark");
  } else if ($("html")[0].className === "dark") {
    $("html").toggleClass("dark light");
    $("#themeToggleContainer").toggleClass("dark light");
    lightTheme();
    localStorage.setItem("theme", "light");
  }
});
