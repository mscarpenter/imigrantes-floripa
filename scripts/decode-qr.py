#!/usr/bin/env python3
"""Decodifica a matriz gerada por gen-qr.py para validar o encoder."""
import importlib.util
spec = importlib.util.spec_from_file_location("g", "scripts/gen-qr.py")
g = importlib.util.module_from_spec(spec)
spec.loader.exec_module(g)

URL = "https://imigrantes-floripa-two.vercel.app/pt"
m = g.generate(URL)
SIZE = g.SIZE

# reconstruir mapa de modulos de funcao (reserved)
_, r = g.new_matrix()
mm, _ = g.new_matrix()
g.place_finders(mm, r)
g.place_timing(mm, r)
g.place_alignment(mm, r)
g.reserve_format(r)

# ler formato (copia 1)
def gb_pos(positions):
    return positions

fmt_read = 0
bitseq = []
for i in range(6):
    bitseq.append(m[i][8])
bitseq.append(m[7][8])
bitseq.append(m[8][8])
bitseq.append(m[8][7])
for i in range(9, 15):
    bitseq.append(m[8][14 - i])
val = 0
for i in range(15):
    val |= bitseq[i] << i
val ^= 0x5412
fmt5 = val >> 10
ec = fmt5 >> 3
mask = fmt5 & 7
print("formato copia1 -> ec_bits=%s mask=%d" % (bin(ec), mask))

# ler formato copia 2 (deve ser identico)
seq2 = []
for i in range(8):
    seq2.append(m[8][SIZE - 1 - i])        # horizontal
for i in range(8, 15):
    seq2.append(m[SIZE - 15 + i][8])       # vertical
v2 = 0
for i in range(15):
    v2 |= seq2[i] << i
v2 ^= 0x5412
fmt5b = v2 >> 10
print("formato copia2 -> ec_bits=%s mask=%d" % (bin(fmt5b >> 3), fmt5b & 7))
print("COPIAS BATEM:", fmt5 == fmt5b)

# desmascarar
f = g.MASKS[mask]
unmasked = [row[:] for row in m]
for i in range(SIZE):
    for j in range(SIZE):
        if not r[i][j] and f(i, j):
            unmasked[i][j] ^= 1

# ler dados em zigzag (mesma ordem do encoder)
bits = []
col = SIZE - 1
upward = True
while col > 0:
    if col == 6:
        col -= 1
    for i in range(SIZE):
        row = (SIZE - 1 - i) if upward else i
        for c in (col, col - 1):
            if not r[row][c]:
                bits.append(unmasked[row][c])
    upward = not upward
    col -= 2

# codewords
cws = []
for i in range(0, (len(bits) // 8) * 8, 8):
    b = 0
    for k in range(8):
        b = (b << 1) | bits[i + k]
    cws.append(b)
print("total codewords lidos:", len(cws))

# de-interleave: estrutura (2,15),(2,16) + 18 EC
BLOCKS = g.BLOCKS
ECN = g.EC_PER_BLOCK
nblocks = sum(c for c, d in BLOCKS)
dcounts = []
for c, d in BLOCKS:
    dcounts += [d] * c
maxd = max(dcounts)
total_data = sum(dcounts)
data_blocks = [[] for _ in range(nblocks)]
idx = 0
for i in range(maxd):
    for b in range(nblocks):
        if i < dcounts[b]:
            data_blocks[b].append(cws[idx]); idx += 1
# (EC ignorado, assumindo zero erros)

data = []
for b in data_blocks:
    data += b

# bitstream dos dados
dbits = []
for cw in data:
    for k in range(7, -1, -1):
        dbits.append((cw >> k) & 1)

mode = 0
for k in range(4):
    mode = (mode << 1) | dbits[k]
length = 0
for k in range(4, 12):
    length = (length << 1) | dbits[k]
print("mode=%d length=%d" % (mode, length))
chars = []
p = 12
for _ in range(length):
    byte = 0
    for k in range(8):
        byte = (byte << 1) | dbits[p + k]
    chars.append(byte)
    p += 8
try:
    decoded = bytes(chars).decode("utf-8")
except Exception as e:
    decoded = "<erro: %s>" % e
print("DECODIFICADO:", repr(decoded))
print("MATCH:", decoded == URL)
