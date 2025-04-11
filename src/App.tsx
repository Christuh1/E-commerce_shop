import React, { useState, useMemo } from 'react';
import { products } from './data/products';
import { CartProvider } from './context/CartContext';
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import ShoppingCart from './components/ShoppingCart';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))),
    []
  );

  const maxPrice = useMemo(() => 
    Math.max(...products.map(p => p.price)),
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && 
        product.price <= priceRange[1];
      const matchesRating = product.rating >= minRating;

      return matchesCategory && matchesPrice && matchesRating;
    });
  }, [selectedCategories, priceRange, minRating]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-8">Product Catalog</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN: Filter + Cart */}
            <div className="lg:col-span-3 space-y-8">
              <FilterPanel
                categories={categories}
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                maxPrice={maxPrice}
                minRating={minRating}
                onCategoryChange={handleCategoryChange}
                onPriceChange={setPriceRange}
                onRatingChange={setMinRating}
                onClearFilters={handleClearFilters}
              />

              <ShoppingCart />
            </div>

            {/* MAIN COLUMN: Products */}
            <div className="lg:col-span-9">
              <ProductGrid products={filteredProducts} />
            </div>

          </div>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;