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
  const reviewsArray = $('.accordionWrapper').data().reviews_array
  console.log(reviewsArray)

  // assign appropriate rating to each review
  reviewsArray.forEach((elmt, idx) => {
    for (let i = 0; i < elmt.user_rating; i += 1) {
      $(`#emptyMugs${i}_${idx}`).attr("src", 'full-mugs.svg');
    }
  })

  // 
  $('.deleteButtons').on('click', function () {
    const deleteButtonId = $(this).attr('id').split('_')[1]
    $('#deleteId').val(reviewsArray[deleteButtonId].id)
    console.log($('#deleteId').val())
  })

});

//////////////////////////////////// Navigation Button ////////////////////////////////////
// render 'index' page at root endpoint when 'returnHomeButton' is clicked
$("#returnHomeButton").on("click", () => {
  window.location.href = "/";
});

//////////////////////////////////// Theme Control ////////////////////////////////////
function lightTheme () {
  $("#themeIcon").attr("src", "/light-icon.svg");
  $(".accordionChevron").attr("src", "/chevron-light.svg");
  $(".editButtons").attr("src", "/edit-light.svg");
  $(".deleteButtons").attr("src", "/delete-light.svg");
  $(".emptyMugs").each(function () {
    if ($(this).attr("src") !== "full-mugs.svg") {
      $(this).attr("src", "empty-mugs-light.svg");
    }
  });
  
};

function darkTheme () {
  $("#themeIcon").attr("src", "/dark-icon.svg");
  $(".accordionChevron").attr("src", "/chevron-dark.svg");
  $(".editButtons").attr("src", "/edit-dark.svg");
  $(".deleteButtons").attr("src", "/delete-dark.svg");
  $(".emptyMugs").each(function () {
    if ($(this).attr("src") !== "full-mugs.svg") {
      $(this).attr("src", "empty-mugs-dark.svg");
    }
  });
  
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
