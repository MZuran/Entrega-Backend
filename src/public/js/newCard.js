export function newCard(element) {
    return `
        <div class='card my-2 mx-2' style='width: 18rem;'>
            <img src="${element.thumbnail}" class='card-img-top' alt="${element.title}" />
            <div class='card-body'>
                <div class='d-flex align-items-center'>
                    <h5 class='card-title'> ${element.title} </h5>
                    <small class='text-muted mx-1'> $${element.price} </small>
                </div>
                <h6 class="text-info"><i>Category: "${element.category}", Id: ${element._id}</i></h6>
                <p class='card-text'> ${element.description}. <i class='text-muted'>Items in stock: ${element.stock}</i> </p>
            </div>
        </div>
    `;
}