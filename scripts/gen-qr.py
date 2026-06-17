#!/usr/bin/env python3
"""Gerador de QR Code em Python puro (sem dependencias).
Versao 5, nivel de correcao Q (~25%). Suficiente para URLs de ate 60 chars.
Saida: PNG (escala configuravel) e SVG.
"""
import sys, zlib, struct

# ---------- GF(256) ----------
EXP = [0] * 512
LOG = [0] * 256
_x = 1
for _i in range(255):
    EXP[_i] = _x
    LOG[_x] = _i
    _x <<= 1
    if _x & 0x100:
        _x ^= 0x11D
for _i in range(255, 512):
    EXP[_i] = EXP[_i - 255]

def gf_mul(a, b):
    if a == 0 or b == 0:
        return 0
    return EXP[LOG[a] + LOG[b]]

def rs_generator(n):
    g = [1]
    for i in range(n):
        ng = [0] * (len(g) + 1)
        for j in range(len(g)):
            ng[j] ^= gf_mul(g[j], 1)
            ng[j + 1] ^= gf_mul(g[j], EXP[i])
        g = ng
    return g

def rs_ec(data, n):
    gen = rs_generator(n)
    msg = list(data) + [0] * n
    for i in range(len(data)):
        coef = msg[i]
        if coef != 0:
            for j in range(len(gen)):
                msg[i + j] ^= gf_mul(gen[j], coef)
    return msg[len(data):]

# ---------- Parametros versao 5, nivel Q ----------
VERSION = 5
SIZE = 17 + 4 * VERSION  # 37
EC_PER_BLOCK = 18
BLOCKS = [(2, 15), (2, 16)]  # (qtd_blocos, data_codewords)
TOTAL_DATA_CW = sum(c * d for c, d in BLOCKS)  # 62
DATA_BITS = TOTAL_DATA_CW * 8  # 496
EC_INDICATOR = 0b11  # Q
ALIGN_CENTERS = [30]  # unica posicao de alinhamento (alem das que colidem com finders)

def encode_data(text):
    data = text.encode("utf-8")
    if len(data) > (DATA_BITS - 12) // 8:
        raise ValueError("texto longo demais para v5-Q (max %d bytes)" % ((DATA_BITS - 12) // 8))
    bits = "0100"                      # modo byte
    bits += format(len(data), "08b")   # contador (8 bits p/ v1-9)
    for b in data:
        bits += format(b, "08b")
    bits += "0" * min(4, DATA_BITS - len(bits))  # terminador
    while len(bits) % 8 != 0:
        bits += "0"
    pad = ["11101100", "00010001"]
    i = 0
    while len(bits) < DATA_BITS:
        bits += pad[i % 2]
        i += 1
    cw = [int(bits[i:i + 8], 2) for i in range(0, DATA_BITS, 8)]
    return cw

def build_codewords(text):
    data_cw = encode_data(text)
    blocks = []
    idx = 0
    for count, dcw in BLOCKS:
        for _ in range(count):
            blocks.append(data_cw[idx:idx + dcw])
            idx += dcw
    ec = [rs_ec(b, EC_PER_BLOCK) for b in blocks]
    out = []
    maxd = max(len(b) for b in blocks)
    for i in range(maxd):
        for b in blocks:
            if i < len(b):
                out.append(b[i])
    for i in range(EC_PER_BLOCK):
        for b in ec:
            out.append(b[i])
    return "".join(format(c, "08b") for c in out)

# ---------- Matriz ----------
def new_matrix():
    return [[None] * SIZE for _ in range(SIZE)], [[False] * SIZE for _ in range(SIZE)]

def place_finders(m, r):
    for (tr, tc) in [(0, 0), (0, SIZE - 7), (SIZE - 7, 0)]:
        for dr in range(-1, 8):
            for dc in range(-1, 8):
                rr, cc = tr + dr, tc + dc
                if 0 <= rr < SIZE and 0 <= cc < SIZE:
                    dark = ((0 <= dr <= 6 and dc in (0, 6)) or
                            (0 <= dc <= 6 and dr in (0, 6)) or
                            (2 <= dr <= 4 and 2 <= dc <= 4))
                    m[rr][cc] = 1 if dark else 0
                    r[rr][cc] = True

def place_timing(m, r):
    for i in range(8, SIZE - 8):
        v = 1 if i % 2 == 0 else 0
        if m[6][i] is None:
            m[6][i] = v; r[6][i] = True
        if m[i][6] is None:
            m[i][6] = v; r[i][6] = True

def place_alignment(m, r):
    centers = ALIGN_CENTERS
    coords = [6] + centers
    for cr in coords:
        for cc in coords:
            # pular as que colidem com finders
            if (cr == 6 and cc == 6) or (cr == 6 and cc == SIZE - 7) or (cr == SIZE - 7 and cc == 6):
                continue
            if cr == 6 or cc == 6:
                continue
            for dr in range(-2, 3):
                for dc in range(-2, 3):
                    rr, cc2 = cr + dr, cc + dc
                    dark = (abs(dr) == 2 or abs(dc) == 2 or (dr == 0 and dc == 0))
                    m[rr][cc2] = 1 if dark else 0
                    r[rr][cc2] = True

def reserve_format(r):
    for i in range(9):
        r[8][i] = True
        r[i][8] = True
    for i in range(8):
        r[8][SIZE - 1 - i] = True   # copia 2 horizontal (row 8): 8 modulos
    for i in range(7):
        r[SIZE - 1 - i][8] = True   # copia 2 vertical (col 8): 7 modulos
    # modulo escuro fixo
    r[SIZE - 8][8] = True

def place_data(m, r, bits):
    idx = 0
    col = SIZE - 1
    upward = True
    while col > 0:
        if col == 6:
            col -= 1
        for i in range(SIZE):
            row = (SIZE - 1 - i) if upward else i
            for c in (col, col - 1):
                if not r[row][c] and m[row][c] is None:
                    bit = int(bits[idx]) if idx < len(bits) else 0
                    m[row][c] = bit
                    idx += 1
        upward = not upward
        col -= 2

MASKS = [
    lambda r, c: (r + c) % 2 == 0,
    lambda r, c: r % 2 == 0,
    lambda r, c: c % 3 == 0,
    lambda r, c: (r + c) % 3 == 0,
    lambda r, c: (r // 2 + c // 3) % 2 == 0,
    lambda r, c: (r * c) % 2 + (r * c) % 3 == 0,
    lambda r, c: ((r * c) % 2 + (r * c) % 3) % 2 == 0,
    lambda r, c: ((r + c) % 2 + (r * c) % 3) % 2 == 0,
]

def apply_mask(m, r, mask):
    out = [row[:] for row in m]
    f = MASKS[mask]
    for i in range(SIZE):
        for j in range(SIZE):
            if not r[i][j] and f(i, j):
                out[i][j] ^= 1
    return out

def fmt_bits(mask):
    fmt5 = (EC_INDICATOR << 3) | mask
    rem = fmt5 << 10
    g = 0x537
    for i in range(4, -1, -1):
        if rem & (1 << (i + 10)):
            rem ^= g << i
    return ((fmt5 << 10) | rem) ^ 0x5412

def draw_format(m, mask):
    bits = fmt_bits(mask)
    def gb(i):
        return (bits >> i) & 1
    for i in range(6):
        m[i][8] = gb(i)
    m[7][8] = gb(6)
    m[8][8] = gb(7)
    m[8][7] = gb(8)
    for i in range(9, 15):
        m[8][14 - i] = gb(i)
    for i in range(8):
        m[8][SIZE - 1 - i] = gb(i)        # copia 2 horizontal (row 8)
    for i in range(8, 15):
        m[SIZE - 15 + i][8] = gb(i)       # copia 2 vertical (col 8)
    m[SIZE - 8][8] = 1  # modulo escuro

def penalty(m):
    score = 0
    # regra 1
    for line in list(m) + [list(col) for col in zip(*m)]:
        run = 1
        for i in range(1, SIZE):
            if line[i] == line[i - 1]:
                run += 1
            else:
                if run >= 5:
                    score += 3 + (run - 5)
                run = 1
        if run >= 5:
            score += 3 + (run - 5)
    # regra 2
    for i in range(SIZE - 1):
        for j in range(SIZE - 1):
            if m[i][j] == m[i][j + 1] == m[i + 1][j] == m[i + 1][j + 1]:
                score += 3
    # regra 3
    pat1 = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0]
    pat2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1]
    for line in list(m) + [list(col) for col in zip(*m)]:
        for i in range(SIZE - 11 + 1):
            seg = line[i:i + 11]
            if seg == pat1 or seg == pat2:
                score += 40
    # regra 4
    dark = sum(sum(row) for row in m)
    total = SIZE * SIZE
    pct = dark * 100 // total
    prev = (abs(pct - 50) + 4) // 5 * 5  # aproximacao
    k = 0
    while True:
        low = 50 - (k + 1) * 5
        high = 50 + (k + 1) * 5
        if pct < low or pct > high:
            k += 1
        else:
            break
    score += k * 10
    return score

def generate(text):
    bits = build_codewords(text)
    m, r = new_matrix()
    place_finders(m, r)
    place_timing(m, r)
    place_alignment(m, r)
    reserve_format(r)
    place_data(m, r, bits)
    best = None
    for mask in range(8):
        cand = apply_mask(m, r, mask)
        draw_format(cand, mask)
        p = penalty(cand)
        if best is None or p < best[0]:
            best = (p, mask, cand)
    return best[2]

# ---------- Render ----------
def to_png(matrix, path, scale=16, quiet=4, dark=(27, 36, 64), light=(255, 255, 255)):
    n = len(matrix)
    dim = (n + 2 * quiet) * scale
    # cada pixel RGB
    rows = []
    for y in range(dim):
        my = y // scale - quiet
        row = bytearray()
        row.append(0)  # filtro None
        for x in range(dim):
            mx = x // scale - quiet
            on = 0 <= my < n and 0 <= mx < n and matrix[my][mx] == 1
            col = dark if on else light
            row += bytes(col)
        rows.append(bytes(row))
    raw = b"".join(rows)
    def chunk(typ, data):
        c = typ + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xffffffff)
    sig = b"\x89PNG\r\n\x1a\n"
    ihdr = struct.pack(">IIBBBBB", dim, dim, 8, 2, 0, 0, 0)  # 8-bit RGB
    idat = zlib.compress(raw, 9)
    with open(path, "wb") as f:
        f.write(sig + chunk(b"IHDR", ihdr) + chunk(b"IDAT", idat) + chunk(b"IEND", b""))

def to_svg(matrix, path, scale=16, quiet=4, dark="#1b2440", light="#ffffff"):
    n = len(matrix)
    dim = (n + 2 * quiet) * scale
    parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="%d" height="%d" viewBox="0 0 %d %d" shape-rendering="crispEdges">' % (dim, dim, dim, dim)]
    parts.append('<rect width="%d" height="%d" fill="%s"/>' % (dim, dim, light))
    for y in range(n):
        for x in range(n):
            if matrix[y][x] == 1:
                parts.append('<rect x="%d" y="%d" width="%d" height="%d" fill="%s"/>' % ((x + quiet) * scale, (y + quiet) * scale, scale, scale, dark))
    parts.append("</svg>")
    with open(path, "w") as f:
        f.write("".join(parts))

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "https://imigrantes-floripa-two.vercel.app/pt/blog"
    out = sys.argv[2] if len(sys.argv) > 2 else "docs/design/qr-site"
    mat = generate(url)
    to_png(mat, out + ".png", scale=16)
    to_svg(mat, out + ".svg", scale=16)
    print("URL:", url, "(%d chars)" % len(url))
    print("matriz:", len(mat), "x", len(mat))
    print("gerado:", out + ".png", "+", out + ".svg")
