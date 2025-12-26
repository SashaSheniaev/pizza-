import { Product, Category } from '../types';
import './ProductMenu.css';

interface ProductMenuProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
}

const categories: { id: Category | 'all'; name: string; icon: string }[] = [
  { id: 'all', name: 'Все', icon: '🍽️' },
  { id: 'pizza', name: 'Пицца', icon: '🍕' },
  { id: 'burger', name: 'Бургеры', icon: '🍔' },
  { id: 'drink', name: 'Напитки', icon: '🥤' },
  { id: 'icecream', name: 'Мороженое', icon: '🍦' },
  { id: 'fastfood', name: 'Фастфуд', icon: '🍟' }
];

function ProductMenu({ products, onAddToCart, selectedCategory, onCategoryChange }: ProductMenuProps) {
  return (
    <section className="product-menu">
      <h2 className="section-title">Наше меню</h2>
      
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              {(product.ingredients || product.weight || product.volume) && (
                <div className="product-details">
                  {product.ingredients && (
                    <div className="product-ingredients">
                      <strong>Ингредиенты:</strong>
                      <ul>
                        {product.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.weight && (
                    <div className="product-weight">Вес: {product.weight}</div>
                  )}
                  {product.volume && (
                    <div className="product-volume">Объем: {product.volume}</div>
                  )}
                </div>
              )}
              
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button
                  className="btn-add-to-cart"
                  onClick={() => onAddToCart(product)}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="no-products">
          <p>Товары в этой категории отсутствуют</p>
        </div>
      )}
    </section>
  );
}

export default ProductMenu;

