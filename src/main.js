import "./styles.css";
import lightModeIcon from "./assets/light-icon.svg";
import darkModeIcon from "./assets/dark-icon.svg";
import $ from "jquery";

// on document ready
$(() => {
  // initialize the html to light theme
  $("html").addClass("light");
  $("#themeToggleContainer").addClass("light");

  // dynamically-generated data sent from server to data-* attributes on '#user_input'
  // will be an empty object literal before first query is made
  const serverData = $("#user_input").data();
  console.log(serverData);
  // current theme ('light' or 'dark')
  const currentTheme = $("html")[0].className;

  /* if a query has been made, and the server's API call has successfuly returned data
and rendered the homepage, display the data, focus the input field, and set the
theme to the setting prior to the API call and page render */
  if (Object.keys(serverData).length) {
    // list of returned breweries from the API call
    const queryResults = $("#user_input").data().query_results;
    // the query that was sent on the API call
    const lastQuery = $("#user_input").data().last_query;
    // the theme setting prior to the API call
    const lastTheme = $("#user_input").data().last_theme;
    /* if the current theme does not match the theme setting prior to the API call, 
  switch the theme */
    if (currentTheme !== lastTheme) {
      $("#themeToggle").trigger("click");
    }
    // focus the input field
    $("#user_input").trigger("focus");
    // populate the input with the query sent on the API call
    $("#user_input").val(lastQuery);
  }
});

/* if the '#themeToggle' button is clicked, swap theme 
from 'light' to 'dark', or 'dark' to 'light' */
$("#themeToggle").on("click", () => {
  if ($("html")[0].className === "light") {
    $("html").toggleClass("light dark");
    $("#themeToggleContainer").toggleClass("light dark");
    $("#themeIcon").attr("src", "dark-icon.svg");
  } else if ($("html")[0].className === "dark") {
    $("html").toggleClass("dark light");
    $("#themeToggleContainer").toggleClass("dark light");
    $("#themeIcon").attr("src", "light-icon.svg");
  }
});

/* on query submission, attach the current theme setting ('light' or 'dark') to
the input field with attribute 'type=hidden' */
$("#search").on("submit", () => {
  $("#currentThemeSetting").val($("html")[0].className);
});

// triggerd each time input field changes
$("#user_input").on("input", () => {
  // only trigger debounce function if input value is non-zero
  if ($("#user_input").val().length) {
    const debouncer = setTimeout(() => {
      // console.log('Timeout reached, input submitted: ', $("#user_input").val())
      $("#search").trigger("submit");
    }, 1000);
    /* if user begins typing before necessary time has elapsed, reset timer and 
  eliminate pending function execution */
    $("#user_input").on("input", () => {
      // console.log('debounced!')
      clearTimeout(debouncer);
    });
  }
});

/////////////////////////////////////////////////////////////////////////

$(".queryResultItem").on("click", function () {
  console.log($(this).text());
  $("#modalBrewerySelection").text($(this).text().slice(3));
});
