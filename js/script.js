//Example <ul>
// <ul class="student-list">
//   <li class="student-item cf">
//       <div class="student-details">
//           <img class="avatar" src="https://randomuser.me/api/portraits/thumb/women/67.jpg">
//           <h3>iboya vat</h3>
//           <span class="email">iboya.vat@example.com</span>
//       </div>
//       <div class="joined-details">
//              <span class="date">Joined 07/15/15</span>
//      </div>
//   </li>
// </ul>

//BASICS
  //Pagination
    //Show 10 students per page
    //Hide all but first 10 on page load
    //When page '2' is clicked, show 11-20, 21-30...
    //Add a simple transition when switching pages, progressively
    //Calculate the number of pages needed based on total num of students
  //Search
    //add event listeners
      //search button should trigger search
      //search email or first/last name
    //dynamically filter search results as they type (extra)
      //paginate results
      //Include a message if there are no results to display
  //Appending
    //Append correct number of buttons for switching pages
    //Append search box


// Unobstrusive JavaScript:
  // content or functionality relate to JavaScript should
  // be added programmatically by JavaScript. For this project, that means, the
  // search field and the pagination buttons shouldn't be added directly to the
  // index.html file. You need to use JavaScript to add them.

//Check for cross browser compatibility


//// GLOBAL VARIABLES
var studentItems = $(".student-item"),
    studentEmail = $(".email"),
    studentName = $(".name"),
    pageCount = Math.ceil(studentItems.length / 10),
    pagesObject = [];

////FUNCTIONS
function groupStudentsBy10s(studentItems) {
  pagesObject.push(studentItems.splice(0, 10));
}

function appendPageButtons(object) {
  var paginationDiv = '<div class="pagination">'+
                        '<ul></ul>'+
                      '</div>';
  $(".student-list").after(paginationDiv); //add paginationDiv to the page
  for (var i = 1; i <= object.length; i++) { //add page buttons
    var pageButton = '<li><a href="#">'+ i +'</a></li>';
    $('.pagination ul').append(pageButton);
  }
  $(".pagination ul li a").first().addClass("active"); //make 1st button active
}

function showPageByNumber(i) {
  $(".student-item").remove();
  $(".student-list").append(pagesObject[i]);
}

function pageButtonsClickListener() { //change page when button clicked
  $(".pagination ul li a").on("click", function() {
    var pageNumber = parseInt($(this)[0].text) - 1;
    showPageByNumber(pageNumber);
    $(".pagination ul li a").removeClass();
    $(this).addClass("active");
  });
}

////BEGIN
do { //populate pagesObject with students divided into 10s
  for (; studentItems.length > 0;) {
    groupStudentsBy10s(studentItems); //
  }
} while (studentItems.lenth > 0);

if (pagesObject.length > 1) {
  appendPageButtons(pagesObject); //page buttons added based on number of pages
  pageButtonsClickListener();
  showPageByNumber(0); //show first page to start
}



// $(".student-item").remove();
// $(".student-list").append(pagesObject[0]);
//APPEND CLASS ACTIVE TO FIRST BUTTON
  // <li>
  //   <a class="active" href="#">1</a>
  // </li>


// var pagesObjectLength = pagesObject.length;

// for (i = 0; pagesObject.length < i; i++) {
//   for (x = 0; pagesObject[i].length < x; x++) {
//     console.log(pagesObject[i]);
//   }
//
// }
