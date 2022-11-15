import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import VideoCameraFrontOutlinedIcon from '@mui/icons-material/VideoCameraFrontOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';

export const WurkspaceIconsData = [
  {
    name:"Awards",
    icons: <EmojiEventsOutlinedIcon 
      sx={{
        color:"#ee735c",
        marginLeft: 1.5,
        height: 30,
        width: 25,
        background: "#ffffff",
        borderRadius: 70,
        cursor: "pointer",              
      }}
   />,
    path:'/landingpage/wurkspace/awards'
  },
  {
    name:"Meet",
    icons: <VideoCameraFrontOutlinedIcon 
     sx={{
      color:"#ee735c",
      marginLeft: 1.5,
      height: 30,
      width: 25,
      background: "#ffffff",
      borderRadius: 70,
      cursor: "pointer",              
     }}/>,
    path:'/landingpage/wurkspace/meet'
  },
  {
    name:"ConnectU",
    icons: <ConnectWithoutContactOutlinedIcon 
     sx={{
      color:"#ee735c",
      marginLeft: 1.5,
      height: 30,
      width: 25,
      background: "#ffffff",
      borderRadius: 70,
      cursor: "pointer",              
     }}/>,
    path:'/landingpage/wurkspace/connectU'
  },

]
 
