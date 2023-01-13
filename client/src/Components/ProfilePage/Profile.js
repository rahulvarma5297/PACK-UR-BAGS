import React, { useState, useEffect, useRef } from "react";
import Header from "../Navbar/Header";
import "./clientprofile.css";
import Tabledata from "./Tabledata";
import Edityourprofile from "./Edityourprofile";
import ChangePassword from "./ChangePassword";
import { useSelector } from "react-redux";
import axios from "axios";
import { add } from "../../Redux/action";
import { useDispatch } from "react-redux";

function change_pass() {
  const modalBg = document.querySelector(".pass-modal-bg");
  modalBg.classList.toggle("bg-active");
}

const navItems = [
  {
    title: "Home",
    path: "/index",
  },
];
function Profile() {
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const counter = useSelector((state) => state.value);
  const [user, setUser] = useState({});
  const [fd,setFd] = useState({})
  const [edit,setEdit] = useState(false)
  // eslint-disable-next-line
  const userL = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    await axios
      .get(`http://localhost:9000/users/loguser/${userL.username}`)
      .then(async (resp) => {
        console.log(resp.data);
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        setFd(resp.data.fd)
        return setUser(resp.data.user);
      });
  };
  useEffect(() => {
    fetchData();
    setEdit(false)
    // eslint-disable-next-line
  }, [counter]);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const profileHandler = async (e) => {
    if (e.target.files[0]) {
      // const fd = new FormData();
      // fd.append("image", e.target.files[0], e.target.files[0].name);
      // fd.append("email",user.email)
      // axios.post("http://localhost:9000/profile/upload",fd,{
      //   headers: {"Content-Type": "multipart/form-data"}
      // })

      const base64 = await convertToBase64(e.target.files[0]);
      const fd = {
        img: base64,
        email: user.email,
      };
      await axios
        .post("http://localhost:9000/profile/upload", fd)
        .then((resp) => {
          if (resp.status === 200) {
            dispatch(add());
            alert(resp.data.succ);
          }
        });
    }
  };
  const imgDeleteHandler = async () => {
    const fd = {
      email: user.email,
    };
    await axios
      .post("http://localhost:9000/profile/remove", fd)
      .then((resp) => {
        if (resp.status === 200) {
          dispatch(add());
          alert(resp.data.succ);
        }
      });
  };
  return (
    <div>
      <Header user={true} navItems={navItems} />
      <div className="profile-background">
        <div className="white-panel">
          <div className="user-details">
            <h1 className="h1">Profile</h1>
            <hr style={{ height: "1px", backgroundColor: "black" }} />
            <div className="profile">
              <div className="_left">
                <div className="_img">
                  <img
                    src={user.image}
                    alt="profile_img"
                  />
                  <div className="img_content">
                    <i
                      className="bi bi-upload fa-3x"
                      onClick={() => hiddenFileInput.current.click()}
                    ></i>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={hiddenFileInput}
                      onChange={profileHandler}
                    ></input>
                    {user.imagegiven && (
                      <i
                        className="bi bi-trash fa-3x"
                        onClick={imgDeleteHandler}
                      ></i>
                    )}
                  </div>
                </div>
              </div>
              <div className="_right">
                {edit ? <div className="edit-form">
          <h2>edit your profile</h2>
          <Edityourprofile username="User" />
          <span onClick={() => setEdit(false)}>x</span>
        </div>:
                <table>
                <Tabledata heading={"Username:"} data={user.username} />
                <Tabledata heading={"Name:"} data={user.name} />
                <Tabledata heading={"Email:"} data={user.email} />
                <Tabledata heading={"Gender:"} data={user.gender} />
                <Tabledata
                  heading={"Phone Number:"}
                  data={user.phonenumber}
                />
              </table>}
                <div className="btns">
                  {!edit && <button className="btn_profile" onClick={() => setEdit(true
                    )}>
                    edit profile
                  </button>}
                  <button className="btn_profile" onClick={change_pass}>
                    change password
                  </button>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
          <hr style={{ height: "1px", backgroundColor: "black" }} />
          <div className="latest-upcoming-booking">
            <h2>
              Your latest upcoming booking will appear here with view all
              booking buttons
            </h2>
          </div>
          <hr style={{ height: "1px", backgroundColor: "black" }} />
          <div className="user-feedback">
            <h2>{fd ? fd.feedback : "Your submitted feedback will appear here." }</h2>
          </div>
          <hr style={{ height: "1px", backgroundColor: "black" }} />
          <div className="user-reviews">
            <h2>Your reviews to your tours will appear here with edit option.</h2>
          </div>
        </div>
      </div>
      <div className="pass-modal-bg">
        <div className="edit-form">
          <h2>Change your password</h2>
          <ChangePassword username="User" />
          <span onClick={change_pass}>x</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;