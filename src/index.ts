#!/usr/bin/env node
import { program } from "commander";
import { createChatManager } from "@bitxenia/astrachat-eth";

program.name("astrachat").description("Astrachat node").version("0.0.1");

program
  .command("create")
  .option("-n --name <name>", "Name of the chat")
  .action(async (opts) => {
    const chatManager = await createChatManager();

    chatManager.createChat(opts.name);
  });

program.parse(process.argv);
