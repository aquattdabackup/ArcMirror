# Bộ kiểm tra với người dùng thật

Chủ dự án đã đồng ý nhờ 2–3 người thử. **Chưa nhận kết quả thực tế; không được điền phản hồi mẫu thành kết quả hoặc đưa số người dùng vào hồ sơ khi chưa có.** Dùng [bảng ghi kết quả](user-feedback.md) sau mỗi phiên.

## Mời đúng người

Ưu tiên người đã kiểm tra giao dịch, làm hỗ trợ thanh toán hoặc tích hợp blockchain. Có thể thêm một người mới để tìm từ ngữ khó hiểu; ghi rõ vai trò thực tế. Một mẫu nhỏ giúp tìm vấn đề, không chứng minh nhu cầu của cả thị trường.

Tin nhắn để **bạn tự gửi**, agent chưa liên hệ ai:

> Mình đang làm ArcMirror, một công cụ đọc giao dịch USDC trên Arc. Bạn có thể dành 5–8 phút thử website và nói thẳng chỗ nào khó hiểu hoặc không hữu ích không? Không cần ví, đăng nhập hay trả phí. Mình muốn xem bạn tự sử dụng trước, không cần khen sản phẩm. Nếu bạn đồng ý, mình gửi bài thử; phản hồi có thể ẩn danh.

Chỉ gửi [phiếu nhiệm vụ](user-test-task.vi.md) cho người thử, không gửi đáp án bên dưới trước buổi thử. Không hứa phần thưởng hoặc gửi lời mời thay họ nếu chưa được chủ dự án yêu cầu rõ.

## Cách quan sát

1. Xác nhận người thử đồng ý tham gia. Xin phép riêng nếu muốn ghi âm/màn hình hoặc trích dẫn; từ chối ghi hình vẫn có thể thử.
2. Ghi ngày, mã ẩn danh, vai trò, desktop/mobile, trình duyệt, URL/bản deploy. Không cần tên, email hoặc địa chỉ ví cá nhân.
3. Bắt đầu tính thời gian khi mở trang chủ. Để người thử tự tìm lối vào. Đừng đọc slogan, giải thích hai log hoặc chỉ nút đúng trước.
4. Ghi lời trả lời nguyên văn và vị trí bị vướng. Nếu họ cần giúp, đánh dấu **có hỗ trợ**; đừng tính đó là hoàn thành độc lập.
5. Khi họ trả lời xong, hỏi thêm vì sao họ hiểu như vậy. Cuối phiên mới giải thích đáp án nếu cần.
6. Tách lỗi RPC/trình duyệt khỏi lỗi diễn đạt. Không thay lượt thất bại bằng một lượt thành công mà xóa bản ghi cũ.

## Đáp án để chủ dự án đối chiếu

| Câu hỏi | Kết quả đúng từ demo owner ERC-20 |
| --- | --- |
| Receipt | Thành công. |
| Tiền nhận | 0.001 USDC. |
| Phí mạng | 0.001052167 USDC, tách riêng khỏi tiền nhận. |
| Hai log | Native 18 decimals và giao diện ERC-20 6 decimals mô tả cùng khoản chuyển; cộng cả hai sẽ ra 0.002 USDC sai. |
| Needs Review | Thanh toán vẫn thành công; native call-value trace chưa phủ đủ biến đổi USDC precompile. Không có nghĩa là hai khoản thanh toán hay receipt thất bại. |
| Chia sẻ / lấy mới | Copy link để người khác xem; Re-verify live để lấy lại bằng chứng. Kết quả phải dựa vào thông báo thật. |
| CSV batch tùy chọn | 2/2 expectations matched, tổng 0.003 USDC, 1 unassigned movement là chặng cấp tiền từ burner vào Lab. CSV dùng Lab làm payer của hai khoản chi. |

Nguồn: [năm demo mainnet](mainnet-evidence.md). Nếu report live thay đổi vì thiếu trace, ghi đúng màn hình hiện tại; không ép câu trả lời về nhãn đã lưu.

## Dùng kết quả để sửa

- Nếu người thử hiểu **Needs Review** thành thanh toán thất bại, ưu tiên sửa phần giải thích kết quả.
- Nếu họ cộng hai log thành 0.002, xem lại nhãn và lối mở so sánh.
- Nếu họ không tìm được demo hoặc phải được chỉ nút, xem lại điểm bắt đầu trên trang chủ.
- Nếu họ hiểu đúng nhưng không thấy tình huống nào cần dùng, hỏi về công việc hiện tại trước khi thêm tính năng.
- Sau khi sửa, ghi phiên kiểm tra lại riêng; giữ cả phản hồi trước và sau.

Không đặt “2/3 người thích” làm bằng chứng sản phẩm đã được thị trường xác nhận. Khi viết hồ sơ, chỉ nói số phiên thực tế, nhiệm vụ đã thử, vấn đề đã sửa và trích dẫn được cho phép. Có thể nộp hồ sơ khi chưa có phản hồi, miễn không tuyên bố đã có.
