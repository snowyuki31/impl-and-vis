import { GeneralStateHooks } from "../../../types/typeBases";

export const InfoArea = <T extends GeneralStateHooks>({
  hooks,
  inputInfo,
  outputInfo,
  legend,
  isWarning,
}: {
  hooks: T;
  inputInfo: JSX.Element;
  outputInfo: JSX.Element;
  legend?: JSX.Element;
  isWarning?: boolean;
}) => {
  const info = hooks.useInfo[0];
  const warning = isWarning && (
    <div style={{ color: "#C84B31" }}>Calculation may take a while</div>
  );

  const calculationTime =
    info.calculationTime < 0.1 ? "0.00" : info.calculationTime.toFixed(2);
  const timeInfo = <div>Calculation completed in {calculationTime} ms</div>;

  return (
    <>
      {legend}
      {inputInfo}
      {timeInfo}
      {outputInfo}
      {warning}
    </>
  );
};

export default InfoArea;
