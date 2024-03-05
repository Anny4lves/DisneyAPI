document.addEventListener("DOMContentLoaded", function () {
    const charactersDiv = document.getElementById("characters");
    const previousPageButton = document.getElementById("previous-page");
    const nextPageButton = document.getElementById("next-page");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    let currentPage = 1;

    async function fetchCharacters(page, query = '') {
        try {
            const apiUrl = query
                ? `https://api.disneyapi.dev/character?page=${page}&search=${query}`
                : `https://api.disneyapi.dev/character?page=${page}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            data.data.sort((a, b) => a.name.localeCompare(b.name));

            charactersDiv.innerHTML = "";

            data.data.forEach(character => {
                const characterElement = document.createElement("div");
                characterElement.classList.add("character");

                const img = document.createElement("img");
                img.src = character.imageUrl;

                const characterInfo = document.createElement("div");
                characterInfo.classList.add("character-info");
                characterInfo.innerHTML = `
                    <h2>${character.name}</h2>
                    <p>Filmes: ${character.films.join(", ")}</p>
                    <p>Séries de TV: ${character.tvShows.join(", ")}</p>
                    <p>Jogos de Vídeo: ${character.videoGames.join(", ")}</p>
                    <a href="${character.url}" target="_blank">Mais Informações</a>
                `;

                characterElement.appendChild(img);
                characterElement.appendChild(characterInfo);
                charactersDiv.appendChild(characterElement);
            });

            currentPage = page;

            previousPageButton.disabled = !data.info.previousPage;
            nextPageButton.disabled = !data.info.nextPage;
        } catch (error) {
            console.error("Erro ao buscar personagens:", error);
        }
    }

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm !== "") {
            fetchCharacters(1, searchTerm);
        }
    });

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== "") {
                fetchCharacters(1, searchTerm);
            }
        }
    });

    previousPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            fetchCharacters(currentPage - 1, searchInput.value.trim());
        }
    });

    nextPageButton.addEventListener("click", () => {
        fetchCharacters(currentPage + 1, searchInput.value.trim());
    });

    fetchCharacters(currentPage);
});
