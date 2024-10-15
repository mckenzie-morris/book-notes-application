import "animate.css";
import "./styles.css";
import lightModeIcon from "./assets/light-icon.svg";
import darkModeIcon from "./assets/dark-icon.svg";
import emptyMugsDark from "./assets/empty-mugs-dark.svg";
import emptyMugsLight from "./assets/empty-mugs-light.svg";
import fullMugs from "./assets/full-mugs.svg";
import $ from "jquery";
import axios from "axios";

//////////////////////////////////// On Document Ready ////////////////////////////////////
$(() => {
  const theme = localStorage.getItem("theme");
  // toggle theme to 'dark' upon document ready (default is 'light')
  if (theme && theme === "dark") {
    $("#themeToggle").prop("checked", true);
    $("html").toggleClass("light dark");
    $("#themeToggleContainer").toggleClass("light dark");
    darkTheme();
  }

  const lastQuery = sessionStorage.getItem("submittedQuery");
  if (lastQuery) {
    // dynamically-generated data sent from server to data-* attribute on '#user_input'
    const serverData = $("#user_input").data();
    console.log(serverData.query_results);

    // focus the input field
    $("#user_input").trigger("focus");
    // populate the input with the query sent on the API call

    $("#user_input").val(sessionStorage.getItem("submittedQuery"));
  }
});

//////////////////////////////////// Navigation Button ////////////////////////////////////
// render 'notes' page at '/notes' endpoint when 'notesButton' is clicked
$("#notesButton").on("click", () => {
  $("#resultsList").empty();
  sessionStorage.removeItem("submittedQuery");
  window.location.href = "/notes";
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

//////////////////////////////////// Input Field Control ////////////////////////////////////
// triggerd each time input field changes
$("#user_input").on("input", () => {
  // only trigger debounce function if input value is non-zero
  if ($("#user_input").val().length) {
    const debouncer = setTimeout(() => {
      // store the query in the current session
      sessionStorage.setItem("submittedQuery", $("#user_input").val());
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

//////////////////////////////////// Modal Control ////////////////////////////////////
const modalCache = {};
// populate modal with name of query result on click
$(".queryResultItem").on("click", async function () {
  // text is pulled from the query result and added to modal title h1 element
  $("#modalBrewerySelection").text($(this).text().slice(3));

  const breweryId = $(this).data().brewery_id;

  if (breweryId in modalCache) {
    console.log(modalCache[breweryId], "FOUND in cache!");
    $('#selectedBreweryDetails').val(modalCache[breweryId])

    $("#modalBrewerySelectionAddress").text(
      `${modalCache[breweryId].address_1}, ${modalCache[breweryId].city}, ${modalCache[breweryId].state} ${modalCache[breweryId].postal_code}`,
    );
    $("#modalBrewerySelectionCountry").text(`${modalCache[breweryId].country}`);
  } else {
    // make axios GET request to obtain location data
    try {
      console.log("NOT found in cache!");
      const response = await axios(
        // request config object
        {
          method: "GET",
          url: `https://api.openbrewerydb.org/v1/breweries/{${breweryId}}`,
        },
      );
      console.log(response.data);
      $('#selectedBreweryDetails').val(JSON.stringify(response.data))
      $("#modalBrewerySelectionAddress").text(
        `${response.data.address_1}, ${response.data.city}, ${response.data.state} ${response.data.postal_code}`,
      );
      $("#modalBrewerySelectionCountry").text(`${response.data.country}`);
      modalCache[breweryId] = response.data;
      return;
    } catch (error) {
      // if error encountered during API call, log it to the console
      console.log(error);
    }
  }
});

//////////////////////////////////// Modal Beer Mugs Icons ////////////////////////////////////

//  Immediately Invoked Function Expression (IIFE). controls mug icons in modal
(function modalMugsControl() {
  // initialize local variables
  let mugsIdx;
  let mugsIdxArr = [];
  let previousSrc;
  if (localStorage.getItem("theme")) {
    previousSrc = `empty-mugs-${localStorage.getItem("theme")}.svg`;
  } else previousSrc = `empty-mugs-${$("html")[0].className}.svg`;
  // toggle empty mugs icons from 'light'/'dark' background
  $("#themeToggle").on("change", () => {
    if ($("html")[0].className === "dark") {
      previousSrc = "empty-mugs-dark.svg";
    } else {
      previousSrc = "empty-mugs-light.svg";
    }
  });

  // modularized for loop (loop thru mugs icons)
  // if first argument is undefined, 'start' defaults to 0
  function mugsLoop(start = 0, end, srcString) {
    for (let i = Number(start); i <= Number(end); i += 1) {
      $(`#emptyMugs${i}`).attr("src", srcString);
    }
  }

  // select and set rating
  $(".emptyMugs").on("click", function () {
    mugsIdx = $(this).attr("id").slice(-1);
    mugsIdxArr.push(mugsIdx);

    // pass selected rating to hidden input for review submission
    $("#selectedRating").val(Number(mugsIdxArr[mugsIdx.length - 1]) + 1);

    // flip empty mugs to full mugs
    if (mugsIdxArr.length < 2 || mugsIdx > mugsIdxArr[mugsIdxArr.length - 2]) {
      mugsLoop(mugsIdxArr[mugsIdxArr.length - 2], mugsIdx, "full-mugs.svg");
      // remove unnecessary data
      mugsIdxArr = [mugsIdx];
    }

    /* if rating is selected, and the same rating is clicked again, reset rating and enable 
  visual representation of possible ratings */
    if (mugsIdx === mugsIdxArr[mugsIdxArr.length - 2]) {
      mugsLoop(0, mugsIdx, previousSrc);
      mugsIdxArr.length = 0;
      // reset hidden input rating
      $("#selectedRating").val(0);
    }
    // reset any superfluous full mugs to empty (if necessary)
    else if (mugsIdx < mugsIdxArr[mugsIdxArr.length - 2]) {
      for (let i = mugsIdxArr[mugsIdxArr.length - 2]; i > mugsIdx; i -= 1) {
        $(`#emptyMugs${i}`).attr("src", previousSrc);
      }
      // remove unnecessary data
      mugsIdxArr = [mugsIdx];
    }
  });

  // change visual representation of possible ratings before selecting a rating
  $(".emptyMugs")
    .on("mouseenter", function () {
      mugsIdx = $(this).attr("id").slice(-1);
      if (!mugsIdxArr.length) {
        mugsLoop(0, mugsIdx, "full-mugs.svg");
      }
    })
    .on("mouseleave", function () {
      mugsIdx = $(this).attr("id").slice(-1);
      if (!mugsIdxArr.length) {
        mugsLoop(0, mugsIdx, previousSrc);
      }
    });

  // if the modal is closed, reset rating to blank (and clear text area)
  $("#modalToggle").on("change", () => {
    if ($("#modalToggle").prop("checked") === false) {
      mugsLoop(0, mugsIdx, previousSrc);
      $("#reviewText").val("");
    }
    mugsIdxArr.length = 0;
  });
})();
