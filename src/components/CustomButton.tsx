import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface CustomButtonProps {
  name: string;
  onClick: (e: React.MouseEvent) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ name, onClick }) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  const bgColor = theme === "dark" ? "#343A40" : "#007BFF";
  const buttonHover = theme === "dark" ? "#495057" : "#0056b3";

  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: 5,
        marginLeft: "5px",
        border: bgColor,
        backgroundColor: bgColor,
        color: "white",
        "&:hover": {
          backgroundColor: buttonHover,
        },
      }}
      disableRipple
      onClick={(e) => onClick(e)}>
      {name}
    </Button>
  );
};

export default CustomButton;
