import { Div } from "atomize";
const Spacer = ({ theme }) => {
  return (
    <Div
      h="42px"
      border={{ r: "1.9px solid" }}
      rounded="xs"
      m="5px"
      borderColor={
        theme === "light" ? "hsl(0 0% 0% / 0.071)" : "hsl(0 0% 100% / 0.077)"
      }
    />
  );
};
export default Spacer;
