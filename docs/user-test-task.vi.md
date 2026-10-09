# Dùng thử ArcMirror — khoảng 5–8 phút

Cảm ơn bạn đã thử giúp. Đây là kiểm tra website, không phải kiểm tra kiến thức của bạn. Chỗ nào khó hiểu là thông tin hữu ích. Không cần kết nối ví, tạo giao dịch, nạp tiền hay đăng nhập.

Mở https://arcmirror-six.vercel.app trên trình duyệt bạn thường dùng. Nếu có thể, hãy nói ra điều bạn đang nghĩ khi thao tác. Người quan sát sẽ không hướng dẫn trước.

## 1. Kiểm tra một khoản thanh toán

Từ trang chủ, mở ví dụ nổi bật do ArcMirror tạo. Hãy tự tìm câu trả lời:

1. Giao dịch thành công hay thất bại?
2. Người nhận thực sự nhận bao nhiêu USDC? Phí gas là bao nhiêu, có nằm trong tiền nhận không?
3. Vì sao có hai bản ghi? Con số nào sẽ sai nếu cộng chúng lại?
4. Nhãn **Needs Review** có nghĩa là khoản thanh toán thất bại không? Bạn sẽ giải thích nhãn này cho người khác thế nào?

Không cần đoán nếu không tìm thấy. Hãy chỉ ra chỗ bạn bị vướng và từ ngữ nào chưa rõ.

## 2. Gửi bằng chứng cho người khác

Giả sử đồng nghiệp muốn kiểm tra lại kết luận của bạn. Hãy tìm cách chia sẻ giao dịch và yêu cầu website lấy lại dữ liệu mới. Cho biết màn hình nào làm bạn tin rằng thao tác đã hoàn tất.

Nếu bạn thường xử lý dữ liệu kỹ thuật, hãy thử tải báo cáo JSON và tìm nơi có thể so sánh lại file đó. Đây là phần tùy chọn.

## 3. Tình huống phù hợp với công việc của bạn

Nếu bạn xử lý danh sách chi trả, hãy thử [Payout reconciliation](https://arcmirror-six.vercel.app/tools/reconcile) với giao dịch và CSV sau. Cho biết hai khoản dự kiến có xuất hiện trong giao dịch không và bạn hiểu các khoản chưa được gán như thế nào.

```text
0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8
```

```csv
id,payer,recipient,amount_usdc
demo-a,0xa64439ea7c88d56e2888c377d55ae3e174b415c1,0x9078519c691084110f44ea8f85d40850ac91acd4,0.001
demo-b,0xa64439ea7c88d56e2888c377d55ae3e174b415c1,0x7f045edecd9e1466e7e033e713344e9cb891cd22,0.002
```

Nếu công việc của bạn không có danh sách chi trả, bỏ qua phần này. Chỉ chọn một công cụ khác nếu bạn có tình huống thật cần dùng nó.

## Phản hồi cuối

- Điều gì khó hiểu hoặc khiến bạn phải đoán?
- Trong công việc thật, lúc nào bạn sẽ dùng trang này? Nếu không có lúc nào, hãy nói thẳng.
- Bạn hiện giải quyết việc đó bằng cách nào? ArcMirror giúp được thêm điều gì, hoặc còn thiếu điều gì?
- Bạn có đồng ý cho dự án trích dẫn phản hồi ẩn danh không? Bạn có thể từ chối.

Không gửi mật khẩu, khóa ví, file khách hàng hay dữ liệu cá nhân. Bạn không cần công khai tên hoặc tài khoản để góp ý.
