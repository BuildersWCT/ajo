/**
 * Secure localStorage utilities with encryption support
 * Provides encrypted storage and validation for sensitive data
 */

// Simple encryption/decryption using Web Crypto API
class SecureStorage {
  private readonly STORAGE_PREFIX = 'ajo_secure_'
  private readonly ALGORITHM = 'AES-GCM'
  
  /**
   * Generate a random encryption key
   */
  private async generateKey(): Promise<CryptoKey> {
    return await crypto.subtle.generateKey(
      {
        name: this.ALGORITHM,
        length: 256,
      },
      true, // extractable
      ['encrypt', 'decrypt']
    )
  }

  /**
   * Convert ArrayBuffer to base64 string
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return btoa(binary)
  }

  /**
   * Convert base64 string to ArrayBuffer
   */
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return bytes.buffer
  }

  /**
   * Get or create encryption key
   */
  private async getOrCreateKey(): Promise<CryptoKey> {
    const storedKey = localStorage.getItem(this.STORAGE_PREFIX + 'key')
    
    if (storedKey) {
      const keyData = JSON.parse(storedKey)
      return await crypto.subtle.importKey(
        'jwk',
        keyData,
        { name: this.ALGORITHM },
        true,
        ['encrypt', 'decrypt']
      )
    } else {
      const key = await this.generateKey()
      const exported = await crypto.subtle.exportKey('jwk', key)
      localStorage.setItem(this.STORAGE_PREFIX + 'key', JSON.stringify(exported))
      return key
    }
  }

  /**
   * Validate data before storage
   */
  private validateData(data: unknown): boolean {
    try {
      // Check if data is serializable
      JSON.stringify(data)
      return true
    } catch {
      return false
    }
  }

  /**
   * Encrypt and store data
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      if (!this.validateData(value)) {
        throw new Error('Data is not serializable')
      }

      const encryptionKey = await this.getOrCreateKey()
      const iv = crypto.getRandomValues(new Uint8Array(12)) // 96-bit IV for AES-GCM
      
      // Convert data to string and encode
      const dataString = JSON.stringify(value)
      const dataBuffer = new TextEncoder().encode(dataString)
      
      // Encrypt
      const encrypted = await crypto.subtle.encrypt(
        { name: this.ALGORITHM, iv },
        encryptionKey,
        dataBuffer
      )
      
      // Store encrypted data with IV
      const storedData = {
        iv: this.arrayBufferToBase64(iv.buffer),
        data: this.arrayBufferToBase64(encrypted)
      }
      
      localStorage.setItem(
        this.STORAGE_PREFIX + key,
        JSON.stringify(storedData)
      )
    } catch (error) {
      console.error('Failed to encrypt and store data:', error)
      throw new Error('Failed to store data securely')
    }
  }

  /**
   * Decrypt and retrieve data
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const storedData = localStorage.getItem(this.STORAGE_PREFIX + key)
      
      if (!storedData) {
        return null
      }
      
      const parsed = JSON.parse(storedData)
      const encryptionKey = await this.getOrCreateKey()
      
      // Decrypt
      const decrypted = await crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: new Uint8Array(this.base64ToArrayBuffer(parsed.iv))
        },
        encryptionKey,
        this.base64ToArrayBuffer(parsed.data)
      )
      
      // Parse decrypted data
      const dataString = new TextDecoder().decode(decrypted)
      return JSON.parse(dataString)
    } catch (error) {
      console.error('Failed to decrypt and retrieve data:', error)
      // Return null for corrupted data instead of throwing
      return null
    }
  }

  /**
   * Remove encrypted data
   */
  removeItem(key: string): void {
    localStorage.removeItem(this.STORAGE_PREFIX + key)
  }

  /**
   * Check if encrypted data exists
   */
  hasItem(key: string): boolean {
    return localStorage.getItem(this.STORAGE_PREFIX + key) !== null
  }

  /**
   * Clear all encrypted data
   */
  clear(): void {
    const keys = Object.keys(localStorage)
    for (const key of keys) {
      if (key.startsWith(this.STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    }
  }

  /**
   * Migrate legacy unencrypted data to encrypted storage
   */
  async migrateLegacyData(key: string): Promise<void> {
    try {
      const legacyData = localStorage.getItem(key)
      if (legacyData && !this.hasItem(key)) {
        const parsed = JSON.parse(legacyData)
        await this.setItem(key.replace(this.STORAGE_PREFIX, ''), parsed)
        localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn('Failed to migrate legacy data:', error)
    }
  }
}

// Export singleton instance
export const secureStorage = new SecureStorage()

// Utility functions for common operations
export const secureStorageUtils = {
  /**
   * Store saved piggy states with encryption
   */
  async setSavedStates: async (states: unknown) => {
    await secureStorage.setItem('savedPiggyStates', states)
  },

  /**
   * Get saved piggy states with decryption
   */
  async getSavedStates: async () => {
    return await secureStorage.getItem('savedPiggyStates')
  },

  /**
   * Remove saved piggy states
   */
  removeSavedStates: () => {
    secureStorage.removeItem('savedPiggyStates')
  },

  /**
   * Migrate existing unencrypted piggy states
   */
  migratePiggyStates: async () => {
    await secureStorage.migrateLegacyData('savedPiggyStates')
  }
}