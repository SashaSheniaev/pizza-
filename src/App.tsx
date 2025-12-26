import { useState } from 'react';
import { Product, CartItem, Category } from './types';
import { products } from './data/products';
import ProductMenu from './components/ProductMenu';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import './App.css';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleOrder = (orderData: { name: string; phone: string; address: string }) => {
    const order = {
      ...orderData,
      items: cart,
      total: getTotalPrice()
    };
    
    // Здесь можно отправить заказ на сервер
    console.log('Заказ оформлен:', order);
    alert(`Заказ оформлен! Спасибо, ${orderData.name}! Ваш заказ на сумму $${getTotalPrice().toFixed(2)} будет доставлен по адресу ${orderData.address}.`);
    
    // Очищаем корзину и закрываем форму
    setCart([]);
    setShowOrderForm(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">🍕 Фастфуд</h1>
          <p className="tagline">Пицца, бургеры, напитки и многое другое!</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="content-wrapper">
            <ProductMenu 
              products={filteredProducts} 
              onAddToCart={addToCart}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            
            <aside className="sidebar">
              <Cart
                cart={cart}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
                total={getTotalPrice()}
                onCheckout={() => setShowOrderForm(true)}
              />
            </aside>
          </div>
        </div>
      </main>

      {showOrderForm && (
        <OrderForm
          total={getTotalPrice()}
          onOrder={handleOrder}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </div>
  );
}

export default App;

