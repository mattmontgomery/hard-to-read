import type { NextPage } from "next";
// @ts-ignore
import WizardOfOzText from "../lib/texts/wizard-of-oz.txt";
import React, { useEffect, useState } from "react";
import styles from "../styles/animate.module.css";

function getStyle(
  lastStyle: React.StyleHTMLAttributes<HTMLSpanElement>["style"],
  word: string
): React.StyleHTMLAttributes<HTMLSpanElement>["style"] {
  const lastRotation = Number(
    lastStyle?.transform?.replace(/[(rotate)|\(|\)|(deg)]+/g, "")
  );
  const nextRotation = Number.isNaN(lastRotation)
    ? 0
    : lastRotation + (Math.random() * 1 - 0.5);
  return {
    display: "inline-block",
    transform: `rotate(${nextRotation}deg)`,
    marginTop: Math.abs(nextRotation),
    marginRight: ".5rem",
    letterSpacing: `${nextRotation * 0.02}em`,
    position: "relative",
    top: nextRotation > 0 ? `${nextRotation * 5}px` : 0,
  };
}

const Line = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [words, setWords] = useState<string[]>(
    children
      ? children
          ?.valueOf()
          .toString()
          .split(/\s{1,}/)
      : []
  );
  let lastStyle: React.StyleHTMLAttributes<HTMLSpanElement>["style"];
  let lastW: string;
  return (
    <p
      style={{
        lineHeight: Math.random() > 0.5 ? "150%" : "75%",
        marginBottom: "2rem",
      }}
    >
      {words.map((w) => {
        const thisStyle = getStyle(lastStyle, lastW);
        lastStyle = thisStyle;
        lastW = w;
        return (
          <span
            style={thisStyle}
            className={styles[`animate${Math.floor(Math.random() * 10)}`]}
          >
            {w}{" "}
          </span>
        );
      })}
    </p>
  );
};

const Home: NextPage = () => {
  const [text, setText] = useState<React.ReactNode>();
  useEffect(() => {
    setText(
      WizardOfOzText.split(/\n{2,}/)
        .filter(Boolean)
        .slice(0, 100)
        .map((p: string) => <Line>{p}</Line>)
    );
  }, [WizardOfOzText]);

  return <div style={{ margin: "1rem" }}>{text}</div>;
};

export default Home;
