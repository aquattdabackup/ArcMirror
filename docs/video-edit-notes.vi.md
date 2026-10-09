# Chỉnh video hiện có theo luồng demo mới

Ngày 09/10/2026: đã nhận [video 4:14](https://www.youtube.com/watch?v=urPALNc8Y2Q). [Kiểm tra metadata/ảnh lấy mẫu](video-review-2026-10-09.vi.md) phát hiện ba URL trong mô tả có khoảng trắng sau https://; phát lại hình/âm thanh đầy đủ chưa được xác minh. Đây là hướng dẫn dựng nếu cập nhật video, không phải yêu cầu quay lại toàn bộ.

## Giữ lại và thay phần nào

1. Thu lại cảnh trang chủ cùng lời mở đầu **00:00–00:15** trong [kịch bản 5 phút](video-demo-script.vi.md). Nút chính hiện dẫn tới giao dịch ERC-20 của bạn và mở sẵn so sánh.
2. Đưa cảnh ERC-20 lên **00:15–00:50**. Nếu cảnh cũ đã rõ `0.002` naive, `0.001` thực chuyển và `Needs Review`, có thể dùng lại hình. Thay lời “The second payment” bằng lời đọc mới; thêm cảnh Re-verify live hoàn tất nếu bản cũ chưa có.
3. Đặt bằng chứng triển khai vào **00:50–01:10**, native **01:10–01:35**, forwarding **01:35–02:00**. Sửa chữ “First”/đánh số demo cho đúng thứ tự. Giữ các cảnh cũ nếu hash, số tiền và nhãn khớp.
4. Batch **02:00–02:30**, failed **02:30–02:55**, ba tools **02:55–04:35** và kết **04:35–04:50** có thể giữ nếu đúng nội dung canonical script. Dành 10 giây dự phòng, bản xuất tối đa **5:00**.

Không thêm một intro dài lên đầu video 5 phút hiện có: thay hoặc rút ngắn intro cũ. Có thể cắt khoảng chờ RPC có chú thích; không che lỗi, thay hash hoặc biến cache thành một lần kiểm tra live. Không ký ví hoặc trả phí mới để quay.

## Tựa đề và phần mô tả đề xuất

**Title:** `ArcMirror Demo | Explain USDC Payments on Arc Mainnet`

**Description:**

```text
ArcMirror helps payment support teams and developers explain USDC transactions on Arc Mainnet, chain 5042. This demo shows five owner-created transactions, source evidence, separate gas fees, and the limits of verification, followed by three optional investigation tools.

Live app: https://arcmirror-six.vercel.app
Public source: https://github.com/aquattdabackup/ArcMirror
Deployment and transaction evidence: https://github.com/aquattdabackup/ArcMirror/blob/main/docs/mainnet-evidence.md

Dust Lab is a local precision simulation. A successful receipt is not the same as complete evidence coverage. Replaying these transactions requires no wallet connection or new payment.
```

Chapters phải lấy timestamp **thực tế của bản xuất**, không dán timeline dự kiến nếu cảnh đã bị dịch thời gian. Đăng Public hoặc Unlisted để người có link xem được; không dùng Private.

## Phạm vi kiểm tra URL đã nhận

Agent đọc được metadata không đăng nhập và ảnh storyboard; browser không khả dụng, phụ đề trả body rỗng. Xem các phát hiện cụ thể trong tài liệu review, sửa URL mô tả và tự phát lại từ đầu bằng cửa sổ ẩn danh. Không coi script hoặc metadata là bằng chứng toàn bộ hình/âm thanh đã đạt.

Không đưa vào hồ sơ tuyên bố “first/only”, tất cả năm thanh toán đều thành công, hoặc có người dùng thật khi chưa có phản hồi được ghi nhận. Dune đã xử lý duplicate logs; điểm trình bày của ArcMirror là giải thích nguồn, giới hạn và tái kiểm tra báo cáo từng giao dịch.
