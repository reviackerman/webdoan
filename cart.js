

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
});
    
    const cartItemsList = document.getElementById('cart-items-list');
    const totalItemsCountEl = document.getElementById('total-items-count');
    const totalPriceValueEl = document.getElementById('total-price-value');
    
    function loadCartItems() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        cartItemsList.innerHTML = '';

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p class="cart-empty-message">Giỏ hàng của bạn đang trống.</p>';
            updateCartSummary(); 
            return;
        }
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            const productDiv = document.createElement('div');
            productDiv.classList.add('product-item'); 
            productDiv.dataset.id = item.id; 

            productDiv.innerHTML = `
                <div class="left-list">
                    <input type="checkbox">
                    <img class="image" src="${item.image}">
                    <p>${item.name}</p> </div>
                <div class="right-list">
                    <ul>
                        <li>${item.price.toLocaleString('vi-VN')}</li>
                        <li>
                            <div class="quantity-input">
                                <button type="button" class="minus">-</button>
                                <input type="number" value="${item.quantity}" min="1">
                                <button type="button" class="plus">+</button>
                            </div>
                        </li>
                        <li class="item-total-price">${itemTotal.toLocaleString('vi-VN')}</li>
                        <li><input type="button" class="remove-button" value="Xóa"></li>
                    </ul>
                </div>
            `;
            

            cartItemsList.appendChild(productDiv);
        });

        updateCartSummary();
    }

    function updateCartSummary() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });

        totalItemsCountEl.innerText = totalItems;
        totalPriceValueEl.innerText = `${totalPrice.toLocaleString('vi-VN')} đồng`;
    }

    //luu vao storage
    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems(); 
    }
    
    
/*cac nut bam */
    cartItemsList.addEventListener('click', (event) => {
        const target = event.target; // Nơi người dùng click vào
        const productItemDiv = target.closest('.product-item'); // Thẻ cha .product-item
        
        if (!productItemDiv) return; // Bấm ra ngoài, không làm gì cả

        const productID = productItemDiv.dataset.id; // Lấy ID sản phẩm
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // bam nut xoa
        if (target.classList.contains('remove-button')) {
            
            cart = cart.filter(item => item.id !== productID);
            saveCart(cart);
        }

        // bam nut plus
        if (target.classList.contains('plus')) {
            const item = cart.find(item => item.id === productID);
            if (item) {
                item.quantity += 1;
                saveCart(cart);
            }
        }
        // bam nut minus
        if (target.classList.contains('minus')) {
            const item = cart.find(item => item.id === productID);
            if (item && item.quantity > 1) {
                item.quantity -= 1; 
                saveCart(cart);
            } else if (item && item.quantity === 1) {
                
                if (confirm('Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?')) {
                    cart = cart.filter(item => item.id !== productID);
                    saveCart(cart);
                }
            }
        }
    });


    loadCartItems(); 
});
