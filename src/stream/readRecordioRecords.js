import { read } from "@dcos/recordio";
import copychars from "@dcos/copychars";

// XHRConnection appends to its responseText on every progress event
// but we need the data chunk by chunk to emit records as they come
// thus we track the position in data that we've already processed
export default function readRecordioRecords(
  { buffer = "", position = 0 } = {},
  data = ""
) {
  const chunk = copychars(data, position);
  const [records, rest] = read(buffer + chunk);

  return { records, buffer: rest, position: position + chunk.length };
}
