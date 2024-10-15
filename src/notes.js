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
  const theme = localStorage.getItem("theme");

  if (theme && theme === "dark") {
    $("#themeToggle").prop("checked", true);
    $("html").toggleClass("light dark");
    $("#themeToggleContainer").toggleClass("light dark");
    darkTheme();
  }

  // dynamically-generated data sent from server to data-* attribute on '.accordionWrapper'
  const reviewsArray = $(".accordionWrapper").data().reviews_array;
  console.log(reviewsArray);

  // assign appropriate rating to each review
  reviewsArray.forEach((elmt, idx) => {
    for (let i = 0; i < elmt.user_rating; i += 1) {
      $(`#emptyMugs${i}_${idx}`).attr("src", "full-mugs.svg");
    }
  });

  // associate delete button with particular review
  $(".deleteButtons").on("click", function () {
    const deleteButtonIdx = $(this).attr("id").split("_")[1];
    $("#deleteId").val(reviewsArray[deleteButtonIdx].id);
    console.log($("#deleteId").val());
  });

  // associate edit button with particular review
  $(".editButtons").on("click", function () {
    const editButtonIdx = $(this).attr("id").split("_")[1];
    $("#editId").val(reviewsArray[editButtonIdx].id);
    console.log($("#editId").val());
    // populate edit modal with corresponding details
    $("#modalBrewerySelection").text(reviewsArray[editButtonIdx].name);
    $("#modalBrewerySelectionAddress").text(
      `${reviewsArray[editButtonIdx].street_address}, ${reviewsArray[editButtonIdx].city}, ${reviewsArray[editButtonIdx].state} ${reviewsArray[editButtonIdx].postal_code}`,
    );
    $("#modalBrewerySelectionCountry").text(
      `${reviewsArray[editButtonIdx].country}`,
    );
    $("#editedReviewText").attr(
      "placeholder",
      reviewsArray[editButtonIdx].user_review,
    );
    // initialize hidden input for edit submission
    $("#editedRating").val(reviewsArray[editButtonIdx].user_rating);
  });
});
//////////////////////////////////// Navigation Button ////////////////////////////////////
// render 'index' page at root endpoint when 'returnHomeButton' is clicked
$("#returnHomeButton").on("click", () => {
  window.location.href = "/";
});

//////////////////////////////////// Theme Control ////////////////////////////////////
function lightTheme() {
  $("#themeIcon").attr("src", "/light-icon.svg");
  $(".accordionChevron").attr("src", "/chevron-light.svg");
  $(".editButtons").attr("src", "/edit-light.svg");
  $(".deleteButtons").attr("src", "/delete-light.svg");
  $(".emptyMugs").each(function () {
    if ($(this).attr("src") !== "full-mugs.svg") {
      $(this).attr("src", "empty-mugs-light.svg");
    }
  });
}

function darkTheme() {
  $("#themeIcon").attr("src", "/dark-icon.svg");
  $(".accordionChevron").attr("src", "/chevron-dark.svg");
  $(".editButtons").attr("src", "/edit-dark.svg");
  $(".deleteButtons").attr("src", "/delete-dark.svg");
  $(".emptyMugs").each(function () {
    if ($(this).attr("src") !== "full-mugs.svg") {
      $(this).attr("src", "empty-mugs-dark.svg");
    }
  });
}

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

    // pass selected rating to hidden input for edit submission
    $("#editedRating").val(Number(mugsIdxArr[mugsIdx.length - 1]) + 1);

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
      $("#editedRating").val(0);
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
  $("#editModalToggle").on("change", () => {
    if ($("#editModalToggle").prop("checked") === false) {
      mugsLoop(0, mugsIdx, previousSrc);
      $("#editedReviewText").val("");
    }
    mugsIdxArr.length = 0;
  });
})();
