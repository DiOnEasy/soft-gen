import { Box, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Header = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <>
      {user && (
        <Box
          paddingY={1.5}
          paddingX={15}
          bgcolor={"#8f8f8f30"}
          display="flex"
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDirection="row"
        >
          <Box>
            <img style={{ width: "100px" }} src="/logo.png" alt="" />
          </Box>
          <Box display="flex" alignItems={"center"} gap={1.5}>
            <img width={50} style={{borderRadius: '12px'}} src={`${user.photoURL}`} alt="" />
            <span>{user.displayName}</span>
          </Box>
        </Box>
      )}
    </>
  );
};
