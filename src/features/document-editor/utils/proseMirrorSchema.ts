import { Schema } from "prosemirror-model";
import { addListNodes } from "prosemirror-schema-list";
import { schema as basicSchema } from "prosemirror-schema-basic";

const nodes = addListNodes(basicSchema.spec.nodes, "paragraph block*", "block");

export const documentEditorSchema = new Schema({
  nodes,
  marks: basicSchema.spec.marks
    .addToEnd("underline", {
      parseDOM: [{ tag: "u" }, { style: "text-decoration=underline" }],
      toDOM() {
        return ["u", 0];
      },
    })
    .addToEnd("strike", {
      parseDOM: [
        { tag: "s" },
        { tag: "del" },
        { tag: "strike" },
        { style: "text-decoration=line-through" },
      ],
      toDOM() {
        return ["s", 0];
      },
    })
    .addToEnd("subscript", {
      parseDOM: [{ tag: "sub" }, { style: "vertical-align=sub" }],
      toDOM() {
        return ["sub", 0];
      },
    })
    .addToEnd("superscript", {
      parseDOM: [{ tag: "sup" }, { style: "vertical-align=super" }],
      toDOM() {
        return ["sup", 0];
      },
    }),
});
