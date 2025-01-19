import Button from "@mui/material/Button";

const CustomButton = (props: { name: string }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: 5,
        "&:hover": {},
        color: "black",
        border: "1px solid black",
      }}
      disableRipple>
      {props.name}
    </Button>
  );
};

export default CustomButton;
