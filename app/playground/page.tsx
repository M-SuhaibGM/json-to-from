import fs from "fs";
import path from "path";
import { PlaygroundClient } from "./PlaygroundClient";

export default function PlaygroundPage() {
  // Read the public/forms directory on the server
  const formsDir = path.join(process.cwd(), "public", "forms");
  let availableFiles: string[] = [];

  try {
    availableFiles = fs
      .readdirSync(formsDir)
      .filter((f) => f.endsWith(".json"))
      .sort();
  } catch (err) {
    console.error("Could not read public/forms directory", err);
  }

  return <PlaygroundClient availableFiles={availableFiles} />;
}