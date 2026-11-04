import { Injectable, signal } from '@angular/core';

/**
 * Salt and cryptographic hash (SHA-256) of the secret administrator access passphrase.
 * The plaintext password is never stored or included in the application source code.
 */
const ADMIN_SALT = 'fac_admin_sec_2026_z91k';
const ADMIN_EXPECTED_HASH = '5739aa228c76e8e351b1c1eea520403b4091bccbf4e3ba81a8ff387f243cbc9e';
const STORAGE_KEY = 'marcel_admin_auth_unlocked';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  isAdminUnlocked = signal<boolean>(this.checkInitialState());

  private checkInitialState(): boolean {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return window.sessionStorage.getItem(STORAGE_KEY) === 'true';
      }
    } catch {
      // Ignore storage restrictions
    }
    return false;
  }

  async verifyPassword(inputPassword: string): Promise<boolean> {
    if (!inputPassword) return false;
    try {
      const combined = ADMIN_SALT + inputPassword;
      let hashHex = '';

      if (typeof crypto !== 'undefined' && crypto.subtle && crypto.subtle.digest) {
        const encoder = new TextEncoder();
        const data = encoder.encode(combined);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      } else {
        hashHex = this.fallbackSha256(combined);
      }

      const isValid = hashHex.toLowerCase() === ADMIN_EXPECTED_HASH.toLowerCase();
      if (isValid) {
        this.isAdminUnlocked.set(true);
        try {
          if (typeof window !== 'undefined' && window.sessionStorage) {
            window.sessionStorage.setItem(STORAGE_KEY, 'true');
          }
        } catch {
          // Ignore
        }
      }
      return isValid;
    } catch (err) {
      console.error('Erreur lors de la vérification du mot de passe administrateur:', err);
      return false;
    }
  }

  lock(): void {
    this.isAdminUnlocked.set(false);
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }

  /**
   * Safe fallback SHA-256 implementation if crypto.subtle is unavailable.
   */
  private fallbackSha256(ascii: string): string {
    function rightRotate(value: number, amount: number) {
      return (value >>> amount) | (value << (32 - amount));
    }
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    const lengthProperty = 'length';
    let i = 0;
    let j = 0;
    let result = '';
    const words: number[] = [];
    const asciiBitLength = ascii[lengthProperty] * 8;
    let hash = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
      0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];
    const k = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];
    const candidate = unescape(encodeURIComponent(ascii));
    const strLength = candidate[lengthProperty];
    words[strLength >> 2] |= 1 << (7 - (strLength % 4) * 8);
    words[(((strLength + 8) >> 6) << 4) + 15] = asciiBitLength;
    for (i = 0; i < strLength; i++) {
      words[i >> 2] |= candidate.charCodeAt(i) << (24 - (i % 4) * 8);
    }
    for (j = 0; j < words.length; j += 16) {
      const w = words.slice(j, j + 16);
      const oldHash = [...hash];
      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15];
        const w2 = w[i - 2];
        const a = hash[0];
        const e = hash[4];
        const s1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
        const ch = (e & hash[5]) ^ (~e & hash[6]);
        const temp1 =
          hash[7] +
          s1 +
          ch +
          k[i] +
          (w[i] =
            i < 16
              ? w[i] || 0
              : (w[i - 16] +
                  (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) +
                  w[i - 7] +
                  (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) |
                0);
        const s0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
        const maj = (a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]);
        const temp2 = s0 + maj;
        hash = [
          (temp1 + temp2) | 0,
          a,
          hash[1],
          hash[2],
          (hash[3] + temp1) | 0,
          e,
          hash[5],
          hash[6]
        ];
      }
      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }
    for (i = 0; i < 8; i++) {
      for (let b = 3; b >= 0; b--) {
        const byte = (hash[i] >> (8 * b)) & 255;
        result += (byte < 16 ? '0' : '') + byte.toString(16);
      }
    }
    return result;
  }
}
