/* Chuc nang giao dien, tim kiem va gio hang dung chung cho cac trang. */
(function () {
  "use strict";

  const products = window.SAFEKID_PRODUCTS || [];
  const guides = window.SAFEKID_GUIDES || [];
  const hospitals = window.SAFEKID_HOSPITALS || [];
  const categoryNames = {
    all: "Tất cả danh mục", family: "Bộ sơ cứu gia đình", kids: "Bộ sơ cứu trẻ em",
    bandage: "Băng gạc y tế", monitor: "Nhiệt kế & máy đo", bleeding: "Dụng cụ cầm máu",
    car: "Sơ cứu xe hơi", antiseptic: "Thuốc sát khuẩn", support: "Dụng cụ cố định"
  };

  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error("Không thể đọc dữ liệu " + key + " trong localStorage.", error);
      return fallback;
    }
  }

  function renderCampaign() {
    const form = document.querySelector("[data-provider-form]");
    const list = document.querySelector("[data-provider-drafts]");
    if (!form || !list) return;

    function renderDrafts() {
      const entries = readStorage("safekid-provider-applications", []);
      if (!entries.length) {
        list.innerHTML = '<div class="empty-state"><p>Chưa có bản đăng ký nào được lưu trên thiết bị này.</p></div>';
        return;
      }
      list.innerHTML = entries.map(function (entry) {
        return '<article class="provider-draft"><div><span class="status-pending">Chờ xác minh · Chỉ lưu trên thiết bị này</span><h3>' + escapeHTML(entry.organization) + '</h3><p>' + escapeHTML(entry.district) + ', TP. Hồ Chí Minh · ' + escapeHTML(entry.phone) + '</p><small>Đăng ký ngày ' + escapeHTML(entry.createdAt) + '</small></div><button class="button button-outline" data-action="remove-provider-draft" data-id="' + escapeHTML(entry.id) + '">Xóa bản nháp</button></article>';
      }).join("");
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const entry = {
        id: "SKP-" + Date.now().toString(36).toUpperCase(),
        organization: String(data.get("organization") || "").trim(),
        contactName: String(data.get("contactName") || "").trim(),
        role: String(data.get("role") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        district: String(data.get("district") || "").trim(),
        availability: String(data.get("availability") || "").trim(),
        createdAt: new Intl.DateTimeFormat("vi-VN").format(new Date()),
        status: "pending-local"
      };
      const entries = readStorage("safekid-provider-applications", []);
      entries.unshift(entry);
      try {
        localStorage.setItem("safekid-provider-applications", JSON.stringify(entries));
      } catch (error) {
        console.error("Không thể lưu bản đăng ký trên thiết bị.", error);
        toast("Không lưu được bản đăng ký. Hãy kiểm tra dung lượng trình duyệt.");
        return;
      }
      form.reset();
      renderDrafts();
      const notice = document.querySelector("[data-provider-notice]");
      if (notice) {
        notice.hidden = false;
        notice.textContent = "Đã lưu bản đăng ký " + entry.id + " trên thiết bị hiện tại. Thông tin CHƯA được gửi, xác minh hoặc hiển thị cho người gặp nạn.";
      }
    });
    renderDrafts();
  }

  let cart = readStorage("safekid-cart", []);
  let favorites = readStorage("safekid-favorites", []);
  let comparison = readStorage("safekid-comparison", []);
  let discountApplied = Boolean(readStorage("safekid-discount", false));

  function saveCart() {
    localStorage.setItem("safekid-cart", JSON.stringify(cart));
    updateCartSummary();
  }

  function money(amount) {
    return new Intl.NumberFormat("vi-VN").format(amount) + "đ";
  }

  function escapeHTML(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function productById(id) {
    return products.find(function (item) { return item.id === id; });
  }

  function getCartLines() {
    return cart.map(function (line) {
      const product = productById(line.id);
      return product ? { product: product, quantity: Math.max(1, Number(line.quantity) || 1) } : null;
    }).filter(Boolean);
  }

  function cartCount() {
    return getCartLines().reduce(function (sum, line) { return sum + line.quantity; }, 0);
  }

  function cartSubtotal() {
    return getCartLines().reduce(function (sum, line) { return sum + line.product.price * line.quantity; }, 0);
  }

  function updateCartSummary() {
    const count = cartCount();
    document.querySelectorAll("[data-cart-count]").forEach(function (node) { node.textContent = count; });
    document.querySelectorAll("[data-cart-total]").forEach(function (node) { node.textContent = money(cartSubtotal()); });
    document.querySelectorAll("[data-favorite-count]").forEach(function (node) { node.textContent = favorites.length; });
  }

  function toast(message) {
    let node = document.querySelector(".toast-message");
    if (!node) {
      node = document.createElement("div");
      node.className = "toast-message";
      node.setAttribute("role", "status");
      document.body.appendChild(node);
    }
    node.textContent = message;
    node.classList.add("is-visible");
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(function () { node.classList.remove("is-visible"); }, 2600);
  }

  function addToCart(id, quantity) {
    const product = productById(id);
    if (!product) {
      toast("Không tìm thấy sản phẩm.");
      return;
    }
    const amount = Math.max(1, Math.min(99, Number(quantity) || 1));
    const existing = cart.find(function (line) { return line.id === id; });
    if (existing) existing.quantity = Math.min(99, existing.quantity + amount);
    else cart.push({ id: id, quantity: amount });
    saveCart();
    toast("Đã thêm " + product.name + " vào giỏ hàng.");
  }

  function toggleFavorite(id) {
    favorites = favorites.includes(id) ? favorites.filter(function (item) { return item !== id; }) : favorites.concat(id);
    localStorage.setItem("safekid-favorites", JSON.stringify(favorites));
    updateCartSummary();
    renderProductCardsOnPage();
    toast(favorites.includes(id) ? "Đã thêm vào yêu thích." : "Đã bỏ khỏi yêu thích.");
  }

  function productCard(product) {
    const isFavorite = favorites.includes(product.id);
    return '<article class="product-card">' +
      '<a class="product-image" href="shop-details.html?id=' + encodeURIComponent(product.id) + '" aria-label="Xem ' + escapeHTML(product.name) + '">' +
      '<img src="' + escapeHTML(product.image || "Images/placeholder.svg") + '" alt="' + escapeHTML(product.name) + '" onerror="this.onerror=null;this.src=\'Images/placeholder.svg\'"><span class="product-badge">SafeKid</span></a>' +
      '<div class="product-actions">' +
      '<button class="icon-action ' + (isFavorite ? "is-favorite" : "") + '" data-action="favorite" data-id="' + escapeHTML(product.id) + '" aria-label="Yêu thích">♥</button>' +
      '<button class="icon-action ' + (comparison.includes(product.id) ? "is-favorite" : "") + '" data-action="compare" data-id="' + escapeHTML(product.id) + '" aria-label="So sánh">⇄</button>' +
      '<button class="icon-action" data-action="add" data-id="' + escapeHTML(product.id) + '" aria-label="Thêm vào giỏ">＋</button></div>' +
      '<div class="product-info"><p class="product-category">' + escapeHTML(categoryNames[product.category] || "Vật tư y tế") + '</p>' +
      '<h3><a href="shop-details.html?id=' + encodeURIComponent(product.id) + '">' + escapeHTML(product.name) + '</a></h3>' +
      '<p class="product-meta">' + escapeHTML(product.age) + '</p><strong>' + money(product.price) + '</strong></div></article>';
  }

  function renderProductCardsOnPage() {
    document.querySelectorAll("[data-product-grid]").forEach(function (grid) {
      const items = (grid.dataset.ids ? grid.dataset.ids.split(",").map(productById).filter(Boolean) : products);
      grid.innerHTML = items.map(productCard).join("");
    });
  }

  function renderGuideCard(guide) {
    return '<article class="guide-card"><a class="guide-image" href="blog-details.html?id=' + encodeURIComponent(guide.id) + '">' +
      '<img src="Images/placeholder.svg" alt=""><span class="guide-emoji" aria-hidden="true">' + guide.emoji + '</span></a>' +
      '<div class="guide-info"><p class="guide-meta">' + escapeHTML(guide.category) + ' <span>•</span> ' + escapeHTML(guide.date) + ' · ' + escapeHTML(guide.comments) + ' bình luận</p>' +
      '<h3><a href="blog-details.html?id=' + encodeURIComponent(guide.id) + '">' + escapeHTML(guide.title) + '</a></h3>' +
      '<p>' + escapeHTML(guide.summary) + '</p><a class="text-link" href="blog-details.html?id=' + encodeURIComponent(guide.id) + '">Xem hướng dẫn <span>→</span></a></div></article>';
  }

  function renderHeader() {
    const target = document.querySelector("#siteHeader");
    if (!target) return;
    const page = document.body.dataset.page || "";
    target.innerHTML = '<div class="topbar"><div class="container topbar-inner">' +
      '<div class="topbar-contact"><a href="mailto:hello@safekid.vn">✉ hello@safekid.vn</a><span>Miễn phí giao hàng cho đơn từ 500.000đ</span></div>' +
      '<div class="topbar-right"><a class="emergency-shortcut" href="emergency.html">Cấp cứu: 115</a><label class="language-switch">Ngôn ngữ ' +
      '<select data-language aria-label="Chọn ngôn ngữ"><option value="vi">Tiếng Việt</option><option value="en">English</option></select></label><a href="contact.html">Hỗ trợ</a><a href="#login" data-action="login">Đăng nhập</a></div></div></div>' +
      '<div class="container header-main"><a class="brand" href="index.html" aria-label="SafeKid trang chủ"><span class="brand-mark">+</span><span>Safe<span>Kid</span><small>SƠ CỨU AN TOÀN</small></span></a>' +
      '<button class="menu-toggle" data-menu-toggle aria-expanded="false" aria-label="Mở menu">☰</button>' +
      '<nav class="main-nav" data-menu><a class="' + (page === "home" ? "active" : "") + '" href="index.html">Trang chủ</a>' +
      '<a class="' + (page === "shop" || page === "details" ? "active" : "") + '" href="shop-grid.html">Cửa hàng</a>' +
      '<div class="nav-dropdown"><a href="shop-grid.html">Trang <span>⌄</span></a><div class="dropdown-menu">' +
      '<a href="shop-details.html">Chi tiết sản phẩm</a><a href="shoping-cart.html">Giỏ hàng</a><a href="checkout.html">Thanh toán</a><a href="blog-details.html?id=burn">Chi tiết hướng dẫn</a><a href="emergency.html">Cấp cứu</a></div></div>' +
      '<a class="' + (page === "campaign" ? "active" : "") + '" href="campaign.html">Tham gia mạng lưới</a>' +
      '<a class="' + (page === "blog" || page === "guide" ? "active" : "") + '" href="blog.html">Hướng dẫn sơ cứu</a>' +
      '<a class="' + (page === "contact" ? "active" : "") + '" href="contact.html">Liên hệ</a><a href="#login" data-action="login">Đăng nhập</a></nav>' +
      '<div class="header-actions"><a class="header-favorite" href="shop-grid.html" aria-label="Sản phẩm yêu thích">♡ <span data-favorite-count>0</span></a>' +
      '<a class="header-cart" href="shoping-cart.html" aria-label="Giỏ hàng">▣ <span class="cart-count" data-cart-count>0</span><span class="cart-total" data-cart-total>0đ</span></a></div></div>' +
      '<div class="container search-strip"><form class="site-search" action="shop-grid.html"><label class="search-category"><span>Tất cả danh mục</span><select name="category" aria-label="Chọn danh mục">' +
      Object.keys(categoryNames).filter(function (key) { return key !== "all"; }).map(function (key) { return '<option value="' + key + '">' + escapeHTML(categoryNames[key]) + '</option>'; }).join("") +
      '</select></label><input type="search" name="search" placeholder="Bạn đang tìm gì?" aria-label="Tìm sản phẩm"><button type="submit">TÌM KIẾM</button></form>' +
      '<div class="support-call"><span class="support-icon">☎</span><div><strong>115</strong><small>Hỗ trợ khẩn cấp 24/7</small></div></div></div>';
    const language = readStorage("safekid-language", "vi");
    const selector = target.querySelector("[data-language]");
    if (selector) selector.value = language;
  }

  function renderFooter() {
    const target = document.querySelector("#siteFooter");
    if (!target) return;
    target.innerHTML = '<footer class="site-footer"><div class="container footer-grid"><div class="footer-about"><a class="brand" href="index.html"><span class="brand-mark">+</span><span>Safe<span>Kid</span><small>SƠ CỨU AN TOÀN</small></span></a>' +
      '<p>Vật tư sơ cứu gia đình và kiến thức sơ cứu dễ tra cứu, dễ thực hành.</p><p>✉ hello@safekid.vn<br>☎ 115 khi cần cấp cứu</p><div class="social-links"><a href="#facebook" aria-label="Facebook">f</a><a href="#instagram" aria-label="Instagram">◎</a><a href="#youtube" aria-label="YouTube">▶</a></div></div>' +
      '<div><h3>Liên kết hữu ích</h3><a href="shop-grid.html">Cửa hàng</a><a href="blog.html">Hướng dẫn sơ cứu</a><a href="emergency.html">Tìm bệnh viện</a><a href="campaign.html">Đăng ký cơ sở y tế</a><a href="contact.html">Liên hệ</a></div>' +
      '<div><h3>Hỗ trợ khách hàng</h3><a href="shoping-cart.html">Giỏ hàng</a><a href="checkout.html">Thanh toán</a><a href="blog.html">Kiến thức an toàn</a><a href="contact.html">Gửi câu hỏi</a></div>' +
      '<div class="newsletter"><h3>Nhận tin hữu ích</h3><p>Mẹo sơ cứu và thông tin sản phẩm mới.</p><form data-newsletter><label class="sr-only" for="newsletter-email">Email</label><input id="newsletter-email" type="email" placeholder="Email của bạn" required><button type="submit">Đăng ký</button></form><small>Thông tin chỉ dùng cho bản demo.</small></div></div>' +
      '<div class="footer-bottom"><div class="container"><span>© 2026 SafeKid · Bản demo thực hành HTML, CSS và JavaScript.</span><span>Visa · Mastercard · COD</span></div></div></footer>';
  }

  function renderShop() {
    const grid = document.querySelector("[data-shop-results]");
    if (!grid) return;
    const params = new URLSearchParams(window.location.search);
    const search = (params.get("search") || "").trim().toLocaleLowerCase("vi");
    const selectedCategory = params.get("category") || "all";
    const categorySelect = document.querySelector("[data-filter-category]");
    if (categorySelect && categoryNames[selectedCategory]) categorySelect.value = selectedCategory;
    const minInput = document.querySelector("#minPrice");
    const maxInput = document.querySelector("#maxPrice");
    const ageInput = document.querySelector("[data-filter-age]");
    const sortInput = document.querySelector("[data-sort]");
    const resultsLabel = document.querySelector("[data-results-label]");

    function update() {
      const category = categorySelect ? categorySelect.value : selectedCategory;
      const min = minInput ? Number(minInput.value) : 0;
      const max = maxInput ? Number(maxInput.value) : Infinity;
      const age = ageInput ? ageInput.value : "";
      let filtered = products.filter(function (product) {
        const matchesSearch = !search || (product.name + " " + product.description + " " + product.condition).toLocaleLowerCase("vi").includes(search);
        const matchesCategory = category === "all" || product.category === category;
        const matchesPrice = product.price >= min && product.price <= max;
        const matchesAge = !age || product.age.includes(age) || product.age === "Mọi lứa tuổi";
        return matchesSearch && matchesCategory && matchesPrice && matchesAge;
      });
      if (sortInput && sortInput.value === "price-low") filtered.sort(function (a, b) { return a.price - b.price; });
      if (sortInput && sortInput.value === "price-high") filtered.sort(function (a, b) { return b.price - a.price; });
      if (sortInput && sortInput.value === "name") filtered.sort(function (a, b) { return a.name.localeCompare(b.name, "vi"); });
      grid.innerHTML = filtered.length ? filtered.map(productCard).join("") : '<div class="empty-state">Không tìm thấy sản phẩm phù hợp. Hãy thử bộ lọc khác.</div>';
      if (resultsLabel) resultsLabel.textContent = "Hiển thị " + filtered.length + " sản phẩm";
      if (minInput) document.querySelector("[data-min-label]").textContent = money(min);
      if (maxInput) document.querySelector("[data-max-label]").textContent = money(max);
    }

    [categorySelect, minInput, maxInput, ageInput, sortInput].filter(Boolean).forEach(function (input) { input.addEventListener("input", update); });
    document.querySelectorAll("[data-category-link]").forEach(function (link) {
      link.addEventListener("click", function () {
        if (categorySelect) categorySelect.value = link.dataset.categoryLink;
        update();
      });
    });
    update();
  }

  function renderDetails() {
    const target = document.querySelector("[data-product-details]");
    if (!target) return;
    const params = new URLSearchParams(window.location.search);
    const product = productById(params.get("id")) || products[0];
    target.innerHTML = '<div class="detail-photo"><img src="' + escapeHTML(product.image || "Images/placeholder.svg") + '" alt="' + escapeHTML(product.name) + '" onerror="this.onerror=null;this.src=\'Images/placeholder.svg\'"><div class="detail-thumbs"><img src="' + escapeHTML(product.image || "Images/placeholder.svg") + '" alt="Ảnh sản phẩm" onerror="this.onerror=null;this.src=\'Images/placeholder.svg\'"><img src="' + escapeHTML(product.image || "Images/placeholder.svg") + '" alt="Ảnh đóng gói" onerror="this.onerror=null;this.src=\'Images/placeholder.svg\'"></div></div>' +
      '<div class="detail-copy"><p class="eyebrow">' + escapeHTML(categoryNames[product.category]) + '</p><h1>' + escapeHTML(product.name) + '</h1><p class="rating">★★★★★ <span>(Đánh giá sản phẩm)</span></p>' +
      '<p class="detail-price">' + money(product.price) + '</p><p>' + escapeHTML(product.description) + '</p><ul class="check-list"><li>Độ tuổi phù hợp: ' + escapeHTML(product.age) + '</li><li>Tình huống: ' + escapeHTML(product.condition) + '</li><li>Giao hàng: dự kiến 2–5 ngày làm việc</li></ul>' +
      '<div class="buy-row"><label>Số lượng <input data-quantity type="number" min="1" max="99" value="1"></label><button class="button button-primary" data-action="add-detail" data-id="' + escapeHTML(product.id) + '">THÊM VÀO GIỎ</button><button class="button button-outline" data-action="favorite" data-id="' + escapeHTML(product.id) + '">♡</button></div>' +
      '<div class="detail-facts"><p><strong>Tình trạng:</strong> Còn hàng (demo)</p><p><strong>Đổi trả:</strong> Theo chính sách cửa hàng</p><p><strong>Trọng lượng:</strong> Tham khảo bao bì</p><p><strong>Chia sẻ:</strong> <a href="#facebook">Facebook</a> · <a href="#zalo">Zalo</a></p></div></div>';
    document.querySelector("[data-related-products]").dataset.ids = products.filter(function (item) { return item.id !== product.id && item.category === product.category; }).slice(0, 4).map(function (item) { return item.id; }).join(",");
    renderProductCardsOnPage();
  }

  function renderCart() {
    const target = document.querySelector("[data-cart-content]");
    if (!target) return;
    const lines = getCartLines();
    if (!lines.length) {
      target.innerHTML = '<div class="empty-state"><span>🛒</span><h2>Giỏ hàng đang trống</h2><p>Chọn vật tư phù hợp để chuẩn bị cho gia đình.</p><a class="button button-primary" href="shop-grid.html">ĐẾN CỬA HÀNG</a></div>';
      const totals = document.querySelector("[data-cart-totals]");
      if (totals) totals.innerHTML = "";
      return;
    }
    target.innerHTML = '<div class="table-wrap"><table class="cart-table"><thead><tr><th>Sản phẩm</th><th>Đơn giá</th><th>Số lượng</th><th>Tạm tính</th><th></th></tr></thead><tbody>' +
      lines.map(function (line) {
        return '<tr><td class="cart-product"><img src="' + escapeHTML(line.product.image || "Images/placeholder.svg") + '" alt="' + escapeHTML(line.product.name) + '" onerror="this.onerror=null;this.src=\'Images/placeholder.svg\'"><div><a href="shop-details.html?id=' + encodeURIComponent(line.product.id) + '">' + escapeHTML(line.product.name) + '</a><small>' + escapeHTML(line.product.age) + '</small></div></td><td>' + money(line.product.price) + '</td>' +
          '<td><input class="quantity-input" type="number" min="1" max="99" value="' + line.quantity + '" data-quantity-for="' + escapeHTML(line.product.id) + '" aria-label="Số lượng ' + escapeHTML(line.product.name) + '"></td><td>' + money(line.product.price * line.quantity) + '</td><td><button class="remove-item" data-action="remove" data-id="' + escapeHTML(line.product.id) + '" aria-label="Xóa sản phẩm">×</button></td></tr>';
      }).join("") + '</tbody></table></div><div class="cart-toolbar"><a class="text-link" href="shop-grid.html">← Tiếp tục mua sắm</a><button class="button button-outline" data-action="update-cart">CẬP NHẬT GIỎ HÀNG</button></div>';
    renderCartTotals(document.querySelector("[data-cart-totals]"));
  }

  function renderCartTotals(target) {
    if (!target) return;
    const subtotal = cartSubtotal();
    const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
    target.innerHTML = '<h2>Tổng giỏ hàng</h2><div class="coupon-form"><label for="coupon">Mã giảm giá</label><div><input id="coupon" type="text" placeholder="Nhập SAFE10"><button class="button button-outline" data-action="coupon">ÁP DỤNG</button></div><small data-coupon-status>' + (discountApplied ? "Đã áp dụng SAFE10 (-10%)." : "Dùng mã SAFE10 để giảm 10% (demo).") + '</small></div>' +
      '<div class="total-line"><span>Tạm tính</span><strong>' + money(subtotal) + '</strong></div>' +
      (discount ? '<div class="total-line discount-line"><span>Ưu đãi SAFE10</span><strong>−' + money(discount) + '</strong></div>' : "") +
      '<div class="total-line total-final"><span>Tổng cộng</span><strong>' + money(subtotal - discount) + '</strong></div>' +
      '<a class="button button-primary button-block" href="checkout.html">TIẾN HÀNH THANH TOÁN</a><p class="shipping-note">Miễn phí giao hàng cho đơn từ 500.000đ.</p>';
  }

  function renderCheckout() {
    const target = document.querySelector("[data-checkout-order]");
    if (!target) return;
    const lines = getCartLines();
    if (!lines.length) {
      target.innerHTML = '<div class="empty-state"><p>Giỏ hàng của bạn chưa có sản phẩm.</p><a class="button button-primary" href="shop-grid.html">Xem sản phẩm</a></div>';
      const form = document.querySelector("#checkoutForm");
      if (form) form.querySelector("button[type=submit]").disabled = true;
      return;
    }
    const subtotal = cartSubtotal();
    const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
    target.innerHTML = '<h2>Đơn hàng của bạn</h2><div class="order-lines">' +
      lines.map(function (line) { return '<div><span>' + escapeHTML(line.product.name) + ' <b>× ' + line.quantity + '</b></span><strong>' + money(line.product.price * line.quantity) + '</strong></div>'; }).join("") +
      '</div><div class="total-line"><span>Tạm tính</span><strong>' + money(subtotal) + '</strong></div>' +
      (discount ? '<div class="total-line discount-line"><span>Giảm giá SAFE10</span><strong>−' + money(discount) + '</strong></div>' : "") +
      '<div class="total-line total-final"><span>Tổng cộng</span><strong>' + money(subtotal - discount) + '</strong></div>';
    const couponStatus = document.querySelector("[data-coupon-status]");
    if (couponStatus) couponStatus.textContent = discountApplied ? "Đã áp dụng SAFE10 (-10%)." : "Dùng mã SAFE10 để giảm 10% (demo).";
  }

  function renderGuides() {
    const target = document.querySelector("[data-guide-results]");
    if (!target) return;
    const categorySelect = document.querySelector("[data-guide-category]");
    const ageSelect = document.querySelector("[data-guide-age]");
    const searchInput = document.querySelector("[data-guide-search]");
    const params = new URLSearchParams(window.location.search);
    if (params.get("category") && categorySelect) categorySelect.value = params.get("category");
    if (params.get("age") && ageSelect) ageSelect.value = params.get("age");

    function update() {
      const category = categorySelect ? categorySelect.value : "";
      const age = ageSelect ? ageSelect.value : "";
      const query = searchInput ? searchInput.value.trim().toLocaleLowerCase("vi") : "";
      const result = guides.filter(function (guide) {
        return (!category || guide.category === category) && (!age || guide.age.includes(age)) &&
          (!query || (guide.title + " " + guide.summary + " " + guide.category).toLocaleLowerCase("vi").includes(query));
      });
      target.innerHTML = result.length ? result.map(renderGuideCard).join("") : '<div class="empty-state">Chưa có hướng dẫn phù hợp với bộ lọc này.</div>';
    }
    [categorySelect, ageSelect, searchInput].filter(Boolean).forEach(function (input) { input.addEventListener("input", update); });
    update();
  }

  function renderGuideDetails() {
    const target = document.querySelector("[data-guide-details]");
    if (!target) return;
    const params = new URLSearchParams(window.location.search);
    const guide = guides.find(function (item) { return item.id === params.get("id"); }) || guides[0];
    const productsForGuide = guide.productIds.map(productById).filter(Boolean);
    target.innerHTML = '<div class="guide-detail-head"><p class="eyebrow">' + escapeHTML(guide.category) + ' · ' + escapeHTML(guide.minutes) + '</p><h1>' + escapeHTML(guide.title) + '</h1><p>' + escapeHTML(guide.summary) + '</p></div>' +
      '<div class="guide-detail-image"><img src="Images/placeholder.svg" alt="Ảnh minh họa sơ cứu"><span>' + guide.emoji + '</span></div>' +
      '<div class="audio-panel"><div><strong>Nghe hướng dẫn</strong><small>Thêm MP3 vào ' + escapeHTML(guide.audio) + ' hoặc dùng giọng đọc trên thiết bị.</small></div><audio class="guide-audio" controls preload="none" data-guide-audio src="' + escapeHTML(guide.audio) + '">Trình duyệt không hỗ trợ phát âm thanh.</audio><button class="button button-outline" data-action="speak" data-guide-id="' + escapeHTML(guide.id) + '">▶ ĐỌC HƯỚNG DẪN</button><button class="button button-outline" data-action="stop-speech">■ DỪNG</button></div>' +
      '<h2>Các bước sơ cứu</h2><ol class="step-list">' + guide.steps.map(function (step) { return '<li>' + escapeHTML(step) + '</li>'; }).join("") + '</ol>' +
      '<div class="alert-box alert-danger"><h2>Không nên làm</h2><ul>' + guide.dont.map(function (item) { return '<li>' + escapeHTML(item) + '</li>'; }).join("") + '</ul></div>' +
      '<div class="alert-box alert-blue"><h2>Khi nào cần gọi 115 ngay</h2><p>' + escapeHTML(guide.emergency) + '</p><a class="button button-danger" href="tel:115">GỌI 115</a></div>' +
      '<h2>Vật dụng có thể chuẩn bị</h2><div class="product-grid product-grid-small">' + productsForGuide.map(productCard).join("") + '</div>' +
      '<p class="source-note"><strong>Nguồn tham khảo:</strong> ' + escapeHTML(guide.source) + ' <a href="https://moh.gov.vn/" target="_blank" rel="noopener">Bộ Y tế</a> · Hội Chữ thập đỏ Việt Nam. Thông tin chỉ mang tính tham khảo, không thay thế tư vấn y tế.</p>';
    const related = guides.filter(function (item) { return item.id !== guide.id; }).slice(0, 3);
    const audio = target.querySelector("[data-guide-audio]");
    if (audio) audio.addEventListener("error", function () { toast("Chưa có tệp MP3. Bạn có thể dùng nút đọc bằng giọng nói."); });
    const relatedContainer = document.querySelector("[data-related-guides]");
    if (relatedContainer) relatedContainer.innerHTML = related.map(renderGuideCard).join("");
  }

  function renderEmergency() {
    const target = document.querySelector("[data-emergency-results]");
    if (!target) return;
    const locationMessage = document.querySelector("[data-location-message]");
    const manual = document.querySelector("[data-manual-location]");
    const citySelect = document.querySelector("[data-city-select]");
    const districtSelect = document.querySelector("[data-district-select]");
    const status = document.querySelector("[data-gps-status]");
    const cities = Array.from(new Set(hospitals.map(function (item) { return item.city; })));
    if (citySelect) citySelect.innerHTML = '<option value="">Chọn tỉnh/thành</option>' + cities.map(function (city) { return '<option>' + escapeHTML(city) + '</option>'; }).join("");
    if (districtSelect) districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>';
    if (citySelect && cities.includes("TP. Hồ Chí Minh")) citySelect.value = "TP. Hồ Chí Minh";

    function renderList(list, userPosition) {
      const distanceFrom = function (hospital) {
        if (!userPosition) return null;
        const toRad = function (value) { return value * Math.PI / 180; };
        const dLat = toRad(hospital.lat - userPosition.lat);
        const dLng = toRad(hospital.lng - userPosition.lng);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(userPosition.lat)) * Math.cos(toRad(hospital.lat)) *
          Math.sin(dLng / 2) * Math.sin(dLng / 2);
        return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      };
      const isInHoChiMinhCity = userPosition
        ? userPosition.lat >= 10.3 && userPosition.lat <= 11.2 && userPosition.lng >= 106.2 && userPosition.lng <= 107.2
        : Boolean(citySelect && citySelect.value === "TP. Hồ Chí Minh");
      const hospitalsWithPublicPhones = list.filter(function (hospital) { return Boolean(hospital.phone); });
      const candidates = isInHoChiMinhCity && hospitalsWithPublicPhones.length ? hospitalsWithPublicPhones : list;
      const sorted = candidates.map(function (hospital) { return { hospital: hospital, distance: distanceFrom(hospital) }; })
        .sort(function (a, b) {
          if (a.distance == null) return Number(Boolean(b.hospital.phone)) - Number(Boolean(a.hospital.phone));
          return a.distance - b.distance;
        }).slice(0, 3);
      if (!sorted.length) {
        target.innerHTML = '<div class="empty-state">Chưa có bệnh viện trong lựa chọn này. Hãy gọi 115 để được hỗ trợ.</div>';
        return;
      }
      const shareUrl = userPosition ? "https://maps.google.com/?q=" + userPosition.lat + "," + userPosition.lng : "";
      target.innerHTML = sorted.map(function (entry) {
        const hospital = entry.hospital;
        const distanceText = entry.distance == null ? "" : '<span class="hospital-distance">' + entry.distance.toFixed(1) + ' km</span>';
        const call = hospital.phone ? '<a class="button button-primary" href="tel:' + encodeURIComponent(hospital.phone) + '">☎ ' + escapeHTML(hospital.phoneLabel || "Gọi tổng đài") + ': ' + escapeHTML(hospital.phone) + '</a>' :
          '<a class="button button-outline" href="' + escapeHTML(hospital.source || "https://www.google.com/search?q=" + encodeURIComponent(hospital.name + " trang chính thức")) + '" target="_blank" rel="noopener">Xem liên hệ chính thức</a>';
        const otherPhones = (hospital.otherPhones || []).map(function (item) {
          return '<a class="button button-outline" href="tel:' + encodeURIComponent(item.phone) + '">' + escapeHTML(item.label) + ': ' + escapeHTML(item.phone) + '</a>';
        }).join("");
        return '<article class="hospital-card"><div class="hospital-icon">✚</div><div class="hospital-info"><div class="hospital-title"><h3>' + escapeHTML(hospital.name) + '</h3>' + distanceText + '</div>' +
          '<p>' + escapeHTML(hospital.address) + '</p><div class="hospital-actions">' + call + otherPhones +
          '<a class="button button-outline" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination=' + hospital.lat + ',' + hospital.lng + '">Chỉ đường</a>' +
          (shareUrl ? '<a class="button button-soft" href="sms:?body=' + encodeURIComponent("Vị trí của tôi: " + shareUrl) + '">Chia sẻ vị trí</a>' : "") +
          (hospital.source ? '<a class="hospital-source" href="' + escapeHTML(hospital.source) + '" target="_blank" rel="noopener">Nguồn liên hệ ↗</a>' : "") +
          '</div></div></article>';
      }).join("") + (userPosition ? '<div class="share-location-row"><button class="button button-soft" data-action="copy-location">Sao chép tọa độ</button><span data-copy-text>' + userPosition.lat.toFixed(5) + ', ' + userPosition.lng.toFixed(5) + '</span></div>' : "");
      target.dataset.userLat = userPosition ? userPosition.lat : "";
      target.dataset.userLng = userPosition ? userPosition.lng : "";
    }

    function showManual(message) {
      if (status) status.textContent = message;
      if (manual) manual.hidden = false;
      if (locationMessage) locationMessage.textContent = "Chọn khu vực để xem cơ sở trong danh sách mẫu. Khi cần cấp cứu, gọi 115.";
      const city = citySelect ? citySelect.value : "";
      const localHospitals = city ? hospitals.filter(function (hospital) { return hospital.city === city; }) : hospitals;
      if (districtSelect && city) {
        const districts = Array.from(new Set(localHospitals.map(function (hospital) { return hospital.district; })));
        districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>' + districts.map(function (district) { return '<option>' + escapeHTML(district) + '</option>'; }).join("");
        districtSelect.disabled = false;
      }
      renderList(localHospitals, null);
    }

    function requestLocation() {
      if (!navigator.geolocation) {
        showManual("Trình duyệt không hỗ trợ định vị. Bạn có thể chọn khu vực thủ công.");
        return;
      }
      if (status) status.textContent = "Đang xin quyền truy cập vị trí…";
      navigator.geolocation.getCurrentPosition(function (position) {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        if (status) status.textContent = "Đã nhận vị trí gần đúng. Hãy gọi 115 khi cần cấp cứu.";
        if (manual) manual.hidden = true;
        if (locationMessage) {
          locationMessage.textContent = coords.lat >= 10.3 && coords.lat <= 11.2 && coords.lng >= 106.2 && coords.lng <= 107.2
            ? "Gợi ý các cơ sở gần nhất tại TP.HCM có tổng đài công khai đã đối chiếu. Khoảng cách là đường chim bay, không phải thời gian di chuyển."
            : "Danh bạ có số liên hệ đã đối chiếu hiện tập trung tại TP.HCM. Hãy xác nhận cơ sở phù hợp tại nơi bạn đang ở.";
        }
        renderList(hospitals, coords);
      }, function (error) {
        const messages = {
          1: "Bạn đã từ chối quyền định vị. Hãy chọn khu vực thủ công.",
          2: "Không lấy được vị trí thiết bị. Hãy chọn khu vực thủ công.",
          3: "Định vị quá thời gian chờ. Hãy chọn khu vực thủ công."
        };
        showManual(messages[error.code] || "Định vị gặp lỗi. Hãy chọn khu vực thủ công.");
      }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 });
    }

    const locationButton = document.querySelector("[data-request-location]");
    if (locationButton) locationButton.addEventListener("click", requestLocation);
    if (citySelect) citySelect.addEventListener("change", function () {
      const city = citySelect.value;
      const localHospitals = city ? hospitals.filter(function (hospital) { return hospital.city === city; }) : hospitals;
      if (districtSelect) {
        const districts = Array.from(new Set(localHospitals.map(function (hospital) { return hospital.district; })));
        districtSelect.innerHTML = '<option value="">Chọn quận/huyện</option>' + districts.map(function (district) { return '<option>' + escapeHTML(district) + '</option>'; }).join("");
        districtSelect.disabled = !city;
      }
      renderList(localHospitals, null);
    });
    if (districtSelect) districtSelect.addEventListener("change", function () {
      const city = citySelect ? citySelect.value : "";
      const district = districtSelect.value;
      const matches = hospitals.filter(function (hospital) {
        return (!city || hospital.city === city) && (!district || hospital.district === district);
      });
      renderList(matches, null);
    });
    showManual("Chưa dùng GPS. Danh sách dưới đây ưu tiên các tổng đài đã tìm thấy trên website bệnh viện; hãy chọn quận/huyện hoặc chia sẻ vị trí để sắp xếp theo khoảng cách.");
  }

  function updateDiscount(event) {
    event.preventDefault();
    const input = document.querySelector("#coupon");
    const value = input ? input.value.trim().toUpperCase() : "";
    const status = document.querySelector("[data-coupon-status]");
    if (value === "SAFE10") {
      discountApplied = true;
      localStorage.setItem("safekid-discount", "true");
      toast("Đã áp dụng mã SAFE10.");
    } else {
      discountApplied = false;
      localStorage.setItem("safekid-discount", "false");
      if (status) status.textContent = "Mã không hợp lệ. Hãy thử SAFE10.";
      toast("Mã giảm giá không hợp lệ.");
    }
    renderCart();
    renderCheckout();
  }

  function bindGlobalEvents() {
    document.addEventListener("click", function (event) {
      const action = event.target.closest("[data-action]");
      if (!action) return;
      const id = action.dataset.id;
      if (action.dataset.action === "add") addToCart(id, 1);
      if (action.dataset.action === "favorite") toggleFavorite(id);
      if (action.dataset.action === "compare") {
        comparison = comparison.includes(id) ? comparison.filter(function (item) { return item !== id; }) : comparison.concat(id);
        localStorage.setItem("safekid-comparison", JSON.stringify(comparison));
        toast(comparison.includes(id) ? "Đã thêm vào danh sách so sánh." : "Đã bỏ khỏi danh sách so sánh.");
      }
      if (action.dataset.action === "login") {
        event.preventDefault();
        toast("Đăng nhập chưa được tích hợp trong bản demo tĩnh.");
      }
      if (action.dataset.action === "category-scroll") {
        const track = document.querySelector(".category-carousel-track");
        if (track) track.scrollBy({ left: Number(action.dataset.direction) * track.clientWidth * 0.85, behavior: "smooth" });
      }
      if (action.dataset.action === "add-detail") {
        const quantity = document.querySelector("[data-quantity]");
        addToCart(id, quantity ? quantity.value : 1);
      }
      if (action.dataset.action === "remove") {
        cart = cart.filter(function (line) { return line.id !== id; });
        saveCart(); renderCart(); renderCheckout();
      }
      if (action.dataset.action === "remove-provider-draft") {
        const entries = readStorage("safekid-provider-applications", []);
        const remaining = entries.filter(function (entry) { return entry.id !== id; });
        localStorage.setItem("safekid-provider-applications", JSON.stringify(remaining));
        const drafts = document.querySelector("[data-provider-drafts]");
        if (drafts) {
          drafts.innerHTML = remaining.length ? remaining.map(function (entry) {
            return '<article class="provider-draft"><div><span class="status-pending">Chờ xác minh · Chỉ lưu trên thiết bị này</span><h3>' + escapeHTML(entry.organization) + '</h3><p>' + escapeHTML(entry.district) + ', TP. Hồ Chí Minh · ' + escapeHTML(entry.phone) + '</p><small>Đăng ký ngày ' + escapeHTML(entry.createdAt) + '</small></div><button class="button button-outline" data-action="remove-provider-draft" data-id="' + escapeHTML(entry.id) + '">Xóa bản nháp</button></article>';
          }).join("") : '<div class="empty-state"><p>Chưa có bản đăng ký nào được lưu trên thiết bị này.</p></div>';
        }
        toast("Đã xóa bản đăng ký khỏi thiết bị.");
      }
      if (action.dataset.action === "update-cart") {
        document.querySelectorAll("[data-quantity-for]").forEach(function (input) {
          const line = cart.find(function (item) { return item.id === input.dataset.quantityFor; });
          if (line) line.quantity = Math.max(1, Math.min(99, Number(input.value) || 1));
        });
        saveCart(); renderCart(); renderCheckout(); toast("Đã cập nhật giỏ hàng.");
      }
      if (action.dataset.action === "coupon") updateDiscount(event);
      if (action.dataset.action === "copy-location") {
        const grid = document.querySelector("[data-emergency-results]");
        const text = grid.dataset.userLat + ", " + grid.dataset.userLng;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { toast("Đã sao chép tọa độ."); }).catch(function (error) {
            console.error("Không thể sao chép vị trí.", error); toast("Không thể sao chép. Tọa độ: " + text);
          });
        } else toast("Tọa độ: " + text);
      }
      if (action.dataset.action === "stop-speech" && window.speechSynthesis) window.speechSynthesis.cancel();
      if (action.dataset.action === "speak") {
        const guide = guides.find(function (item) { return item.id === action.dataset.guideId; });
        if (!guide || !window.speechSynthesis) { toast("Thiết bị chưa hỗ trợ đọc hướng dẫn."); return; }
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(guide.title + ". " + guide.steps.join(". "));
        utterance.lang = "vi-VN";
        window.speechSynthesis.speak(utterance);
      }
      if (action.dataset.action === "home-filter") {
        document.querySelectorAll("[data-action=home-filter]").forEach(function (item) { item.classList.remove("active"); });
        action.classList.add("active");
        const grid = document.querySelector("[data-home-products]");
        if (grid) {
          const category = action.dataset.category;
          const filtered = category === "all" ? products.slice(0, 8) : products.filter(function (item) { return item.category === category; }).slice(0, 8);
          grid.innerHTML = filtered.map(productCard).join("");
        }
      }
    });

    const menuToggle = document.querySelector("[data-menu-toggle]");
    if (menuToggle) menuToggle.addEventListener("click", function () {
      const menu = document.querySelector("[data-menu]");
      const open = menu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.textContent = open ? "×" : "☰";
    });

    document.addEventListener("change", function (event) {
      if (event.target.matches("[data-language]")) {
        localStorage.setItem("safekid-language", event.target.value);
        toast(event.target.value === "en" ? "Language selected. First-aid content remains in Vietnamese." : "Đã chọn Tiếng Việt.");
      }
    });
    document.addEventListener("submit", function (event) {
      if (event.target.matches("[data-newsletter]")) {
        event.preventDefault();
        event.target.reset();
        toast("Cảm ơn bạn đã đăng ký nhận tin.");
      }
      if (event.target.matches("[data-contact-form]")) {
        event.preventDefault();
        if (!event.target.reportValidity()) return;
        event.target.reset();
        toast("Đã ghi nhận tin nhắn demo. Cảm ơn bạn!");
      }
      if (event.target.matches("#checkoutForm")) {
        event.preventDefault();
        if (!event.target.reportValidity()) return;
        if (!getCartLines().length) { toast("Giỏ hàng trống, vui lòng chọn sản phẩm."); return; }
        const orderNumber = "SK" + Date.now().toString().slice(-7);
        cart = [];
        discountApplied = false;
        localStorage.setItem("safekid-discount", "false");
        saveCart();
        event.target.reset();
        renderCheckout();
        const notice = document.querySelector("[data-order-success]");
        if (notice) {
          notice.hidden = false;
          notice.innerHTML = '<strong>Đặt hàng demo thành công!</strong> Mã đơn: ' + orderNumber + '. Đây là bản thực hành, chưa phát sinh thanh toán thật.';
        }
        toast("Đơn hàng demo đã được ghi nhận.");
      }
    });
  }

  function initTabs() {
    document.querySelectorAll("[data-tab]").forEach(function (button) {
      button.addEventListener("click", function () {
        document.querySelectorAll("[data-tab]").forEach(function (item) { item.classList.remove("active"); });
        document.querySelectorAll("[data-tab-panel]").forEach(function (panel) { panel.hidden = panel.dataset.tabPanel !== button.dataset.tab; });
        button.classList.add("active");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeader();
    renderFooter();
    bindGlobalEvents();
    document.querySelectorAll("[data-product-image]").forEach(function (image) {
      const product = productById(image.dataset.productImage);
      if (product) {
        image.src = product.image;
        image.alt = product.name;
        image.onerror = function () {
          image.onerror = null;
          image.src = "Images/placeholder.svg";
        };
      }
    });
    renderProductCardsOnPage();
    renderShop();
    renderDetails();
    renderCart();
    renderCheckout();
    renderGuides();
    renderGuideDetails();
    renderEmergency();
    renderCampaign();
    updateCartSummary();
    initTabs();
    document.querySelectorAll("[data-year]").forEach(function (node) { node.textContent = new Date().getFullYear(); });
  });
})();
