#!/usr/bin/env node
import { program } from "commander";
import { ChatMessage, createChatManager } from "@bitxenia/astrachat-eth";
import * as readline from "readline";

program.name("astrachat").description("Astrachat node").version("0.0.1");

program
  .command("create")
  .option("-n --name <name>", "Name of the chat")
  .option("-a --account <account>", "Account address")
  .action(async (opts) => {
    const chatManager = await createChatManager(opts.account);

    chatManager.createChat(opts.name);
  });

program
  .command("connect")
  .option("-n --name <name>", "Name of the chat")
  .option("-a --account <account>", "Account address")
  .action(async (opts) => {
    const chatManager = await createChatManager(opts.account);

    const chatName = opts.name;

    const messages = await chatManager.getMessages(chatName);

    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      console.log(`${m.senderAlias ? m.senderAlias : m.sender}: ${m.message}`);
    }

    process.stdin.on("data", async (raw_data) => {
      const line = raw_data.toString().trim();
      await chatManager.sendMessage(chatName, line);

      // if (data === "x") {
      //   process.exit(1);
      // }
    });

    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout,
    //   prompt: "> ",
    // });

    // const printNewMessages = (message: ChatMessage) => {
    //   // rl.write(
    //   console.log(
    //     `Received message from ${message.sender} with content: ${message.message}`,
    //   );
    // };

    // chatManager
    //   .listenToNewMessages(chatName, (message: ChatMessage) => {
    //     // throw Error("CALL IT");
    //     console.log(`${message.sender}: ${message.message}`);
    //   })
    //   .then(() => {
    //     console.log(`fulfilled`);
    //   });

    const listenToNewMessages = async () => {
      await chatManager.listenToNewMessages(
        chatName,
        (message: ChatMessage) => {
          // throw Error("CALL IT");
          console.log(`${message.sender}: ${message.message}`);
        },
      );
      console.log(`Listening to message from '${chatName}'`);
    };

    await listenToNewMessages();

    console.log("Waiting for messages...");

    const signalPromise = new Promise<void>((resolve) => {
      process.on("SIGTERM", () => {
        console.log("\nReceived SIGTERM");
        resolve();
      });
    });

    signalPromise.then(() => {
      console.log("Exiting");
      process.exit(0);
    });
  });

program
  .command("send")
  .option("-n --name <name>", "Name of the chat")
  .option("-m --message <message>", "Message")
  .action(async (opts) => {
    const chatManager = await createChatManager();

    console.log(`Sending message '${opts.message}' to chat '${opts.name}'`);

    await chatManager.sendMessage(opts.name, opts.message);
  });

program.parse(process.argv);
