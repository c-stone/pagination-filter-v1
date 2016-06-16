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
    studentNames = $(".name"),
    studentInfo = $.makeArray(studentEmails.add(studentNames)),
    pageCount = Math.ceil(studentItems.length / 10);

function groupListIntoPages(list) {
  var pagesArray = [];
  do {
    for (; list.length > 0;) {
      pagesArray.push(list.splice(0, 10));
    }
  } while (studentItems.lenth > 0);
  return pagesArray;
}

function showPageByNumber(pageNumber, paginatedList) {
  $(".student-item").remove();
  $(".student-list").append(paginatedList[pageNumber])
                    .css("display", "none")
                    .fadeIn('fast'); // animation from page to page
}

function renderPageButtons(paginatedList) {
  //render buttons
  var numberOfPages = paginatedList.length;
  var paginationDiv = '<div class="pagination">'+
                        '<ul></ul>'+
                      '</div>';
  $(".student-list").after(paginationDiv); //add paginationDiv to the page
  for (var i = 1; i <= numberOfPages; i++) { //add page buttons
    var pageButton = '<li><a href="#">'+ i +'</a></li>';
    $('.pagination ul').append(pageButton);
  }
  $(".pagination ul li a").first().addClass("active"); //make 1st button active
  //Add click listeners
  $(".pagination ul li a").on("click", function(e) {
    var pageSelection = parseInt($(this)[0].text) - 1;
    showPageByNumber(pageSelection, paginatedList);
    $(".pagination ul li a").removeClass();
    $(this).addClass("active");
    e.preventDefault();
  });
}

var paginatedStudentList = groupListIntoPages(studentItems);
renderPageButtons(paginatedStudentList);
showPageByNumber(0, paginatedStudentList);


//use $.filter for search
