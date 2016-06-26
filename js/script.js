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
    studentNames = $(".name");

//// Functions
function groupListIntoPages(list) {
  var pagesArray = [];
  do {
    for (; list.length > 0;) {
      pagesArray.push(list.splice(0, 10));
    }
  } while (list.lenth > 0);
  return pagesArray;
}

function renderPaginatedStudentList(pageNumber, paginatedPageList) {
  $(".student-list li").hide();
  $.each(paginatedPageList, function(index, page){
      if (pageNumber === index) {
        $.each(page, function(i, listItem){
          $(listItem).fadeIn('fast');
        });
      }
  });
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
    renderPaginatedStudentList(pageSelection, paginatedList);
    $(".pagination ul li a").removeClass();
    $(this).addClass("active");
    e.preventDefault();
  });
}

function listFilter(list, filter) {
  var filteredList = [];
  return list.filter(function(index) {
    var searchQuery = this.textContent;
    return searchQuery.search(new RegExp(filter, "i")) !== -1;
  });
}

function renderSearchBox() {
  var searchDiv = '<div class="student-search">'+
                  '<input id="search" placeholder="Search for students...">'+
                  '<button>Search</button>'+
                '</div>';
  $(".page-header h2").after(searchDiv);
  //Add keyup listeners
  $("#search").keyup(function() {
    var searchTerm = $(this).val();
    var filteredList = listFilter(studentNames, searchTerm);
    var paginatedFilteredList = groupListIntoPages(filteredList);
    console.log(paginatedFilteredList);
    // renderPageButtons(paginatedFilteredList);
    renderPaginatedStudentList(0, $(paginatedFilteredList));
  });
}

//Begin
var paginatedStudentList = groupListIntoPages(studentItems);
console.log(paginatedStudentList);
renderPageButtons(paginatedStudentList);
renderPaginatedStudentList(0, paginatedStudentList);
renderSearchBox();


//use $.filter for search
