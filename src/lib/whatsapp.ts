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

/**
 * Normalizes phone number:
 * - Converts Bengali numerals (০-৯) to English digits (0-9)
 * - Removes spaces, dashes, parentheses
 * - Handles country code +880 or leading 0 to ensure standard 11-digit format (01XXXXXXXXX)
 */
export function sanitizePhone(input: string): string {
  if (!input) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  let str = input.trim();
  bengaliDigits.forEach((d, idx) => {
    str = str.split(d).join(String(idx));
  });
  // Strip all non-digits
  let digits = str.replace(/\D/g, "");
  // If starts with 880 (e.g. 8801862092701), remove 88 -> 01862092701
  if (digits.startsWith("880") && digits.length === 13) {
    digits = digits.slice(2);
  }
  // If user typed 10 digits starting with 1 (e.g. 1862092701), add leading 0
  if (digits.startsWith("1") && digits.length === 10) {
    digits = `0${digits}`;
  }
  return digits;
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

  const formattedPhone = sanitizePhone(phone);

  const itemList = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.product.name}\n   পরিমাণ: ${item.quantity} ${item.product.unit} (৳${item.product.price} x ${item.quantity} = ৳${item.product.price * item.quantity})`
    )
    .join("\n");

  const message = `*নতুন অর্ডার - মায়ের দোয়া ফল* 🍇🍎
--------------------------------
${orderId ? `🔖 *অর্ডার আইডি:* #${orderId}\n` : ""}📅 *তারিখ:* ${dateStr}
👤 *ক্রেতার নাম:* ${name.trim()}
📱 *মোবাইল নম্বর:* ${formattedPhone || phone}
📍 *ডেলিভারি ঠিকানা:* ${address.trim()}
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
