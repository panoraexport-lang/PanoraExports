import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package, Plus, Edit, Trash2, Search, Filter, Eye, EyeOff,
    Upload, X, Save, DollarSign, Tag, Image as ImageIcon,
    BarChart3, Users, ShoppingCart, TrendingUp, AlertCircle
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useToast } from '@/hooks/use-toast';

// Types
interface Product {
    id: string;
    name: string;
    category: string;
    price: string;
    supplier: string;
    image: string;
    icon: string;
    verified: boolean;
    description?: string;
    minOrder?: string;
    leadTime?: string;
    stock?: number;
    isActive: boolean;
}

// Sample initial products
const initialProducts: Product[] = [
    {
        id: '1',
        name: 'Organic Cotton Fabric',
        category: 'Textiles',
        price: '$12.50/meter',
        supplier: 'Gujarat Textiles Ltd',
        image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=400&fit=crop&q=80',
        icon: '🧵',
        verified: true,
        description: 'Premium organic cotton fabric, GOTS certified',
        minOrder: '500 meters',
        leadTime: '15-20 days',
        stock: 10000,
        isActive: true,
    },
    {
        id: '2',
        name: 'Basmati Rice Premium',
        category: 'Agriculture',
        price: '$850/ton',
        supplier: 'Punjab Agro Exports',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop&q=80',
        icon: '🌾',
        verified: true,
        description: 'Premium aged Basmati rice with extra-long grains',
        minOrder: '10 tons',
        leadTime: '10-15 days',
        stock: 500,
        isActive: true,
    },
];

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const { toast } = useToast();

    const categories = ['All', 'Textiles', 'Agriculture', 'Hardware', 'Handicrafts', 'Spices', 'Leather Goods', 'Ayurveda & Wellness', 'Gems & Jewelry'];

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Stats
    const stats = {
        totalProducts: products.length,
        activeProducts: products.filter(p => p.isActive).length,
        totalValue: products.reduce((sum, p) => sum + (p.stock || 0), 0),
        verifiedProducts: products.filter(p => p.verified).length,
    };

    // Handlers
    const handleAddProduct = (product: Omit<Product, 'id'>) => {
        const newProduct = {
            ...product,
            id: Date.now().toString(),
        };
        setProducts([...products, newProduct]);
        setIsAddModalOpen(false);
        toast({
            title: "Product Added",
            description: `${product.name} has been added successfully`,
        });
    };

    const handleEditProduct = (product: Product) => {
        setProducts(products.map(p => p.id === product.id ? product : p));
        setIsEditModalOpen(false);
        setCurrentProduct(null);
        toast({
            title: "Product Updated",
            description: `${product.name} has been updated successfully`,
        });
    };

    const handleDeleteProduct = (id: string) => {
        const product = products.find(p => p.id === id);
        if (window.confirm(`Are you sure you want to delete "${product?.name}"?`)) {
            setProducts(products.filter(p => p.id !== id));
            toast({
                title: "Product Deleted",
                description: "Product has been removed successfully",
                variant: "destructive",
            });
        }
    };

    const handleToggleActive = (id: string) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, isActive: !p.isActive } : p
        ));
    };

    return (
        <ProtectedRoute requireAdmin={true}>
            <div className="min-h-screen bg-background pt-[112px] pb-20 font-sans antialiased text-primary">
                <Navigation />

                <div className="max-w-[1600px] mx-auto px-8 md:px-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-[1.5px] bg-primary" />
                                <span className="text-[9px] uppercase tracking-widest font-bold text-primary">Admin Control</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-tight mb-4">
                                Admin <span className="font-serif italic font-light opacity-80">Dashboard.</span>
                            </h1>
                            <p className="text-primary/60 text-[13px] max-w-xl font-medium leading-relaxed">
                                Manage your product catalog, monitor inventory, and oversee verified business profiles.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-2 px-6 py-4 bg-secondary border border-border text-secondary-foreground font-bold text-[10px] uppercase tracking-widest hover:border-primary/20 transition-all rounded-sm">
                                <BarChart3 className="w-3.5 h-3.5" />
                                Analytics
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-all rounded-sm group"
                            >
                                <Plus className="w-4 h-4" />
                                Add Product
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <StatCard
                            icon={Package}
                            label="Total Products"
                            value={stats.totalProducts}
                            subValue="Available in catalog"
                        />
                        <StatCard
                            icon={Eye}
                            label="Active Items"
                            value={stats.activeProducts}
                            subValue="Visible to customers"
                        />
                        <StatCard
                            icon={ShoppingCart}
                            label="Inventory units"
                            value={stats.totalValue.toLocaleString()}
                            subValue="Total stock tracked"
                        />
                        <StatCard
                            icon={TrendingUp}
                            label="Verified items"
                            value={stats.verifiedProducts}
                            subValue="Quality assured"
                        />
                    </div>

                    {/* Controls & Table Container */}
                    <div className="bg-background border border-border shadow-sm rounded-sm overflow-hidden">
                        <div className="p-8 border-b border-border bg-secondary/30">
                            <div className="flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-between">
                                {/* Search */}
                                <div className="relative flex-1 max-w-xl group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
                                    <input
                                        type="text"
                                        placeholder="SEARCH PRODUCTS OR SUPPLIERS..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 border border-border bg-background text-primary text-[10px] font-bold tracking-widest focus:outline-none focus:border-primary transition-all placeholder:text-primary/20 uppercase rounded-sm"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-5 py-2.5 text-[8px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border rounded-sm ${selectedCategory === category
                                                ? 'bg-primary text-primary-foreground border-primary'
                                                : 'bg-background text-primary/60 border-border hover:border-primary/20 hover:text-primary'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Products Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-secondary/10">
                                        <th className="px-8 py-5 text-left text-[9px] font-bold text-primary/40 uppercase tracking-widest border-b border-border">
                                            Product / Supplier
                                        </th>
                                        <th className="px-8 py-5 text-left text-[9px] font-bold text-primary/40 uppercase tracking-widest border-b border-border">
                                            Category
                                        </th>
                                        <th className="px-8 py-5 text-left text-[9px] font-bold text-primary/40 uppercase tracking-widest border-b border-border">
                                            Price
                                        </th>
                                        <th className="px-8 py-5 text-left text-[9px] font-bold text-primary/40 uppercase tracking-widest border-b border-border">
                                            Stock
                                        </th>
                                        <th className="px-8 py-5 text-left text-[9px] font-bold text-primary/40 uppercase tracking-widest border-b border-border">
                                            Status
                                        </th>
                                        <th className="px-8 py-5 text-right text-[9px] font-bold text-primary/40 uppercase tracking-widest border-b border-border">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {filteredProducts.map((product) => (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-secondary/10 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-14 h-14 rounded-sm overflow-hidden border border-border bg-secondary shrink-0">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-105"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-primary text-[13px] uppercase tracking-tight mb-1">
                                                            {product.name}
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[8px] text-primary/40 uppercase font-bold tracking-widest">
                                                                {product.supplier}
                                                            </span>
                                                            {product.verified && (
                                                                <span className="text-[7px] bg-primary text-primary-foreground px-1.5 py-0.5 font-bold uppercase tracking-widest rounded-[1px]">
                                                                    Verified
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[8px] font-bold text-primary uppercase tracking-widest px-3 py-1 bg-secondary border border-border rounded-sm">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 font-bold text-primary text-sm">
                                                {product.price}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-bold text-primary">{product.stock?.toLocaleString()}</span>
                                                    <span className="text-[8px] font-bold text-primary/30 uppercase tracking-widest">Units</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <button
                                                    onClick={() => handleToggleActive(product.id)}
                                                    className={`px-4 py-1.5 text-[8px] font-bold uppercase tracking-widest transition-all border rounded-sm ${product.isActive
                                                        ? 'bg-primary text-primary-foreground border-primary'
                                                        : 'bg-background text-primary/40 border-border'
                                                        }`}
                                                >
                                                    {product.isActive ? 'Active' : 'Draft'}
                                                </button>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setCurrentProduct(product);
                                                            setIsEditModalOpen(true);
                                                        }}
                                                        className="p-2.5 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all border border-transparent rounded-sm"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" strokeWidth={2} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="p-2.5 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all border border-transparent rounded-sm"
                                                        title="Delete Asset"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredProducts.length === 0 && (
                                <div className="py-24 text-center">
                                    <div className="w-16 h-16 bg-secondary rounded-sm flex items-center justify-center mx-auto mb-6">
                                        <Package className="w-6 h-6 text-primary/40" />
                                    </div>
                                    <p className="text-primary/40 text-[9px] font-bold uppercase tracking-widest">No products found in directory</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Modals */}
                <ProductModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleAddProduct}
                    title="Add New Product"
                />

                {currentProduct && (
                    <ProductModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setCurrentProduct(null);
                        }}
                        onSave={handleEditProduct}
                        product={currentProduct}
                        title="Edit Product"
                    />
                )}
            </div>
        </ProtectedRoute>
    );
}

// Stat Card Component
function StatCard({ icon: Icon, label, value, subValue }: {
    icon: any;
    label: string;
    value: number | string;
    subValue: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background border border-border p-8 rounded-sm hover:border-primary/20 transition-all shadow-sm"
        >
            <div className="flex items-start justify-between mb-8">
                <div className="w-10 h-10 bg-secondary text-secondary-foreground border border-border flex items-center justify-center rounded-sm">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
            </div>

            <div className="space-y-1">
                <p className="text-4xl font-bold text-primary tracking-tight">
                    {value}
                </p>
                <div>
                    <p className="text-[9px] font-bold text-primary uppercase tracking-widst mb-1 opacity-40">
                        {label}
                    </p>
                    <p className="text-[11px] font-medium text-primary/60">
                        {subValue}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

// Product Modal Component
function ProductModal({
    isOpen,
    onClose,
    onSave,
    product,
    title
}: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: any) => void;
    product?: Product;
    title: string;
}) {
    const [formData, setFormData] = useState<Partial<Product>>(
        product || {
            name: '',
            category: 'Textiles',
            price: '',
            supplier: '',
            image: '',
            icon: '📦',
            verified: true,
            description: '',
            minOrder: '',
            leadTime: '',
            stock: 0,
            isActive: true,
        }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData as Product);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-primary/20 backdrop-blur-md z-[100] flex items-center justify-center p-6 overflow-y-auto"
                onClick={onClose}
            >
                <div className="min-h-full flex items-center justify-center w-full py-12">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background border border-border shadow-2xl max-w-2xl w-full relative rounded-sm"
                    >
                        {/* Header */}
                        <div className="px-10 py-8 border-b border-border flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-primary tracking-tight">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 flex items-center justify-center text-primary/40 hover:text-primary transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-10 space-y-10">
                            {/* Product Name */}
                            <div className="space-y-2.5">
                                <label className="block text-[9px] font-bold text-primary/40 uppercase tracking-widest">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-0 py-3 bg-transparent border-b border-border text-primary font-bold text-lg focus:outline-none focus:border-primary transition-all placeholder:text-primary/10"
                                    placeholder="Enter product name"
                                />
                            </div>

                            {/* Category & Supplier */}
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-2.5">
                                    <label className="block text-[9px] font-bold text-primary/40 uppercase tracking-widest">
                                        Category
                                    </label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-0 py-3 bg-transparent border-b border-border text-primary font-bold text-[13px] uppercase tracking-widest focus:outline-none focus:border-primary appearance-none cursor-pointer"
                                    >
                                        <option>Textiles</option>
                                        <option>Agriculture</option>
                                        <option>Hardware</option>
                                        <option>Handicrafts</option>
                                        <option>Spices</option>
                                        <option>Leather Goods</option>
                                        <option>Ayurveda & Wellness</option>
                                        <option>Gems & Jewelry</option>
                                    </select>
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block text-[9px] font-bold text-primary/40 uppercase tracking-widest">
                                        Supplier / Brand
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.supplier}
                                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                                        className="w-full px-0 py-3 bg-transparent border-b border-border text-primary font-bold text-[13px] uppercase tracking-widest focus:outline-none focus:border-primary transition-all"
                                        placeholder="Supplier ID"
                                    />
                                </div>
                            </div>

                            {/* Price & Stock */}
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-2.5">
                                    <label className="block text-[9px] font-bold text-primary/40 uppercase tracking-widest">
                                        Price per Unit
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-0 py-3 bg-transparent border-b border-border text-primary font-bold text-[13px] uppercase tracking-widest focus:outline-none focus:border-primary transition-all"
                                        placeholder="$0.00"
                                    />
                                </div>
                                <div className="space-y-2.5">
                                    <label className="block text-[9px] font-bold text-primary/40 uppercase tracking-widest">
                                        Units in Stock
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                        className="w-full px-0 py-3 bg-transparent border-b border-border text-primary font-bold text-[13px] uppercase tracking-widest focus:outline-none focus:border-primary transition-all"
                                        placeholder="0"
                                    />
                                </div>
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2.5">
                                <label className="block text-[9px] font-bold text-primary/40 uppercase tracking-widest">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-0 py-3 bg-transparent border-b border-border text-primary font-bold text-[13px] uppercase tracking-widest focus:outline-none focus:border-primary transition-all"
                                    placeholder="https://..."
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2.5">
                                <label className="block text-[9px] font-bold text-primary/40 uppercase tracking-widest">
                                    Product Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-0 py-3 bg-transparent border-b border-border text-primary font-medium text-[14px] focus:outline-none focus:border-primary transition-all resize-none leading-relaxed"
                                    placeholder="Brief specifications..."
                                />
                            </div>

                            {/* Status Toggles */}
                            <div className="flex gap-12 pt-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-10 h-5 border ${formData.verified ? 'border-primary bg-primary' : 'border-border bg-transparent'} relative transition-all rounded-full`}>
                                        <input
                                            type="checkbox"
                                            checked={formData.verified}
                                            onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                                            className="hidden"
                                        />
                                        <div className={`absolute top-0.5 bottom-0.5 w-3.5 h-3.5 rounded-full transition-all ${formData.verified ? 'left-5.5 bg-background' : 'left-1 bg-primary/20'}`} />
                                    </div>
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Verified</span>
                                </label>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-10 h-5 border ${formData.isActive ? 'border-primary bg-primary' : 'border-border bg-transparent'} relative transition-all rounded-full`}>
                                        <input
                                            type="checkbox"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            className="hidden"
                                        />
                                        <div className={`absolute top-0.5 bottom-0.5 w-3.5 h-3.5 rounded-full transition-all ${formData.isActive ? 'left-5.5 bg-background' : 'left-1 bg-primary/20'}`} />
                                    </div>
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active</span>
                                </label>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-8 py-4 border border-border text-primary text-[10px] font-bold uppercase tracking-widest hover:bg-secondary transition-all rounded-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-[1.5] px-8 py-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all rounded-sm shadow-md"
                                >
                                    Save Product
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

