# Flow kiểm thử toàn bộ ArcMirror

Tài liệu này dành cho chủ dự án tự đi qua toàn bộ sản phẩm, hiểu dữ liệu chạy qua đâu và ghi bug đủ thông tin để sửa. Flow dùng website production tại [arcmirror-six.vercel.app](https://arcmirror-six.vercel.app). Không cần kết nối ví, ký giao dịch hay nạp tiền.

## 1. Hệ thống hoạt động như thế nào

```mermaid
flowchart LR
  U[Người dùng nhập transaction hash] --> W[Next.js UI]
  W --> A[/api/analyze/hash]
  A --> S{Có snapshot mẫu?}
  S -->|Có| V[Snapshot mainnet đã lưu]
  S -->|Không hoặc Re-verify live| R[Arc mainnet RPC]
  V --> C[Core analyzer]
  R --> C
  C --> M[Ghép native 18 decimals với ERC-20 6 decimals]
  M --> P[Tách gas và chấm mức bằng chứng]
  P --> J[Report JSON + digest]
  J --> W
  J --> T[CSV reconciliation / JSON inspector]
  D[Dust Lab] --> X[Tính bigint cục bộ, không gọi RPC]
```

Quy tắc quan trọng nhất: system Transfer log của USDC native là chuyển động chuẩn. ERC-20 interface log phù hợp chỉ là bằng chứng bổ sung cho cùng chuyển động, không được cộng thêm lần nữa. Gas luôn được tính riêng. Dữ liệu thiếu hoặc loại trace chưa hỗ trợ phải hiện `Needs Review`, không được tự nâng thành `Verified`.

## 2. Chuẩn bị trước khi test

1. Mở cửa sổ InPrivate/Incognito để tránh extension can thiệp.
2. Test một lần trên desktop khoảng 1440px và một lần ở mobile 390px hoặc điện thoại thật.
3. Mở Developer Tools, giữ hai tab **Console** và **Network**.
4. Không gửi private key, seed phrase, RPC key hoặc file chứa bí mật vào bug report.
5. Ghi lại nguồn report đang hiện: `Saved mainnet snapshot`, `Cached mainnet report` hoặc `Live RPC report`.

Ba giao dịch chuẩn để đối chiếu:

| Trường hợp | Hash | Kết quả chuẩn |
| --- | --- | --- |
| Hai loại log mô tả cùng chuyển động | `0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f` | 2 movements, tổng `4.499999` USDC, gas `0.00466731920116392`, `Needs Review` |
| Chuyển native và gas | `0xa0311ec4a00a190a55d2b32bbf03eb03e656d64c9bdaa306fdc1d9061ae6ad87` | 1 movement `0.01` USDC, gas `0.00042`, `Verified` |
| Một native base unit | `0x37567ff71a01f4966f0c4d5c4155dde45a293fd4450a57ce3c69d96c9777b3de` | `0.000000000000000001` USDC, hiển thị `<0.000001`, `Consistent` |

## 3. Flow A — trang chủ và nhập hash

1. Mở [trang chủ](https://arcmirror-six.vercel.app).
2. Xác nhận header chỉ hiện **ArcMirror**, không còn nhãn **BETA**.
3. Xác nhận có ba example card và ba liên kết điều hướng: **Examples**, **Tools**, **How it works**.
4. Nhập `0x123`, nhấn **Analyze**. Kết quả đúng là hướng dẫn nhập hash đầy đủ 64 ký tự hex; trang không crash.
5. Nhập `0x` cộng 64 số `0`, nhấn **Analyze**. Kết quả đúng là transaction không tìm thấy.
6. Nhập hash native ở bảng trên. Kết quả đúng là điều hướng sang `/tx/<hash>`.

Bug nếu: nút không phản hồi, URL không đổi với hash hợp lệ, lỗi nhập liệu biến thành trang trắng, hoặc Console có lỗi ứng dụng.

## 4. Flow B — báo cáo ERC-20 đầy đủ

Mở card **Two logs. One movement.** hoặc [mở report trực tiếp](https://arcmirror-six.vercel.app/tx/0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f).

1. Phần tổng quan phải hiện `Confirmed success`, block `22533201`, tổng `4.499999 USDC`, 2 movements và gas `0.00466731920116392 USDC`.
2. Mức bằng chứng phải là **Needs Review**. Đây là kết quả đúng vì call-value trace không bao phủ chuyển động qua precompile; không phải bug.
3. Trong tab **Money flow**, mở movement `0.090000 USDC`. Chi tiết phải có exact amount `0.09`, native log `5` và interface log `6`.
4. Mở movement `4.409999 USDC`. Chi tiết phải có native log `9` và interface log `10`.
5. Mở dòng **Network fee**. Gas phải đứng ngoài tổng movement.
6. Chuyển sang **Source logs**. Phải có 8 log; các log không phải USDC vẫn được nhìn thấy nhưng không được cộng vào tổng.
7. Chuyển sang **Balance proof**. Residual của bằng chứng state phải bằng zero, trong khi mức tổng thể vẫn là **Needs Review**.
8. Nhấn **Show double-count comparison**. Kết quả sai kiểu cộng cả hai giao diện là `8.999998 USDC`; kết quả đã đối soát là `4.499999 USDC`.
9. Nhấn **Copy link**. Nút phải báo thành công.
10. Nhấn **Download JSON** và giữ file để test Inspector/CLI ở các bước sau.
11. Nhấn **Re-verify live**. Khi RPC hoạt động, report mới phải tải được và digest phải giữ nguyên với bằng chứng không đổi.

Bug nghiêm trọng nếu: tổng thành `8.999998`, movement bị gộp/mất, gas bị cộng vào movement, hoặc report được nâng thành `Verified` dù lý do trace chưa được giải quyết.

## 5. Flow C — native transfer và dust

### Native transfer

Mở [Where did the cent go?](https://arcmirror-six.vercel.app/tx/0xa0311ec4a00a190a55d2b32bbf03eb03e656d64c9bdaa306fdc1d9061ae6ad87).

1. Phải có một movement `0.010000 USDC` từ native log `15`.
2. Tổng movement là `0.01 USDC`; gas là `0.00042 USDC`.
3. Mức bằng chứng là **Verified** vì logs, call value và state diff khớp trong trường hợp được hỗ trợ.
4. Double-count comparison không được làm tổng tăng vì giao dịch này không có interface log đi kèm.

### Native dust

Mở [Smaller than a microdollar](https://arcmirror-six.vercel.app/tx/0x37567ff71a01f4966f0c4d5c4155dde45a293fd4450a57ce3c69d96c9777b3de).

1. Movement phải hiện `<0.000001` nhưng chi tiết phải giữ exact amount `0.000000000000000001`.
2. Raw native amount phải là `1`; không được tự tạo ERC-20 interface log.
3. Mức bằng chứng là **Consistent**, không phải `Verified` và cũng không được hiển thị amount bằng zero.

## 6. Flow D — đối soát thanh toán CSV

Mở [Payout reconciliation](https://arcmirror-six.vercel.app/tools/reconcile).

### Golden path

1. Nhấn **Try mainnet example**.
2. Kết quả phải là `2 of 2 expectations matched`.
3. Expected total và matched total đều là `4.499999 USDC`.
4. Có `0 amount mismatches`, `0 missing matches`, `0 unassigned movements`.
5. Gas `0.00466731920116392 USDC` được hiển thị riêng và evidence vẫn là `Needs Review`.
6. Nhấn **Export reconciliation JSON**; file phải tải được.

### Duplicate không được dùng lại movement

1. Trong CSV đã nạp, sao chép dòng đầu và đổi `id` sang `duplicate-test`.
2. Nhấn **Reconcile payments**.
3. Chỉ hai movement thật được phép match. Dòng thứ ba không được tái sử dụng movement đã tiêu thụ.

### Amount mismatch

1. Đổi amount của một dòng, ví dụ `0.09` thành `0.090000000000000001`.
2. Nhấn **Reconcile payments**.
3. Dòng đó phải hiện `amount mismatch`; candidate gốc vẫn được liệt kê nhưng không được đánh dấu matched.

### Lỗi đầu vào

1. Xóa header CSV hoặc đổi địa chỉ thành giá trị không hợp lệ.
2. Dùng hash ngắn như `0x123`.
3. Mỗi lỗi phải có thông báo cụ thể; kết quả cũ phải được xóa, không được giữ như thể input mới đã thành công.

## 7. Flow E — kiểm tra và so sánh report JSON

Mở [Report inspector](https://arcmirror-six.vercel.app/tools/inspect).

1. Nhấn **Load mainnet example into A**. Report A phải báo `Digest matches file contents` và schema `1.0.0` được chấp nhận.
2. Nhấn **Compare A with fresh RPC**. Với dữ liệu mainnet không đổi, kết quả phải là **The reports are identical.**
3. Dùng file đã tải ở Flow B làm Report B. Nhấn **Inspect report B**; digest phải khớp.
4. Tạo ca tamper: trong JSON B, đổi một giá trị `"needs_review"` thành `"verified"` nhưng giữ digest cũ, rồi inspect lại.
5. Kết quả phải báo **Digest mismatch** và bảng so sánh phải chỉ ra field thay đổi. Hệ thống không được coi file này là bằng chứng hợp lệ.
6. Nhấn **Export comparison JSON** và kiểm tra file có nguồn so sánh, hai digest và danh sách field khác nhau.
7. Dán JSON hỏng như `{broken`. Kết quả phải báo lỗi parse và xóa comparison cũ.

Giới hạn có chủ ý: digest khớp chỉ chứng minh nội dung khớp với digest. Người tạo file giả vẫn có thể tính digest mới; muốn kiểm tra thực tế phải so với fresh RPC hoặc CLI/provider riêng.

## 8. Flow F — Dust Lab

Mở [Dust Lab](https://arcmirror-six.vercel.app/tools/dust).

1. Chọn **One native unit**, đặt repeat count `1000`.
2. Exact mỗi movement phải là `0.000000000000000001`; phần six-decimal là zero; tổng exact là `0.000000000000001 USDC`.
3. Chọn **Just below one micro-USDC**, giữ count `1000`. Kết quả phải giữ đủ 18 decimals và cho thấy phần bị bỏ nếu từng amount bị truncate.
4. Chọn **Exactly one micro-USDC**. Remainder phải bằng zero.
5. Nhập count `1.5`, `0` hoặc `1000001`. Phải nhận lỗi giới hạn số nguyên từ 1 đến 1,000,000.
6. Nhập amount có hơn 18 decimals hoặc ký tự. Phải có lỗi rõ ràng, không có kết quả cũ giả thành công.
7. Nhấn **Export calculation JSON**. File phải ghi rõ đây là simulation, không phải giao dịch onchain.

## 9. Flow G — API và kiểm thử kỹ thuật

Các URL đọc nhanh:

- `/api/health`: HTTP 200, `chainId` bằng `5042`.
- `/api/examples`: HTTP 200, có đúng 3 snapshot.
- `/api/analyze/<hash>`: report thành công cho ba hash chuẩn.
- `/api/analyze/not-a-hash`: HTTP 400, status `unsupported_format`.
- `/api/analyze/0x000...000`: HTTP 404, status `not_found`.

Từ thư mục repo trên Windows:

```powershell
npm.cmd test
npm.cmd run test:spike
npm.cmd run typecheck
npm.cmd run build
npm.cmd start
node scripts/smoke.mjs http://127.0.0.1:3000
```

Kiểm tra contract riêng:

```powershell
cd contracts
forge test -vv
```

Kiểm tra report vừa tải, thay đường dẫn file nếu cần:

```powershell
npm.cmd run verify -- 0x376b287a795c449b0bf3f0ec3ffdfad8e913012edecf0a8eb6f00c007a47b24f --report report.json
```

`npm test` kiểm tra analyzer, pairing, amount, digest, RPC adapter và workbench logic. `test:spike` kiểm tra bằng chứng mainnet đã đóng băng. `typecheck` bắt lỗi TypeScript. `build` bắt lỗi route/server-client boundary. `smoke.mjs` kiểm tra API, security headers, negative cases và sự tồn tại của cả bốn trang tools. Foundry chỉ kiểm tra contract logic chuẩn EVM; nó không thay thế demo Arc mainnet thật.

## 10. Bản đồ khoanh vùng bug

| Triệu chứng | Nơi kiểm tra đầu tiên |
| --- | --- |
| Tổng amount, pairing hoặc evidence level sai | `packages/core/src/analyzer.ts`, `pairing.ts`, `evidence.ts` và golden vectors |
| Dust/decimal sai | `packages/core/src/amounts.ts`, `precision.ts` |
| CSV match sai hoặc reuse movement | `packages/core/src/reconciliation.ts` |
| JSON/digest/comparison sai | `packages/core/src/report-inspector.ts`, digest utilities |
| Hash không tải được hoặc live RPC lỗi | `apps/web/app/api/analyze/[hash]/route.ts`, `packages/rpc` |
| Snapshot đúng nhưng Re-verify khác | RPC/provider/evidence availability; so sánh digest và evidence reasons trước khi sửa core |
| Nút, tab, download hoặc responsive lỗi | `apps/web/components`, `apps/web/app/globals.css` |
| Contract/Lab lỗi | `contracts/src`, Foundry tests; Lab mainnet hiện vẫn chưa deploy |

## 11. Mẫu báo bug

```text
Route/URL:
Thời gian và viewport:
Input (hash hoặc dữ liệu không bí mật):
Nguồn report: snapshot / cache / live RPC
Các bước tái hiện:
Kết quả mong đợi:
Kết quả thực tế:
Evidence level và digest đang thấy:
Console error:
Request lỗi trong Network tab:
Ảnh/video:
Tái hiện được bao nhiêu lần:
```

Một lần full flow đạt khi ba report có đúng số lượng/tổng/evidence level, CSV phân biệt match và mismatch, Inspector phát hiện tamper, Dust Lab giữ đủ 18 decimals, API negative cases trả đúng status, desktop/mobile không tràn ngang và Console không có lỗi ứng dụng.

## 12. Những phần chưa thể đánh dấu hoàn tất

- ArcMirrorLab chưa được deploy lên mainnet.
- Chưa có năm giao dịch demo do chủ dự án ký/tạo.
- Ba hash trong flow là giao dịch công khai của bên thứ ba.
- ERC-20 precompile sample phải giữ `Needs Review` cho tới khi có coverage được chứng minh tốt hơn.
- Kiểm thử viewport tự động không thay thế hoàn toàn thiết bị mobile thật.
