import { Product, Category, BusinessSettings } from '../types';
import { initialProducts, initialCategories, initialBusinessSettings } from '../data/mockData';

class CatalogueService {
  private products: Product[] = [...initialProducts];
  private categories: Category[] = [...initialCategories];
  private businessSettings: BusinessSettings = { ...initialBusinessSettings };

  // Products
  async getProducts(): Promise<Product[]> {
    return [...this.products];
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find(p => p.id === id);
  }

  async addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const initialLen = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    return this.products.length < initialLen;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async addCategory(name: string, iconName: string): Promise<Category> {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name,
      iconName,
      productCount: 0,
      subcategories: []
    };
    this.categories.push(newCat);
    return newCat;
  }

  // Business Settings
  async getBusinessSettings(): Promise<BusinessSettings> {
    return { ...this.businessSettings };
  }

  async updateBusinessSettings(updates: Partial<BusinessSettings>): Promise<BusinessSettings> {
    this.businessSettings = { ...this.businessSettings, ...updates };
    return { ...this.businessSettings };
  }
}

export const catalogueService = new CatalogueService();
