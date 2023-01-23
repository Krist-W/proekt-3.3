let books =[
      {
        id: 1,
        title: "Design Patterns: Elements of Reusable Object-Oriented Software",
        authors: "Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm",
        year: "1994",
        image: "https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg"
      },
      {
        id: 2,
        title: "JavaScript: The Good Parts",
        authors: "Douglas Crockford",
        year: "2008",
        image: "https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg"
      },
      {
        id: 3, 
        title:
        "JavaScript Patterns: Build Better Applications with Coding and Design Patterns",
        authors: "Stoyan Stefanov",
        year: "2008",
        image:
        "https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg"
      },
      {
        id: 4,
        title:
        "JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)",
        authors: "David Flanagan",
        year: "2011",
        image:
        "https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg"
      }
      ]

   
   
   
   const container = document.getElementById("container2")
   const addModal = document.getElementById("add-modal")
   const closeModalButton = document.getElementById("close-modal-button")
   const openModalButton = document.getElementById("open-modal-button")


   function closeModal() {
      addModal.style.display = "none"
   }

   function openModal() {
      addModal.style.display = "flex"
      
   }

   closeModalButton.addEventListener("click", closeModal)
   openModalButton.addEventListener("click", openModal)

   function LocalStorage() {
      const booksJson = JSON.stringify(books)
      localStorage.setItem("books", booksJson)
   }

   function updateBooks() {
   container.innerHTML = ""
   books.forEach((book) => {
      container.innerHTML += `
      <div class="book">
         <img class="image" src="${book.image}"/>
         <p class="title">${book.title}</p>
         <p class="year">${book.year}</p>
         <p class="authors">${book.authors}</p>
         <div class="button-container">
         <button class="button" id="changeBook(${book.id})">Изменить</button>
         <button class="button" id="deleteBook(${book.id})">Удалить</button>
         </div>
      </div>
      `
   })

   books.forEach((book) => {
      document.getElementById(`changeBook(${book.id})`).addEventListener("click", () => openUpdateModal(book.id))
      document.getElementById(`deleteBook(${book.id})`).addEventListener("click", () => deleteBook(book.id))
   })

   
}

function deleteBook(id) {
   const book = books.find((s) => {
      return s.id === id
   })
   const bookIndex = books.indexOf(book)
   books.splice(bookIndex, 1)
   updateBooks()
   LocalStorage()
}


function clearForm() {
   document.getElementById("title").value = ""
   document.getElementById("authors").value = ""
   document.getElementById("year").value = ""
   document.getElementById("image").value = ""
}

function booksId() {
   id: books.length + 1
  }

function addBook() {
   const titleValue = document.getElementById('title').value
   const authorsValue = document.getElementById('authors').value
   const yearValue = document.getElementById('year').value
   const imageValue = document.getElementById('image').value
   const addBook = {
      title: titleValue,
      authors: authorsValue,
      year: yearValue,
      image: getImage(imageValue)
   }
   
   books.push(addBook)
   updateBooks()
   clearForm()
   closeModal()
   LocalStorage()
   booksId()

}
function getImage(imageValue) {
   let image
   if (imageValue) {
      image = imageValue
   }
   else {
      image = "image/book4.png"
   }
   return image
}

   const myButton = document.getElementById("add-book-button")
   myButton.addEventListener("click", addBook)

   const booksJson = localStorage.getItem("books")
   const savedBooks = JSON.parse(booksJson)
   if (booksJson) {
      books = savedBooks
   }

   const updateModal = document.getElementById("update-modal")
   const UpdateBookButton = document.getElementById("update-book-button")

   const closeUpdateModalButton = document.getElementById("close-update-modal-button")
   closeUpdateModalButton.addEventListener("click", closeUpdateModal)

   function closeUpdateModal() {
      updateModal.style.display = "none"
   }

   function openUpdateModal (id) {
      updateModal.style.display = "flex"
      const searchBook = books.find(book => book.id === id)
      document.getElementById("updateTitle").value = searchBook.title
      document.getElementById("updateAuthors").value = searchBook.authors
      document.getElementById("updateYear").value = searchBook.year
      document.getElementById("updateImage").value = searchBook.image
     
      function makeUpdate() {
         changeBook(id, makeUpdate)
      }
      UpdateBookButton.addEventListener("click", makeUpdate)
 
   }

    function changeBook(id, makeUpdate) {
      UpdateBookButton.removeEventListener("click", makeUpdate)
      const oldBook = books.find(book => book.id === id)

      const titleValue = document.getElementById("updateTitle").value
      const authorsValue = document.getElementById("updateAuthors").value
      const yearValue = document.getElementById("updateYear").value
      const imageValue = document.getElementById("updateImage").value

      const newBook = {
         id: oldBook.id,
         title: titleValue,
         authors: authorsValue,
         year: yearValue,
         image: imageValue
      }

      const bookIndex = books.indexOf(oldBook)
      books.splice(bookIndex, 1, newBook)
      
      updateBooks()
      LocalStorage()
      closeUpdateModal()
      booksId()
    }
   
   updateBooks()



                                        