import { describe, expect, test } from "bun:test"
import { TransactionBuilder } from "../src/transaction"
import { Wallet } from "../src/wallet"

describe("TransactionBuilder", () => {
  test("should create transaction builder instance", () => {
    const builder = new TransactionBuilder()
    
    expect(builder).toBeDefined()
  })

  test("should add instruction to builder", () => {
    const builder = new TransactionBuilder()
    const instruction = {
      programId: "TestProgram",
      keys: [{ pubkey: "test", isSigner: true, isWritable: false }],
      data: new Uint8Array([1, 2, 3])
    }
    
    const result = builder.addInstruction(instruction)
    
    expect(result).toBe(builder) // Should return this for chaining
  })

  test("should add multiple instructions", () => {
    const builder = new TransactionBuilder()
    const instructions = [
      {
        programId: "Program1",
        keys: [{ pubkey: "test1", isSigner: true, isWritable: false }],
        data: new Uint8Array([1])
      },
      {
        programId: "Program2",
        keys: [{ pubkey: "test2", isSigner: false, isWritable: true }],
        data: new Uint8Array([2])
      }
    ]
    
    builder.addInstructions(instructions)
    const transaction = builder.build()
    
    expect(transaction.instructions.length).toBe(2)
  })

  test("should build transaction", () => {
    const builder = new TransactionBuilder()
    const instruction = {
      programId: "TestProgram",
      keys: [],
      data: new Uint8Array([])
    }
    
    builder.addInstruction(instruction)
    const transaction = builder.build()
    
    expect(transaction).toBeDefined()
    expect(transaction.instructions).toBeDefined()
    expect(transaction.instructions.length).toBe(1)
  })

  test("should clear instructions", () => {
    const builder = new TransactionBuilder()
    const instruction = {
      programId: "TestProgram",
      keys: [],
      data: new Uint8Array([])
    }
    
    builder.addInstruction(instruction)
    builder.clear()
    const transaction = builder.build()
    
    expect(transaction.instructions.length).toBe(0)
  })

  test("should execute transaction successfully", async () => {
    const builder = new TransactionBuilder()
    const wallet = new Wallet()
    
    const instruction = {
      programId: "TestProgram",
      keys: [],
      data: new Uint8Array([])
    }
    
    builder.addInstruction(instruction)
    const result = await builder.execute(wallet.connection, wallet.keypair)
    
    expect(result).toBeDefined()
    expect(result.success).toBe(true)
    expect(result.signature).toBeDefined()
    expect(typeof result.signature).toBe("string")
  })
})
