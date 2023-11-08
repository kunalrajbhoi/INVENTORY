// import { gql, useMutation, useQuery } from "@apollo/client";
// import React, { useEffect } from "react";
// import { Button } from "react-bootstrap";

// function Other() {

// console.log("URL", process.env.REACT_APP_BACKEND_URL);
//   const GET_DATA = gql`
//     query GetAllCategory {
//       getAllCategory {
//         categoryName
//         id
//       }
//     }
//   `;


// const {data, loading, error, refetch} = useQuery(GET_DATA);



// if(data) {
//   console.log("data", data);

//   // console.log(data.getAllCategory[0].id);
// }



//   return <><div>Other</div>
//   { data?.getAllCategory &&  data?.getAllCategory?.map((item) => <div>
//     <p key={item}>{item?.categoryName}</p>
//   </div>)}
//   {/* <Button onClick={() => handleFormSubmit()}>Send Data</Button> */}
//   </>;
// }

// export default Other;
