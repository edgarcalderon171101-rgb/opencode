import { describe, expect, test } from "bun:test"
import { Wallet } from "../src/wallet"

describe("Wallet", () => {
  test("should create a wallet with default config", () => {
    const wallet = new Wallet()
    
    expect(wallet).toBeDefined()
    expect(wallet.publicKey).toBeDefined()
    expect(wallet.address).toBeDefined()
    expect(wallet.connection).toBeDefined()
  })

  test("should create wallet on devnet by default", () => {
    const wallet = new Wallet()
    
    expect(wallet.connection.url).toContain("devnet")
  })

  test("should create wallet on specified network", () => {
    const wallet = new Wallet({ network: "mainnet-beta" })
    
    expect(wallet.connection.url).toContain("mainnet-beta")
  })

  test("should use custom RPC URL when provided", () => {
    const customUrl = "https://custom-rpc.example.com"
    const wallet = new Wallet({ rpcUrl: customUrl })
    
    expect(wallet.connection.url).toBe(customUrl)
  })

  test("should generate unique addresses for different wallets", () => {
    const wallet1 = new Wallet()
    const wallet2 = new Wallet()
    
    expect(wallet1.address).not.toBe(wallet2.address)
  })

  test("should get balance", async () => {
    const wallet = new Wallet()
    const balance = await wallet.getBalance()
    
    expect(typeof balance).toBe("number")
    expect(balance).toBeGreaterThanOrEqual(0)
  })

  test("should airdrop SOL", async () => {
    const wallet = new Wallet()
    const signature = await wallet.airdrop(1)
    
    expect(signature).toBeDefined()
    expect(typeof signature).toBe("string")
    expect(signature).toContain("airdrop_signature_")
  })

  test("should create wallet from secret key", () => {
    const secretKey = new Uint8Array(64)
    crypto.getRandomValues(secretKey)
    
    const wallet = Wallet.fromSecretKey(secretKey)
    
    expect(wallet).toBeDefined()
    expect(wallet.publicKey).toBeDefined()
  })
})
