/******************************************
Treehouse FSJS Techdegree:
Heinz Araque
05/31/2019
Project 3 - Interactive Form
******************************************/

document.addEventListener("DOMContentLoaded", () => {
  // Reset Form as soon the page reloads (because firefox)
  $("form").trigger("reset");
  // Set global variable for the total amount;
  let total = 0;
  // Hide the other-title text input.
  $("#other-title").hide();
   // Hide the color label
   $("label[for='color']").hide();
  // Hide the color menu
  $("#color").hide();
  // Hide Bitcoin message
  $("fieldset:last-of-type > div:nth-last-child(2)").hide();
  // Hide Paypal message
  $("fieldset:last-of-type > div:nth-last-child(1)").hide();
  // Select the name input and focus on it.
  $("#name").focus();
  // Select credit card option by default
  $("#payment option[value='credit card']").attr("selected", true);
  /* 
      ///////////////////
     // FUNCTIONALITY //
    /////////////////// 
  */
  // Select Job role
  $("#title").on("change", (e) => {
    // Show or Hide the "Your Job Role" input
    if(e.target.value === "other"){
      $("#other-title").show();
    }
    else{
      $("#other-title").hide();
    }
  });

  // Select the shirt design and change color selection
  $("#design").on("change", (e) => {
   if(e.target.value === "Select Theme"){
    $("#color").hide()
    $("label[for='color']").hide();
   }
   if(e.target.value === "js puns"){
    $("label[for='color']").show();
     // Only display the puns t-shirts
    $("#color").html(`
      <option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
      <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> 
      <option value="gold">Gold (JS Puns shirt only)</option> 
    `).show();
   }
   if(e.target.value === "heart js"){
      $("label[for='color']").show();
      // Only display the heart t-shirts
      $("#color").html(`
      <option value="tomato">Tomato (I &#9829; JS shirt only)</option>
      <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option> 
      <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> 
    `).show();
   }
  });

  // Select the checkbox
  $(":checkbox").on("change",(e) => {
    if(e.target.name === "all" && e.target.checked) total += 200;
    if(e.target.name === "all" && !e.target.checked) total += -200;

    // Check for JS Framework 
    if(e.target.name === "js-frameworks" && e.target.checked){
     $(".activities input[name='express']").attr('disabled', true)
     .parent()
     .css("color", "grey");
     total += 100;
    }
    if(e.target.name === "js-frameworks" && !e.target.checked){
      $(".activities input[name='express']")
      .attr('disabled', false)
      .parent()
      .css("color", "black");;
      total -= 100;
    }

    // Check for JS Libraries
    if(e.target.name === "js-libs" && e.target.checked){
      $(".activities input[name='node']").attr('disabled', true)
      .parent()
      .css("color", "grey");
      total += 100;
    }
    if(e.target.name === "js-libs" && !e.target.checked){
      $(".activities input[name='node']")
      .attr('disabled', false)
      .parent()
      .css("color", "black");;
      total -= 100;
    }

    // Check for Express
    if(e.target.name === "express" && e.target.checked){
      $(".activities input[name='js-frameworks']").attr('disabled', true)
      .parent()
      .css("color", "grey");
      total += 100;
    }
    if(e.target.name === "express" && !e.target.checked){
      $(".activities input[name='js-frameworks']")
      .attr('disabled', false)
      .parent()
      .css("color", "black");;
      total -= 100;
    }

    // Check for node
    if(e.target.name === "node" && e.target.checked){
      $(".activities input[name='js-libs']").attr('disabled', true)
      .parent()
      .css("color", "grey");
      total += 100;
    }
    if(e.target.name === "node" && !e.target.checked){
      $(".activities input[name='js-libs']")
      .attr('disabled', false)
      .parent()
      .css("color", "black");;
      total -= 100;
    }

    // Check for Build tools & npm (No conflict os schedule here!)
    if(e.target.name === "build-tools" && e.target.checked) total += 100;
    if(e.target.name === "build-tools" && !e.target.checked) total -= 100;
    if(e.target.name === "npm" && e.target.checked) total += 100;
    if(e.target.name === "npm" && !e.target.checked) total -= 100;

    $(".activities span").remove();
    $(".activities").append(`<span>Total Amount: $${total}</span>`);
  });

  // Select Payment method
  $("#payment").on("change", (e) => {
    if(e.target.value === "credit card"){
      $("fieldset:last-of-type > div").first().show();
      $("fieldset:last-of-type > div:nth-last-child(2)").hide();
      $("fieldset:last-of-type > div:nth-last-child(1)").hide();
    }
    if(e.target.value === "paypal"){
      $("fieldset:last-of-type > div").first().hide();
      $("fieldset:last-of-type > div:nth-last-child(2)").show();
      $("fieldset:last-of-type > div:nth-last-child(1)").hide();
    }
    if(e.target.value === "bitcoin"){
      $("fieldset:last-of-type > div").first().hide();
      $("fieldset:last-of-type > div:nth-last-child(2)").hide();
      $("fieldset:last-of-type > div:nth-last-child(1)").show();
    }
  });

  /* 
      ///////////////////
     //   VALIDATION  //
    /////////////////// 
  */
  // Event listener for name input
  $("#name").on('input', checkName);
    // Event listener for email input
  $("#mail").on('input', checkEmail);
  // Event listener for activities checkboxes
  $("input[type='checkbox']").on('change', checkActivities);
  // Event listener for card number input
  $("#cc-num").on('input', checkCardNumber);
  // Event listener for card number input
  $("#zip").on('input', checkZip);
  // Event listener for zip number input
  $("#cvv").on('input', checkCvv);
  // Event listener for the form submit
  $("form").on('submit', function(e) {
    checkName();
    checkEmail();
    checkActivities();
    checkCardNumber();
    checkZip();
    checkCvv();
    if(!($(".error").length === 0)){
      e.preventDefault();
    }
  });

  function checkName() {
    // Select the input value and get rid of white spaces around it!
    const userName = $("#name").val().trim();
    // Use a Regular Expression to check for Only letters
    const checkName = /^(\D+)$/.test(userName);
    // Give user feedback about what they're doing wrong.
    if(!checkName){
      $("#name").css('borderColor', 'red');
      $("#nameError").remove();
      $("label[for='name']").append(`<span class="error" id="nameError">* Please enter your name</span>`);
    }
    else{
      $('#name').css('borderColor', '');
      $("#nameError").remove();
    }
  }

  function checkEmail() {
    // Select the input value and get rid of white spaces around it!
    const userEmail = $("#mail").val().trim();
    // Use a Regular Expression to check for Only Emails
    const checkName = /^\w+([.-]?\w+)*@\w+(\.com|\.net|\.org|\.edu)$/.test(userEmail);
    // Give user feedback about what they're doing wrong.
    if(!checkName){
      $("#mail").css('borderColor', 'red');
      $("#emailError").remove();
      $("label[for='mail']").append(`<span class="error" id="emailError">* Please enter your email</span>`);
    }
    else{
      $('#mail').css('borderColor', '');
      $("#emailError").remove();
    }
  }

  function checkActivities() {
     // If no checkbox is selected then
    if($("input[type='checkbox']:checked").length == 0) {
      // Change font color to red
      $(".activities legend").css('color', 'red');
      // Remove message if it already exists
      $("#activitiesError").remove();
      // Display feedback message to the user
      $(".activities legend").append(`<span class="error" id="activitiesError">* Please check at least one activity</span>`);
    }
    else{
      $(".activities legend").css('color', '');
      $("#activitiesError").remove();
    }
  }

  function checkCardNumber () {
    const userCard = $("#cc-num").val().trim();
    if(isNaN(userCard) || userCard === ""){
      $("#cc-num").css('borderColor', 'red');
      $("#nanCardError").remove();
      // Display feedback message to the user
      $("label[for='cc-num']").after(`<span class="error" id="nanCardError">* Enter only numbers</span>`);
    }
    else{
      $("#nanCardError").remove();
    }

    if(!isNaN(userCard) && userCard.length >= 13 && userCard.length <= 16){
      $("#cc-num").css('borderColor', '');
      $("#lengthCardError").remove();
    }
    else{
      $("#cc-num").css('borderColor', 'red');
      $("#lengthCardError").remove();
      // Display feedback message to the user
      $("label[for='cc-num']").after(`<span class="error" id="lengthCardError">* Enter between 13 and 16 characters<br></span>`);
    }

  }

  function checkZip(){
    const zip = $("#zip").val().trim()
    const checkZip = /^\d{5}/.test(zip);
    if(!checkZip){
      $("#zip").css('borderColor', 'red');
      $("#zipError").remove();
      $("label[for='zip']").after(`<span class="error" id="zipError">* Enter a 5 digit zip code</span>`);
    }
    else{
      $('#zip').css('borderColor', '');
      $("#zipError").remove();
    }
  }

  function checkCvv(){
    const cvv = $("#cvv").val().trim()
    const checkCvv = /^\d{3}/.test(cvv);
    if(!checkCvv){
      $("#cvv").css('borderColor', 'red');
      $("#cvvError").remove();
      $("label[for='cvv']").after(`<span class="error" id="cvvError">* Enter a 3 digit cvv code</span>`);
    }
    else{
      $('#cvv').css('borderColor', '');
      $("#cvvError").remove();
    }
  }



}); 