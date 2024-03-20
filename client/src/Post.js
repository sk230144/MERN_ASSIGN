import React from 'react';
import { useTable } from 'react-table';
import './Post.css';
import { IoSettings } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

const Post = () => {
  const data = React.useMemo(
    () => [
      { "#": 1, Name: "Michael Holz", "Date Created": "04/10/2013", Role: "Admin", Status: "Active", Action: "Active", Image: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { "#": 2, Name: "Rahul Mishra", "Date Created": "04/10/2013", Role: "User", Status: "Inactive", Action: "Active", Image: "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { "#": 3, Name: "Daryll Mitchell", "Date Created": "04/10/2013", Role: "Admin", Status: "Inactive", Action: "Active", Image: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { "#": 4, Name: "Chris Gayle", "Date Created": "04/10/2013", Role: "Admin", Status: "Active", Action: "Active", Image: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { "#": 5, Name: "Ab Devel", "Date Created": "04/10/2013", Role: "Admin", Status: "Inctive", Action: "Active", Image: "https://images.pexels.com/photos/2364306/pexels-photo-2364306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
      { "#": 6, Name: "Glen Maxwell", "Date Created": "04/10/2013", Role: "Admin", Status: "Active", Action: "Active", Image: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { "#": 7, Name: "Yuzi Chahal", "Date Created": "04/10/2013", Role: "User", Status: "Inactive", Action: "Active", Image: "https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?auto=compress&cs=tinysrgb&w=600" },
      
    ],

    []
  );

  // const columns = React.useMemo(
  //   () => [
  //     { Header: "#", accessor: "#" },
  //     { Header: "Photo", accessor: "Image", Cell: ({ value }) => <img src={value} alt="Avatar" className="avatar" /> },
  //     { Header: "Name", accessor: "Name" },
  //     { Header: "Date Created", accessor: "Date Created" },
  //     { Header: "Role", accessor: "Role" },
  //     { Header: "Status", accessor: "Status" },
  //     { Header: "Action", accessor: "Action", Cell: ({ value }) => <><span className={`status-icon ${value === 'Active' ? 'active' : 'inactive'}`}><IoSettings /></span><span className={`status-icon ${value === 'Active' ? 'active' : 'inactive'}`}><RxCrossCircled /></span></> },
  //   ],
  //   []
  // );


  const columns = React.useMemo(
    () => [
      { Header: "#", accessor: "#" },
      { Header: "Photo", accessor: "Image", Cell: ({ value }) => <img src={value} alt="Avatar" className="avatar" /> },
      { Header: "Name", accessor: "Name" },
      { Header: "Date Created", accessor: "Date Created" },
      { Header: "Role", accessor: "Role" },
      { Header: "Status", accessor: "Status", Cell: ({ value, row }) => {
          const isActive = row.original.Status === 'Active';
          return (
            <>
              <span className={`status-icon ${isActive ? 'active' : 'inactive'}`}>
                {isActive ? <span className="dot active-dot"></span> : <span className="dot inactive-dot"></span>}
              </span>
              <span className={`status-icon ${isActive ? 'active' : 'inactive'}`}>
              {isActive ? "Active" : "Inactive"}
            </span>            
            </>
          );
        }
      },
      { Header: "Action", accessor: "Action", Cell: ({ value }) => <><span className={`status-icon ${value === 'Active' ? 'active' : 'inactive'}`}><IoSettings/></span><span className={`status-icon ${value === 'Active' ? 'active' : 'inactive'}`}><RxCrossCircled/></span></> },
    ],
    []
  );
  



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="your-table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Post;
