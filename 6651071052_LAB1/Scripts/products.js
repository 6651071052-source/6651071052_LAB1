// Dat anh san pham trong Images, dung ten theo id ben duoi va duoi .jpg.
window.SAFEKID_PRODUCTS = [
  { id: "kit-family", name: "Túi sơ cứu gia đình", category: "family", price: 289000, age: "Mọi lứa tuổi", condition: "Chảy máu, bỏng nhẹ", emoji: "🧰", description: "Bộ dụng cụ cơ bản cho gia đình, gồm băng gạc, gạc vô khuẩn và kéo y tế." },
  { id: "kit-kids", name: "Bộ sơ cứu trẻ em", category: "kids", price: 359000, age: "1-12 tuổi", condition: "Va chạm, trầy xước", emoji: "🧸", description: "Túi sơ cứu gọn nhẹ với vật tư phù hợp cho trẻ em." },
  { id: "gauze-sterile", name: "Gạc vô khuẩn 10 miếng", category: "bandage", price: 39000, age: "Mọi lứa tuổi", condition: "Vết thương nhỏ", emoji: "🩹", description: "Gạc đóng gói riêng, dùng che phủ vết thương sau khi làm sạch." },
  { id: "bandage-roll", name: "Băng cuộn co giãn", category: "bandage", price: 45000, age: "Mọi lứa tuổi", condition: "Băng cố định", emoji: "🩹", description: "Băng cuộn co giãn hỗ trợ cố định gạc; không quấn quá chặt." },
  { id: "thermometer", name: "Nhiệt kế điện tử", category: "monitor", price: 129000, age: "Mọi lứa tuổi", condition: "Theo dõi thân nhiệt", emoji: "🌡️", description: "Nhiệt kế điện tử dùng tại nhà. Đọc kỹ hướng dẫn của nhà sản xuất." },
  { id: "pulse-oximeter", name: "Máy đo SpO₂ đầu ngón tay", category: "monitor", price: 299000, age: "Người lớn", condition: "Theo dõi chỉ số", emoji: "🩺", description: "Thiết bị theo dõi tại nhà, không thay thế đánh giá của nhân viên y tế." },
  { id: "tourniquet", name: "Dây garo y tế", category: "bleeding", price: 59000, age: "Người lớn", condition: "Chảy máu nặng", emoji: "🟥", description: "Chỉ sử dụng khi đã được hướng dẫn và trong tình huống chảy máu đe dọa tính mạng." },
  { id: "car-kit", name: "Túi sơ cứu ô tô", category: "car", price: 319000, age: "Mọi lứa tuổi", condition: "Sự cố khi di chuyển", emoji: "🚗", description: "Túi gọn để lưu trữ vật tư sơ cứu cơ bản trên xe." },
  { id: "antiseptic", name: "Dung dịch sát khuẩn vết thương", category: "antiseptic", price: 49000, age: "Theo nhãn sản phẩm", condition: "Vệ sinh vết thương", emoji: "🧴", description: "Sử dụng đúng nhãn và hướng dẫn chuyên môn; tránh để sản phẩm tiếp xúc mắt." },
  { id: "splint", name: "Nẹp cố định đa năng", category: "support", price: 145000, age: "Mọi lứa tuổi", condition: "Chấn thương chi", emoji: "🦴", description: "Nẹp hỗ trợ hạn chế cử động khi nghi ngờ chấn thương; cần đánh giá y tế." },
  { id: "cold-pack", name: "Túi chườm lạnh tức thì", category: "support", price: 35000, age: "Theo nhãn sản phẩm", condition: "Va đập nhẹ", emoji: "🧊", description: "Bọc khăn trước khi chườm, không đặt trực tiếp lên da." },
  { id: "medical-scissors", name: "Kéo y tế đầu tù", category: "family", price: 65000, age: "Người lớn sử dụng", condition: "Cắt băng gạc", emoji: "✂️", description: "Kéo đầu tù hỗ trợ cắt băng; để xa tầm tay trẻ nhỏ." },
  { id: "medical-tape", name: "Băng keo y tế giấy", category: "bandage", price: 28000, age: "Mọi lứa tuổi", condition: "Cố định gạc", emoji: "🩹", description: "Băng keo giấy dùng cố định gạc trên vùng da sạch, khô." },
  { id: "gloves", name: "Găng tay nitrile 10 đôi", category: "family", price: 55000, age: "Người lớn sử dụng", condition: "Sơ cứu an toàn", emoji: "🧤", description: "Găng tay dùng một lần, chọn kích cỡ phù hợp và bỏ đúng cách sau sử dụng." },
  { id: "face-mask", name: "Khẩu trang y tế 10 chiếc", category: "family", price: 25000, age: "Theo hướng dẫn", condition: "Phòng hộ cá nhân", emoji: "😷", description: "Khẩu trang dùng một lần; thay mới khi ẩm, bẩn hoặc hỏng." },
  { id: "eye-wash", name: "Nước muối sinh lý 0,9%", category: "antiseptic", price: 18000, age: "Theo nhãn sản phẩm", condition: "Rửa mắt, làm sạch", emoji: "💧", description: "Chỉ dùng sản phẩm còn hạn và đúng mục đích ghi trên bao bì." },
  { id: "burn-dressing", name: "Gạc phủ vết bỏng", category: "bandage", price: 79000, age: "Mọi lứa tuổi", condition: "Bỏng", emoji: "🩹", description: "Gạc phủ vết bỏng sau khi làm mát; không dùng thay cho sơ cứu và khám bệnh." },
  { id: "first-aid-book", name: "Sổ tay sơ cứu gia đình", category: "kids", price: 69000, age: "Người chăm sóc", condition: "Tra cứu tình huống", emoji: "📘", description: "Sổ tay nhắc các bước sơ cứu cơ bản và dấu hiệu cần gọi cấp cứu." },
  { id: "digital-scale", name: "Cân hành lý mini", category: "monitor", price: 89000, age: "Mọi lứa tuổi", condition: "Theo dõi vật dụng", emoji: "⚖️", description: "Dụng cụ gia đình đa năng; không dùng để chẩn đoán bệnh." },
  { id: "emergency-blanket", name: "Chăn giữ nhiệt cấp cứu", category: "car", price: 49000, age: "Mọi lứa tuổi", condition: "Giữ ấm khi chờ trợ giúp", emoji: "🟨", description: "Chăn giữ nhiệt dùng trong bộ dụng cụ khẩn cấp; giữ đường thở thông thoáng." },
  { id: "splint-finger", name: "Nẹp ngón tay", category: "support", price: 39000, age: "Theo kích thước", condition: "Chấn thương ngón", emoji: "🦴", description: "Nẹp hỗ trợ tạm thời; không tự nắn chỉnh vùng nghi gãy xương." },
  { id: "bandage-triangle", name: "Băng tam giác", category: "support", price: 32000, age: "Mọi lứa tuổi", condition: "Đỡ tay, cố định", emoji: "🔺", description: "Băng tam giác đa năng hỗ trợ treo tay khi được hướng dẫn." },
  { id: "instant-cold", name: "Gạc lạnh cho trẻ em", category: "kids", price: 42000, age: "Theo nhãn sản phẩm", condition: "Va chạm nhẹ", emoji: "❄️", description: "Dùng ngoài da theo chỉ dẫn, có lớp vải ngăn cách và giám sát trẻ." },
  { id: "kit-travel", name: "Túi sơ cứu du lịch", category: "car", price: 199000, age: "Mọi lứa tuổi", condition: "Sơ cứu khi đi xa", emoji: "🎒", description: "Túi nhỏ gọn để sắp xếp vật tư cơ bản khi đi xa." }
].map(function (product) {
  product.image = "Images/" + product.id + ".jpg";
  return product;
});
