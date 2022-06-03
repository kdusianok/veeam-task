import React, { useCallback } from "react";
import { Label } from "./types";

interface LabelsProps {
  labels: Label[];
  setLabels: Function;
}

const Labels: React.FC<LabelsProps> = ({ labels, setLabels }) => {
  const onClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const editLabel = useCallback(
    (labelKey: number, value: string) => {
      setLabels((labels: Label[]) =>
        labels.map((label, key) => {
          if (key === labelKey) {
            return {
              ...label,
              editable: false,
              text: value
            };
          }
          return label;
        })
      );
    },
    [setLabels]
  );

  const onBlur = useCallback(
    (labelKey: number) => (e) => {
      editLabel(labelKey, e.target.value);
    },
    [editLabel]
  );

  const onKeyDown = useCallback(
    (labelKey: number) => (e) => {
      if (e.key === "Enter") {
        editLabel(labelKey, e.target.value);
      }
    },
    [editLabel]
  );

  return (
    <>
      {labels.map((label, key) => (
        <div
          key={key}
          className="label"
          onClick={onClick}
          style={{
            top: label.top,
            left: label.left
          }}
        >
          {label.editable ? (
            <input autoFocus onKeyDown={onKeyDown(key)} onBlur={onBlur(key)} />
          ) : (
            label.text
          )}
        </div>
      ))}
    </>
  );
};

export default Labels;
