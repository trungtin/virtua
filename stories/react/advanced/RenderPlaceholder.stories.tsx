import { Meta, StoryObj } from "@storybook/react-vite";
import React, { CSSProperties, useMemo } from "react";
import { WindowVirtualizer } from "../../../src";
import { faker } from "@faker-js/faker";

export default {
  component: WindowVirtualizer,
} as Meta;

type Article = {
  id: string;
  title: string;
  body: string;
  height: number;
};

const rowStyle: CSSProperties = {
  boxSizing: "border-box",
  borderBottom: "1px solid #e5e7eb",
  padding: "12px 16px",
  background: "#fff",
};

export const Default: StoryObj = {
  name: "renderPlaceholder",
  render: () => {
    const articles = useMemo<Article[]>(
      () =>
        Array.from({ length: 500 }, (_, i) => ({
          id: String(i + 1),
          title: faker.lorem.words(5),
          body: faker.lorem.sentences(3),
          height: faker.number.int({ min: 60, max: 140 }),
        })),
      []
    );

  return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "120px 80px 80px",
          background: "#f8fafc",
        }}
      >
        <div style={{ fontSize: 14, color: "#475569" }}>
          Browser search demo: press Cmd/Ctrl+F and type any word from the list
          (e.g. a surname). The virtualizer mounts offscreen items as lightweight
          placeholders so native find still works while only measuring the
          visible range.
        </div>
        <div
          style={{
            border: "1px solid #cbd5e1",
            borderRadius: 12,
            boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
            background: "#fff",
            maxWidth: 960,
          }}
        >
          <WindowVirtualizer data={articles} renderPlaceholder>
            {(item, index, placeholder) => (
              <div
                key={item.id}
                style={{
                  ...rowStyle,
                  height: item.height,
                  color: placeholder ? "#94a3b8" : "#0f172a",
                  background: placeholder ? "#f8fafc" : "#fff",
                  opacity: placeholder ? 0.7 : 1,
                  pointerEvents: placeholder ? "none" : "auto",
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 15 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>{item.body}</div>
                <div style={{ marginTop: 6, fontSize: 12, color: "#64748b" }}>
                  {placeholder
                    ? "offscreen placeholder (still searchable)"
                    : `row #${item.id} • index ${index}`}
                </div>
              </div>
            )}
          </WindowVirtualizer>
        </div>
      </div>
    );
  },
};
