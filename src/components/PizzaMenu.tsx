import { Pizza } from '../types';
import './PizzaMenu.css';

interface PizzaMenuProps {
  pizzas: Pizza[];
  onAddToCart: (pizza: Pizza) => void;
}

function PizzaMenu({ pizzas, onAddToCart }: PizzaMenuProps) {
  return (
    <section className="pizza-menu">
      <h2 className="section-title">Наше меню</h2>
      <div className="pizza-grid">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="pizza-card">
            <div className="pizza-image">{pizza.image}</div>
            <div className="pizza-info">
              <h3 className="pizza-name">{pizza.name}</h3>
              <p className="pizza-description">{pizza.description}</p>
              <div className="pizza-ingredients">
                <strong>Ингредиенты:</strong>
                <ul>
                  {pizza.ingredients.map((ingredient, idx) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="pizza-footer">
                <span className="pizza-price">{pizza.price}₽</span>
                <button
                  className="btn-add-to-cart"
                  onClick={() => onAddToCart(pizza)}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PizzaMenu;

