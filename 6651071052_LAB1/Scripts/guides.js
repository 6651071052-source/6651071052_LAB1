// Noi dung tham khao so cuu co ban, khong thay the huong dan cua nhan vien y te.
window.SAFEKID_GUIDES = [
  {
    id: "burn", title: "Sơ cứu khi bị bỏng", category: "Bỏng", age: ["Trẻ sơ sinh", "1-5 tuổi", "Trên 5 tuổi", "Người lớn"], emoji: "🔥", minutes: "4 phút",
    summary: "Làm mát vùng bỏng bằng nước sạch mát và tìm trợ giúp y tế khi bỏng nặng.",
    steps: ["Đưa nạn nhân ra khỏi nguồn nhiệt nếu có thể làm an toàn. Gọi 115 nếu bỏng rộng, sâu, ở mặt, bàn tay, bộ phận sinh dục hoặc nạn nhân khó thở.", "Làm mát vùng bỏng dưới vòi nước sạch mát đang chảy khoảng 20 phút. Không dùng đá.", "Tháo trang sức và quần áo gần vùng bỏng nếu không dính vào da; không bóc phần bị dính.", "Sau khi làm mát, che nhẹ bằng gạc sạch không dính. Đưa trẻ nhỏ hoặc trường hợp đáng lo ngại đi khám."],
    dont: ["Không bôi kem đánh răng, dầu, nước mắm hoặc thuốc dân gian.", "Không chọc vỡ bóng nước, không áp đá trực tiếp lên da."],
    emergency: "Bỏng lớn/sâu, bỏng hóa chất hoặc điện, bỏng vùng mặt-cổ, khó thở, hoặc nạn nhân lơ mơ.",
    productIds: ["burn-dressing", "gauze-sterile", "kit-kids"], source: "Hướng dẫn sơ cứu cơ bản của NHS và Hội Chữ thập đỏ; cần đối chiếu hướng dẫn y tế tại địa phương."
  },
  {
    id: "choking", title: "Sơ cứu khi hóc dị vật", category: "Hóc dị vật", age: ["1-5 tuổi", "Trên 5 tuổi", "Người lớn"], emoji: "🫁", minutes: "5 phút",
    summary: "Nhận biết tắc nghẽn đường thở nặng và gọi trợ giúp ngay.",
    steps: ["Nếu người bệnh còn ho mạnh và nói được, khuyến khích tiếp tục ho và theo dõi sát.", "Nếu không thể nói, ho hoặc thở, nhờ người gọi 115. Với người lớn/trẻ trên 1 tuổi: thực hiện tối đa 5 vỗ lưng xen kẽ tối đa 5 lần ép bụng theo hướng dẫn sơ cứu được đào tạo.", "Với trẻ dưới 1 tuổi: dùng tối đa 5 vỗ lưng xen kẽ tối đa 5 lần ấn ngực; không ép bụng. Gọi 115 và làm theo hướng dẫn tổng đài.", "Nếu nạn nhân bất tỉnh, đặt nằm an toàn và bắt đầu CPR nếu biết cách; dùng AED nếu có. Chỉ lấy dị vật nhìn thấy rõ."],
    dont: ["Không móc họng mù bằng ngón tay.", "Không treo ngược trẻ, không cho ăn/uống để đẩy dị vật."],
    emergency: "Không thở/nói/ho được, tím tái, bất tỉnh hoặc tình trạng không cải thiện.",
    productIds: ["kit-kids", "gloves"], source: "Hội Chữ thập đỏ và hướng dẫn sơ cứu của NHS. Nên tham gia khóa học CPR/sơ cứu thực hành."
  },
  {
    id: "bleeding", title: "Sơ cứu khi chảy máu", category: "Chảy máu", age: ["Trẻ sơ sinh", "1-5 tuổi", "Trên 5 tuổi", "Người lớn"], emoji: "🩸", minutes: "4 phút",
    summary: "Ép trực tiếp lên vết thương và gọi cấp cứu nếu chảy máu nhiều.",
    steps: ["Đảm bảo khu vực an toàn; nếu có, mang găng tay. Gọi người hỗ trợ.", "Dùng gạc hoặc vải sạch ép trực tiếp, liên tục lên vết thương. Nếu thấm máu, đặt thêm lớp gạc lên trên và tiếp tục ép.", "Nếu có dị vật cắm sâu, không rút ra; ép hai bên dị vật và cố định quanh nó.", "Gọi 115 khi máu phun/không cầm, vết thương lớn, nạn nhân choáng hoặc nghi mất máu nhiều."],
    dont: ["Không liên tục nhấc gạc lên để kiểm tra.", "Không tự rút dị vật cắm sâu. Không tự dùng garo nếu chưa được đào tạo."],
    emergency: "Máu chảy nhiều hoặc không cầm, vết thương sâu, dấu hiệu choáng, da lạnh ẩm hoặc lơ mơ.",
    productIds: ["gauze-sterile", "gloves", "bandage-roll"], source: "Hướng dẫn sơ cứu của Hội Chữ thập đỏ; garo chỉ dùng khi được huấn luyện."
  },
  {
    id: "drowning", title: "Sơ cứu người đuối nước", category: "Đuối nước", age: ["Trẻ sơ sinh", "1-5 tuổi", "Trên 5 tuổi", "Người lớn"], emoji: "🌊", minutes: "5 phút",
    summary: "Đảm bảo an toàn cho người cứu, gọi 115 và hỗ trợ hô hấp nếu đã được huấn luyện.",
    steps: ["Không xuống nước nếu không an toàn. Gọi người hỗ trợ và gọi 115; tìm cách đưa vật nổi/dây cho nạn nhân từ nơi an toàn.", "Khi đưa được nạn nhân lên bờ an toàn, kiểm tra phản ứng và nhịp thở bình thường.", "Nếu không thở bình thường, bắt đầu CPR và làm theo hướng dẫn của tổng đài 115; dùng AED nếu sẵn có. Nếu đã được huấn luyện, ưu tiên hồi sức có thổi ngạt trong đuối nước.", "Nếu thở bình thường nhưng bất tỉnh, đặt tư thế hồi phục, giữ ấm và theo dõi liên tục cho đến khi nhân viên y tế đến."],
    dont: ["Không ép bụng hoặc cố làm nước chảy ra khỏi phổi.", "Không trì hoãn CPR để tìm cách sơ cứu khác. Không đặt mình vào vùng nước nguy hiểm."],
    emergency: "Mọi trường hợp đuối nước đều cần được nhân viên y tế đánh giá, kể cả khi nạn nhân có vẻ hồi phục.",
    productIds: ["emergency-blanket", "face-mask"], source: "Hướng dẫn sơ cứu đuối nước của Hội Chữ thập đỏ và WHO."
  },
  {
    id: "fever-seizure", title: "Sốt cao và co giật", category: "Sốt, co giật", age: ["Trẻ sơ sinh", "1-5 tuổi", "Trên 5 tuổi"], emoji: "🌡️", minutes: "5 phút",
    summary: "Giữ trẻ an toàn khi co giật; không ghì giữ và không đưa vật vào miệng.",
    steps: ["Ghi lại thời điểm bắt đầu co giật. Dọn vật nguy hiểm xung quanh và đỡ đầu bằng vật mềm.", "Không ghì giữ trẻ. Không cho bất cứ thứ gì vào miệng. Nới lỏng quần áo quanh cổ.", "Khi cơn giật dừng, nếu trẻ thở, đặt nằm nghiêng an toàn và theo dõi nhịp thở.", "Gọi 115 nếu co giật lần đầu, kéo dài trên 5 phút, lặp lại, trẻ khó thở/không tỉnh lại hoặc có dấu hiệu nguy hiểm. Liên hệ cơ sở y tế để được đánh giá."],
    dont: ["Không cố giữ chặt tay chân.", "Không cho uống thuốc, nước hay vật cứng trong khi co giật."],
    emergency: "Cơn đầu tiên, kéo dài hơn 5 phút, nhiều cơn liên tiếp, khó thở, chấn thương hoặc không tỉnh lại.",
    productIds: ["thermometer", "kit-kids"], source: "NHS: hướng dẫn xử trí co giật ở trẻ. Không dùng nhiệt kế để trì hoãn cấp cứu."
  },
  {
    id: "poisoning", title: "Sơ cứu khi nghi ngộ độc", category: "Ngộ độc", age: ["Trẻ sơ sinh", "1-5 tuổi", "Trên 5 tuổi", "Người lớn"], emoji: "☠️", minutes: "4 phút",
    summary: "Tránh tự gây nôn; lưu lại bao bì và gọi 115 khi có triệu chứng nặng.",
    steps: ["Đưa nạn nhân ra khỏi nguồn phơi nhiễm nếu làm được an toàn; tránh tiếp xúc trực tiếp với hóa chất.", "Gọi 115 ngay nếu khó thở, co giật, bất tỉnh hoặc có triệu chứng nặng. Nếu ổn định, liên hệ cơ sở y tế để được chỉ dẫn khẩn cấp.", "Giữ lại bao bì/nhãn sản phẩm; ghi nhớ chất gì, lượng ước tính và thời điểm tiếp xúc.", "Nếu hóa chất dính vào da/mắt, xả thật nhiều nước sạch và làm theo hướng dẫn của tổng đài/cơ sở y tế."],
    dont: ["Không tự gây nôn. Không tự cho ăn, uống sữa, nước hay than hoạt tính nếu chưa được nhân viên y tế hướng dẫn.", "Không chạm hoặc ngửi hóa chất không rõ loại."],
    emergency: "Khó thở, bất tỉnh, co giật, nuốt hóa chất nguy hiểm hoặc triệu chứng tiến triển nhanh.",
    productIds: ["gloves", "face-mask"], source: "WHO và hướng dẫn cấp cứu chống độc; liên hệ nhân viên y tế để được chỉ dẫn theo chất cụ thể."
  },
  {
    id: "head-injury", title: "Sơ cứu khi ngã, chấn thương đầu", category: "Chấn thương", age: ["Trẻ sơ sinh", "1-5 tuổi", "Trên 5 tuổi", "Người lớn"], emoji: "🤕", minutes: "4 phút",
    summary: "Hạn chế di chuyển khi nghi chấn thương cổ và nhận biết dấu hiệu nguy hiểm.",
    steps: ["Kiểm tra an toàn, phản ứng và nhịp thở. Gọi 115 nếu bất tỉnh, co giật, khó thở hoặc chấn thương nghiêm trọng.", "Nếu nghi chấn thương cổ/lưng, không di chuyển nạn nhân trừ khi có nguy hiểm tức thì; giữ đầu-cổ thẳng và chờ hỗ trợ.", "Nếu có vết thương chảy máu, ép nhẹ quanh vết thương bằng gạc sạch; không ép lên vùng lõm hoặc nghi nứt sọ.", "Theo dõi nôn ói, đau đầu tăng, lú lẫn, buồn ngủ bất thường, yếu liệt hoặc đồng tử bất thường; cần đánh giá y tế khẩn cấp."],
    dont: ["Không tự nắn chỉnh cổ hoặc xương.", "Không cho ăn uống nếu nạn nhân lơ mơ hoặc có thể cần can thiệp y tế."],
    emergency: "Bất tỉnh, nôn nhiều, co giật, lú lẫn, chảy dịch/máu ở tai-mũi hoặc yếu liệt.",
    productIds: ["gauze-sterile", "splint", "cold-pack"], source: "Hướng dẫn chấn thương đầu của NHS và Hội Chữ thập đỏ."
  },
  {
    id: "insect-sting", title: "Sơ cứu khi bị côn trùng đốt", category: "Côn trùng đốt", age: ["Trẻ sơ sinh", "1-5 tuổi", "Trên 5 tuổi", "Người lớn"], emoji: "🐝", minutes: "3 phút",
    summary: "Theo dõi phản ứng dị ứng toàn thân sau khi bị đốt.",
    steps: ["Đưa nạn nhân khỏi khu vực có côn trùng. Nếu thấy ngòi, gạt nhẹ ngang bằng vật phẳng; không bóp túi nọc.", "Rửa vùng da bằng xà phòng và nước. Có thể chườm mát qua khăn để giảm khó chịu.", "Theo dõi khó thở, sưng môi/lưỡi/họng, nổi mề đay toàn thân, choáng hoặc nôn.", "Nếu có dấu hiệu phản ứng dị ứng nặng, gọi 115 ngay. Hỗ trợ dùng bút tiêm adrenaline của chính người bệnh nếu có và bạn được hướng dẫn."],
    dont: ["Không bóp nặn hoặc rạch vết đốt.", "Không trì hoãn gọi cấp cứu khi sưng họng, khó thở hoặc choáng."],
    emergency: "Khó thở, sưng mặt/lưỡi/họng, choáng, mạch yếu hoặc phản ứng lan rộng.",
    productIds: ["cold-pack", "gauze-sterile"], source: "NHS: hướng dẫn xử trí vết đốt và phản ứng dị ứng."
  }
].map(function (guide, index) {
  guide.date = "17/11/2026";
  guide.comments = 0;
  guide.audio = "Sounds/" + guide.id + ".mp3";
  return guide;
});
