# Original owner brief

This is the original supplied specification. Later owner decisions in `../AGENTS.md` and `../task_on_progress.md` take precedence, especially software-first authorization. The historical dates and technical claims below must not be treated as fresh verification.

ArcMirror v2 — Master prompt cho coding agent

Dán toàn bộ file này vào một agent có terminal và quyền ghi file (Claude Code, Codex hoặc tương đương). Chat thông thường không tự triển khai contract, không ký giao dịch và không đẩy repo được. Thông tin kỹ thuật bên dưới được tổng hợp ngày 24/9/2026 từ tài liệu Arc và các nguồn bên thứ ba. Agent phải xác minh lại từng mục ghi "(xác minh)" trước khi dựa vào nó.

0. Vai trò và nguyên tắc làm việc

Bạn là kỹ sư full-stack có kinh nghiệm Solidity, dữ liệu blockchain, bảo mật ứng dụng và thiết kế sản phẩm. Hãy trực tiếp xây dựng, kiểm thử, triển khai và đóng gói ArcMirror để nộp Arc Microgrants. Đừng dừng ở kế hoạch, giao diện tĩnh hay bản chạy local.

Nguyên tắc bắt buộc:

Bằng chứng trước, kết luận sau. Chỉ đánh dấu một mục là xong khi có link, hash hoặc kết quả test kiểm chứng được. Không bịa link, transaction hash, số liệu, benchmark, audit, số người dùng. Không nói "đầu tiên", "duy nhất", "an toàn tuyệt đối", "đã audit".
Không đoán. Nếu dữ liệu onchain không đủ để kết luận, trả unknown hoặc needs_review kèm lý do.
Tự giải quyết lỗi. Chỉ dừng lại hỏi tôi khi thiếu thứ chỉ tôi có: ví có USDC, quyền GitHub/deploy, khóa RPC, bước ký giao dịch, nút nộp cuối cùng.
Không bao giờ yêu cầu tôi gửi private key hay seed phrase qua chat. Xem mục 11.
Báo cáo tiến độ ngắn sau mỗi mốc (đã xong + bằng chứng, đang làm, bị chặn bởi gì).
Dự án hoàn toàn mới: không tái sử dụng tên, nội dung, repo hay contract của bất kỳ dự án cũ nào của tôi.
Ngôn ngữ: UI, README, hồ sơ nộp bằng tiếng Anh. Báo cáo tiến độ cho tôi bằng tiếng Việt.
1. Bối cảnh giải và cổng điều kiện

Nguồn chính: https://community.arc.io/public/events/arc-microgrants-f8tijfjhyq (đọc lại đầu tiên và ghi lại mọi thay đổi so với bản dưới đây).

20 microgrant × 500 USDC (pool 10.000 USDC), cho tiny apps, PoC, demo, prototype chạy trên Arc mainnet.
Hạn nộp: 14/10/2026 23:59 ET; xét cuốn chiếu, mọi quyết định trước 21/10/2026. Nộp sớm được trả lời sớm. (Nếu ET là EDT thì hạn khoảng 10:59 sáng 15/10 giờ Việt Nam; đừng dựa vào biên này.)
Hồ sơ cần: link live trên mainnet, repo công khai, mô tả ngắn "dự án làm gì và dùng Arc để làm gì", builder profile công khai (GitHub, X hoặc Farcaster).
Không hợp lệ: mockup, slide, chỉ testnet, không có thành phần Arc, dự án đã được Circle hoặc Arc tài trợ.
Sau khi được chọn: bước xác minh ngắn và trả thưởng bằng USDC trên Arc vào ví nhận.
Tiêu chí: relevance to Arc, technical credibility, quality of build, worth taking further. Không cần traction, công ty, deck hay roadmap.

Cổng điều kiện (hoàn thành trước khi code, ghi vào docs/eligibility.md):

 Xác nhận với tôi rằng ArcMirror chưa nhận vốn từ chương trình Circle/Arc nào.
 Tôi có builder profile công khai (GitHub tối thiểu) và một ví riêng để nhận thưởng (khác ví demo) có thể nhận USDC trên Arc.
 Đọc lại trang giải, ghi ngày kiểm tra và các thay đổi.
2. Sản phẩm và định vị
Tên làm việc: ArcMirror. Thông điệp: One USDC movement. Every trace accounted for.
Định vị (dùng nguyên văn trong README): Explorers show you what happened. ArcMirror shows you why the numbers add up, and lets you re-run the proof yourself.
Người dùng dán một transaction hash Arc mainnet (hoặc bấm ví dụ có sẵn) để biết: thành công hay thất bại; USDC đi từ đâu đến đâu, bao nhiêu; phí gas thực trả; những log nào là cùng một chuyển động; khác biệt giữa native 18 decimals và ERC-20 6 decimals; memo gắn với giao dịch nào; nguồn gốc từng con số.
Người chấm phải hiểu điểm hay trong 30–60 giây, không cần ví, không cần trả tiền.
Không thêm AI chat, token, NFT, điểm thưởng, bridge hay dashboard tổng quát.

Ba điểm khác biệt cần chứng minh được bằng demo:

Verifier, không chỉ viewer: mỗi kết quả có mức bằng chứng (3 nguồn độc lập), digest và lệnh chạy lại từ RPC của chính người dùng.
Golden test vectors + thư viện core: bộ giao dịch mainnet thật kèm kết quả chuẩn để indexer khác kiểm tra mình có đếm đôi hay không.
Đối soát memo và batch: memo được gắn bằng quy tắc xác định (khung BeforeMemo → Memo), hóa đơn CSV đối chiếu với giao dịch.

Khảo sát ngắn các công cụ Arc hiện có (ít nhất: Blockscout tại explorer.arc.io, ArcScan của Etherscan, bảng token transfers của Dune, Bitquery, Alchemy Transfers API). Ghi nguồn và mô tả trung thực phần chồng lấn. Không tuyên bố độc quyền ý tưởng.

3. Phạm vi, ưu tiên và lịch

Hôm nay là 24/9/2026. Mục tiêu nộp: khoảng 5/10/2026 (tôi bấm nộp). Sau khi nộp vẫn được nâng cấp trên cùng link live. Đóng băng tính năng 12/10, giữ 13–14/10 làm dự phòng.

Tầng	Nội dung
P0 (bắt buộc)	Core analyzer + test; trang /, /tx/[hash], /how-it-works; bản đồ dòng tiền; so sánh "phantom double count"; JSON report; ví dụ thật; deploy production; README
P1 (làm nếu P0 xong đúng hạn)	A: 3-way proof. B: test vectors + CLI verify. C: contract ArcMirrorLab + giao dịch mainnet
P2 (chỉ khi còn thời gian)	Memo bracket + đối soát hóa đơn CSV; "Dust lab"; batch payout; thẻ chia sẻ OG image; endpoint MCP mỏng; truy vấn Dune đối chứng; kịch bản video 60–90 giây

Lịch gợi ý: 24–25/9 spike + cổng điều kiện + scaffold; 26–28/9 core + test; 28–30/9 Lab contract + deploy + vectors; 30/9–3/10 web + API + snapshots + production; 3–5/10 P1-A/B còn lại, tài liệu, hồ sơ, kiểm tra link cuối.

Tiêu chí cắt: nếu đến 30/9 core chưa qua test, bỏ P1-A. Nếu đến 3/10 chưa có production chạy được, dừng mọi tính năng mới.

4. Bước 0 — Spike thực nghiệm (làm trước mọi thứ, tối đa vài giờ)

Mục đích: kiểm chứng giả định bằng giao dịch thật trước khi xây thuật toán. Ghi kết quả vào docs/spike-findings.md và sửa thuật toán theo kết quả, không theo giả định.

Xác nhận kết nối mainnet: chain ID phải là 5042 (xác minh). Thử RPC https://rpc.mainnet.arc.io bằng eth_chainId. Nguồn bên thứ ba cho biết endpoint này có thể được gắn nhãn permissioned; nếu bị chặn, dùng nhà cung cấp có khóa (ví dụ Alchemy arc-mainnet, hỗ trợ Debug/Trace API, xác minh) và báo tôi tạo khóa. Xác nhận explorer công khai mở được không cần đăng nhập.
Xác nhận các hằng số trong tài liệu:
Giao diện ERC-20 USDC: 0x3600000000000000000000000000000000000000, 6 decimals.
Emitter hệ thống EIP-7708: 0xfffffffffffffffffffffffffffffffffffffffe, Transfer 18 decimals (xác minh).
Contract Memo: 0x5294E9927c3306DcBaDb03fe70b92e01cCede505. Tài liệu tutorial ghi địa chỉ cho testnet; kiểm tra bằng eth_getCode xem có tồn tại trên mainnet không (xác minh).
Dùng ví burner (mục 11), gửi các giao dịch nhỏ và dump receipt đầy đủ:
native EOA → EOA;
transfer qua giao diện ERC-20;
một giao dịch cố ý thất bại (ví dụ native tới zero address; tài liệu nói có thể revert, xác minh).
Trả lời bằng dữ liệu thật và ghi lại:
Với một ERC-20 transfer, có đúng hai log không? Thứ tự và logIndex của chúng thế nào? Số tiền quan hệ ra sao (native = ERC-20 × 10^12)?
Phí gas có phát log Transfer không? Phí đi đến địa chỉ nào (tài liệu và một nguồn bên thứ ba nói base fee không bị đốt mà chuyển cho block producer; xác minh)?
Native transfer nhỏ hơn 1e-6 USDC có xuất hiện log ERC-20 không?
debug_traceTransaction với callTracer và prestateTracer (diffMode) có chạy được trên provider bạn dùng không?
Block có thể trùng timestamp; luôn sắp xếp theo số block và logIndex.
Chỉ dùng các quy tắc fork/lịch sử nếu spike cho thấy chúng ảnh hưởng mainnet. Nếu mainnet dùng EIP-7708 từ genesis, ghi rõ: "MVP chỉ hỗ trợ Arc mainnet từ block đầu tiên".
5. packages/core — bộ phân tích thuần

Module thuần, tách khỏi UI và RPC (nhận dữ liệu đã fetch, trả báo cáo). TypeScript, viem, bigint cho mọi số tiền, không dùng Number cho giá trị token.

Đầu vào hợp lệ: hash 32 byte hex (^0x[0-9a-fA-F]{64}$), chain ID phải khớp mainnet; testnet bị từ chối trên trang chính.

Quy tắc phân loại log (theo địa chỉ emitter, không chỉ theo chữ ký event):

Emitter hệ thống + Transfer, 18 decimals → movement chuẩn (nguồn sự thật cho số tiền).
Emitter 0x3600…0000 + Transfer, 6 decimals → log giao diện ERC-20, là bằng chứng bổ sung của cùng movement, không cộng thêm.
Emitter Memo + BeforeMemo/Memo → xử lý theo mục 5.3.
Log khác → hiển thị, không đưa vào tổng USDC.

5.1 Ghép cặp thận trọng. Duyệt log hệ thống theo logIndex làm danh sách movement. Với mỗi log ERC-20 interface, tìm một log hệ thống chưa ghép có cùng from, to và value18 == value6 × 10^12, ưu tiên gần nhất theo logIndex; ghép 1–1. Hai movement giống hệt trong một transaction vẫn là hai movement. Log ERC-20 không ghép được → cảnh báo. Log hệ thống không có log ERC-20 → movement native thuần (bình thường).

5.2 Gas. fee = gasUsed × effectiveGasPrice bằng bigint theo đơn vị 18 decimals, format sau cùng. Gas là dòng riêng, không phải Transfer log, không cộng vào số tiền người nhận. Không mặc định tx.from là người trả của mọi movement (relayer, contract).

5.3 Memo (P2). Chỉ xử lý khi emitter là contract Memo đã xác minh. Quy tắc gán: các log nằm giữa BeforeMemo(memoIndex = i) và Memo(..., memoIndex = i) thuộc memo đó. Memo chỉ hoạt động với EOA; nếu thấy dấu hiệu khác thì needs_review. memoId và memoData là dữ liệu không tin cậy: giới hạn độ dài, escape khi hiển thị, thử giải mã UTF-8 an toàn, không render HTML.

5.4 Trạng thái. confirmed_success, confirmed_failed, pending, not_found, rpc_error, unsupported_format, insufficient_evidence. Không bao giờ hiện "thành công" nếu receipt chưa có status = 1.

5.5 Mức bằng chứng (evidenceLevel). verified (log + trace + chênh lệch số dư khớp, mục 6), consistent (chỉ log, nhất quán nội bộ), needs_review (có lệch hoặc thiếu). Kèm danh sách lý do.

5.6 Báo cáo JSON. Trường tối thiểu: schemaVersion, algorithmVersion, chainId, txHash, blockNumber, txIndex, status, gas (raw gasUsed, effectiveGasPrice, feeNative18 dạng chuỗi và bản format), movements[] (payer, payee, amountNative18 chuỗi, bản hiển thị 6 decimals, sourceLogIndex, corroboratingLogIndexes, evidenceLevel), logs[] (kèm role), memo, warnings[], limits, digest. Mọi số tiền là chuỗi số nguyên thô để không mất độ chính xác khi mở bằng JavaScript hoặc Excel. digest = keccak256 của JSON đã chuẩn hóa (khóa sắp xếp cố định, không có timestamp).

6. P1-A — 3-way proof

Đối chiếu ba nguồn độc lập cho một transaction:

Log: movement từ emitter hệ thống (mục 5).
Call trace: debug_traceTransaction với callTracer, tổng giá trị native trong cây gọi (kể cả contract nhiều chặng).
State diff: prestateTracer (diffMode) để lấy chênh lệch số dư từng địa chỉ trong riêng transaction đó. Đừng dùng eth_getBalance giữa hai block cho việc này, vì các giao dịch khác trong cùng block làm sai kết quả.

Identity cần kiểm: với mỗi địa chỉ liên quan, chênh lệch số dư = tiền vào − tiền ra − phí (nếu là bên trả phí); người nhận phí (block producer, xác minh ở spike) thuộc tập địa chỉ liên quan. Phần dư không giải thích được phải hiện ra, không được làm tròn hay giấu. Nếu provider không hỗ trợ trace, tự hạ xuống consistent, không suy đoán.

7. P1-B — Test vector và CLI
packages/core phát hành được độc lập (README riêng, ví dụ dùng).
vectors/ chứa các giao dịch mainnet thật + kết quả chuẩn (JSON), sinh từ giao dịch demo ở mục 9. Test chạy được offline từ fixture đã lưu.
CLI verify <hash>: fetch từ RPC của người dùng, chạy lại thuật toán, so digest với báo cáo đã chia sẻ và in khác biệt. Chạy được từ repo (pnpm verify <hash>); chỉ publish npm nếu tôi đồng ý và có tài khoản.
8. P1-C — Contract ArcMirrorLab

Mục đích: tạo các tình huống khó làm giao dịch mainnet thật để dùng làm demo và test vector. Không phải hệ thống thanh toán.

Solidity, Foundry, thư viện an toàn nếu phù hợp (SafeERC20, ReentrancyGuard). Kiểm tra tài liệu Arc về deploy (https://docs.arc.io/integrate/deploy-on-arc, hoặc tra https://docs.arc.io/llms.txt). Nhớ rằng simulator local không tái tạo hành vi USDC của Arc: test hành vi Arc trên RPC thật.
Các kịch bản tối thiểu (mỗi kịch bản là một hàm hoặc đường gọi riêng, phát event có scenarioId, không chứa thông tin cá nhân):
hai lần chuyển ERC-20 giống hệt trong một transaction;
native đi qua contract chuyển tiếp (nhiều chặng);
dust nhỏ hơn 1e-6 USDC (ERC-20 view không thấy);
batch trả nhiều người nhận;
một đường thất bại có chủ đích (nếu spike xác nhận hành vi).
Ràng buộc an toàn: người nhận là địa chỉ immutable do tôi cung cấp; contract không giữ quỹ (số dư về 0 sau mỗi lời gọi; nếu cần thì chỉ có sweep() gửi về địa chỉ cố định); không owner rút tiền; không quyền admin để chiếm tiền; chặn số tiền 0; giới hạn tối đa mỗi lời gọi rất nhỏ; ERC-20 chỉ cần approve đúng số tiền, không cấp quyền vô hạn; chống reentrancy.
Memo phải gửi trực tiếp từ EOA (Memo.memo(target, data, memoId, memoData)), không đi qua Lab.
Unit test: đường thành công từng kịch bản, lặp, số tiền 0, thiếu allowance, thiếu USDC, invariant số dư contract = 0. Triển khai lên mainnet, lưu địa chỉ, chain ID, tx hash triển khai, ABI trong contracts/deployments/, xác minh mã nguồn trên explorer nếu hỗ trợ (nếu không, nói rõ). Ghi lại mọi chỉnh sửa thiết kế phát sinh từ đặc thù Arc.
9. Bộ giao dịch mainnet demo

Tạo bằng ví dự án của tôi, số tiền rất nhỏ, ít nhất 5 giao dịch thật và phân loại rõ:

native EOA → EOA (minh họa native + phí);
ERC-20 transfer qua giao diện 6 decimals (hai nguồn log cần đối soát; dùng cho "phantom double count");
một giao dịch qua Lab nhiều chặng hoặc hai movement giống hệt;
một giao dịch dust hoặc batch;
một giao dịch thất bại (mất gas, không có tiền đi);
(P2) một giao dịch Memo từ EOA.

Quy tắc: không ghi hash vào sản phẩm/README trước khi giao dịch tồn tại và được xác nhận thành công/thất bại đúng dự kiến; không gắn nhãn mainnet cho dữ liệu testnet; không yêu cầu giám khảo tự gửi tiền.

Trang "Explore real examples": mỗi thẻ có câu hỏi người xem sẽ được giải đáp, số tiền thực, link /tx/<hash> và link explorer (liên kết cả Blockscout explorer.arc.io và ArcScan nếu URL kiểm chứng được).

10. Web, API, RPC và hiệu năng

Stack ưu tiên: TypeScript, Next.js (hoặc React + edge/API routes), viem, Foundry. Giữ kiến trúc vừa đủ, dễ chạy và dễ deploy. Không cần monorepo phức tạp: apps/web, packages/core, contracts, vectors, docs.

Trang: /, /tx/[hash], /how-it-works, trang lỗi có hướng dẫn. API: GET /api/health (không lộ secret), GET /api/analyze/<hash> (lỗi nhất quán), GET /api/examples.

Ba trải nghiệm chính (ưu tiên chất lượng hơn số lượng tính năng):

A. "Where did the dollar go?" — sơ đồ từng chặng thật, phí gas là dòng riêng; bấm một con số thấy log hoặc trường dữ liệu đã tạo ra nó.
B. "Phantom double count" — với ERC-20 transfer thích hợp, cho thấy cộng cả hai loại log tạo tổng giả thế nào, rồi tổng đã đối soát. Chỉ hiện khi giao dịch thực sự có đủ bằng chứng; không áp công thức "chia đôi" cho mọi giao dịch.
C. "Shareable proof" — URL /tx/<hash>, JSON tải về, evidenceLevel, digest, màn "How we calculate this" với ví dụ ngắn.

Trạng thái giao diện: loading, lỗi, pending, không tìm thấy, RPC lỗi, hash sai, dữ liệu thiếu. Không dùng màu làm cách duy nhất phân biệt trạng thái. Hoạt động tốt trên điện thoại. Demo mặc định hoàn toàn không cần ví. "Run a live probe" (nếu có) là tùy chọn và trước khi ví ký phải hiển thị rõ số USDC, người nhận, gas ước tính và cảnh báo dùng tiền thật.

RPC và độ bền (quan trọng, giám khảo có thể vào cùng lúc):

Lớp trừu tượng provider, hỗ trợ nhiều endpoint và fallback; khóa RPC chỉ nằm ở server (biến môi trường), không lộ ra client.
Timeout, giới hạn tốc độ, xử lý 429, không tải lịch sử chuỗi cho mỗi lần xem (chỉ theo hash).
Giao dịch đã final thì cache lâu dài (kiểm tra tài liệu về finality trước khi khẳng định "không có reorg").
Các giao dịch ví dụ có snapshot JSON tĩnh kèm nút "Re-verify live", để trang vẫn hiển thị đúng khi RPC lỗi hoặc bị giới hạn.
Không có endpoint nhận URL tùy ý (chống SSRF).
11. Bảo mật
Không private key/seed/token/.env thật trong source, commit, ảnh chụp, log. Dùng ví burner riêng cho demo, số dư vài USDC. Ưu tiên Foundry keystore (cast wallet import, deploy bằng --account) thay vì PRIVATE_KEY trong .env. Chỉ có .env.example.
Trước khi chuyển repo public: quét secret (ví dụ gitleaks) trên toàn bộ lịch sử commit.
Website không giữ tiền, không tự ký thay người dùng. Mọi thao tác tốn USDC cần ví của tôi ký sau khi thấy người nhận, số tiền và gas.
Không đưa tên khách hàng, email hay dữ liệu nhạy cảm vào event hoặc memo.
Kiểm tra đầu vào, CSP và header bảo mật cơ bản, rà soát phụ thuộc.
Nêu rõ trong UI và README: đây là công cụ phân tích bằng chứng onchain, không phải dịch vụ audit, không bảo đảm hoàn tiền.
12. Kiểm thử

Viết test cho các lỗi có thể làm sai kết quả tài chính. Tối thiểu:

native transfer; ERC-20 transfer với hai log nhưng một movement kinh tế;
hai movement giống hệt trong một transaction; contract chuyển tiền nhiều chặng;
gas tính độc lập với tiền chuyển; 6 so với 18 decimals, số rất nhỏ, rất lớn, không làm tròn sai;
transaction thất bại/pending, RPC lỗi, thiếu log, dữ liệu bất thường;
memo có và không có (P2); trace không hỗ trợ (hạ mức bằng chứng);
Lab contract (mục 8) và một smoke test trên production.

Chạy test, build, kiểm tra giao diện bằng trình duyệt (desktop + di động) và thử lại trên URL production từ phiên không đăng nhập. Ghi đúng kết quả thật vào README. Nếu thực tế khác giả định, sửa thuật toán và tài liệu theo bằng chứng.

13. Repo, tài liệu, deploy

README phải có: vấn đề và lý do dùng Arc; định vị (câu ở mục 2); sơ đồ kiến trúc ngắn; link website, repo, contract mainnet, explorer và giao dịch demo; cách chạy local/test/.env.example; thuật toán tránh đếm đôi và cách tính gas; mức bằng chứng; giới hạn thực tế của PoC; kết quả test đã chạy; LICENSE (đề xuất MIT, tôi xác nhận).

Deploy website lên nền tảng công khai phù hợp, kiểm tra domain production, API, di động và link explorer. Repo phải được chuyển sang public trước khi nộp. Nếu thiếu quyền, hoàn tất mọi phần độc lập trước rồi chỉ yêu cầu tôi đúng bước còn thiếu.

14. Bộ hồ sơ nộp (gọn, sau khi mainnet và production hoạt động)
Mô tả tiếng Anh ngắn (khoảng 100 từ): dự án làm gì và dùng Arc để làm gì.
Mô tả dài hơn: vấn đề, cách hoạt động, ba điểm khác biệt (mục 2, có dẫn nguồn khảo sát), hướng phát triển thực tế (thư viện core, vectors, đường tới Circle Grant Program).
Link: website, repo public, builder profile, contract mainnet, các giao dịch mẫu.
Hướng dẫn giám khảo dưới 1 phút: mở / → bấm ví dụ ERC-20 → xem bản đồ dòng tiền → bấm một con số để thấy log gốc → bật "Phantom double count" → tải JSON → chạy lại verify (nếu có).
Bảng đối chiếu ngắn: từng yêu cầu của Microgrants ↔ bằng chứng/link thực.
(P2) Kịch bản video 60–90 giây: mở bằng vấn đề đếm đôi → giao dịch mainnet thật → báo cáo tự kiểm chứng.
Kiểm tra cuối: mọi link mở được; contract và transaction đúng chain 5042; không có link testnet gắn nhãn mainnet; repo public; mô tả khớp sản phẩm; ngày kiểm tra trang giải được ghi lại.

Không tuyên bố đã nộp hồ sơ khi tôi chưa bấm nộp.

15. Những gì bạn sẽ cần từ tôi
Ví burner có vài USDC trên Arc (tôi tự nạp; bạn không di chuyển tiền của tôi ngoài các giao dịch demo đã nêu) và bước nhập keystore/ký.
Khóa RPC nếu endpoint công khai bị chặn.
Quyền GitHub (tạo/chuyển repo public), quyền deploy, ví nhận thưởng riêng, builder profile.
Xác nhận LICENSE và bấm nút nộp cuối cùng.
16. Cách bắt đầu

Bắt đầu bằng cách kiểm tra thư mục hiện tại, công cụ và những gì đã có. Sau đó trình bày ngắn: kiến trúc chọn, các mốc theo lịch mục 3, rủi ro chính, và danh sách mục 15. Rồi làm cổng điều kiện (mục 1) và spike (mục 4) trước, cập nhật tiến độ sau mỗi mốc và tiếp tục cho đến khi có bản production.

Báo cáo cuối phải tách ba phần: (1) đã hoàn thành và có link/bằng chứng thật; (2) đang chờ thao tác nào của tôi; (3) chưa hoàn thành hoặc đã cắt và lý do.
