  //Search
    //add event listeners
      //search button should trigger search
      //search email or first/last name
    //dynamically filter search results as they type (extra)
      //paginate results
      //Include a message if there are no results to display

//// Global Variables
var studentItems = $(".student-item"),
    studentEmails = $(".email"),
    studentEmailsArray = $.makeArray(studentEmails),
    studentNames = $.makeArray($(".name").contents().get()),
    pageCount = Math.ceil(studentItems.length / 10),
    pagesObject = [];
    console.log(studentEmailsArray[2]);
    console.log(studentItems);

//// Pagination
function groupStudentsBy10s(studentItems) {
  pagesObject.push(studentItems.splice(0, 10));
}

function showPageByNumber(i) { //show page corresponding to number supplied
  $(".student-item").remove();
  $(".student-list").append(pagesObject[i])
                    .css("display", "none")
                    .fadeIn('fast'); // animation from page to page
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

function pageButtonsClickListener() { //change page when button clicked
  $(".pagination ul li a").on("click", function(e) {
    var pageNumber = parseInt($(this)[0].text) - 1;
    showPageByNumber(pageNumber);
    $(".pagination ul li a").removeClass();
    $(this).addClass("active");
    e.preventDefault();
  });
}

//// Search
function search() {
  $("#search").keyup(function() {
    var searchFilter = $(this).val();
    $(".student-item").remove();
    $("student-list").append(studentItems);

    studentEmails.each(function() {
        if ( $(this).text().search(new RegExp(searchFilter, "i") ) < 0) {
          $(this).fadeOut();
        } else {
          $(this).show();
        }
    });

  });
}

function appendSeachBox() {
  var searchDiv = '<div class="student-search">'+
                    '<input id="search" placeholder="Search for students...">'+
                    '<button>Search</button>'+
                  '</div>';
  $(".page-header h2").after(searchDiv);
}

function searchBoxEventListener() {
  var searchBox = $(".student-search input");
  $(searchBox).keyup(function() {
    console.log(studentEmails.filter(searchFilter));
    // pageObject = studentsInfo.filter(searchFilter);
  });
}

////Begin
do { //populate pagesObject with students divided into 10s
  for (; studentItems.length > 0;) {
    groupStudentsBy10s(studentItems); //pagesObject created
  }
} while (studentItems.lenth > 0);

if (pagesObject.length > 1) {
  appendPageButtons(pagesObject); //page buttons added based on number of pages
  pageButtonsClickListener();
  showPageByNumber(0); //show first page to start
}

appendSeachBox();
searchBoxEventListener();
