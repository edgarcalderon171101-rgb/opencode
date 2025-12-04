export interface Connection {
  url: string
  commitment: string
}

export interface Keypair {
  publicKey: string
  secretKey: Uint8Array
}

export interface WalletConfig {
  network?: "mainnet-beta" | "devnet" | "testnet"
  rpcUrl?: string
}

export class Wallet {
  connection: Connection
  keypair: Keypair

  constructor(config: WalletConfig = {}) {
    const network = config.network || "devnet"
    const rpcUrl = config.rpcUrl || `https://api.${network}.solana.com`
    this.connection = {
      url: rpcUrl,
      commitment: "confirmed"
    }
    this.keypair = this.generateKeypair()
  }

  private generateKeypair(): Keypair {
    const secretKey = new Uint8Array(64)
    crypto.getRandomValues(secretKey)
    const publicKey = this.derivePublicKey(secretKey)
    return { publicKey, secretKey }
  }

  private derivePublicKey(secretKey: Uint8Array): string {
    // Mock public key derivation
    const hash = Array.from(secretKey.slice(0, 32))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    return hash.slice(0, 44)
  }

  static fromSecretKey(secretKey: Uint8Array, config: WalletConfig = {}): Wallet {
    const wallet = new Wallet(config)
    wallet.keypair = {
      publicKey: wallet.derivePublicKey(secretKey),
      secretKey
    }
    return wallet
  }

  get publicKey(): string {
    return this.keypair.publicKey
  }

  get address(): string {
    return this.keypair.publicKey
  }

  async getBalance(): Promise<number> {
    // Mock balance fetch
    console.log(`Fetching balance for ${this.address}...`)
    return Math.random() * 10
  }

  async airdrop(amount = 1): Promise<string> {
    // Mock airdrop
    console.log(`Requesting airdrop of ${amount} SOL...`)
    return `airdrop_signature_${Date.now()}`
  }
}
