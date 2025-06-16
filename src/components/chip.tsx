import type React from "react";
import { CSSProperties } from "react";

type Props = {
  status: "APPROVED" | string;
  showDot?: boolean;
  style?: CSSProperties;
};

const Chip: React.FC<Props> = ({ status, style }) => {
  const isApproved = status === "approved";

  const chipStyle = {
    backgroundColor: isApproved ? "#DCFCE7" : "#FEE2E2",
    color: isApproved ? "#15803D" : "#B91C1C",
  };

  const label = isApproved ? "Aprobado" : "No aprobado";

  return (
    <div
      style={{ ...chipStyle, ...style }}
      className={`flex gap-2 justify-center items-center rounded-xl py-1 px-2.5 text-sm transition-all w-[120px]`}
    >
      {label}
    </div>
  );
};

export default Chip;
