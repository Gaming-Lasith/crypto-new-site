const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    try {
      const response = JSON.parse(this.responseText);
      const newsContainer = document.getElementById("newsContainer");

      newsContainer.innerHTML = "";

      response.forEach(article => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
          <div class="card shadow h-100">
            <img src="${article.image || 'https://via.placeholder.com/400x200?text=Crypto+News'}" 
                 class="card-img-top" alt="News">
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
    } catch (err) {
      console.error("Parsing error:", err);
      document.getElementById("newsContainer").innerHTML =
        `<div class="alert alert-danger">Failed to load news.</div>`;
    }
  }
});

// 👇 Replace with your actual RapidAPI key
xhr.open("GET", "https://crypto-news54.p.rapidapi.com/v2/media?orderby=date&order=desc&context=view&status=inherit&per_page=10&page=1");
xhr.setRequestHeader("x-rapidapi-key", "YOUR_API_KEY_HERE");
xhr.setRequestHeader("x-rapidapi-host", "crypto-news54.p.rapidapi.com");

xhr.send(data);
