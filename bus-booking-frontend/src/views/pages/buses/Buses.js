import PropTypes from "prop-types";
import React, { useEffect, useState, createRef } from "react";
import classNames from "classnames";
import { rgbToHex } from "@coreui/utils";
import { DocsLink } from "src/components";
import CIcon from "@coreui/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast, Toaster } from "react-hot-toast";
import {
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import { cilArrowBottom, cilArrowTop, cilOptions } from "@coreui/icons";

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilBike,
} from "@coreui/icons";

import avatar1 from "src/assets/images/avatars/1.jpg";
import avatar2 from "src/assets/images/avatars/2.jpg";
import avatar3 from "src/assets/images/avatars/3.jpg";
import avatar4 from "src/assets/images/avatars/4.jpg";
import avatar5 from "src/assets/images/avatars/5.jpg";
import avatar6 from "src/assets/images/avatars/6.jpg";

const ThemeView = () => {
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const ref = createRef();

  useEffect(() => {
    const el = ref.current.parentNode.firstChild;
    const varColor = window
      .getComputedStyle(el)
      .getPropertyValue("background-color");
    setColor(varColor);
  }, [ref]);

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  );
};

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, "theme-color w-75 rounded mb-3");
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: "75%" }}></div>
      {children}
      <ThemeView />
    </CCol>
  );
};

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const Bikes = () => {
  const [Bikes1, setBikes] = useState([]);
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const response = await fetch("http://localhost:4000/Bikes");
        const data = await response.json();
        setBikes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBikes();
    console.log(Bikes1);
  }, []);
const navigate=useNavigate()
const handleEdit=async (Bike)=>{
navigate(`/pages/editBike`, { state: Bike })
}
  const handleDelete = async (BikeId) => {
    if (window.confirm("Are you sure do you want to Delete?")) {
      try {
        const response = await fetch(
          `http://localhost:4000/deleteBike/${BikeId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          console.log("Item deleted successfully");
          toast.success("Bike Deleted Successfully");
          window.location.reload();
        } else {
          // Delete failed, handle the error (e.g., display an error message)
          console.error("Failed to delete item");
          toast.error("Unsuccessfully");
        }
      } catch (error) {
        // Error occurred during the delete request, handle it appropriately
        console.error("Error deleting item:", error);
      }
    }
  };

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <CCard className="mb-4">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">Image</CTableHeaderCell>
              <CTableHeaderCell>Bike Name</CTableHeaderCell>
              <CTableHeaderCell>Discription</CTableHeaderCell>
              <CTableHeaderCell>Rate</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Bikes1.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="xl" src={item.img} status="success" />
                </CTableDataCell>
                <CTableDataCell>
                  <div>{item.name}</div>
                  <div className="small text-medium-emphasis">
                    <span>{item.brand}</span>
                  </div>
                </CTableDataCell>

                <CTableDataCell>
                  CC:<span>{item.cc}</span>
                  <div>
                    Transmission:<span>{item.transmission}</span>
                  </div>
                </CTableDataCell>

                <CTableDataCell>
                  <div className="clearfix">
                    <div className="float-start">
                      <div>
                        <span>&#8377;</span>
                        {item.rate}
                      </div>
                    </div>
                  </div>
                </CTableDataCell>

                <CTableDataCell>
                  <span style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon onClick={() => handleEdit(item)} icon={faEye} color="blue" />
                  </span>{" "}
                  {"  "}
                  <span style={{ cursor: "pointer" }}>
                    {" "}
                    <FontAwesomeIcon
                      icon={faTrash}
                      color="red"
                      onClick={() => handleDelete(item.docid)}
                    />
                  </span>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  );
};

export default Bikes;
