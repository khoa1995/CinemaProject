import { Scrollbars } from "react-custom-scrollbars";
import React from "react";
import ReactScrollbar from "react-scrollbar-js";

const MenuList = (props) => {
  const myScrollbar = {
    width: 400,
    height: 400,
  };
  // renderThumbVertical={renderThumbVertical}
  return (
    <ReactScrollbar style={myScrollbar}>{props.children}</ReactScrollbar>
    // <Scrollbars
    //   style={{ width: 450, height: 200 }}
    //   renderThumbVertical={renderThumbVertical}
    // >
    //   {props.children}
    // </Scrollbars>
  );
};

// scrollbar styles
// function renderThumbVertical({ style, ...props }) {
//   return (
//     <div
//       {...props}
//       style={{
//         ...style,
//         backgroundColor: "green",
//         width: "5px",
//         opacity: "1",
//         // overflowY: "scroll",
//       }}
//     />
//   );
// }

export default MenuList;
