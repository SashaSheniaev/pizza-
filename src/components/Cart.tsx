import { CartItem } from '../types';
import './Cart.css';

interface CartProps {
  cart: CartItem[];
  onRemove: (pizzaId: number) => void;
  onUpdateQuantity: (pizzaId: number, quantity: number) => void;
  total: number;
  onCheckout: () => void;
}

function Cart({ cart, onRemove, onUpdateQuantity, total, onCheckout }: CartProps) {
  if (cart.length === 0) {
    return (
      <div className="cart">
        <h2 className="cart-title">Корзина</h2>
        <div className="cart-empty">
          <p>Корзина пуста</p>
          <span className="cart-icon">🛒</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2 className="cart-title">Корзина</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.pizza.id} className="cart-item">
            <div className="cart-item-info">
              <h4 className="cart-item-name">{item.pizza.name}</h4>
              <p className="cart-item-price">{item.pizza.price}₽ × {item.quantity}</p>
            </div>
            <div className="cart-item-controls">
              <button
                className="btn-quantity"
                onClick={() => onUpdateQuantity(item.pizza.id, item.quantity - 1)}
              >
                −
              </button>
              <span className="quantity">{item.quantity}</span>
              <button
                className="btn-quantity"
                onClick={() => onUpdateQuantity(item.pizza.id, item.quantity + 1)}
              >
                +
              </button>
              <button
                className="btn-remove"
                onClick={() => onRemove(item.pizza.id)}
                title="Удалить"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <strong>Итого: {total}₽</strong>
        </div>
        <button className="btn-checkout" onClick={onCheckout}>
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default Cart;

