# ArcMirror — Kịch bản video demo tối đa 5 phút

Ngày soạn: 30/09/2026. Bản dành cho chủ dự án: hướng dẫn quay bằng tiếng Việt, lời đọc bằng tiếng Anh. **Chỉ đọc các đoạn “Lời đọc”; không đọc hướng dẫn, hash hoặc địa chỉ dài.**

Mục tiêu: giới thiệu vấn đề, chứng minh ArcMirror phân tích 5 giao dịch do chủ dự án thực hiện trên Arc Mainnet, rồi trình bày ích lợi của cả 3 tools. Phần nội dung kết thúc ở **4:50**, chừa **10 giây dự phòng**; tổng video xuất ra không vượt **5:00**. Đây là thời lượng chủ dự án chọn, không phải tuyên bố về giới hạn của ban tổ chức.

Video xem lại các giao dịch đã hoàn tất. Không cần triển khai lại hợp đồng, mở Remix, ký ví hoặc trả thêm phí để quay. Các giá trị bên dưới đối chiếu với [bằng chứng mainnet](mainnet-evidence.md) và [kết quả kiểm tra ngày 30/09](evidence/mainnet/checks.json); khi quay, kiểm tra lại kết quả thực tế trước khi đọc lời khẳng định.

## 1. Chuẩn bị trước khi bấm quay — không tính vào video

1. Mở [website production](https://arcmirror-six.vercel.app) và các tab trong bảng liên kết cuối file. Dùng chính 5 hash của bạn; các nút tải ví dụ trên homepage/tools dùng dữ liệu mẫu bên thứ ba, không thay thế 5 demo này.
2. Mở từng báo cáo, bấm **Re-verify live**, chờ hoàn tất và kiểm tra kết quả theo bảng số liệu ở cuối file. Nếu RPC lỗi hoặc thiếu bằng chứng, chờ và thử lại trước khi quay; không đọc rằng kiểm tra đã thành công khi màn hình chưa cho thấy điều đó.
3. Tại báo cáo **batch**, bấm **Download JSON** và lưu vào thư mục dễ chọn. File tải xuống này là đầu vào cho Report Inspector. Bản đã lưu trong repo để đối chiếu: [batch.report.json](evidence/mainnet/batch.report.json). Dùng report đầy đủ, không dùng `checks.json` hay JSON xuất từ công cụ đối soát.
4. Sao chép CSV ở mục 4 vào **Or paste CSV** của Payout Reconciliation, nhập hash batch, chọn **Fetch fresh RPC evidence**, chạy thử. Kết quả cần là **2 of 2 expectations matched**, tổng khớp `0.003 USDC`, **1 unassigned movement**. Để sẵn dữ liệu nhập cho lúc quay.
5. Chạy thử Inspector với file batch và **Compare A with fresh RPC**. Sau đó mở lại trang trống để quay thao tác nhập, hoặc quay riêng cảnh nhập rồi ghép. Không dùng **Load mainnet example into A** cho đoạn này.
6. Chạy thử Dust Lab với `0.0000009` và `10`. Khi quay, giữ nhãn **EXACT ARITHMETIC / SIMULATION** trong khung hình để người xem biết đây là phép tính.
7. Thu ở 1080p, chọn mức zoom trình duyệt để chữ và số dễ đọc. Đóng thông báo và tab không liên quan. Đặt kịch bản trên màn hình khác hoặc điện thoại; không để cửa sổ chọn file che màn hình quá lâu.
8. Quay thử một lượt có đồng hồ. Có thể thu màn hình và lời đọc riêng. Được cắt khoảng chờ RPC, chuyển tab và chọn file; ghi chú `RPC wait trimmed` nếu cắt thời gian chờ. Giữ nguyên kết quả thực tế và hash, không ghép lỗi thành cảnh thành công hoặc gọi báo cáo cache là vừa truy vấn RPC.

**Bố trí tab:** homepage → bằng chứng mainnet trên GitHub → Native → ERC-20 → Forwarding → Batch → Failed → Reconcile → Inspector → Dust. Tab báo cáo có thể mở sẵn và cuộn sẵn tới phần cần quay. Riêng cảnh Native cần cho thấy dán hash và bấm Analyze từ homepage.

## 2. Timeline cố định

| Mốc video | Thời lượng | Nội dung | Người xem cần hiểu |
| --- | ---: | --- | --- |
| 00:00–00:25 | 25 giây | Mở đầu | ArcMirror giải quyết việc đọc và đối chiếu thanh toán USDC |
| 00:25–00:45 | 20 giây | Bằng chứng mainnet | Chain 5042, hợp đồng và 5 giao dịch của dự án có địa chỉ/hash công khai |
| 00:45–01:10 | 25 giây | Demo 1 — Native | Tiền chuyển và gas là hai khoản khác nhau |
| 01:10–01:40 | 30 giây | Demo 2 — ERC-20 | Hai biểu diễn log không phải hai lần thanh toán |
| 01:40–02:05 | 25 giây | Demo 3 — Forwarding | Theo dõi tiền qua hợp đồng, không cộng các chặng thành tiền nhận |
| 02:05–02:30 | 25 giây | Demo 4 — Batch | Hai người nhận, tổng chi trả thực tế 0.003 USDC |
| 02:30–02:55 | 25 giây | Demo 5 — Intentional failure | Thất bại, không có chuyển tiền hoàn tất, vẫn tính gas |
| 02:55–03:35 | 40 giây | Tool 1 — Payout Reconciliation | Đối chiếu danh sách dự kiến với các khoản chuyển thực tế |
| 03:35–04:10 | 35 giây | Tool 2 — Report Inspector | Kiểm tra file báo cáo và so sánh với dữ liệu RPC mới |
| 04:10–04:35 | 25 giây | Tool 3 — Dust Lab | Hiểu phần lẻ bị bỏ khi cắt từng số về 6 chữ số thập phân |
| 04:35–04:50 | 15 giây | Kết thúc | Người khác có thể tự kiểm tra nguồn và giao dịch |
| 04:50–05:00 | 10 giây | Dự phòng | Dành cho chuyển cảnh hoặc nhịp đọc chậm hơn |

## 3. Kịch bản quay từng cảnh

### 00:00–00:25 — Mở đầu

**Màn hình:** homepage, giữ tên ArcMirror và ô nhập hash trong khung hình. Chưa cuộn qua các thẻ example.

**Lời đọc:**

> Hi, I'm the builder of ArcMirror, a read-only USDC transaction analyzer for Arc Mainnet. It helps users answer three questions: did the payment succeed, where did the money go, and what did gas cost? I'll show five transactions I created, followed by three supporting tools.

**Chữ chèn ngắn:** `ArcMirror | Arc Mainnet | Read-only USDC analysis`.

### 00:25–00:45 — Bằng chứng triển khai

**Màn hình:** chuyển sang [public mainnet evidence](https://github.com/aquattdabackup/ArcMirror/blob/main/docs/mainnet-evidence.md). Cho thấy chain `5042`, địa chỉ Lab và bảng giao dịch. Mở liên kết giao dịch triển khai trên ArcScan, cho thấy trạng thái thành công và địa chỉ hợp đồng; trở về homepage trước cảnh kế tiếp.

**Lời đọc:**

> These are completed transactions on Arc Mainnet, chain ID five zero four two. This public evidence page links our deployed Lab contract, its deployment receipt, and all five demonstrations. I'll replay those transactions without moving more funds.

**Lưu ý quay:** đây là bằng chứng deployment, không phải tuyên bố hợp đồng được audit hoặc có badge xác minh source trên explorer. Trang bằng chứng giải thích riêng việc đối chiếu bytecode.

### 00:45–01:10 — Demo 1: Native USDC transfer

**Thao tác:**

1. Trên homepage, dán hash **Native** ở mục 5 vào **Paste an Arc mainnet transaction hash**, bấm **Analyze**.
2. Cho thấy **Confirmed success**, số tiền `0.001 USDC` và gas `0.0004515 USDC`.
3. Bấm **Re-verify live**, chờ kết quả thật; giữ nhãn **Live RPC result** trong khung hình. Cắt khoảng chờ nếu cần.

**Lời đọc:**

> First, I paste my native transfer hash and analyze it. The receipt confirms a payment of zero point zero zero one USDC. Gas is shown separately. Re-verify live requests current RPC evidence, so viewers can check the result themselves using this same hash.

**Chữ chèn ngắn:** `1. Native: 0.001 USDC payment + separate gas`.

### 01:10–01:40 — Demo 2: ERC-20 transfer và tránh đếm trùng

**Thao tác:**

1. Chuyển sang báo cáo **ERC-20**; cho thấy **Confirmed success** và mức bằng chứng **needs review**.
2. Bấm **See why two logs are not two payments**. Liên kết này mở sẵn phần so sánh; nếu cuộn tới phần đó bằng tay, bấm **Show double-count comparison**.
3. Giữ cặp số `0.002` / `0.001 USDC` trong khung hình. Khi nhắc giới hạn, chỉ vào phần evidence hoặc chèn chú thích.

**Lời đọc:**

> The second payment uses the ERC-20 interface. Adding both log representations would incorrectly show twice the amount. ArcMirror counts one movement of zero point zero zero one USDC. The transaction succeeded, but the evidence remains Needs Review because native call-value traces do not cover USDC precompile mutations. That limitation stays visible.

**Chữ chèn ngắn:** `Receipt: success | Evidence: Needs Review` và `Two representations ≠ two payments`.

### 01:40–02:05 — Demo 3: Forwarding qua hợp đồng

**Thao tác:** mở báo cáo **Forwarding**, bấm **Follow the money**, giữ tab **Money flow**. Chỉ lần lượt ba chặng: burner → Lab → Forwarder → recipient A. Có thể chèn tên ngắn này lên video vì UI hiển thị địa chỉ.

**Lời đọc:**

> Next, my Lab forwards the payment through another contract to the recipient. The money flow shows three hops carrying the same amount. Their combined movement total is zero point zero zero three USDC, but the final recipient receives only zero point zero zero one.

**Chữ chèn ngắn:** `3 hops × 0.001 | Recipient receives 0.001 USDC`.

**Điểm phải thấy:** 3 movements; `0.003` là tổng theo chặng, không phải người nhận được `0.003`.

### 02:05–02:30 — Demo 4: Batch cho hai người nhận

**Thao tác:** mở báo cáo **Batch**, xem **Money flow**. Chỉ chặng funding `0.003` vào Lab, sau đó hai chặng `0.001` tới A và `0.002` tới B. Bấm **Download JSON** để nối với Inspector ở phần sau; có thể dùng file đã chuẩn bị trước.

**Lời đọc:**

> This batch pays two recipients: zero point zero zero one and zero point zero zero two USDC. The total payout is zero point zero zero three. The larger movement total also includes funding the Lab. I'll use this transaction to check a payment list and export its report.

**Chữ chèn ngắn:** `A: 0.001 + B: 0.002 = 0.003 USDC paid out`.

### 02:30–02:55 — Demo 5: Giao dịch chủ động thất bại

**Thao tác:** mở báo cáo **Intentional failure**. Cho thấy **Confirmed failed**, `0` movements, gas `0.0004573265 USDC`, rồi phần giải thích **What can I conclude?**. Nếu đủ thời gian, mở ArcScan từ báo cáo để thấy receipt thất bại tương ứng.

**Lời đọc:**

> Finally, this intentionally reverted transaction is confirmed failed. No successful USDC movements are counted, although gas was still paid. Verified here describes agreement between the supported evidence; it does not mean the payment succeeded. ArcMirror keeps transaction outcome separate from evidence quality.

**Chữ chèn ngắn:** `Failed transaction | 0 settled movements | Gas still charged`.

### 02:55–03:35 — Tool 1: Payout Reconciliation

**Thao tác:**

1. Mở [Payout Reconciliation](https://arcmirror-six.vercel.app/tools/reconcile). Cho thấy CSV hai dòng đã dán và hash **Batch**, không gõ lại địa chỉ trong lúc quay.
2. Chọn **Fetch fresh RPC evidence**, bấm **Reconcile payments**. Sau khi chạy xong, cuộn tới kết quả.
3. Cho thấy **2 of 2 expectations matched**, **Matched total: 0.003 USDC**, `0 amount mismatches / 0 missing matches / 1 unassigned movements`.
4. Chỉ hai dòng matched và giải thích chặng funding còn lại. Bấm **Export reconciliation JSON** nếu vẫn trong 40 giây.

**Lời đọc:**

> For a payment operator, the next question is whether the transaction matches the intended payouts. I load two CSV rows and the batch hash, then reconcile them. Both expected payments match the exact payer, recipient and amount. The remaining unassigned movement is the funding hop into the Lab. Gas stays separate, and I can export this comparison for review.

**Chữ chèn ngắn:** `Expected payouts → actual movements → exportable comparison`.

**Hiểu đúng:** trong CSV, `payer` là **Lab**, vì đang đối chiếu hai chặng Lab → người nhận. Chặng burner → Lab không nằm trong danh sách chi trả nên unassigned là đúng. Matching không chứng minh danh tính chủ ví hay hóa đơn đã thanh toán. Đây là đối soát một giao dịch, không phải toàn bộ lịch sử ví.

### 03:35–04:10 — Tool 2: Report Inspector

**Thao tác:**

1. Mở [Report Inspector](https://arcmirror-six.vercel.app/tools/inspect), tại **Report A → Import JSON**, chọn file báo cáo batch đã tải. Chọn file sẽ tự chạy kiểm tra; nếu dán vào **Or paste report A**, bấm **Inspect report A**.
2. Giữ dòng **Digest matches file contents** trong khung hình.
3. Bấm **Compare A with fresh RPC**, chờ xong rồi cho thấy **REPORT A / FRESH RPC** và kết quả so sánh. Với báo cáo không đổi và đủ bằng chứng như lần kiểm tra trước, kết quả dự kiến là **The reports are identical.**

**Lời đọc:**

> Report Inspector checks the downloaded file's structure and digest locally. A matching digest checks integrity, not authenticity. I then compare the saved report with fresh RPC analysis of the same transaction. The comparison shows whether any fields changed. This helps someone reviewing a shared report check it against newly fetched evidence.

**Chữ chèn ngắn:** `Saved JSON → integrity check → fresh RPC comparison`.

**Nếu kết quả khác:** đọc các changed fields trước khi quay tiếp. Thiếu trace hoặc thay đổi thuật toán có thể làm báo cáo khác. Không đọc “identical” hay che phần khác biệt nếu kết quả thực tế không khớp. Việc import file diễn ra trên trình duyệt; khi bấm so sánh live, tool gửi hash tới API. So sánh này không phải đồng thuận giữa các nhà cung cấp độc lập.

### 04:10–04:35 — Tool 3: Dust Lab

**Thao tác:**

1. Mở [Dust Lab](https://arcmirror-six.vercel.app/tools/dust).
2. Điền **USDC per movement** = `0.0000009`; **Number of identical movements** = `10`. Kết quả cập nhật tự động, không có nút gửi giao dịch.
3. Cuộn tới **Across 10 identical movements**: **Sum of exact amounts** = `0.000009 USDC`; **Sum after per-amount truncation** = `0 USDC`; **Omitted remainder** = `0.000009 USDC`.

**Lời đọc:**

> Dust Lab explains precision with a local calculation. Ten tiny amounts have a nonzero exact total, but truncating each to six decimals makes that total appear as zero. This helps developers understand why preserving precision matters. It is a simulation, not an additional mainnet transaction.

**Chữ chèn ngắn:** `Simulation: 0.0000009 × 10 = 0.000009 USDC`.

**Hiểu đúng:** đây là mô hình cắt phần thập phân cho từng số trước khi cộng, không phải khẳng định Arc làm mất tiền, token bị burn, hay mọi indexer đều tính theo cách này.

### 04:35–04:50 — Kết thúc

**Màn hình:** trở lại public mainnet evidence trên GitHub, cho thấy bảng 5 demo và liên kết production/source. Giữ end card tới hết nếu còn thời gian, nhưng không vượt 5:00.

**Lời đọc:**

> ArcMirror turns Arc's USDC evidence into understandable payment reports. The live application, source code, deployment details and all five transaction links are public, so anyone can repeat these checks. Thank you.

**End card:**

```text
ArcMirror — USDC transaction analysis on Arc Mainnet
Live: arcmirror-six.vercel.app
Source: github.com/aquattdabackup/ArcMirror
Proof: docs/mainnet-evidence.md
```

## 4. Dữ liệu copy sẵn cho phần tools

### CSV dùng với giao dịch batch

Copy cả dòng tiêu đề và hai dòng dữ liệu này vào **Or paste CSV**. Có thể lưu nguyên khối thành `owner-batch.csv` để dùng **Import CSV**.

```csv
id,payer,recipient,amount_usdc
demo-a,0xa64439ea7c88d56e2888c377d55ae3e174b415c1,0x9078519c691084110f44ea8f85d40850ac91acd4,0.001
demo-b,0xa64439ea7c88d56e2888c377d55ae3e174b415c1,0x7f045edecd9e1466e7e033e713344e9cb891cd22,0.002
```

Hash nhập vào **Transaction hash** của công cụ:

```text
0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8
```

### File cho Inspector và đầu vào Dust Lab

- Inspector: báo cáo tải bằng **Download JSON** từ giao dịch batch trên production. [Bản tham chiếu trong repo](evidence/mainnet/batch.report.json) cũng là report hợp lệ, nhưng khi dùng bản này hãy gọi là báo cáo đã lưu, không giả vờ vừa tải xuống.
- Dust: amount `0.0000009`, count `10`; không cần CSV, hash hoặc ví.
- Để vừa 5 phút, cảnh Inspector tập trung vào file integrity và fresh RPC. Chế độ so sánh hai file A/B có trong hệ thống nhưng không cần quay thêm một vòng; nút export của các tools có thể lướt qua mà không mở lại file tải xuống.

## 5. Liên kết và số liệu để kiểm tra khi tập quay

### Hợp đồng và bằng chứng

- [Public source](https://github.com/aquattdabackup/ArcMirror).
- [Public mainnet evidence](https://github.com/aquattdabackup/ArcMirror/blob/main/docs/mainnet-evidence.md).
- [Deployment manifest — chain 5042](https://github.com/aquattdabackup/ArcMirror/blob/main/contracts/deployments/5042.json).
- [Lab trên ArcScan](https://arc.etherscan.io/address/0xa64439ea7c88d56e2888c377d55ae3e174b415c1): `0xa64439ea7c88d56e2888c377d55ae3e174b415c1`.
- [Forwarder trên ArcScan](https://arc.etherscan.io/address/0x28fcbbf10fac1bad051d1870c8cb30fd9d3ded17): `0x28fcbbf10fac1bad051d1870c8cb30fd9d3ded17`.
- [Giao dịch triển khai](https://arc.etherscan.io/tx/0x97bcd82e2d98eee0962c54e6bd2fbdbfa78ff908c0627d7f53fc52fe28032292): receipt thành công, block `23006461`. Deployment riêng với 5 demo, không tính là demo thứ sáu.

### Demo 1 — Native

```text
0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981
```

[Mở báo cáo](https://arcmirror-six.vercel.app/tx/0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981) · [ArcScan](https://arc.etherscan.io/tx/0x2f0c62b0ea5c601f053b96e6c59d624a5b769208cc9ea9242a31bef963ab8981).

### Demo 2 — ERC-20

```text
0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d
```

[Mở báo cáo](https://arcmirror-six.vercel.app/tx/0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d) · [ArcScan](https://arc.etherscan.io/tx/0x4e0e57e776550e0118d86be5b84233eaecaa00f7fe085e3baf9f0af5e750370d).

### Demo 3 — Forwarding

```text
0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41
```

[Mở báo cáo](https://arcmirror-six.vercel.app/tx/0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41) · [ArcScan](https://arc.etherscan.io/tx/0x6539309ec60a263be08008ef134d4e15c6db8198fe1cd19e211959b5ef11df41).

### Demo 4 — Batch

```text
0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8
```

[Mở báo cáo](https://arcmirror-six.vercel.app/tx/0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8) · [ArcScan](https://arc.etherscan.io/tx/0x0cecb2a9fb27abd8d463d5faec25279056d28f0a447061eba22120d339165ec8).

### Demo 5 — Intentional failure

```text
0x87b456003ef9194f99c71ea5af94273ba242beaffaaeacc4fb466885a2b47fe1
```

[Mở báo cáo](https://arcmirror-six.vercel.app/tx/0x87b456003ef9194f99c71ea5af94273ba242beaffaaeacc4fb466885a2b47fe1) · [ArcScan](https://arc.etherscan.io/tx/0x87b456003ef9194f99c71ea5af94273ba242beaffaaeacc4fb466885a2b47fe1).

### Bảng đối chiếu — không cần đọc toàn bộ trong video

| Demo | Receipt | Evidence | Movements | Tổng theo chặng (USDC) | Gas (USDC) |
| --- | --- | --- | ---: | ---: | ---: |
| Native | confirmed_success | verified | 1 | 0.001 | 0.0004515 |
| ERC-20 | confirmed_success | needs_review | 1 | 0.001 | 0.001052167 |
| Forwarding | confirmed_success | verified | 3 | 0.003 | 0.0009599535 |
| Batch | confirmed_success | verified | 3 | 0.006 | 0.0015050215 |
| Intentional failure | confirmed_failed | verified | 0 | 0 | 0.0004573265 |

Không cộng cột “Tổng theo chặng” để suy ra chi tiêu. Forwarding trả A `0.001`; batch trả A `0.001` và B `0.002`. Tổng principal đã dùng cho 5 demo là `0.006 USDC`; tổng gas của 5 demo `0.0044259685 USDC`. Phí triển khai `0.017185294 USDC` là khoản riêng. Các số này là lịch sử đã ghi nhận, không phải báo giá phí cho một giao dịch mới.

## 6. Kiểm tra video trước khi xuất

- Đủ: mở đầu → bằng chứng mainnet → 5 demo → 3 tools → kết thúc. Dùng caption đánh số để người xem theo kịp.
- Có ít nhất một cảnh thực sự dán hash, bấm **Analyze**, và một lần truy vấn **Re-verify live** hoàn tất.
- Giữ rõ **Needs Review** ở ERC-20 và **Confirmed failed** ở demo thất bại; không dùng câu “all five payments succeeded”.
- CSV khớp đúng hai khoản từ Lab; giải thích một funding movement chưa gán. Inspector phân biệt integrity với authenticity. Dust hiện rõ simulation.
- Lời đọc khoảng 500 từ tiếng Anh (496 từ đếm theo khoảng trắng); đọc tự nhiên khoảng 120–130 từ/phút, thao tác đồng thời với lời đọc. Tập bằng đồng hồ vì số thập phân, chuyển tab và RPC có thể kéo dài hơn dự tính.
- Nếu vượt thời gian: cắt khoảng chờ, cảnh mở explorer thứ hai hoặc thao tác mở file vừa export. Giữ đủ 5 demo, 3 tools và các câu phân biệt trạng thái/bằng chứng; không tăng tốc lời đọc tới mức khó nghe.
- Xuất bản cuối cùng **≤ 5:00**. Kịch bản này chuẩn bị nội dung quay; chưa phải video đã được quay hoặc gửi hồ sơ.
