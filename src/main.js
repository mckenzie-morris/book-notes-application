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

//////////////////////////////////////////////////////////

const serverData = $("#user_input").data();

console.log(serverData);

if (serverData.last_query) {
  const queryResults = $("#user_input").data().query_results;
  const lastQuery = $("#user_input").data().last_query;
  //////////////////////// *** YOU ARE HERE *** ////////////////////////

  const lastTheme = $("#user_input").data().last_theme;
  console.log(queryResults)
  console.log(lastQuery)
  console.log(lastTheme)
  const currentThemeSetting = $('html').attr('class')
  if (currentThemeSetting != lastTheme) {
    $("html").toggleClass(`${currentThemeSetting} ${lastTheme}`);
    $("#themeToggleContainer").toggleClass(`${currentThemeSetting} ${lastTheme}`);
  }
  
   //////////////////////// *** YOU ARE HERE *** ////////////////////////
  $("#user_input").trigger("focus");
  $("#user_input").val(lastQuery);
}



$("#search").on("submit", () => {
  console.log("submitted!");


});

// triggerd each time input field changes
$("#user_input").on("input", () => {
  // only trigger debounce function if input value is non-zero
  if ($("#user_input").val().length) {
    const debouncer = setTimeout(() => {
      // console.log('Timeout reached, input submitted: ', $("#user_input").val())
      $("#search").trigger("submit");
    }, 1500);
    /* if user begins typing before necessary time has elapsed, reset timer and 
  eliminate pending function execution */
    $("#user_input").on("input", () => {
      // console.log('debounced!')
      clearTimeout(debouncer);
    });
  }
});

//////////////////////////////////////////////////////////
