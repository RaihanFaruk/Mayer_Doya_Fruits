import { CartItem } from "@/types";

export const WHATSAPP_PHONE = "8801862092701";

export interface OrderMessageParams {
  orderId?: string;
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  totalAmount: number;
}

export function buildWhatsAppMessage({
  orderId,
  name,
  phone,
  address,
  items,
  totalAmount,
}: OrderMessageParams): string {
  const dateStr = new Date().toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const itemList = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name}\n   পরিমাণ: ${item.quantity} ${item.product.unit} (৳${item.product.price} x ${item.quantity} = ৳${item.product.price * item.quantity})`
    )
    .join("\n");

  const message = `*নতুন অর্ডার - মায়ের দোয়া ফল* 🍇🍎
--------------------------------
${orderId ? `🔖 *অর্ডার আইডি:* #${orderId}\n` : ""}📅 *তারিখ:* ${dateStr}
👤 *ক্রেতার নাম:* ${name}
📱 *মোবাইল নম্বর:* ${phone}
📍 *ডেলিভারি ঠিকানা:* ${address}
--------------------------------
📦 *ফলের তালিকা:*
${itemList}
--------------------------------
💰 *সর্বমোট প্রদেয়:* ৳ ${totalAmount}
🚚 *পেমেন্ট পদ্ধতি:* ক্যাশ অন ডেলিভারি (Cash on Delivery)
--------------------------------
দয়া করে আমার অর্ডারটি দ্রুত নিশ্চিত করুন। ধন্যবাদ!`;

  return message;
}

export function getWhatsAppUrl(params: OrderMessageParams): string {
  const message = buildWhatsAppMessage(params);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
