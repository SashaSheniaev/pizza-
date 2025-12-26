import { useState } from 'react';
import { Pizza, CartItem } from './types';
import { pizzas } from './data/pizzas';
import PizzaMenu from './components/PizzaMenu';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import './App.css';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const addToCart = (pizza: Pizza) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.pizza.id === pizza.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.pizza.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { pizza, quantity: 1 }];
    });
  };

  const removeFromCart = (pizzaId: number) => {
    setCart(prevCart => prevCart.filter(item => item.pizza.id !== pizzaId));
  };

  const updateQuantity = (pizzaId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(pizzaId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.pizza.id === pizzaId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.pizza.price * item.quantity, 0);
  };

  const handleOrder = (orderData: { name: string; phone: string; address: string }) => {
    const order = {
      ...orderData,
      items: cart,
      total: getTotalPrice()
    };
    
    // Здесь можно отправить заказ на сервер
    console.log('Заказ оформлен:', order);
    alert(`Заказ оформлен! Спасибо, ${orderData.name}! Ваш заказ на сумму ${getTotalPrice()}₽ будет доставлен по адресу ${orderData.address}.`);
    
    // Очищаем корзину и закрываем форму
    setCart([]);
    setShowOrderForm(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1 className="logo">🍕 Пиццерия</h1>
          <p className="tagline">Лучшая пицца в городе!</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="content-wrapper">
            <PizzaMenu pizzas={pizzas} onAddToCart={addToCart} />
            
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

