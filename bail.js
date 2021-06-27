import process from "process"
import { report } from "./main.js"

process.on("exit", report)

who()
