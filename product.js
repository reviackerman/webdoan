const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
});




document.addEventListener('DOMContentLoaded', function() {
    

    const addButtons = document.querySelectorAll('.add-to-cart');


    addButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            

            event.preventDefault(); 


            const itemElement = event.target.closest('.item');
            
            const productID = itemElement.querySelector('.item-id').innerText;
            const productName = itemElement.querySelector('.item-name').innerText;
            const productPriceText = itemElement.querySelector('.item-price').innerText;
            const productImage = itemElement.querySelector('.item-image').src;


            const productPrice = parseInt(productPriceText.replace('Giá: ', '').replace(' VNĐ', '').replace(/\./g, ''));


            const product = {
                id: productID,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1 
            };

      
            addProductToCart(product);

            
            alert('Đã thêm sản phẩm vào giỏ hàng!');
        });
    });
});


function addProductToCart(productToAdd) {

    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === productToAdd.id) {
            
            cart[i].quantity += 1;
            found = true;
            break;
        }
    }

    
    if (!found) {
        cart.push(productToAdd);
    }


    localStorage.setItem('cart', JSON.stringify(cart));
}