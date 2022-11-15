import React from "react";

const temp = () => {
  return <div>temp</div>;
};

export default temp;

// export default function TaskModal({ name, modalType }: Props) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [sdValue, setSdValue] = React.useState(new Date());
//   const [edValue, setEdValue] = React.useState(new Date());

//   <LocalizationProvider dateAdapter={AdapterDayjs}>
//     <DesktopDatePicker
//       label="End Date"
//       inputFormat="MM/DD/YYYY"
//       value={edValue}
//       onChange={handleChange1}
//       renderInput={(params: any) => <TextField {...params} name="endDate" />}
//     />
//   </LocalizationProvider>;
// }

// const { values, errors, touched, isSubmitting, handleBlur, handleSubmit } =
//   useFormik({
//     initialValues: {
//       title: "",
//       priority: "Blue",
//       startDate: "",
//       endDate: "",
//       description: "",
//       checklist: "",
//       members: "",
//       links: "",
//       attatchment: "",
//       taskStatus: "",
//       permission: "",
//       createdBy: "",
//       // updatedBy: "",
//     },
//     validationSchema: validationSchemaExpense,
//     onSubmit: async (values: any) => {
//       // const selectedDate = values.transactionDate;
//       // const month = selectedDate.getUTCMonth() + 1;
//       // const day = selectedDate.getUTCDate();
//       // const year = selectedDate.getUTCFullYear();
//       // values.transactionDate = year + "-" + month + "-" + day;
//       const title = values.amount;
//       const priority = values.priority;
//       const startDate = values.startDate;
//       const endDate = values.endDate;
//       const description = values.description;
//       const checklist = values.checklist;
//       const members = values.members;
//       const links = values.links;
//       const attatchment = values.attatchment;
//       const taskStatus = values.taskStatus;
//       const permission = values.permission;

//       // user data
//       const createdBy = values.createdBy;
//       // const updatedBy = values.updatedBy;

//       try {
//         const result = await axios.post(
//           "http://103.242.116.207:9000/",
//           JSON.stringify({
//             title,
//             priority,
//             startDate,
//             endDate,
//             description,
//             checklist,
//             members,
//             links,
//             attatchment,
//             taskStatus,
//             permission,
//             createdBy,
//             // updatedBy,
//           }),
//           {
//             headers: { "Content-Type": "application/json" },
//             withCredentials: true,
//           }
//         );

//         console.warn("result", result.status);
//       } catch (err) {
//         console.log(err);
//       }
//       console.log(values);
//     },
//   });

// const handleChange = (newValue: any) => {
//   // console.log(newValue);
//   setSdValue(newValue);
// };

// const handleChange1 = (newValue: any) => {
//   // console.log(newValue);
//   setEdValue(newValue);
// };

// // modal button
