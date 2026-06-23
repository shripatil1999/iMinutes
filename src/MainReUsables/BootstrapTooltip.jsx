import { Tooltip, styled, tooltipClasses } from "@mui/material";

const BootstrapTooltip = styled(({ className, ...props }) => {
  // Check if props.placement is empty, if so, set it to "bottom"
  if (!props.placement) {
    //placement=["bottom-end","bottom-start","bottom","left-end","left-start","left","right-end","right-start","right","top-end","top-start","top"]
    props.placement = "bottom";
  }
  return <Tooltip {...props} arrow classes={{ popper: className }} />;
})(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black, //theme.palette.primary.main//primary,secondary,error,warning,info,success,text,background,divider,action,common
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black, //theme.palette.primary.main
    textAlign: "center", // Center-align the text
  },
}));

export default BootstrapTooltip;
