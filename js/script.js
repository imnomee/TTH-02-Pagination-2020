const page = document.querySelector(".page");
const pageHeader = document.querySelector(".page-header");
const ul = document.querySelector(".student-list");
const list = ul.children;
const studentsPerPage = 10;

showPage(list, 1);
appendPageLinks(list);
searchButton(list);

function showPage(_list, _page) {
  const firstItem = _page * studentsPerPage - studentsPerPage;
  const lastItem = _page * studentsPerPage - 1;

  for (let i = 0; i < _list.length; i++) {
    _list[i].style.display = "none";
    if (i >= firstItem && i <= lastItem) {
      _list[i].style.display = "block";
    }
  }
}

function appendPageLinks(_list) {
  const pages = Math.ceil(_list.length / studentsPerPage);
  const div = document.createElement("div");
  div.className = "pagination";
  const ul = document.createElement("ul");
  div.appendChild(ul);

  for (let i = 1; i <= pages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    li.appendChild(a);
    ul.appendChild(li);
  }

  ul.firstElementChild.firstElementChild.className = "active";
  page.appendChild(div);
  ul.addEventListener("click", (e) => {
    const activePage = document.querySelector(".active");
    if (e.target.tagName === "A") {
      const current = e.target;
      current.className = "active";
      activePage.className = "";
      showPage(_list, current.textContent);
    }
  });
}

function searchButton (list)  {
//////////

  const div = document.createElement("div");
  const input = document.createElement("input");
  input.placeholder = "Search for students...";
  const button = document.createElement("button");
  button.textContent = "Search";
  div.className = "student-search";
  div.appendChild(input);
  div.appendChild(button);
////////////
  pageHeader.appendChild(div);

  const pagination = document.querySelector(".pagination");
  const h1 = document.createElement("h1");
  h1.textContent = "";
  page.insertBefore(h1, pagination);

  button.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      /* Getting text contact of list using traversal.
        I can use the class name here for student list and student item
        but used this approach just or practice and to see if it will work
        */
      const searchInput = input.value.trim();
      const searchArr = []; // sample second list to try on both lists
      if (searchInput.length > 0) {
        // searchArr.length = 0;
        h1.textContent = "";
        pagination.style.display = "none";

        for (let i = 0; i < list.length; i++) {
          const name = list[i].querySelector('h3').textContent
          list[i].style.display = "none";

          if (name.toLowerCase().includes(searchInput.toLowerCase())) {
            searchArr.push(list[i]);
          }
          input.value = "";
        }
      }
      if (searchArr.length == 0) {
        h1.textContent =
          "NO RECORDS FOUND, PLEASE SEARCH AGAIN OR REFRESH FOR FULL LIST.";
      } else {
        /*
           This will create a new pagination element for search results and
           we will remove it every time a search is conducted

           IF YOU COMMENT OUT THESE NEXT TWO LINES FOR " searchPagination" YOU WILL SEE THE BUG, WHICH SHOWS MORE PAGINATIONS
           ON EVERY SEARCH TERM, I WOULD APPRECIATE IF YOU CAN PLEASE GUIDE ME WITH SOME BETTER APPROACH.
           THATS THE BEST I COULD COME UP WITH. 

           */
        const searchPagination = page.lastElementChild;
        page.removeChild(searchPagination);

        //show page and append links with searchArray we received from result
        showPage(searchArr, 1);
        appendPageLinks(searchArr);
      }
    }
  });
};
