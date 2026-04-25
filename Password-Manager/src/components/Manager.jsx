import React from "react";
import { useRef, useState, useEffect, useContext, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = ({ data }) => {
  const newData = useMemo(() => data, []);
  const ref = useRef();
  const sitee = useRef();
  const show = useRef();
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
    e_mail: newData,
  });
  const [passwordArray, setpasswordArray] = useState([]);
  const [all, setall] = useState(false);

  const deleteall = async () => {
    let check = confirm("Are you sure you want to delete all Passwords?");
    if (check) {
      let a = await fetch("http://localhost:3000/deleall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ e_mail: form.e_mail }), // body data type must match "Content-Type" header
      });

      await getdataa();
    }
  };
  const getdataa = async () => {
    let a = await fetch("http://localhost:3000/rece", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ e_mail: form.e_mail }), // body data type must match "Content-Type" header
    });
    let b = await a.json();
    setpasswordArray(b);
  };
  useEffect(() => {
    (async function () {
      let a = await fetch("http://localhost:3000/rece", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ e_mail: form.e_mail }), // body data type must match "Content-Type" header
      });
      let b = await a.json();
      setpasswordArray(b);
    })();
  }, []);

  const showPass = () => {
    if (ref.current.src.includes("imgs/eye.png")) {
      show.current.type = "text";
      ref.current.src = "imgs/hidden.png";
    } else {
      show.current.type = "password";
      ref.current.src = "imgs/eye.png";
    }
  };
  const savePass = async () => {
    let a = await fetch("http://localhost:3000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(form), // body data type must match "Content-Type" header
    });
    setform({ site: "", username: "", password: "", e_mail: newData });
    await getdataa();
  };
  const deletePass = async (id) => {
    let check = confirm("are you sure you want to delete this password?");
    if (check) {
      console.log(id);
      let a = await fetch("http://localhost:3000/dele", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ id: id }), // body data type must match "Content-Type" header
      });

      await getdataa();
    }
  };
  const editPass = async (site, username, password, id) => {
    setform({ site, username, password, e_mail: newData });
    sitee.current.focus();
    let a = await fetch("http://localhost:3000/dele", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ id: id }), // body data type must match "Content-Type" header
    });

    await getdataa();
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (s) => {
    navigator.clipboard.writeText(s);
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const handleall = () => {
    setall(!all);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="md:mycontainer py-10">
        <h1 className="mx-auto font-bold text-4xl text-center">
          <span className="text-green-700">&lt;</span>
          Pass<span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-800 text-lg text-center">
          Your own password manager
        </p>
        <div className="flex flex-col p-4 gap-5 items-center">
          <input
            ref={sitee}
            onChange={handleChange}
            value={form.site}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-600 w-full text-black px-4 py-2 text-xl"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex gap-10 w-full">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              className="rounded-full border border-green-600 w-full text-black px-4 py-2 text-xl"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative w-1/3">
              <input
                ref={show}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                className="rounded-full border border-green-600 w-full text-black px-4 py-2 text-xl"
                type="password"
                name="password"
                id="password"
              />
              <span
                onClick={showPass}
                className="absolute right-2 top-0 cursor-pointer py-2 px-1"
              >
                <img
                  ref={ref}
                  className="see w-[27px]"
                  src="imgs/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            <button
              onClick={savePass}
              className="flex gap-2 items-center justify-center bg-green-400 rounded-full hover:bg-green-300 duration- w-fit py-2 px-4 border border-green-600"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              <span>Save Password</span>
            </button>
            <button
              onClick={deleteall}
              className="flex gap-2 items-center justify-center bg-red-400 rounded-full hover:bg-red-300 duration- w-fit py-2 px-4 border border-red-600"
            >
              <lord-icon
                src="https://cdn.lordicon.com/skkahier.json"
                trigger="hover"
              ></lord-icon>
              <span>Delete All Passwords</span>
            </button>
          </div>
        </div>
        <div className="pss">
          <div className="flex items-center gap-2">
            <input
              onChange={handleall}
              type="checkbox"
              checked={all}
              style={{ transform: "scale(1.5)" }}
              name="showpasses"
              id="showpasses"
            />
            <label htmlFor="showpasses" className="text-[147x]">
              Show Password
            </label>
          </div>

          <h2 className="font-bold text-xl mb-2">Yout Passwords</h2>
          {passwordArray.length === 0 && <div>No password found</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="py-1">Site</th>
                  <th className="py-1">Username</th>
                  <th className="py-1">Password</th>
                  <th className="py-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item) => {
                  return (
                    <tr key={item._id}>
                      <td className="text-center w-32 border border-white">
                        <div className="flex items-center justify-center gap-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer pt-[5px]"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              className="cursor-pointer"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 border border-white">
                        <div className="flex items-center justify-center gap-2">
                          <p>{item.username}</p>
                          <div
                            className="cursor-pointer pt-[5px]"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              className="cursor-pointer"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 border border-white">
                        <div className="flex items-center justify-center gap-2">
                          {/* <p>{item.password}</p> */}
                          <input
                            style={{
                              width: `${item.password.length * 9}px`,
                              pointerEvents: "none",
                            }}
                            className="outline-none bg-cu_green"
                            type={all ? "text" : "password"}
                            value={item.password}
                            name=""
                            id=""
                          />
                          <div
                            className="cursor-pointer pt-[5px]"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              className="cursor-pointer"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 border border-white">
                        <div className="flex justify-center gap-4">
                          <span
                            className="cursor-pointer"
                            onClick={() =>
                              editPass(
                                item.site,
                                item.username,
                                item.password,
                                item._id
                              )
                            }
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              className="cursor-pointer"
                            ></lord-icon>
                          </span>
                          <span
                            className="cursor-pointer"
                            onClick={() => deletePass(item._id)}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
