import Button from "@mui/material/Button";

interface CustomButtonProps {
  name: string;
  onClick: (e: React.MouseEvent) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ name, onClick }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: 5,
        "&:hover": {},
        color: "black",
        border: "1px solid black",
        marginLeft: "5px",
        backgroundColor: "grey",
      }}
      disableRipple
      onClick={(e) => onClick(e)}>
      {name}
    </Button>
  );
};

export default CustomButton;
