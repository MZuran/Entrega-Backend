export function newCard(category, thumbnail, title, price, description, stock) {
    return `
        <div class='card my-2 mx-2' style='width: 18rem;'>
            <img src="${thumbnail}" class='card-img-top' alt="${title}" />
            <div class='card-body'>
                <div class='d-flex align-items-center'>
                    <h5 class='card-title'> ${title} </h5>
                    <small class='text-muted mx-1'> $${price} </small>
                </div>
                <h6 class="text-info">${category}</h6>
                <p class='card-text'> ${description}. <i class='text-muted'>Items in stock: ${stock}</i> </p>
            </div>
        </div>
    `;
}