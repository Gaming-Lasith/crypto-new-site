const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    try {
      const response = JSON.parse(this.responseText);
      const newsContainer = document.getElementById("newsContainer");

      // Clear old content
      newsContainer.innerHTML = "";

      // Loop through articles
      response.forEach(article => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
          <div class="card shadow h-100">
            <img src="${article.image || 'https://via.placeholder.com/400x200?text=Crypto+News'}" 
                 class="card-img-top" alt="News Image">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.excerpt || ''}</p>
              <small class="text-muted">${new Date(article.date).toLocaleDateString()}</small>
            </div>
            <div class="card-footer bg-transparent border-0">
              <a href="${article.link}" target="_blank" class="btn btn-primary btn-sm">Read More</a>
            </div>
          </div>
        `;

        newsContainer.appendChild(col);
      });
    } catch (error) {
      console.error("Error parsing API response:", error);
      document.getElementById("newsContainer").innerHTML =
        `<div class="alert alert-danger">Failed to load news.</div>`;
    }
  }
});

xhr.open("GET", "https://crypto-news54.p.rapidapi.com/v2/media?orderby=date&order=desc&context=view&status=inherit&per_page=10&page=1");
xhr.setRequestHeader("x-rapidapi-key", "92e8468d22mshc904ca948d0cc2bp180380jsnbfc0282e2967");
xhr.setRequestHeader("x-rapidapi-host", "crypto-news54.p.rapidapi.com");

xhr.send(data);
