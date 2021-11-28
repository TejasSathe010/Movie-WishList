// Movie Class: Represents a Movie.
class Movie {
     constructor(title, genre, date) {
         this.title = title;
         this.genre = genre;
         this.date = date;
     }
}


// UI Class: Handle a UI task.
class UI {
    static displayMovies() {

        movies.forEach((movie) => {
            UI.addMovieToList(movie);
        });
    }

    static  addMovieToList(movie) {
        const list = document.querySelector('#movie-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td>${movie.date}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteMovie(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${className}`;
        alertDiv.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#movie-form');
        container.insertBefore(alertDiv, form);

        // Make disappear in 3 seconds.
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000)
    }


    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#genre').value = '';
        document.querySelector('#date').value = null;
    }
}


// Store Class: Handle Storage.

// Event: To Display Movies.
document.addEventListener('click', UI.displayMovies);

// Event: To Add a Movie.
document.querySelector('#movie-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;
    const date = document.querySelector('#date').value;

    // Validate
    if(title === '' || genre === '' || date === '') {
         UI.showAlert('Please fill in all fields', 'danger')
    } else {
    // Debug: console.log(title, genre, date);
    // Create a New Movie Instance.
    const newMovie = new Movie(title, genre, date);

    //Debug: console.log(newMovie);
    // Add the new Movie to UI.

    UI.addMovieToList(newMovie);
    UI.showAlert('Movie Added to Wishlist', 'success')

    UI.clearFields();
    }
});

// Event: To Remove a Movie.
// Using event propogation.

document.querySelector('#movie-list').addEventListener('click', (e) => {
    console.log(e.target)
    UI.deleteMovie(e.target);
    UI.showAlert('Movie Removed From Wishlist', 'success')
});