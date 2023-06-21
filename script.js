const loadBooks = () => {
  document.getElementById('search-btn').classList.add('d-none');
  document.getElementById('spinner').classList.remove('d-none');

  const userInput = document.getElementById('user-input');
  const searchText = userInput.value;
  userInput.value = "";

  url= `https://openlibrary.org/search.json?q=${searchText}`;

  fetch(url) 
    .then(res => res.json())
    .then(data => displayBooks(searchText, data))
  
}

const displayBooks = (searchText, books) => {
  document.getElementById('spinner').classList.add('d-none');
  document.getElementById('search-btn').classList.remove('d-none');

  const booksContainer = document.getElementById('books-container');
  booksContainer.textContent = '';
  const searchResult = document.getElementById('search-result');
  searchResult.textContent = '';

  if(books.docs.length === 0) {
    alert(`no result found of ${searchText}`);
   document.getElementById('body').style.backgroundImage = 'url(https://raw.githubusercontent.com/shadmansaalim/book-api/main/images/background.jpg)';
   document.getElementById('search-container').classList.add('search-center')
   

  } else {
    document.getElementById('body').style.background = 'slategray';
    document.getElementById('search-container').classList.remove('search-center');

    const booksToDisplay = (books.docs).filter(book => ((books.docs).indexOf(book)) < 20 )

    let booksCount = 0;

    booksToDisplay.forEach(book => {
      booksCount++;
      let imgUrl = '';

      if((book.cover_i) === undefined ) {
        imgUrl = 'https://store.bookbaby.com/MyAccount/CommonControls/BookShopThemes/bookshop/OnePageBookCoverImage.jpg?BookID=BK90045080';

      }
      else {
        imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
      }

      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
      <div class="card h-100">
        <img src="${imgUrl}" class="card-img-top" alt="" />
        <div class="card-body">
        <h5 class="card-title">${book?.title ? book.title : 'title unavailable'}</h5>
        <p class="text-card" >author: <b>${book?.author_name?.[0] ? book.author_name : 'not found' }</b></p>
        <p class="card-text"  >
        first publish year: <b>${book?.first_publish_year ?  book.first_publish_year : 'information unavailable'}   </b>
        </p>
        <p class="card-text" >
         publisher: <b>${book?.publisher? book.publisher : 'unknow'}</b>
        </p>

        </div>
      </div>
      `
      booksContainer.appendChild(div);

    })

    const h4 = document.createElement('h4');
    h4.classList.add('text-center', 'text-white', 'fw-lighter');
    h4.innerHTML = `found ${books.numFound} result of <b>${searchText}</b> showing ${booksCount}`;
    searchResult.appendChild(h4)


  }
}