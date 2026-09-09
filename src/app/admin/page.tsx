"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { Order, Product } from "@/types";
import { INITIAL_PRODUCTS } from "@/lib/initialData";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "products">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);

  // New product form modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    unit: "প্রতি কেজি",
    image_url: "",
    stock: "50",
    is_active: true,
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch Products
      const prodRes = await fetch("/api/products");
      if (prodRes.ok) {
        const pData = await prodRes.json();
        if (pData.products) setProducts(pData.products);
      }

      // Fetch Orders
      const ordRes = await fetch("/api/orders");
      if (ordRes.ok) {
        const oData = await ordRes.json();
        if (oData.orders && oData.orders.length > 0) {
          setOrders(oData.orders);
        } else {
          // Demo fallback orders if database empty
          setOrders([
            {
              id: "MDF-78291",
              customer_id: "cust-1",
              total_amount: 640,
              status: "pending",
              created_at: new Date().toISOString(),
              customer: {
                id: "cust-1",
                name: "তানভীর আহমেদ",
                phone: "01862092701",
                address: "বাড়ি-১২, রোড-৪, ধানমন্ডি, ঢাকা",
              },
              order_items: [
                {
                  product_id: "prod-1",
                  quantity: 2,
                  price_at_order: 180,
                  product: {
                    id: "prod-1",
                    name: "রাজশাহীর প্রিমিয়াম হিমসাগর আম",
                    price: 180,
                    unit: "প্রতি কেজি",
                    image_url: "",
                    stock: 50,
                    is_active: true,
                  },
                },
                {
                  product_id: "prod-3",
                  quantity: 1,
                  price_at_order: 280,
                  product: {
                    id: "prod-3",
                    name: "মিষ্টি রয়াল গালা আপেল",
                    price: 280,
                    unit: "প্রতি কেজি",
                    image_url: "",
                    stock: 50,
                    is_active: true,
                  },
                },
              ],
            },
          ]);
        }
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check auth session
    const checkAuth = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          // If no session, redirect to login
          router.push("/admin/login");
          return;
        }
      } else {
        const demoSession = localStorage.getItem("mayer_doa_admin_session");
        if (!demoSession) {
          router.push("/admin/login");
          return;
        }
      }
      loadData();
    };

    checkAuth();
  }, [loadData, router]);

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem("mayer_doa_admin_session");
    router.push("/admin/login");
  };

  const handleUpdateOrderStatus = async (
    orderId: string,
    status: Order["status"]
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );

    if (isSupabaseConfigured && supabase) {
      await supabase.from("orders").update({ status }).eq("id", orderId);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProduct) {
      // Update existing
      const updated = {
        ...editingProduct,
        name: productForm.name,
        price: Number(productForm.price),
        unit: productForm.unit,
        image_url: productForm.image_url,
        stock: Number(productForm.stock),
        is_active: productForm.is_active,
      };

      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? updated : p))
      );

      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
    } else {
      // Create new
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: productForm.name,
        price: Number(productForm.price),
        unit: productForm.unit,
        image_url:
          productForm.image_url ||
          "https://lh3.googleusercontent.com/aida-public/AB6AXuA63yH6J7Es4zdfCoeQG_cJuDBPVIX1ViiM9iXEddD21lxL2ccgyW97aNxho24gYR3XnNyucPjGdu4axuniuaawBxdEqLel6jHb_49-2tr9ZILCLi5qEhGN9hg1zCvT-SMj_k4XoTlfENDibgtfz7yJ8kBOLJeTfR8BKvpP1l89KxYLgWwGNakae73M4KBeQbH_LYVe_IGFgbXggCGrYGnOf5GRxdIFxAodH9fFG67BsUzdF0uBLMI_",
        stock: Number(productForm.stock),
        is_active: productForm.is_active,
      };

      setProducts((prev) => [newProd, ...prev]);

      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProd),
      });
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই পণ্যটি মুছে ফেলতে চান?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/products?id=${id}`, { method: "DELETE" });
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      price: "",
      unit: "প্রতি কেজি",
      image_url: "",
      stock: "50",
      is_active: true,
    });
    setIsProductModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      unit: product.unit,
      image_url: product.image_url,
      stock: product.stock.toString(),
      is_active: product.is_active,
    });
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* Admin Top Header */}
      <header className="bg-primary text-surface-container-lowest px-4 md:px-8 py-4 shadow-md sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">nutrition</span>
            </div>
            <div>
              <h1 className="text-headline-sm font-bold">মায়ের দোয়া ফল</h1>
              <p className="text-label-sm text-primary-fixed">অ্যাডমিন ড্যাশবোর্ড</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-lg bg-primary-container text-primary-fixed hover:bg-surface-container-lowest hover:text-primary transition-colors text-label-md font-medium flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>স্টোর দেখুন</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-red-800 text-white hover:bg-red-700 transition-colors text-label-md font-medium flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">logout</span>
              <span>লগআউট</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-outline-variant pb-4 mb-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-label-lg transition-all ${
              activeTab === "orders"
                ? "bg-primary text-surface-container-lowest shadow"
                : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            <span>অর্ডার সমূহ ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-label-lg transition-all ${
              activeTab === "products"
                ? "bg-primary text-surface-container-lowest shadow"
                : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            <span>পণ্য ব্যবস্থাপনা ({products.length})</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-on-surface-variant font-medium">
            তথ্য লোড হচ্ছে...
          </div>
        ) : activeTab === "orders" ? (
          /* ================= ORDERS TAB ================= */
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-headline-sm font-bold text-primary">সকল অর্ডার তালিকা</h2>
              <span className="text-body-sm text-on-surface-variant">
                সর্বমোট {orders.length}টি অর্ডার পাওয়া গেছে
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl p-12 text-center border border-outline-variant">
                <span className="material-symbols-outlined text-[48px] text-outline opacity-40 mb-2">
                  inbox
                </span>
                <p className="text-body-lg text-on-surface-variant">এখনও কোনো অর্ডার পাওয়া যায়নি।</p>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant shadow-sm space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-outline-variant/60 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-primary text-headline-sm">
                          #{order.id}
                        </span>
                        <span className="text-body-sm text-outline">
                          • {new Date(order.created_at).toLocaleString("bn-BD")}
                        </span>
                      </div>
                      <div className="text-body-md text-on-surface mt-0.5">
                        <span className="font-bold">{order.customer?.name}</span> (
                        <a
                          href={`tel:${order.customer?.phone}`}
                          className="text-secondary font-medium underline"
                        >
                          {order.customer?.phone}
                        </a>
                        )
                      </div>
                      <p className="text-body-sm text-on-surface-variant">
                        ঠিকানা: {order.customer?.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-headline-sm font-bold text-primary">
                          ৳ {order.total_amount}
                        </div>
                        <span className="text-[11px] text-secondary font-medium">ক্যাশ অন ডেলিভারি</span>
                      </div>

                      {/* Status Selector */}
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleUpdateOrderStatus(
                            order.id,
                            e.target.value as Order["status"]
                          )
                        }
                        className={`rounded-xl py-1.5 px-3 text-label-md font-bold border ${
                          order.status === "delivered"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : order.status === "confirmed"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                        }`}
                      >
                        <option value="pending">অপেক্ষমাণ (Pending)</option>
                        <option value="confirmed">নিশ্চিত (Confirmed)</option>
                        <option value="delivered">ডেলিভারি সম্পন্ন (Delivered)</option>
                        <option value="cancelled">বাতিল (Cancelled)</option>
                      </select>
                    </div>
                  </div>

                  {/* Itemized Order Details */}
                  <div className="bg-surface-container-low rounded-xl p-3">
                    <span className="text-label-sm font-bold text-on-surface-variant block mb-2">
                      অর্ডারকৃত ফলের তালিকা:
                    </span>
                    <div className="space-y-1.5">
                      {order.order_items?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-body-sm text-on-surface"
                        >
                          <span>
                            {item.product?.name || "ফল আইটেম"} x {item.quantity}{" "}
                            {item.product?.unit || ""}
                          </span>
                          <span className="font-medium">
                            ৳ {item.price_at_order * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* ================= PRODUCTS TAB ================= */
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-headline-sm font-bold text-primary">ফল ও পণ্য সম্ভার</h2>
              <button
                onClick={openAddModal}
                className="bg-primary hover:bg-primary-container text-surface-container-lowest px-4 py-2.5 rounded-xl font-label-lg font-bold flex items-center gap-2 shadow"
              >
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
                <span>নতুন ফল যোগ করুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 flex flex-col justify-between shadow-sm"
                >
                  <div className="flex gap-3 mb-3">
                    <div className="w-20 h-20 rounded-xl bg-surface-container overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        alt={prod.name}
                        src={prod.image_url}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-headline-sm line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-secondary font-bold text-label-md mt-0.5">
                        ৳ {prod.price} / {prod.unit}
                      </p>
                      <p className="text-[12px] text-on-surface-variant">স্টক: {prod.stock}</p>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-1 ${
                          prod.is_active
                            ? "bg-secondary-container text-on-secondary-container"
                            : "bg-error-container text-on-error-container"
                        }`}
                      >
                        {prod.is_active ? "সক্রিয় (Active)" : "নিষ্ক্রিয় (Inactive)"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/60">
                    <button
                      onClick={() => openEditModal(prod)}
                      className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-primary font-medium text-body-sm flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">edit</span>
                      <span>এডিট</span>
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-medium text-body-sm flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      <span>মুছুন</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-outline-variant">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-outline-variant">
              <h3 className="text-headline-sm font-bold text-primary">
                {editingProduct ? "ফল আপডেট করুন" : "নতুন ফল যুক্ত করুন"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-outline hover:text-primary"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-label-md font-bold mb-1 text-on-surface">
                  ফলের নাম
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2 px-3 text-body-md"
                  placeholder="যেমন: রাজশাহীর প্রিমিয়াম হিমসাগর আম"
                  value={productForm.name}
                  onChange={(e) =>
                    setProductForm({ ...productForm, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-bold mb-1 text-on-surface">
                    মূল্য (টাকা)
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2 px-3 text-body-md"
                    placeholder="180"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-label-md font-bold mb-1 text-on-surface">
                    একক (Unit)
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2 px-3 text-body-md"
                    placeholder="প্রতি কেজি / ১০০ পিস"
                    value={productForm.unit}
                    onChange={(e) =>
                      setProductForm({ ...productForm, unit: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-label-md font-bold mb-1 text-on-surface">
                    স্টক পরিমাণ
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2 px-3 text-body-md"
                    placeholder="50"
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-label-md font-bold">
                    <input
                      type="checkbox"
                      className="rounded text-primary focus:ring-primary w-5 h-5"
                      checked={productForm.is_active}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          is_active: e.target.checked,
                        })
                      }
                    />
                    <span>সক্রিয় রাখুন (Active)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-label-md font-bold mb-1 text-on-surface">
                  ছবির URL
                </label>
                <input
                  type="url"
                  className="w-full bg-surface-container-low border border-outline-variant rounded-xl py-2 px-3 text-body-md"
                  placeholder="https://..."
                  value={productForm.image_url}
                  onChange={(e) =>
                    setProductForm({ ...productForm, image_url: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-outline-variant font-medium text-body-md"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-surface-container-lowest font-bold text-body-md hover:bg-primary-container"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
