## 🚀 Quick Access
[![Portfolio](https://img.shields.io/badge/Visit-Portfolio-blue?style=for-the-badge)](https://www.om-chavda.me)

# LDPC Encoder and Decoder Simulator (5G NR Standard-Based)

This project implements a 5G NR-compatible LDPC (Low-Density Parity Check) encoder and decoder in MATLAB, supporting **both hard-decision and soft-decision decoding**. It simulates error performance over an **AWGN (Additive White Gaussian Noise)** channel across multiple coderates and provides detailed performance plots.

---

## 📁 Folder Structure

```
LDPC_Project/
│
│── NR_1_5_352.txt
│── NR_2_6_52.txt
├── Soft_Decision.m            # Hard decision simulation script
├── Hard_Decision.m            # Soft decision simulation script
├── nr5g_encoder.m               # LDPC encoder function
├── nrldpc_Hmatrix.m            # Base matrix loader and lifting to full H matrix
├── mul_sh.m                    # Identity matrix shifter
├── README.md                   # You're reading this!
```

---

## ⚙️ Features

- Implements 5G NR LDPC encoding based on **base graphs 1 & 2**
- Supports **hard decision decoding**
- Implements **soft decision decoding using the Min-Sum algorithm**
- Includes **Shannon limit comparison** and **normal approximation (finite-length performance)**
- Simulates **BPSK modulation**
- Includes **puncturing** to handle variable-length codewords
- Compares performance across **coderates: 1/4, 1/3, 1/2, 3/5**
- Generates performance graphs:
  - BER vs. SNR
  - Decoding error vs. SNR
  - Iteration-wise success probability

---

## 🔢 How It Works

### 1. **Base Matrix and Lifting**
Base matrices (either `NR_2_6_52` or `NR_1_5_352`) are used to construct the full parity-check matrix `H` through **lifting** by factor `z`.

```matlab
[B, H, z] = nrldpc_Hmatrix('NR_2_6_52');
```

### 2. **Encoding**
The encoder (`nr5g_encoder.m`) uses matrix multiplication with shifted identity matrices to compute parity bits.

```matlab
encoded_msg = nr5g_encoder(B, z, input_msg);
```

### 3. **Modulation & Channel**
LDPC-encoded bits are modulated using BPSK and passed through an AWGN channel.

### 4. **Decoding**
- **Hard Decision Decoding**:
  Uses majority logic and bit-flipping approach based on received bits.

- **Soft Decision Decoding**:
  Uses Min-Sum algorithm where messages are exchanged as reliability values (LLR-based).

---

## 📊 Graphs Generated

### ✅ Hard & Soft Decoding
- Bit Error Probability vs. SNR
- Decoding Error Probability vs. SNR
- Iteration Success Probability

### 🔬 Analytical Comparisons
- Shannon Limit (theoretical bound)
- Normal Approximation (finite block length)


---

## 🚀 Running the Simulation

1. Place `NR_2_6_52.txt` and `NR_1_5_352.txt`.
2. Run `m`.

```matlab
>> Hard_Decision
```

3. Observe multiple figures showing error performance metrics.

---

## 📚 Functions Explained

### `nr5g_encoder(B, z, msg)`
Encodes the input message using shifted identity matrices derived from the base graph `B`.

### `mul_sh(x, k)`
Shifts input vector `x` cyclically by `k` positions.

### `nrldpc_Hmatrix(BG)`
Generates the full parity-check matrix `H` from the base graph by performing lifting with identity matrices.

---

## 📌 LDPC Parameters

| Parameter         | Value                         |
|------------------|-------------------------------|
| Base Graphs      | NR_1_5_352 / NR_2_6_52        |
| Modulation       | BPSK                          |
| Channel          | AWGN                          |
| Max Iterations   | 20                            |
| Number of Sims   | 1000 per SNR point            |
| SNR Range        | 0 dB to 10 dB in 0.5 steps     |
| Coderates Tested | 1/4, 1/3, 1/2, 3/5             |

---

## 🧠 Key Concepts Used

- **LDPC encoding via matrix lifting**
- **Majority logic hard decision decoding**
- **Min-sum soft decision decoding**
- **Finite blocklength normal approximation**
- **Shannon limit benchmarking**
- **Puncturing of codewords**

---

## 🧪 Performance Metrics

| Metric                | Description                                      |
|----------------------|--------------------------------------------------|
| Bit Error Rate (BER) | Fraction of bits received in error               |
| Decoding Error Rate  | Fraction of codewords not decoded correctly      |
| Iteration Success    | Probability of correct decoding at iteration `i` |

---

## 📝 Notes

- If `bit_error == 0`, it is replaced with a very small number (`1e-305`) to allow log-scale plotting.
- Ensure base matrices are correctly named and formatted in `.txt` files.

---


## 🙋‍♂️ Author

- **Om Chavda**
- 🏫 DA-IICT
- Feel free to reach out

