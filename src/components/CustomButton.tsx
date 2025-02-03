import Button from "@mui/material/Button";

const CustomButton = (props: { name: string; onClick: (e: any) => void }) => {
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
      onClick={(e: any) => props.onClick(e)}
    >
      {props.name}
    </Button>
  );
};

export default CustomButton;
