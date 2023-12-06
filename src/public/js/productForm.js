export function productForm() {
  return `<div class=' my-2'>
    <p class="d-inline-flex gap-1">
      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#addProductForm" aria-expanded="false" aria-controls="addProductForm">
        Add a Product
      </button>
    </p>
    <p class="d-inline-flex gap-1">
      <button class="btn btn-danger" type="button" data-bs-toggle="collapse" data-bs-target="#removeProductForm" aria-expanded="false" aria-controls="removeProductForm">
        Remove a Product
      </button>
    </p>
    <div class="collapse" id="addProductForm">
      <div class="card card-body mb-3"> ${addProductForm()} </div> 
    </div>
    <div class="collapse" id="removeProductForm">
      <div class="card card-body mb-3"> ${removeProductForm()} </div> 
    </div>
    </div>`
}

function addProductForm() {
  return `
    <iframe name="dummyframe" id="dummyframe" style="display: none;"></iframe>
    <form action="/addSubmitForm" method="post" target="dummyframe" id="addedProductForm">
        <div class="form-group mb-2">
            <label for="formTitle">Product Title</label>
            <input class="form-control" id="formTitle" placeholder="Name of the product" name="title" required>
        </div>
        <div class="form-group mb-2">
            <label for="formTitle">Product Description</label>
            <input class="form-control" id="formDesc" name="description" placeholder="It's mysterious and undescribed" required>
        </div>
        <div class="form-group mb-2">
            <label for="formTitle">Product Price</label>
            <input class="form-control" id="formPrice" name="price" placeholder="Only Numbers work in this field" type="number" inputmode="numeric" required>
        </div>
        <div class="form-group mb-2">
            <label for="formTitle">Product Thumbnail</label>
            <input class="form-control" id="formThumbnail" name="thumbnail" placeholder="Please input a URL with an image of the product with a white background" required>
        </div>
        <div class="form-group mb-2">
            <label for="formTitle">Product Stock</label>
            <input class="form-control" id="formStock" name="stock" placeholder="Current Stock" type="number" step="1" required>
        </div>
        <div class="form-group mb-2">
            <label for="formTitle">Product Category</label>
            <input class="form-control" id="formCategory" name="category" placeholder="What type of product is this?" required>
        </div>
        <div class="form-group mb-2">
            <label for="formTitle">Product Code</label>
            <input class="form-control" id="formCode" name="code" placeholder="Please provide a unique code for the product" required>
        </div>

    </form>
    <button id="formSubmit" class="btn btn-primary mt-3">Submit</button>
    `
}

function removeProductForm() {
  return `
    <form target="dummyframe" id="deletedProductForm">
      <div class="form-group mb-2">
        <label for="formDeleteId">Please select what item to delete</label>
        <input class="form-control" id="formDeleteId" placeholder="Id of item to delete" type="number" step="1" required>
      </div>
    </form>
    <button id="formDelete" class="btn btn-danger mt-3">Delete</button>
  `
}