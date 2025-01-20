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
        marginLeft: "5px",
        backgroundColor: "grey",
      }}
      disableRipple>
      {props.name}
    </Button>
  );
};

export default CustomButton;
